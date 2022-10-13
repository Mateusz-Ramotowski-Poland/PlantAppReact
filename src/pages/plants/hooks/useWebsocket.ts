import { useState } from "react";
import { showMessage } from "../../../shared";

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

export function useWebsocket() {
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
    socket.removeEventListener("open", openWebSocketHandler);
    socket.removeEventListener("error", errorWebSocketHandler);
    socket.removeEventListener("close", closeWebSocketHandler);
    socket.removeEventListener("message", mesageWebSocketHandler.bind(null, socket));
  };

  return { report, openWebSocketHandler, closeWebSocketHandler, errorWebSocketHandler, mesageWebSocketHandler };
}
