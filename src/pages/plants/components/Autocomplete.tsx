import { useCombobox } from "downshift";
import React from "react";
import { useState } from "react";
import { getSpiecies } from "../api";
import addedClasses from "./Autocomplete.module.css";

interface Props {}

export const Autocomplete = React.forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  let timerId: ReturnType<typeof setTimeout>;

  function getSpeciesFilter(inputValue: string) {
    return function speciesFilter(spiecies: string) {
      return !inputValue || spiecies.toLowerCase().includes(inputValue);
    };
  }

  function ComboBox() {
    function makeSpeciesRequest(search: string) {
      const config = [["search", search]];
      getSpiecies(config).then((paginatedList) => {
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
        <div className={`w-72 flex flex-col gap-1 ${addedClasses.div}`}>
          <label className="w-fit" {...getLabelProps()}>
            Species:
          </label>
          <div className="flex shadow-sm bg-white gap-0.5" {...getComboboxProps()}>
            <input placeholder="choose species" className="w-full p-1.5" {...getInputProps()} ref={forwardedRef} />
            <button aria-label="toggle menu" className="px-2" type="button" {...getToggleButtonProps()}>
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
          </div>
        </div>
        <ul {...getMenuProps()} className={`absolute p-0 w-72 bg-white shadow-md max-h-80 overflow-scroll`}>
          {isOpen &&
            items.map((item, index) => (
              <li key={`${item}${index}`} {...getItemProps({ item, index })}>
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return <ComboBox />;
});
