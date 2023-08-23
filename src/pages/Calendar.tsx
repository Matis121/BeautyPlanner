import { useState } from "react";
import AddNewEventToCalendar from "../components/AddNewEventToCalendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import BasicLayout from "@/layout/BasicLayout";
import "../myCalendarStyles.css"; // Import your custom styles

function renderEventContent(eventInfo) {
  return (
    <>
      <strong>{eventInfo.timeText}</strong>
      <p>{eventInfo.event.title}</p>
      {eventInfo.event.extendedProps.description && (
        <p>{eventInfo.event.extendedProps.description}</p>
      )}
    </>
  );
}

const Calendar = () => {
  const events = [
    {
      id: 1,
      title: "Our first client",
      start: "2023-07-22T08:00:00",
      end: "2023-07-22T10:00:00",
      description: "This is the description for Event 1.",
    },
    {
      id: 2,
      title: "Our first client",
      start: "2023-07-22T11:00:00",
      end: "2023-07-22T12:00:00",
    },
  ];

  const [showAddNewEvent, setShowAddNewEvent] = useState(false);
  const [allEvents, setAllEvents] = useState(events);
  const [newEvent, setNewEvent] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    description: "",
  });

  const handleAddEvents = () => {
    setAllEvents([...allEvents, newEvent]);
  };

  const eventContent = arg => {
    return (
      <div className="overflow-hidden h-full">
        {arg.timeText}
        <br></br>
        <strong>{arg.event.title}</strong>
        <br></br>
        <i>{arg.event.extendedProps.description}</i>
      </div>
    );
  };

  const handleEventDrop = eventDropInfo => {
    const updatedEvents = allEvents.map(event => {
      if (event.id == eventDropInfo.event.id) {
        return {
          ...event,
          start: eventDropInfo.event.start,
          end: eventDropInfo.event.end,
        };
      }
      return event;
    });
    setAllEvents(updatedEvents);
  };
  console.log(allEvents);

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
          // titleFormat={{
          //   year: "numeric",
          //   month: "long",
          //   day: "numeric",
          //   weekday: "long",
          // }}
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
          events={allEvents}
          eventContent={eventContent}
          selectable={true}
          editable={true}
          eventDrop={handleEventDrop}
          select={function (start) {
            console.log("selection");
            setNewEvent({
              ...newEvent,
              start: start.startStr,
              end: start.endStr,
              id: allEvents.length + 1,
            });
            setShowAddNewEvent(true);
          }}
        />
      </div>
    </BasicLayout>
  );
};

export default Calendar;
