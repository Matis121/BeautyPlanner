import { useState } from "react";
import { useEffect } from "react";
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

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ClientForm from "../client/ClientForm";

import { getClients, getUserServices } from "../../api/User";
import { useQuery } from "react-query";

const AddNewEventToCalendar = props => {
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  const { data: clientsData } = useQuery(["Clients"], () =>
    getClients(userData)
  );
  const { data: servicesData } = useQuery(["Services"], () =>
    getUserServices(userData)
  );

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [freeTime, setFreeTime] = useState(false);

  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Wizyta została dodana do kalendarza.",
    });
  };

  const resetValues = () => {
    setEventTitle("");
    setEventDescription("");
    setFreeTime(false);
  };

  const addNewEvent = () => {
    if (freeTime === false && eventTitle === "") {
      return;
    }
    props.handleAddEvents();
    props.setOpenNewEvent(false);
    resetValues();
    toastEvent();
  };

  useEffect(() => {
    if (freeTime === true) {
      props.setNewEvent({
        ...props.newEvent,
        title: "🌴 CZAS WOLNY 🌴",
        description: "",
        freeTime: freeTime,
      });
    } else {
      props.setNewEvent({
        ...props.newEvent,
        title: eventTitle,
        description: eventDescription,
        freeTime: freeTime,
      });
    }
  });

  return (
    <div className="">
      <Dialog open={props.openNewEvent} onOpenChange={props.setOpenNewEvent}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nowa wizyta</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="firstName" className="text-right">
                      Klient
                    </Label>
                    <Select onValueChange={e => setEventTitle(e)}>
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
                    <ClientForm noPadding />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lastName" className="text-right">
                      Usługa
                    </Label>
                    <Select onValueChange={e => setEventDescription(e)}>
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gender" className="text-right">
                      Opis
                    </Label>
                    <Input
                      className="col-span-3"
                      type="number"
                      maxLength={15}
                    />
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
              <Button type="button" onClick={addNewEvent}>
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
