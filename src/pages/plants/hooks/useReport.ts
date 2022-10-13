import { useState } from "react";
import { api, showMessage } from "../../../shared";
import { paths } from "../api";

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

interface EventData {
  data: string;
}

interface Response {
  task_id: string;
  ws: string;
}

export function useReport() {
  const [report, setReport] = useState<Report>();

  function isEventData(data: any) {
    return (data as EventData).data !== undefined;
  }

  const openWebSocketHandler = (event: Event) => console.log("Connection opened", event);

  const closeWebSocketHandler = (event: CloseEvent) => {
    console.log("Closed connection", event);
    if (event.code === 1011) {
      showMessage("Server error - can't get new report", "error");
    }
  };

  const errorWebSocketHandler = (event: Event) => {
    console.log("Error", event);
    showMessage("Error - can't get new report", "error");
  };

  const mesageWebSocketHandler = (socket: WebSocket, event: MessageEvent) => {
    if (isEventData(event)) {
      setReport(JSON.parse(event.data));
    } else {
      showMessage("Error - can't get new report", "error");
    }
    socket.close();
  };

  function getReportHandler() {
    return api.get<Response>(paths.getWebsocketUrl).then((data) => {
      const socket = new WebSocket(data.ws);
      socket.addEventListener("open", openWebSocketHandler);
      socket.addEventListener("error", errorWebSocketHandler);
      socket.addEventListener("close", closeWebSocketHandler);
      socket.addEventListener("message", mesageWebSocketHandler.bind(null, socket));
    });
  }

  return { report, getReportHandler };
}
