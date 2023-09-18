import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEventStore, useServiceStore } from "../../stores/store";
import { useToast } from "@/components/ui/use-toast";

const ViewClientEvent = props => {
  const events = useEventStore(state => state.events);
  const removeEvent = useEventStore(state => state.removeEvent);
  const services = useServiceStore(state => state.services);

  const handleEventActions = () => {
    removeEvent(props.clickedEventId);
    props.setOpenViewClientEvent(false);
    toastEvent();
  };

  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Wizyta została usunięte z kalendarza.",
    });
  };

  return (
    <div className="">
      <Dialog
        open={props.openViewClientEvent}
        onOpenChange={props.setOpenViewClientEvent}
      >
        {events.map(event => (
          <div key={event.id}>
            {event.id === props.clickedEventId ? (
              <>
                {event.freeTime === false ? (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Szczegóły wizyty</DialogTitle>
                    </DialogHeader>
                    <>
                      <p>
                        Klient:{" "}
                        <span className=" font-semibold">{event.title}</span>
                      </p>
                      <p>
                        Usługa:{" "}
                        <span className=" font-semibold">
                          {event.description}
                        </span>
                      </p>
                      {services.map(service => (
                        <>
                          {service.name === event.description ? (
                            <>
                              <p>
                                Koszt wizyty:{" "}
                                <span className="font-semibold">
                                  {service.price + "zł"}
                                </span>
                              </p>
                            </>
                          ) : null}
                        </>
                      ))}
                    </>
                    <Button type="button" onClick={handleEventActions}>
                      Usuń wizyte
                    </Button>
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
        ))}
      </Dialog>
    </div>
  );
};

export default ViewClientEvent;
