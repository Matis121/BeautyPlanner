import { useState } from "react";
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
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [freeTime, setFreeTime] = useState(false);

  // VARIABLES FOR END TIME EVENT
  const [serviceDuration, setServiceDuration] = useState(null);
  const startTimeStr = props.startTimeEvent;

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
    setEventTitle("");
    setEventDescription("");
    setFreeTime(false);
  };

  // MUTATION
  const addNewEventMutation = useMutation(eventStructure =>
    addEvent(userData, eventStructure)
  );

  const newHandleAddEvents = async () => {
    let eventStructure;
    if (freeTime === false && eventTitle === "") {
      return;
    }
    const endTimeEvent = new Date(startTimeStr);
    endTimeEvent.setMinutes(
      endTimeEvent.getMinutes() + parseFloat(serviceDuration)
    );
    const formattedDate = endTimeEvent.toISOString();
    if (freeTime === true) {
      eventStructure = {
        id: crypto.randomUUID(),
        start: props.startTimeEvent,
        end: formattedDate,
        title: "🌴 CZAS WOLNY 🌴",
        description: "",
        freeTime: freeTime,
      };
    } else {
      eventStructure = {
        id: crypto.randomUUID(),
        start: props.startTimeEvent,
        end: formattedDate,
        title: eventTitle,
        description: eventDescription,
        freeTime: freeTime,
      };
    }
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

  return (
    <div className="">
      <Dialog open={props.openNewEvent} onOpenChange={props.setOpenNewEvent}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nowa wizyta</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="firstName" className="text-right">
                  Czas wolny
                </Label>
                <Switch
                  id="airplane-mode"
                  className="mr-4 col-span-2"
                  onClick={() => setFreeTime(!freeTime)}
                />
              </div>
              {freeTime === false ? (
                <>
                  <div className="-mb-4">
                    <Label
                      htmlFor="firstName"
                      className="text-xs font-normal text-gray-500"
                    >
                      Klient
                    </Label>
                    <Select onValueChange={e => setEventTitle(e)} required>
                      <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Wybierz klienta" />
                      </SelectTrigger>
                      <SelectContent className="overflow-y-auto max-h-[13rem]">
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
                        setServiceDuration(selectedServiceData.duration);
                        setEventDescription(selectedServiceData.name);
                      }}
                    >
                      <SelectTrigger className="col-span-3">
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
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-xs font-normal text-gray-500"
                    >
                      Czas
                    </Label>
                    <div className="flex gap-2 items-center">
                      <Input type="time" className="w-fit" />
                      <span className="w-5 h-px bg-gray-500"></span>
                      <Input type="time" className="w-fit" />
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
                </>
              ) : null}
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
