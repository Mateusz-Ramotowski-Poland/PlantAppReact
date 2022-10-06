import React, { useEffect, useRef, useState } from "react";
import classes from "../assets/FormCard.module.css";
import autocompleteClasses from "./AddPlantFormPage.module.css";
import { api, showErrorMessages, showMessage } from "../../shared";
import { MainNavigation } from "./layout/MainNavigation";
import { ToastContainer } from "react-toastify";
import { paths } from "./api";
import { useAppDispatch } from "../../store/hooks";
import { PlantAllInfo } from "../../interafces";
import { AutoComplete } from "@react-md/autocomplete";
import { plantsActions } from "./store/plantsSlice";
import { PaginatedList } from "./interfaces/interfaces";

interface Species {
  id: number;
  name: string;
}

export const AddPlantFormPage = () => {
  const [species, setspecies] = useState<string[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const speciesInputRef = useRef<HTMLInputElement>(null);
  const wateringIntervalInputRef = useRef<HTMLInputElement>(null);
  const sunExposureInputRef = useRef<HTMLInputElement>(null);
  const temperatureInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const re = /ab+c/;
    const config = [
      /* ["page", "2"], */
      ["search", `a`],
    ];
    const path = paths.getSpecies + "?" + new URLSearchParams(config).toString();
    api.get<PaginatedList<Species>>(path).then((species) => {
      console.log(species);
      const speciesNames = species.results.map((species) => species.name);
      setspecies(speciesNames);
    });
  }, []);
  const onSpeciesInputChangeHandler = (event: React.ChangeEvent) => {
    console.log("Handler");
    console.dir(speciesInputRef?.current);
    console.dir(document.activeElement === speciesInputRef?.current);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef?.current?.value;
    const species = speciesInputRef?.current?.value;
    const wateringInterval = wateringIntervalInputRef?.current?.value;
    const sunExposure = sunExposureInputRef?.current?.value;
    const temperature = temperatureInputRef?.current?.value;

    const body = {
      name: name,
      species: species,
      watering_interval: wateringInterval,
      sun_exposure: sunExposure,
      temperature: temperature,
    };

    api
      .post<PlantAllInfo>(paths.addPlant, body)
      .then((plant) => {
        showMessage("Added new plant", "info");
        dispatch(plantsActions.add({ plant }));
      })
      .catch((err) => showErrorMessages(err));
  };

  return (
    <>
      <MainNavigation />
      <section className={classes.form}>
        <h1>Add new plant</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label>
              Name
              <input data-testid="name" type="text" ref={nameInputRef} required maxLength={50} />
            </label>
          </div>
          <div className={classes.control}>
            <label className={autocompleteClasses.speciesLabel}>
              <AutoComplete
                maxLength={50}
                required
                id="search-species"
                name="species"
                label="Species"
                data={species}
                onChange={onSpeciesInputChangeHandler}
                ref={speciesInputRef}
              />
            </label>
          </div>

          <div className={classes.control}>
            <label>
              Watering interval{" "}
              <input
                data-testid="wateringInterval"
                type="number"
                ref={wateringIntervalInputRef}
                required
                min={1}
                max={2147483647}
              />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Sun exposure
              <input data-testid="sunExposure" type="number" ref={sunExposureInputRef} required min={1} max={24} />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Temperature
              <input data-testid="temperature" type="number" ref={temperatureInputRef} required min={-100} max={100} />
            </label>
          </div>

          <div className={classes.actions}>
            <button type="submit">Add plant</button>
          </div>
        </form>
        <ToastContainer />
      </section>
    </>
  );
};
