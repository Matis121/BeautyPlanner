import { useState } from "react";
import AddNewEventToCalendar from "../components/calendar/AddNewEventToCalendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import BasicLayout from "@/layout/BasicLayout";
import "../myCalendarStyles.css"; // Import your custom styles

import { useEventStore } from "../stores/store";
import { useBusinessHourStore } from "../stores/store";
import ViewClientEvent from "@/components/calendar/ViewClientEvent";

const Calendar = () => {
  const removeEvent = useEventStore(state => state.removeEvent);
  const editEvent = useEventStore(state => state.editEvent);
  const addEvent = useEventStore(state => state.addEvent);
  const events = useEventStore(state => state.events);

  const [clickedEventId, setClickedEventId] = useState("");
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [openViewClientEvent, setOpenViewClientEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({});

  const handleAddEvents = () => {
    addEvent(newEvent);
  };

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

  const hours = useBusinessHourStore(state => state.hours);
  const businessHours = hours
    .filter(hour => hour.active === true)
    .map(hour => ({
      daysOfWeek: hour.dayOfWeek,
      startTime: hour.startTime,
      endTime: hour.endTime,
    }));

  return (
    <BasicLayout>
      <div className="p-4">
        <AddNewEventToCalendar
          setOpenNewEvent={setOpenNewEvent}
          openNewEvent={openNewEvent}
          setNewEvent={setNewEvent}
          newEvent={newEvent}
          handleAddEvents={handleAddEvents}
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
          height={"97vh"}
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
            setOpenNewEvent(true);
          }}
          eventClick={function (info) {
            setClickedEventId(info.event._def.publicId);
            setOpenViewClientEvent(true);
          }}
        />
      </div>
    </BasicLayout>
  );
};

export default Calendar;
