import BasicLayout from "@/layout/BasicLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useBusinessHourStore } from "../stores/store";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const hours = useBusinessHourStore(state => state.hours);
  const replaceCurrentHours = useBusinessHourStore(state => state.replaceHours);

  const [newValues, setNewValues] = useState(hours);

  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Godziny pracy zostały zaktualizowane.",
    });
  };

  const handleInputChange = (e, idx, field) => {
    const updatedHours = [...newValues]; // Tworzenie kopii stanu
    if (field === "active") {
      if (updatedHours[idx][field] === true) {
        updatedHours[idx][field] = false;
      } else {
        updatedHours[idx][field] = true;
      }
    } else {
      updatedHours[idx][field] = e.target.value;
    }
    // Uaktualnienie stanu
    setNewValues(updatedHours);
  };

  const handleNewHours = () => {
    replaceCurrentHours(newValues);
    toastEvent();
  };

  return (
    <BasicLayout>
      <section className="bg-neutral-100 w-full h-full">
        <div className="m-4 p-6 bg-white w-full rounded-xl">
          <div className="flex flex-col items-center justify-center">
            <h1 className="m-4 text-xl font-bold">Zmień godziny pracy</h1>
            {hours.map((day, idx) => (
              <div className="grid grid-cols-4 items-center" key={idx}>
                <h2 className="mr-4  text-right">{day.dayName}</h2>
                <div className="text-center">
                  <Checkbox
                    checked={day.active ? true : false}
                    onClick={e => handleInputChange(e, idx, "active")}
                  />
                </div>
                <div className="flex items-center m-4">
                  <span className="mr-2">Od</span>
                  <Input
                    className="w-[80px] text-xl"
                    placeholder="10:00"
                    value={day.startTime}
                    onChange={e => handleInputChange(e, idx, "startTime")}
                  ></Input>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Do</span>
                  <Input
                    className="w-[80px] text-xl"
                    placeholder="18:00"
                    value={day.endTime}
                    onChange={e => handleInputChange(e, idx, "endTime")}
                  ></Input>
                </div>
              </div>
            ))}
            <Button onClick={handleNewHours}>Zapisz</Button>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
};

export default Home;
