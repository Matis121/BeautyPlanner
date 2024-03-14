import BasicLayout from "@/layout/BasicLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { editActiveHours, getHours } from "../api/User";
import { useQuery } from "react-query";

const WorkHours = () => {
  // USER DATA
  const userToken: string | null = localStorage.getItem("user") ?? "";
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data } = useQuery(["hours"], () => getHours(userData));

  const [newValues, setNewValues] = useState([]);

  useEffect(() => {
    setNewValues(data);
  }, [data]);

  // TOAST
  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Godziny pracy zostały zaktualizowane.",
    });
  };

  const handleInputChange = (e: any, idx: number, field: any) => {
    const updatedHours: any = [...newValues]; // Tworzenie kopii stanu
    if (field === "active") {
      if (updatedHours[idx][field] === true) {
        updatedHours[idx][field] = false;
      } else {
        updatedHours[idx][field] = true;
      }
    } else {
      updatedHours[idx][field] = e.target.value;
    }
    setNewValues(updatedHours);
  };

  const handleNewHours = async () => {
    if (!newValues) {
      return;
    }
    await editActiveHours(userData, newValues);
    toastEvent();
  };
  return (
    <BasicLayout>
      <section className="flex flex-col w-full h-full gap-6">
        <div className="px-1 flex items-center">
          <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
            Godziny pracy
          </span>
        </div>
        <div className="overflow-y-auto shadow-md rounded-md bg-white h-max flex justify-center">
          <div className="flex flex-col max-w-sm p-5 gap-6 items-center">
            {data
              ? data.map((day: any, idx: number) => (
                  <div
                    className="grid grid-cols-[1fr,50px,1fr] gap-4"
                    key={idx}
                  >
                    <h2 className="flex items-center text-lg">{day.dayName}</h2>
                    <div className="flex items-center">
                      <Checkbox
                        checked={day.active ? true : false}
                        onClick={e => handleInputChange(e, idx, "active")}
                      />
                    </div>
                    <div className="flex items-center">
                      <Input
                        className="w-[50px] text-md p-1 placeholder:opacity-50 placeholder:font-normal"
                        placeholder="10:00"
                        value={day.startTime}
                        onChange={e => handleInputChange(e, idx, "startTime")}
                      ></Input>
                      <span className="mx-3">-</span>
                      <Input
                        className="w-[50px] text-md p-1 placeholder:opacity-50 placeholder:font-normal"
                        placeholder="18:00"
                        value={day.endTime}
                        onChange={e => handleInputChange(e, idx, "endTime")}
                      ></Input>
                    </div>
                  </div>
                ))
              : null}
            <Button onClick={handleNewHours} className="mt-4 w-fit px-16">
              Zapisz
            </Button>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
};

export default WorkHours;
