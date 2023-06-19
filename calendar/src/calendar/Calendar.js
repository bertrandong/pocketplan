import React, { useState, useRef, useEffect } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

const Calendar = () => {
  const calendarRef = useRef();
  const [calendarConfig, setCalendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt(
        "Create a new event:",
        "Event 1"
      );
      dp.clearSelection();
      if (!modal.result) {
        return;
      }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
      });
    },
    eventDeleteHandling: "Update",
    onEventClick: async (args) => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt(
        "Update event text:",
        args.e.text()
      );
      if (!modal.result) {
        return;
      }
      const e = args.e;
      e.data.text = modal.result;
      dp.events.update(e);
    },
  });

  useEffect(() => {
    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2023-06-20T10:30:00",
        end: "2023-06-20T13:00:00",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2023-06-21T09:30:00",
        end: "2023-06-21T11:30:00",
        backColor: "#6aa84f",
      },
      {
        id: 3,
        text: "Event 3",
        start: "2023-06-21T12:00:00",
        end: "2023-06-21T15:00:00",
        backColor: "#f1c232",
      },
      {
        id: 4,
        text: "Event 4",
        start: "2023-06-19T11:30:00",
        end: "2023-06-19T14:30:00",
        backColor: "#cc4125",
      },
    ];

    const startDate = "2023-06-20";

    calendarRef.current.control.update({ startDate, events });
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          startDate={"2023-06-20"}
          selectionDay={"2023-06-20"}
          onTimeRangeSelected={(args) => {
            calendarRef.current.control.update({
              startDate: args.day,
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
      </div>
    </div>
  );
};

export default Calendar;
