import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addEvent } from "../../api/User";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import ClientForm from "../client/ClientForm";

import { getClients, getUserServices } from "../../api/User";
import { useQuery, useQueryClient, useMutation } from "react-query";

const AddNewEventToCalendar = props => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // EVENT VALUES
  const [selectClient, setSelectClient] = useState("");
  const [selectService, setSelectService] = useState("");
  const [freeTime, setFreeTime] = useState(false);

  // VARIABLES FOR END TIME EVENT
  const startTimeStr = new Date(props.startTimeEvent);

  // VARIABLES FOR EVENT START AND END TIME
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");

  // VALIDATION ERROR STATES
  const [clientError, setClientError] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [timeError, setTimeError] = useState({ start: false, end: false });

  // HANDLERS
  const handleEventTime = duration => {
    const date = new Date(startTimeStr);
    function addMinutes(date, minutes) {
      const newDate = new Date(date.getTime());

      // Calculate hours and remaining minutes
      const hoursToAdd = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      // Adjust hours
      newDate.setHours(newDate.getHours() + hoursToAdd);

      // Adjust minutes
      newDate.setMinutes(newDate.getMinutes() + remainingMinutes);

      return newDate;
    }
    const endTime = addMinutes(date, duration);

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    };
    const formattedStartTime = startTimeStr.toLocaleTimeString(
      "pl-pl",
      options
    );
    const formattedEndTime = endTime.toLocaleTimeString("pl-pl", options);
    setEventStartTime(formattedStartTime);
    setEventEndTime(formattedEndTime);
  };

  // FETCH DATA
  const { data: clientsData } = useQuery(["clients"], () =>
    getClients(userData)
  );
  const { data: servicesData } = useQuery(["services"], () =>
    getUserServices(userData)
  );

  // TOAST
  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Wizyta została dodana do kalendarza.",
    });
  };

  // RESET FUNCTION
  const resetValues = value => {
    if (value !== "without-free") {
      setFreeTime(false);
    }
    setSelectClient("");
    setSelectService("");
    setEventStartTime("");
    setEventEndTime("");
    setClientError(false);
    setServiceError(false);
    setTimeError(prev => ({ ...prev, start: false, end: false }));
  };

  // MUTATION
  const addNewEventMutation = useMutation(eventStructure =>
    addEvent(userData, eventStructure)
  );

  // MAIN ADD NEW EVENT FUNCTION
  const newHandleAddEvents = async () => {
    let eventStructure;

    //VALIDATION FUNCTIONS
    if (freeTime === false && (selectClient === "" || selectService === "")) {
      if (selectClient === "") {
        setClientError(true);
      }
      if (selectService === "") {
        setServiceError(true);
      }
      return;
    }
    if (freeTime === true && (eventStartTime === "" || eventEndTime === "")) {
      if (eventStartTime === "") {
        setTimeError(prev => ({ ...prev, start: true }));
      }
      if (eventEndTime === "") {
        setTimeError(prev => ({ ...prev, end: true }));
      }
      return;
    }

    // CREATE TIME AND DATE
    const startDateStr = new Date(startTimeStr);
    const endDateStr = new Date(startTimeStr);
    function createFinalDate(selectDate, timeValue) {
      const [hours, minutes] = timeValue.split(":").map(Number);
      selectDate.setHours(hours);
      selectDate.setMinutes(minutes);
      console.log(selectDate);
    }

    createFinalDate(startDateStr, eventStartTime);
    createFinalDate(endDateStr, eventEndTime);

    // CREATING FINAL STRUCTURE FOR REQUEST
    if (freeTime === true) {
      eventStructure = {
        id: crypto.randomUUID(),
        start: startDateStr,
        end: endDateStr,
        title: "🌴 CZAS WOLNY 🌴",
        description: "",
        freeTime: freeTime,
      };
    } else {
      eventStructure = {
        id: crypto.randomUUID(),
        start: startDateStr,
        end: endDateStr,
        title: selectClient,
        description: selectService,
        freeTime: freeTime,
      };
    }
    // CREATE MUTATION AND REQUEST
    try {
      await addNewEventMutation.mutateAsync(eventStructure);
      queryClient.invalidateQueries("events");
      resetValues();
      toastEvent();
      props.setOpenNewEvent(false);
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };

  // RESET ON CLOSE FORM
  useEffect(() => {
    if (props.openNewEvent) {
      resetValues();
    }
  }, [props.openNewEvent]);

  // FREE DAY
  const handleFreeDay = () => {
    setEventStartTime(eventStartTime ? "" : "00:00");
    setEventEndTime(eventEndTime ? "" : "23:59");
    setTimeError(prev => ({ ...prev, start: false, end: false }));
  };

  return (
    <div className="">
      <Dialog open={props.openNewEvent} onOpenChange={props.setOpenNewEvent}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex gap-6">
              <button
                className={freeTime ? `opacity-50` : `opacity-100`}
                onClick={() => {
                  setFreeTime(false);
                  resetValues("without-free");
                }}
              >
                Nowa wizyta
              </button>
              <button
                className={freeTime ? `opacity-100` : `opacity-50`}
                onClick={() => {
                  setFreeTime(true);
                  resetValues("without-free");
                }}
              >
                Czas wolny
              </button>
            </DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              {freeTime === false ? (
                <>
                  <div className="-mb-4">
                    <Label
                      htmlFor="firstName"
                      className="text-xs font-normal text-gray-500"
                    >
                      Klient
                    </Label>
                    <Select
                      onValueChange={e => {
                        setSelectClient(e);
                        setClientError(false);
                      }}
                    >
                      <SelectTrigger
                        className={
                          clientError
                            ? ` border-red-500 text-red-500`
                            : `border-input`
                        }
                      >
                        <SelectValue placeholder="Wybierz klienta" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[13rem]">
                        <SelectGroup>
                          {clientsData
                            ? clientsData.map(client => (
                                <SelectItem
                                  key={client.id}
                                  value={
                                    client.firstName + " " + client.lastName
                                  }
                                >
                                  {client.firstName + " " + client.lastName}
                                </SelectItem>
                              ))
                            : null}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <ClientForm customButton />
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-xs font-normal text-gray-500"
                    >
                      Usługa
                    </Label>
                    <Select
                      onValueChange={e => {
                        const selectedServiceData = servicesData.find(
                          service => service.name === e
                        );
                        setSelectService(selectedServiceData.name);
                        handleEventTime(selectedServiceData.duration);
                        setServiceError(false);
                      }}
                    >
                      <SelectTrigger
                        className={
                          serviceError
                            ? ` border-red-500 text-red-500`
                            : `border-input`
                        }
                      >
                        <SelectValue placeholder="Wybierz usługę" />
                      </SelectTrigger>
                      <SelectContent className="overflow-y-auto max-h-[13rem]">
                        <SelectGroup>
                          {servicesData
                            ? servicesData.map(service => (
                                <SelectItem
                                  key={service.id}
                                  value={service.name}
                                >
                                  {service.name}
                                </SelectItem>
                              ))
                            : null}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 mr-4">
                  <Label htmlFor="firstName" className="text-right">
                    Cały dzień
                  </Label>
                  <Switch className="mr-4 col-span-2" onClick={handleFreeDay} />
                </div>
              )}
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-xs font-normal text-gray-500"
                >
                  Czas
                </Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="time"
                    className={`w-fit ${
                      timeError.start
                        ? "border-red-500 text-red-500"
                        : "border-input"
                    }`}
                    value={eventStartTime}
                    onChange={e => {
                      setEventStartTime(e.target.value);
                      setTimeError(prev => ({ ...prev, start: false }));
                    }}
                  />
                  <span className="w-5 h-px bg-gray-500"></span>
                  <Input
                    type="time"
                    className={`w-fit ${
                      timeError.end
                        ? "border-red-500 text-red-500"
                        : "border-input"
                    }`}
                    value={eventEndTime}
                    onChange={e => {
                      setEventEndTime(e.target.value);
                      setTimeError(prev => ({ ...prev, end: false }));
                    }}
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="gender"
                  className="text-xs font-normal text-gray-500"
                >
                  Notatka
                </Label>
                <Textarea className="max-h-40" />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => props.setOpenNewEvent(false)}
              >
                Anuluj
              </Button>
              <Button type="button" onClick={newHandleAddEvents}>
                Dodaj
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewEventToCalendar;
