import { useRef } from "react";
import classes from "../assets/FormCard.module.css";
import { fetchDataPost } from "../shared";
import { MainNavigation } from "../components/layout/MainNavigation";

export const AddPlantFormPage = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const speciesInputRef = useRef<HTMLInputElement>(null);
  const wateringIntervalInputRef = useRef<HTMLInputElement>(null);
  const sunExposureInputRef = useRef<HTMLInputElement>(null);
  const temperatureInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameInputRef?.current?.value;
    const species = speciesInputRef?.current?.value;
    const wateringInterval = wateringIntervalInputRef?.current?.value;
    const sunExposure = sunExposureInputRef?.current?.value;
    const temperature = temperatureInputRef?.current?.value;

    const path = "/plants/";
    const body = {
      name: name,
      species: species,
      watering_interval: wateringInterval,
      sun_exposure: sunExposure,
      temperature: temperature,
    };

    console.log(body);
    console.log(path);

    fetchDataPost(path, body)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <input data-testid="name" type="text" ref={nameInputRef} />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Species
              <input data-testid="species" type="text" ref={speciesInputRef} />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Watering interval{" "}
              <input
                data-testid="wateringInterval"
                type="number"
                ref={wateringIntervalInputRef}
              />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Sun exposure
              <input
                data-testid="sunExposure"
                type="number"
                ref={sunExposureInputRef}
              />
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Temperature
              <input
                data-testid="temperature"
                type="number"
                ref={temperatureInputRef}
              />
            </label>
          </div>

          <div className={classes.actions}>
            <button type="submit">Add plant</button>
          </div>
        </form>
      </section>
    </>
  );
};
