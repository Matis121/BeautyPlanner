import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEventStore, useServiceStore } from "../../stores/store";
import { useToast } from "@/components/ui/use-toast";

import { getUserServices, getEvents, removeEvent } from "../../api/User";
import { useQuery } from "react-query";
import { Key } from "lucide-react";

const ViewClientEvent = props => {
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  const { data: servicesData } = useQuery(["Hours"], () =>
    getUserServices(userData)
  );
  const { data: eventsData } = useQuery(["Events"], () => getEvents(userData));

  const handleEventActions = async () => {
    console.log(props.clickedEventId);
    const removeSpecificEvent = await removeEvent(
      userData,
      props.clickedEventId
    );
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
        {eventsData
          ? eventsData.map(event => (
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
                            <span className=" font-semibold">
                              {event.title}
                            </span>
                          </p>
                          <p>
                            Usługa:{" "}
                            <span className=" font-semibold">
                              {event.description}
                            </span>
                          </p>
                          {servicesData
                            ? servicesData.map(service => (
                                <div key={service.id}>
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
                                </div>
                              ))
                            : null}
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
            ))
          : null}
      </Dialog>
    </div>
  );
};

export default ViewClientEvent;
