import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import { showMessage } from "../../../shared";
import { useReport } from "../hooks";
import { MainNavigation } from "../layout/MainNavigation";
import classes from "./ReportsPage.module.css";

export const ReportsPage = () => {
  const { report, getReportHandler } = useReport();

  const header = (
    <>
      <MainNavigation />
      <div className={classes.header}>
        <h1>Reports</h1>
        <button type="button" onClick={getReportHandler} className={classes.button}>
          Get new report
        </button>
      </div>
      <ToastContainer />
    </>
  );

  if (!report) return header;

  const apiSpecies = report.data.data.totals.species;
  const species = Object.entries(apiSpecies).map((el) => {
    return (
      <p key={el[0]}>
        {el[0]}: {el[1]}
      </p>
    );
  });
  try {
    report.data.created_at = dayjs(report.data.created_at).format("YYYY-MM-DD HH:mm");
  } catch (error) {
    showMessage("Error: new report creation data cannot be shown in required format", "error");
  }

  const reportTemplate = (
    <section className={classes.report}>
      <h1>New report</h1>
      <p>Id: {report.data.id}</p>
      <p>Created at: {report.data.created_at}</p>

      <h2>Averages</h2>
      <p>Sun exposure: {report.data.data.averages.sun_exposure}</p>
      <p>Temperature: {report.data.data.averages.temperature}</p>
      <p>Watering interval: {report.data.data.averages.watering_interval}</p>

      <h2>Records</h2>
      <p>Most watered plant: {report.data.data.records.most_watered_plant}</p>

      <h2>Totals</h2>
      <p>Waterings: {report.data.data.totals.waterings}</p>

      <h2>Species</h2>
      {species}
    </section>
  );

  return (
    <>
      {header}
      {report && reportTemplate}
    </>
  );
};
