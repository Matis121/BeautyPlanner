import { useEffect, useState } from "react";
import AddNewEventToCalendar from "../components/calendar/AddNewEventToCalendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import BasicLayout from "@/layout/BasicLayout";
import "../myCalendarStyles.css"; // Import your custom styles
import { useQuery } from "react-query";

import ViewClientEvent from "@/components/calendar/ViewClientEvent";
import { LuClock8 } from "react-icons/lu";
import { LuUser } from "react-icons/lu";

import { getHours, getEvents, getClients } from "../api/User";

const Calendar = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // USE STATE
  const [clickedEventId, setClickedEventId] = useState("");
  const [eventClientId, setEventClientId] = useState("");
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

  // FETCHING CLIENTS
  const { data: clientsData } = useQuery(["clients"], () =>
    getClients(userData)
  );

  // CUSTOM EVENT CONTENT
  const eventContent = arg => {
    let bgEventColor;

    if (arg.event.extendedProps.freeTime === true) {
      bgEventColor = "bg-purple-400";
    }

    if (arg.event.extendedProps.eventStatus) {
      if (arg.event.extendedProps.eventStatus === "created") {
        bgEventColor = "bg-blue-200";
      }
      if (arg.event.extendedProps.eventStatus === "finalized") {
        bgEventColor = "bg-green-200";
      }
      if (arg.event.extendedProps.eventStatus === "canceled") {
        bgEventColor = "bg-red-300";
      }
    }

    return (
      <div
        className={`overflow-hidden h-full ${bgEventColor} border-none flex flex-col gap-1 text-black`}
      >
        <div className="bg-white flex items-center justify-between opacity-90 gap-2 px-1">
          <div className="flex items-center gap-2">
            <LuClock8 />
            {arg.timeText}
          </div>
          {arg.event.extendedProps.newClient === true ? (
            <span className=" text-red-600 font-semibold">Pierwsza wizyta</span>
          ) : null}
        </div>
        <div className="px-1 flex flex-col gap-1">
          <strong className="flex items-center gap-1">
            <LuUser size={16} />
            {arg.event.title}
          </strong>
          {arg.event.extendedProps.serviceName ? (
            <p className="p-1 bg-blue-800 w-full text-white rounded-md flex items-center">
              {arg.event.extendedProps.serviceName}
            </p>
          ) : null}
          {arg.event.extendedProps.description ? (
            <div className="p-1  bg-red-200 w-full text-black rounded-md flex flex-col border-red-500">
              <span className="text-xs font-semibold">Notatka</span>
              <i>{arg.event.extendedProps.description}</i>
            </div>
          ) : null}
        </div>
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
        eventClientId={eventClientId}
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
        nowIndicator={true}
        // editable={true}
        select={function (start) {
          setStartTimeEvent(start.startStr);
          setOpenNewEvent(true);
        }}
        eventClick={function (info) {
          setEventClientId(info.event.extendedProps.clientId);
          setClickedEventId(info.event._def.publicId);
          setOpenViewClientEvent(true);
        }}
      />
    </BasicLayout>
  );
};

export default Calendar;
