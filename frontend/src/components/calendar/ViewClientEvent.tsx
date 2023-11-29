import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  getEvents,
  removeEvent,
  getClients,
  finalizeEvent,
} from "../../api/User";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { LuPhone } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuBrush } from "react-icons/lu";
import { LuTag } from "react-icons/lu";
import { LuBanknote } from "react-icons/lu";
import { LuClipboardEdit } from "react-icons/lu";
import { LuCheckCircle2 } from "react-icons/lu";

import { useState } from "react";
import EditEvent from "./EditEvent";

const ViewClientEvent = props => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  const [servicePrice, setServicePrice] = useState("");
  const [eventStatus, setEventStatus] = useState("finalized");

  // FETCH DATA
  const { data: eventsData } = useQuery(["events"], () => getEvents(userData));

  const { data: clientData } = useQuery(["clients"], () =>
    getClients(userData)
  );

  // TOAST
  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Wizyta została usunięte z kalendarza.",
    });
  };

  // MUTATION
  const removeEventMutation = useMutation(() =>
    removeEvent(userData, props.clickedEventId)
  );

  const finalizeEventMutation = useMutation(eventStructure =>
    finalizeEvent(userData, props.clickedEventId, eventStructure)
  );

  const handleFinalizeEvent = async () => {
    const eventStructure = {
      servicePrice: servicePrice,
      eventStatus: eventStatus,
    };
    console.log(eventStructure);
    try {
      await finalizeEventMutation.mutateAsync(eventStructure);
      queryClient.invalidateQueries("events");
      props.setOpenViewClientEvent(false);
    } catch (error) {
      console.error("Error editing event:", error);
    }
  };

  const handleEventActions = async () => {
    try {
      await removeEventMutation.mutateAsync();
      queryClient.invalidateQueries("events");
      props.setOpenViewClientEvent(false);
      toastEvent();
    } catch (error) {
      console.error("Error while deleting an event:", error);
    }
  };

  return (
    <div className="">
      <Dialog
        open={props.openViewClientEvent}
        onOpenChange={props.setOpenViewClientEvent}
      >
        {eventsData
          ? eventsData.map((event, idx) => (
              <div key={idx}>
                {event.id === props.clickedEventId ? (
                  <>
                    {event.freeTime === false ? (
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="mb-2">
                            Szczegóły wizyty
                          </DialogTitle>
                        </DialogHeader>
                        <section className="flex flex-col w-full">
                          <div className="grid grid-cols-2 border-b border-gray-200 p-2">
                            <span className="flex items-center gap-2 text-gray-500">
                              <LuUser />
                              Klient
                            </span>
                            <p>{event.title}</p>
                          </div>
                          <div className="grid grid-cols-2 border-b border-gray-200 p-2">
                            <span className="flex items-center gap-2 text-gray-500">
                              <LuPhone />
                              Telefon
                            </span>
                            {clientData
                              ? clientData.map(client =>
                                  client.id === props.eventClientId ? (
                                    <p>{client.phoneNumber}</p>
                                  ) : null
                                )
                              : null}
                          </div>
                          <div className="grid grid-cols-2 border-b border-gray-200 p-2">
                            <span className="flex items-center gap-2 text-gray-500">
                              <LuCalendar />
                              Data
                            </span>
                            <p>{event.date}</p>
                          </div>
                          <div className="grid grid-cols-2 border-b border-gray-200 p-2">
                            <span className="flex items-center gap-2 text-gray-500">
                              <LuClock />
                              Czas wizyty
                            </span>
                            <p></p>
                          </div>
                          <div className="grid grid-cols-2 border-b border-gray-200 p-2">
                            <span className="flex items-center gap-2 text-gray-500">
                              <LuBrush />
                              Usługa
                            </span>
                            <p>{event.serviceName}</p>
                          </div>
                          <div className="grid grid-cols-2 border-b border-gray-200 p-2">
                            <span className="flex items-center gap-2 text-gray-500">
                              <LuBanknote />
                              Cena
                            </span>
                            <p>{event.servicePrice} zł</p>
                          </div>
                          <div className="grid grid-cols-2 border-b border-gray-200 p-2">
                            <span className="flex items-center gap-2 text-gray-500">
                              <LuTag />
                              Status
                            </span>
                            <p
                              className={`"py-1 px-2 w-fit rounded-md flex items-center gap-1 text-base" ${
                                event.eventStatus === "created"
                                  ? "bg-blue-200 text-blue-900"
                                  : event.eventStatus === "finalized"
                                  ? "bg-green-200 text-green-900"
                                  : event.eventStatus === "canceled"
                                  ? "bg-red-200 text-red-900"
                                  : ""
                              }`}
                            >
                              <LuCheckCircle2 />
                              {event.eventStatus === "created"
                                ? "Potwierdzona"
                                : event.eventStatus === "finalized"
                                ? "Zakończona"
                                : event.eventStatus === "canceled"
                                ? "Anulowana"
                                : ""}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 p-2">
                            <span className="flex items-center gap-2 text-gray-500">
                              <LuClipboardEdit />
                              Notatka
                            </span>
                            <p className="text-sm">{event.description}</p>
                          </div>
                        </section>
                        <div className="grid grid-cols-2 gap-4">
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <AlertDialogAction
                                variant="destructive"
                                className="w-full"
                              >
                                Usuń wizytę
                              </AlertDialogAction>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Potwierdzenie usunięcia wizyty
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Po wykonaniu czynności, wizyta zostanie trwale
                                  usunięta z twojego kalendarza, bez możliwości
                                  jej przywócenia.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                                <AlertDialogAction
                                  variant="destructive"
                                  onClick={handleEventActions}
                                >
                                  Usuń wizytę
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <EditEvent
                            eventId={event.id}
                            eventStart={event.start}
                            eventDescription={event.description}
                            eventStatus={event.eventStatus}
                            serviceId={event.serviceId}
                            clientId={event.clientId}
                          />
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <AlertDialogAction
                              className="w-full"
                              onClick={() => {
                                setServicePrice(event.servicePrice);
                                setEventStatus("finalized");
                              }}
                            >
                              Finalizuj
                            </AlertDialogAction>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Finalizacja wizyty
                              </AlertDialogTitle>
                              <AlertDialogDescription></AlertDialogDescription>
                              <RadioGroup
                                className="flex flex-col gap-4 py-4"
                                defaultValue="option-one"
                              >
                                <div className="flex gap-6">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="option-one"
                                      id="option-one"
                                      onClick={() =>
                                        setEventStatus("finalized")
                                      }
                                    />
                                    <Label htmlFor="option-one">
                                      Zakończona
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value="option-two"
                                      id="option-two"
                                      onClick={() => setEventStatus("canceled")}
                                    />
                                    <Label htmlFor="option-two">
                                      Anulowana
                                    </Label>
                                  </div>
                                </div>
                              </RadioGroup>
                              <div>
                                <label htmlFor="price">Cena Wizyty</label>
                                <Input
                                  id="price"
                                  placeholder="Cena wizyty [PLN]"
                                  value={servicePrice}
                                  type="number"
                                  disabled={eventStatus === "canceled"}
                                  onChange={e =>
                                    setServicePrice(e.target.value)
                                  }
                                />
                              </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Anuluj</AlertDialogCancel>
                              <AlertDialogAction onClick={handleFinalizeEvent}>
                                Finalizuj
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DialogContent>
                    ) : (
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Czas wolny</DialogTitle>
                        </DialogHeader>
                        <Button type="button" onClick={handleEventActions}>
                          Usuń czas wolny
                        </Button>
                      </DialogContent>
                    )}
                  </>
                ) : null}
              </div>
            ))
          : null}
      </Dialog>
    </div>
  );
};

export default ViewClientEvent;
