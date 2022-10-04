import Modal from "react-modal";
import { useAppDispatch } from "../../store/hooks";
import classes from "../../assets/FormCard.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { updatePlant } from "../../store/plantsSlice";

interface Props {
  id: string;
  closeModalUpdate: () => void;
  updateModalIsOpen: boolean;
}

interface PlantUpdate {
  name: string;
  species: string;
  watering_interval: number;
  sun_exposure: number;
  temperature: number;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ModalWindowUpdate = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlantUpdate>();

  const submitHandler: SubmitHandler<PlantUpdate> = async (body) => {
    const path = `/plants/${props.id}/`;
    await dispatch(updatePlant(path, props.id, body));
    props.closeModalUpdate();
  };

  return (
    <Modal
      isOpen={props.updateModalIsOpen}
      onRequestClose={props.closeModalUpdate}
      style={customStyles}
      contentLabel="delete plant modal"
    >
      <section className={classes.form}>
        <h1>Update plant</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={classes.control}>
            <label>
              Name
              <input type="text" {...register("name", { required: true, maxLength: 50 })} />
              {errors.name?.type === "required" && <p role="alert">Name is required</p>}
              {errors.name?.type === "maxLength" && <p role="alert">Max length is 50 characters</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Species
              <input type="text" {...register("species", { required: true, maxLength: 50 })} />
              {errors.species?.type === "required" && <p role="alert">Species is required</p>}
              {errors.species?.type === "maxLength" && <p role="alert">Max length is 50 characters</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Watering interval{" "}
              <input type="number" {...register("watering_interval", { required: true, min: 1, max: 2147483647 })} />
              {errors.watering_interval?.type === "required" && <p role="alert">Watering interval is required</p>}
              {errors.watering_interval?.type === "min" && <p role="alert">Min = 1 </p>}
              {errors.watering_interval?.type === "max" && <p role="alert">Max = 2147483647</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Sun exposure
              <input type="number" {...register("sun_exposure", { required: true, min: 1, max: 24 })} />
              {errors.sun_exposure?.type === "required" && <p role="alert">Sun exposure is required</p>}
              {errors.sun_exposure?.type === "min" && <p role="alert">Min = 1 </p>}
              {errors.sun_exposure?.type === "max" && <p role="alert">Max = 24</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Temperature
              <input type="number" {...register("temperature", { required: true, min: -100, max: 100 })} />
              {errors.temperature?.type === "required" && <p role="alert">Temperature is required</p>}
              {errors.temperature?.type === "min" && <p role="alert">Min = -100 </p>}
              {errors.temperature?.type === "max" && <p role="alert">Max = 100</p>}
            </label>
          </div>

          <div className={classes.actions}>
            <button type="submit">Update plant with id={props.id}</button>
            <button type="button" onClick={props.closeModalUpdate}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};
