import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { DataStore } from "@aws-amplify/datastore";
import { Dumpster } from "../models";
import { useState, useEffect } from "react";
import { getDumpsterColor } from "../models/dumpster";
import { useHistory } from "react-router-dom";
import { EventClickArg } from "@fullcalendar/common";

export const Calendar = () => {
  const [dumpsters, setDumpsters] = useState<Dumpster[]>([]);
  const history = useHistory();

  useEffect(() => {
    DataStore.query(Dumpster).then((d) => setDumpsters(d));
  }, []);

  const eventClick = (arg: EventClickArg) => {
    arg.jsEvent.preventDefault();
    history.push(arg.event.url);
  };

  const dateClick = (arg: DateClickArg) => {
    if (arg.view.type === "dayGridMonth") {
      arg.view.calendar.changeView("timeGridDay", arg.dateStr);
    }
  };

  const dropped = dumpsters
    ?.filter((d) => d.dateDropOff && !d.datePickedUp)
    .map((d) => ({
      title: d.location,
      date: d.dateDropOff,
      url: `/Dumpsters/${d.id}/show`,
      color: getDumpsterColor(d).backgroundColor,
    }));

  const picked = dumpsters
    ?.filter((d) => d.dateDropOff && d.datePickedUp)
    .map((d) => ({
      title: d.location,
      date: d.datePickedUp,
      url: `/Dumpsters/${d.id}/show`,
      color: getDumpsterColor(d).backgroundColor,
    }));

  return (
    <Card>
      <Title title="Calendar" />
      <CardContent>
        <FullCalendar
          height={"90vh"}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridDay,timeGridWeek,timeGridDay",
          }}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          eventClick={eventClick}
          dateClick={dateClick}
          events={[...dropped, ...picked]}
        />
      </CardContent>
    </Card>
  );
};
