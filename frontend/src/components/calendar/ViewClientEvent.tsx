import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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

import { getEvents, removeEvent, getClients } from "../../api/User";
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

const ViewClientEvent = props => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

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

  console.log(props.eventClientId);

  // MUTATION
  const removeEventMutation = useMutation(() =>
    removeEvent(userData, props.clickedEventId)
  );

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
                            <p className="py-1 px-2 bg-green-200 w-fit rounded-md text-green-900 flex items-center gap-1 text-base">
                              <LuCheckCircle2 />
                              {event.eventStatus === "created"
                                ? "Potwierdzona"
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
                          <Button variant="outline">Edytuj</Button>
                        </div>
                        <Button>Finalizuj</Button>
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
