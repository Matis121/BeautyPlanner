import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useContext } from "react";
import { SmallCalendarContext } from "@/Contexts/SmallCalendarContext";

const MiniCalendar = () => {
  const [date, setDate] = useState("");
  const { toggleSmallCalendar } = useContext(SmallCalendarContext);

  return (
    <div
      className={` mt-[60px] ${
        toggleSmallCalendar ? "flex flex-col" : "hidden"
      }`}
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="border bg-white shadow-md"
      />
    </div>
  );
};

export default MiniCalendar;
