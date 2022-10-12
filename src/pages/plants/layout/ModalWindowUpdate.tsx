import Modal from "react-modal";
import classes from "../../assets/FormCard.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks";
import { updatePlant } from "../store/plantsSlice";

interface Props {
  updateModal: {
    plantId: string;
    plantName?: string;
    isOpen: boolean;
  };
  closeModalUpdate: () => void;
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
    await dispatch(updatePlant(props.updateModal.plantId, body));
    props.closeModalUpdate();
  };

  return (
    <Modal isOpen={props.updateModal.isOpen} onRequestClose={props.closeModalUpdate} style={customStyles} contentLabel="delete plant modal">
      <section className={classes.form}>
        <h1>Update plant</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className={classes.control}>
            <label>
              Name
              <input type="text" {...register("name", { required: true, maxLength: 50 })} />
              {errors.name?.type === "maxLength" && <p role="alert">The longest string can have 50 characters</p>}
              {errors.name?.type === "required" && <p role="alert">Please, write name.</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Species
              <input type="text" {...register("species", { required: true, maxLength: 50 })} />
              {errors.species?.type === "maxLength" && <p role="alert">The longest string can have 50 characters</p>}
              {errors.species?.type === "required" && <p role="alert">Please, write species.</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Watering interval <input type="number" {...register("watering_interval", { required: true, min: 1 })} />
              {errors.watering_interval?.type === "min" && <p role="alert">The smallest number could be 1</p>}
              {errors.watering_interval?.type === "required" && <p role="alert">Please, write watering interval.</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Sun exposure
              <input type="number" {...register("sun_exposure", { required: true, min: 1, max: 24 })} />
              {errors.sun_exposure?.type === "min" && <p role="alert">The smallest number could be 1</p>}
              {errors.sun_exposure?.type === "max" && <p role="alert">The biggest number could be 24</p>}
              {errors.sun_exposure?.type === "required" && <p role="alert">Please, write sun exposure.</p>}
            </label>
          </div>
          <div className={classes.control}>
            <label>
              Temperature
              <input type="number" {...register("temperature", { required: true, min: -100, max: 100 })} />
              {errors.temperature?.type === "min" && <p role="alert">The smallest number could be -100 </p>}
              {errors.temperature?.type === "max" && <p role="alert">The biggest number could be 100</p>}
              {errors.temperature?.type === "required" && <p role="alert">Please, write temperature.</p>}
            </label>
          </div>

          <div className={classes.actions}>
            <button type="submit">Update plant {props.updateModal.plantName ? `with name=${props.updateModal.plantName}` : ""}</button>
            <button type="button" onClick={props.closeModalUpdate}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};
