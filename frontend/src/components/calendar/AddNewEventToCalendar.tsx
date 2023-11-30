import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addEvent, addVisitToClient } from "../../api/User";

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

  // VARIABLE - FREE TIME
  const [freeTime, setFreeTime] = useState(false);

  // VARIABLE - ENTRY TIME FOR EVENT
  const startTimeStr = new Date(props.startTimeEvent);

  // VARIABLES - HANDLE EVENT TIME
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventStartTimeForFreeTime, setEventStartTimeForFreeTime] =
    useState("");
  const [eventEndTimeForFreeTime, setEventEndTimeForFreeTime] = useState("");

  // VARIABLE - HANDLE COMBOBOX
  // values
  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState("");
  const [service, setService] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  // open and close
  const [openClient, setOpenClient] = useState(false);
  const [openService, setOpenService] = useState(false);

  // HANDLERS
  // HANDLE - EVENT DURATION
  const handleEventDuration = duration => {
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
    setEventStartTime(startTimeStr.toLocaleTimeString("pl-pl", options));
    setEventEndTime(endTime.toLocaleTimeString("pl-pl", options));
  };

  // HANDLE - FREE DAY
  const handleFreeDay = () => {
    setEventStartTimeForFreeTime(eventStartTimeForFreeTime ? "" : "00:00");
    setEventEndTimeForFreeTime(eventEndTimeForFreeTime ? "" : "23:59");
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
  const resetValues = () => {
    // form for event
    reset();
    setClient("");
    setService("");
    setEventStartTime("");
    setEventEndTime("");
    // form for free day
    resetFreeTime();
    setEventStartTimeForFreeTime("");
    setEventEndTimeForFreeTime("");
    setFreeTime(false);
  };

  // RESET ON CLOSE FORM
  useEffect(() => {
    if (props.openNewEvent) {
      resetValues();
    }
  }, [props.openNewEvent]);

  // ZOD FORM
  const isValidTime = (value: string): boolean => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(value);
  };

  const schemaEvent = z.object({
    clientEvent: z.string(),
    serviceEvent: z.string(),
    startTimeEvent: z.any(),
    endTimeEvent: z.any(),
    note: z.string(),
  });

  const schemaFreeTime = z.object({
    startTimeEvent: z.string().refine(value => isValidTime(value)),
    endTimeEvent: z.any().refine(value => isValidTime(value)),
    note: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaEvent) });

  const {
    register: registerFreeTime,
    handleSubmit: handleSubmitFreeTime,
    reset: resetFreeTime,
    formState: { errors: errorsFreeTime },
  } = useForm({ resolver: zodResolver(schemaFreeTime) });

  // MUTATION
  const addNewEventMutation = useMutation(eventStructure =>
    addEvent(userData, eventStructure)
  );
  const addVisitToClientMutation = useMutation(eventStructure =>
    addVisitToClient(userData, eventStructure)
  );

  // CREATE NEW EVENT
  const handleAddEvents = async data => {
    let isCheckNewClient = false; // Initialize the variable

    // EXECUTE NEW CLIENT CHECK
    clientsData.forEach(element => {
      if (element.id === clientId && element.visits.length === 0) {
        isCheckNewClient = true;
      }
    });

    let eventStructure;
    // CREATE TIME VALUE
    const startDateStr = new Date(startTimeStr);
    const endDateStr = new Date(startTimeStr);
    // CREATE DATE VALUE
    const dateObject = new Date(startTimeStr);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateEvent = dateObject.toLocaleString("en-US", options);

    function createFinalDate(selectDate, timeValue) {
      const [hours, minutes] = timeValue.split(":").map(Number);
      selectDate.setHours(hours);
      selectDate.setMinutes(minutes);
    }

    // CREATING FINAL STRUCTURE FOR REQUEST
    if (freeTime === true) {
      createFinalDate(startDateStr, eventStartTimeForFreeTime);
      createFinalDate(endDateStr, eventEndTimeForFreeTime);
      eventStructure = {
        id: crypto.randomUUID(),
        start: startDateStr,
        end: endDateStr,
        title: "🌴 CZAS WOLNY 🌴",
        serviceName: "",
        freeTime: freeTime,
      };
    } else {
      createFinalDate(startDateStr, eventStartTime);
      createFinalDate(endDateStr, eventEndTime);
      eventStructure = {
        id: crypto.randomUUID(),
        date: dateEvent,
        start: startDateStr,
        end: endDateStr,
        title: client,
        clientId: clientId,
        serviceId: serviceId,
        serviceName: service,
        servicePrice: servicePrice,
        description: data.note,
        freeTime: freeTime,
        eventStatus: "created",
        newClient: isCheckNewClient,
      };
    }
    // CREATE MUTATION AND REQUEST
    try {
      await addNewEventMutation.mutateAsync(eventStructure);
      await addVisitToClientMutation.mutateAsync(eventStructure);
      queryClient.invalidateQueries("events");
      queryClient.invalidateQueries("clients");
      resetValues();
      toastEvent();
      props.setOpenNewEvent(false);
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };

  return (
    <Dialog open={props.openNewEvent} onOpenChange={props.setOpenNewEvent}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-6">
            <button
              className={freeTime ? `opacity-50` : `opacity-100`}
              onClick={() => {
                setFreeTime(false);
              }}
            >
              Nowa wizyta
            </button>
            <button
              className={freeTime ? `opacity-100` : `opacity-50`}
              onClick={() => {
                setFreeTime(true);
              }}
            >
              Czas wolny
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {freeTime === false ? (
            <form
              onSubmit={handleSubmit(handleAddEvents)}
              className="grid gap-4"
            >
              <div className="-mb-4">
                <Label
                  htmlFor="firstName"
                  className="text-xs font-normal text-gray-500"
                >
                  Klient
                </Label>
                <Popover open={openClient} onOpenChange={setOpenClient}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={`w-full justify-between text-muted-foreground ${
                        errors.clientEvent
                          ? " border-red-500 text-red-500"
                          : "border-input"
                      }`}
                    >
                      {client ? client : "Wybierz Klienta"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Wyszukaj klienta..." />
                      <CommandEmpty>Brak klienta.</CommandEmpty>
                      <CommandGroup>
                        {clientsData
                          ? clientsData.map(element => (
                              <CommandItem
                                key={element.id}
                                value={
                                  element.firstName + " " + element.lastName
                                }
                                onSelect={() => {
                                  setClient(
                                    element.firstName + " " + element.lastName
                                  );
                                  setClientId(element.id);
                                  setOpenClient(false);
                                  {
                                    register("clientEvent", {
                                      value: element.firstName,
                                    });
                                  }
                                }}
                              >
                                {element.firstName + " " + element.lastName}
                              </CommandItem>
                            ))
                          : null}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <ClientForm customButton />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-xs font-normal text-gray-500"
                >
                  Usługa
                </Label>
                <Popover open={openService} onOpenChange={setOpenService}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={`w-full justify-between text-muted-foreground ${
                        errors.serviceEvent
                          ? " border-red-500 text-red-500"
                          : "border-input"
                      }`}
                    >
                      {service ? service : "Wybierz usługę"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Wyszukaj usługe..." />
                      <CommandEmpty>Brak usługi.</CommandEmpty>
                      <CommandGroup>
                        {servicesData
                          ? servicesData.map(element => (
                              <CommandItem
                                key={element.id}
                                value={element.name}
                                onSelect={() => {
                                  setService(element.name);
                                  setServiceId(element.id);
                                  setServicePrice(element.price);
                                  setOpenService(false);
                                  handleEventDuration(element.duration);
                                  {
                                    register("serviceEvent", {
                                      value: element.name,
                                    });
                                  }
                                }}
                              >
                                {element.name}
                              </CommandItem>
                            ))
                          : null}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
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
                    {...register("startTimeEvent")}
                    className={`w-fit ${
                      errors.startTimeEvent
                        ? "border-red-500 text-red-500"
                        : "border-input"
                    }`}
                    value={eventStartTime}
                    onChange={e => {
                      setEventStartTime(e.target.value);
                    }}
                  />
                  <span className="w-5 h-px bg-gray-500"></span>
                  <Input
                    type="time"
                    {...register("endTimeEvent")}
                    className={`w-fit ${
                      errors.endTimeEvent
                        ? "border-red-500 text-red-500"
                        : "border-input"
                    }`}
                    value={eventEndTime}
                    onChange={e => {
                      setEventEndTime(e.target.value);
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
                <Textarea className="max-h-40" {...register("note")} />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => props.setOpenNewEvent(false)}
                >
                  Anuluj
                </Button>
                <Button type="submit">Dodaj</Button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmitFreeTime(handleAddEvents)}
              className="grid gap-4"
            >
              <div className="flex items-center gap-2 mr-4">
                <Label htmlFor="firstName" className="text-right">
                  Cały dzień
                </Label>
                <Switch className="mr-4 col-span-2" onClick={handleFreeDay} />
              </div>
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
                    {...registerFreeTime("startTimeEvent")}
                    className={`w-fit ${
                      errorsFreeTime.startTimeEvent
                        ? "border-red-500 text-red-500"
                        : "border-input"
                    }`}
                    value={eventStartTimeForFreeTime}
                    onChange={e => {
                      setEventStartTimeForFreeTime(e.target.value);
                    }}
                  />
                  <span className="w-5 h-px bg-gray-500"></span>
                  <Input
                    type="time"
                    {...registerFreeTime("endTimeEvent")}
                    className={`w-fit ${
                      errorsFreeTime.startTimeEvent
                        ? "border-red-500 text-red-500"
                        : "border-input"
                    }`}
                    value={eventEndTimeForFreeTime}
                    onChange={e => {
                      setEventEndTimeForFreeTime(e.target.value);
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
                <Textarea className="max-h-40" {...registerFreeTime("note")} />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => props.setOpenNewEvent(false)}
                >
                  Anuluj
                </Button>
                <Button type="submit">Dodaj</Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewEventToCalendar;
