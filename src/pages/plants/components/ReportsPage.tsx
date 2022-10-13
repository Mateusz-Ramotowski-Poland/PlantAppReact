import dayjs from "dayjs";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { api, showMessage } from "../../../shared";
import { paths } from "../api";
import { MainNavigation } from "../layout/MainNavigation";
import classes from "./ReportsPage.module.css";

interface Response {
  task_id: string;
  ws: string;
}

interface Report {
  data: {
    created_at: string;
    id: string;
    data: {
      totals: {
        species: object;
        waterings: string;
      };
      averages: {
        sun_exposure: string;
        watering_interval: string;
        temperature: string;
      };
      records: {
        most_watered_plant: string;
      };
    };
  };
}

export const ReportsPage = () => {
  const [report, setReport] = useState<Report>();

  function getReportHandler() {
    return api.get<Response>(paths.getWebsocketUrl).then((data) => {
      const socket = new WebSocket(data.ws);
      socket.addEventListener("open", (event) => {
        console.log("Connection opened", event);
      });
      socket.addEventListener("error", (event) => {
        console.log("Error", event);
        showMessage("Error - can't get new report", "error");
      });
      socket.addEventListener("close", (event) => {
        console.log("Closed connection", event);
        if (event.code === 1011) {
          showMessage("Server error - can't get new report", "error");
        }
      });
      socket.addEventListener("message", (event) => {
        setReport(JSON.parse(event.data));
        socket.close();
      });
    });
  }

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

  const created = dayjs(report.data.created_at).format("YYYY-MM-DD HH:mm");
  const apiSpecies = report.data.data.totals.species;
  const species = [];
  for (const property in apiSpecies) {
    species.push(
      <p key={property}>
        {property}: {apiSpecies[property as keyof typeof apiSpecies]}
      </p>
    );
  }

  const reportTemplate = (
    <section className={classes.report}>
      <h1>New report</h1>
      <p>Id: {report.data.id}</p>
      <p>Created at: {created}</p>

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
