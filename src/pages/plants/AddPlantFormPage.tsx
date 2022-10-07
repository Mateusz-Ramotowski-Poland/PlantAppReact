import React, { useRef } from "react";
import classes from "../assets/FormCard.module.css";
import { api, showErrorMessages, showMessage } from "../../shared";
import { MainNavigation } from "./layout/MainNavigation";
import { ToastContainer } from "react-toastify";
import { paths } from "./api";
import { useAppDispatch } from "../../store/hooks";
import { PlantAllInfo } from "../../interfaces";
import { plantsActions } from "./store/plantsSlice";
import { Autocomplete } from "./components/Autocomplete";

export const AddPlantFormPage = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const wateringIntervalInputRef = useRef<HTMLInputElement>(null);
  const sunExposureInputRef = useRef<HTMLInputElement>(null);
  const spieciesInputRef = React.createRef<HTMLInputElement>();
  const temperatureInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef?.current?.value;
    const species = spieciesInputRef?.current?.value;
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
            <Autocomplete ref={spieciesInputRef} />
          </div>
          <div className={classes.control}>
            <label>
              Watering interval
              <input data-testid="wateringInterval" type="number" ref={wateringIntervalInputRef} required min={1} />
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
