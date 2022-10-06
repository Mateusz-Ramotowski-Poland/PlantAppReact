import { useCombobox } from "downshift";
import { useState } from "react";
import { api } from "../../../shared";
import { paths } from "../api";
import { PaginatedList } from "../interfaces/interfaces";

interface Species {
  id: number;
  name: string;
}

export function Autocomplete() {
  let timerId: ReturnType<typeof setTimeout>;

  function getSpeciesFilter(inputValue: string) {
    return function speciesFilter(spiecies: string) {
      return !inputValue || spiecies.toLowerCase().includes(inputValue);
    };
  }

  function ComboBox() {
    function makeSpeciesRequest(search: string) {
      const config = [["search", search]];
      api.get<PaginatedList<Species>>(paths.getSpecies(config)).then((paginatedList) => {
        console.log(paginatedList);
        const species = paginatedList.results.map((species) => species.name);
        setItems(species);
      });
    }

    const onSpeciesInputChangeHandler = (inputValue: string | undefined) => {
      clearTimeout(timerId);
      if (inputValue) {
        timerId = setTimeout(makeSpeciesRequest.bind(null, inputValue), 400);
      }
    };

    const [items, setItems] = useState<string[]>([]);
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      onInputValueChange({ inputValue }) {
        onSpeciesInputChangeHandler(inputValue);
        setItems(items.filter(getSpeciesFilter(inputValue as string)));
      },
      items,
    });

    return (
      <div>
        <div className="w-72 flex flex-col gap-1">
          <label className="w-fit" {...getLabelProps()}>
            Species:
          </label>
          <div className="flex shadow-sm bg-white gap-0.5" {...getComboboxProps()}>
            <input placeholder="choose species" className="w-full p-1.5" {...getInputProps()} />
            <button aria-label="toggle menu" className="px-2" type="button" {...getToggleButtonProps()}>
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
          </div>
        </div>
        <ul {...getMenuProps()} className="absolute p-0 w-72 bg-white shadow-md max-h-80 overflow-scroll">
          {isOpen &&
            items.map((item, index) => (
              <li
                /*     className={cx(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItem === item && "font-bold",
                  "py-2 px-3 shadow-sm flex flex-col"
                )} */
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return <ComboBox />;
}
