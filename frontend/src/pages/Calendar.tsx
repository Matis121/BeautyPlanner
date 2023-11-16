import { useState } from "react";
import AddNewEventToCalendar from "../components/calendar/AddNewEventToCalendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import BasicLayout from "@/layout/BasicLayout";
import "../myCalendarStyles.css"; // Import your custom styles
import { useQuery } from "react-query";

import ViewClientEvent from "@/components/calendar/ViewClientEvent";

import { getHours, getEvents } from "../api/User";

const Calendar = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // USE STATE
  const [clickedEventId, setClickedEventId] = useState("");
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [openViewClientEvent, setOpenViewClientEvent] = useState(false);
  const [businessHours, setBusinessHours] = useState();

  // VALUES TO CREATE NEW EVENT
  const [startTimeEvent, setStartTimeEvent] = useState("");

  // FETCHING HOURS
  const { data: hoursData } = useQuery(["hours"], () => getHours(userData), {
    onSuccess: data => {
      const activeHours = data
        .filter(hour => hour.active === true)
        .map(hour => ({
          daysOfWeek: hour.dayOfWeek,
          startTime: hour.startTime,
          endTime: hour.endTime,
        }));
      setBusinessHours(activeHours);
    },
  });

  // FETCHING EVENTS
  const { data: eventsData } = useQuery(["events"], () => getEvents(userData));

  // CUSTOM EVENT CONTENT
  const eventContent = arg => {
    let bgEventColor;

    if (arg.event.extendedProps.freeTime === false) {
      bgEventColor = "bg-black";
    } else {
      bgEventColor = "bg-red-400";
    }

    if (arg.event.extendedProps.status) {
      switch (arg.event.extendedProps.status) {
        case "confirmed":
          bgEventColor = "";
        case "done":
          bgEventColor = "";
        case "canceled":
          bgEventColor = "";
        default:
          bgEventColor = "";
      }
    }

    return (
      <div className={`overflow-hidden h-full ${bgEventColor} border-none`}>
        {arg.timeText}
        <br></br>
        <strong>{arg.event.title}</strong>
        <br></br>
        <i>{arg.event.extendedProps.description}</i>
      </div>
    );
  };
  return (
    <BasicLayout>
      <AddNewEventToCalendar
        setOpenNewEvent={setOpenNewEvent}
        openNewEvent={openNewEvent}
        startTimeEvent={startTimeEvent}
      />
      <ViewClientEvent
        openViewClientEvent={openViewClientEvent}
        setOpenViewClientEvent={setOpenViewClientEvent}
        clickedEventId={clickedEventId}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        locale={"pl-PL"}
        allDaySlot={false}
        buttonText={{
          today: "dzisiaj",
          month: "miesiąc",
          week: "tydzień",
          day: "dzień",
        }}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        views={{
          dayGrid: {
            titleFormat: {
              month: "long",
              day: "2-digit",
            },
          },
          timeGridWeek: {
            titleFormat: {
              month: "long",
              day: "2-digit",
            },
          },
          timeGridDay: {
            titleFormat: {
              month: "long",
              day: "2-digit",
              weekday: "long",
            },
          },
        }}
        firstDay={1}
        businessHours={businessHours}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: false,
          hour12: false,
        }}
        slotLabelInterval="01:00"
        slotDuration="00:15:00"
        height={"90vh"}
        events={eventsData}
        eventContent={eventContent}
        selectable={true}
        // editable={true}
        select={function (start) {
          setStartTimeEvent(start.startStr);
          setOpenNewEvent(true);
        }}
        eventClick={function (info) {
          setClickedEventId(info.event._def.publicId);
          setOpenViewClientEvent(true);
        }}
      />
    </BasicLayout>
  );
};

export default Calendar;
