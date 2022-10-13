import { useState } from "react";
import { api } from "../../../shared";
import { paths } from "../api";
import { MainNavigation } from "../layout/MainNavigation";
import classes from "./ReportsPage.module.css";

interface Response {
  task_id: string;
  ws: string;
}

export const ReportsPage = () => {
  const [report, setReport] = useState<any>();
  console.log(report);
  function getUrlHandler() {
    return api.get<Response>(paths.getWebsocketNewReport).then((data) => {
      console.log(data);

      const socket = new WebSocket(data.ws);

      socket.addEventListener("open", (event) => {
        socket.send(JSON.stringify("Hello Server!"));
      });

      socket.addEventListener("message", (event) => {
        setReport(JSON.parse(event.data));
        console.log("Message from server ", event.data);
        socket.close();
      });
      socket.addEventListener("error", (event) => {
        console.log("Error", event);
      });
      socket.addEventListener("close", (event) => {
        console.log("Closed connection", event);
      });
    });
  }

  api.get<Response>(paths.getPlantsReports).then((data) => console.log(data));

  if (!report) {
    return (
      <>
        <MainNavigation />
        <div className={classes.header}>
          <h1>Reports</h1>
          <button type="button" onClick={getUrlHandler} className={classes.button}>
            Get new report
          </button>
        </div>
      </>
    );
  }

  const reportTemplate = (
    <section className={classes.report}>
      <h1>New report</h1>

      <p>Type: {report.type}</p>
      <p>Task: {report.task}</p>
      <p>Id: {report.data.id}</p>
      <p>Created at: {report.data.created_at}</p>
      <p>task_id: {report.data.task_id}</p>
      <h2>Data: </h2>
      <h3></h3>
      <p></p>
      <p></p>
      <p></p>
      {/*  <div className={classes.control}>
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
        </div> */}
    </section>
  );

  return (
    <>
      <MainNavigation />
      <div className={classes.header}>
        <h1>Reports Page</h1>
        <button type="button" onClick={getUrlHandler} className={classes.button}>
          get URL for websocket
        </button>
      </div>
      {report && reportTemplate}
    </>
  );
};
