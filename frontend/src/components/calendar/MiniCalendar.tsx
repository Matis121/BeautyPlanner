import { Calendar } from "@/components/ui/calendar";
import { useContext } from "react";
import { SmallCalendarContext } from "@/Contexts/SmallCalendarContext";

const MiniCalendar = (props: any) => {
  const { toggleSmallCalendar }: any = useContext(SmallCalendarContext);

  // CHECK WIDTH
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      className={`${isMobile ? "absolute z-20 top-32" : "mt-[60px]"} ${
        toggleSmallCalendar ? "flex flex-col" : "hidden"
      }`}
    >
      <Calendar
        mode="single"
        selected={props.date}
        onSelect={props.setDate}
        className="border bg-white shadow-md"
      />
    </div>
  );
};

export default MiniCalendar;
