import { useEffect, useState } from "react";
import AddNewEventToCalendar from "../components/calendar/AddNewEventToCalendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import BasicLayout from "@/layout/BasicLayout";
import "../myCalendarStyles.css"; // Import your custom styles

import { useEventStore } from "../stores/store";

const Calendar = () => {
  // const events = [];

  const removeEvent = useEventStore(state => state.removeEvent);
  const editEvent = useEventStore(state => state.editEvent);
  const addEvent = useEventStore(state => state.addEvent);
  const events = useEventStore(state => state.events);

  const oneEvent = {
    id: 1,
    title: "Our first client",
    start: "2023-07-22T08:00:00",
    end: "2023-07-22T10:00:00",
    description: "This is the description for Event 1.",
    freeTime: true,
  };

  const [showAddNewEvent, setShowAddNewEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    // id: "",
    // title: "",
    // start: "",
    // end: "",
    // description: "",
    // freeTime: "",
    // status: "",
  });

  const handleAddEvents = () => {
    console.log(newEvent);
    addEvent(newEvent);
  };

  console.log(events);

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

  const handleEventDrop = eventDropInfo => {
    const updatedEvents = events.map(event => {
      if (event.id == eventDropInfo.event.id) {
        const newEventValues = {
          start: eventDropInfo.event.start,
          end: eventDropInfo.event.end,
        };
        editEvent(event.id, newEventValues);
      }
    });
    updatedEvents();
  };

  return (
    <BasicLayout>
      <div className="p-4">
        <AddNewEventToCalendar
          setShowAddNewEvent={setShowAddNewEvent}
          showAddNewEvent={showAddNewEvent}
          setNewEvent={setNewEvent}
          newEvent={newEvent}
          handleAddEvents={handleAddEvents}
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
                year: "numeric",
                month: "long",
                day: "2-digit",
              },
            },
            timeGridWeek: {
              titleFormat: {
                year: "numeric",
                month: "long",
                day: "2-digit",
              },
            },
            timeGridDay: {
              titleFormat: {
                year: "numeric",
                month: "long",
                day: "2-digit",
                weekday: "long",
              },
            },
          }}
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
            meridiem: false,
            hour12: false,
          }}
          slotLabelInterval="01:00"
          slotDuration="00:15:00"
          height={"91vh"}
          events={events}
          eventContent={eventContent}
          selectable={true}
          editable={true}
          eventDrop={handleEventDrop}
          select={function (start) {
            setNewEvent({
              ...newEvent,
              start: start.startStr,
              end: start.endStr,
              id: crypto.randomUUID(),
            });
            setShowAddNewEvent(true);
          }}
          eventClick={function (info) {
            removeEvent(info.event._def.publicId);
            console.log(events);
          }}
        />
      </div>
    </BasicLayout>
  );
};

export default Calendar;
