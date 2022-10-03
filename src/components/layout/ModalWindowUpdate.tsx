import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import classes from "../../assets/FormCard.module.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  id: string;
  closeModalUpdate: () => void;
  updateModalIsOpen: boolean;
}

interface Inputs {
  name: string;
  species: string;
  wateringInterval: number;
  sunExposure: number;
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
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = (data) => console.log(data);

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
              <input type="number" {...register("wateringInterval", { required: true, min: 1, max: 2147483647 })} />
              {errors.wateringInterval?.type === "required" && <p role="alert">Watering interval is required</p>}
              {errors.wateringInterval?.type === "min" && <p role="alert">Min = 1 </p>}
              {errors.wateringInterval?.type === "max" && <p role="alert">Max = 2147483647</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Sun exposure
              <input type="number" {...register("sunExposure", { required: true, min: 1, max: 24 })} />
              {errors.sunExposure?.type === "required" && <p role="alert">Sun exposure is required</p>}
              {errors.sunExposure?.type === "min" && <p role="alert">Min = 1 </p>}
              {errors.sunExposure?.type === "max" && <p role="alert">Max = 24</p>}
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
        <ToastContainer />
      </section>
    </Modal>
  );
};
