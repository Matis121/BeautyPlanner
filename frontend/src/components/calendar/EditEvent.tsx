import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
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

import { editEvent } from "../../api/User";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ClientForm from "../client/ClientForm";

import { getClients, getUserServices } from "../../api/User";
import { useQuery, useQueryClient, useMutation } from "react-query";

const EditEvent = props => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // VARIABLE - ENTRY TIME FOR EVENT
  const startTimeStr = new Date(props.eventStart);

  // VARIABLES - HANDLE EVENT TIME
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");

  // VARIABLE - HANDLE COMBOBOX
  // values
  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState(props.clientId);
  const [service, setService] = useState("");
  const [serviceId, setServiceId] = useState(props.serviceId);
  const [servicePrice, setServicePrice] = useState("");
  const [descriptionInput, setDescriptionInput] = useState(
    props.eventDescription
  );

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

  // FETCH DATA
  const { data: clientsData } = useQuery(["clients"], () =>
    getClients(userData)
  );
  const { data: servicesData } = useQuery(["services"], () =>
    getUserServices(userData)
  );

  useEffect(() => {
    servicesData.map(element => {
      if (element.id === props.serviceId) {
        setService(element.name);
        setServicePrice(element.price);
        setServiceId(element.id);
        handleEventDuration(element.duration);
      }
    });
  }, [servicesData]);

  useEffect(() => {
    clientsData.map(element => {
      if (element.id === props.clientId) {
        setClient(element.firstName + " " + element.lastName);
        setClientId(element.id);
      }
    });
  }, [clientsData]);

  // TOAST
  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Wizyta została zaktualizowana.",
    });
  };

  // ZOD FORM
  const isValidTime = (value: string): boolean => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(value);
  };

  const schemaEvent = z.object({
    clientEvent: z.any(),
    serviceEvent: z.any(),
    startTimeEvent: z.string().refine(value => isValidTime(value)),
    endTimeEvent: z.any().refine(value => isValidTime(value)),
    note: z.any(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaEvent) });

  // MUTATION
  const editEventMutation = useMutation(eventStructure =>
    editEvent(userData, props.eventId, eventStructure)
  );

  // CREATE NEW EVENT
  const handleAddEvents = async data => {
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
      console.log(selectDate);
    }

    // CREATING FINAL STRUCTURE FOR REQUEST
    createFinalDate(startDateStr, eventStartTime);
    createFinalDate(endDateStr, eventEndTime);
    eventStructure = {
      id: props.eventId,
      date: dateEvent,
      start: startDateStr,
      end: endDateStr,
      title: client,
      clientId: clientId,
      serviceId: serviceId,
      serviceName: service,
      servicePrice: servicePrice,
      description: data.note,
      freeTime: false,
      eventStatus: props.eventStatus,
    };

    // CREATE MUTATION AND REQUEST
    try {
      await editEventMutation.mutateAsync(eventStructure);
      queryClient.invalidateQueries("events");
      setOpen(false);
      toastEvent();
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="w-full" variant="outline">
          Edytuj
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-6">
            <button>Edycja wizyty</button>
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <form onSubmit={handleSubmit(handleAddEvents)} className="grid gap-4">
            <div>
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
                              value={element.firstName + " " + element.lastName}
                              onSelect={() => {
                                setClient(
                                  element.firstName + " " + element.lastName
                                );
                                setClientId(element.id);
                                setOpenClient(false);
                                {
                                  register("clientEvent", {
                                    value: client,
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
                                setServicePrice(element.price);
                                setServiceId(element.id);
                                setOpenService(false);
                                handleEventDuration(element.duration);
                                {
                                  register("serviceEvent", {
                                    value: service,
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
                    errors.eventEndTime
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
              <Textarea
                className="max-h-40"
                {...register("note")}
                value={descriptionInput}
                onChange={e => setDescriptionInput(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Anuluj
              </Button>
              <Button type="submit">Dodaj</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvent;
