import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { getUserServices, getEvents, removeEvent } from "../../api/User";
import { useQuery, useQueryClient, useMutation } from "react-query";

const ViewClientEvent = props => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data: servicesData } = useQuery(["services"], () =>
    getUserServices(userData)
  );
  const { data: eventsData } = useQuery(["events"], () => getEvents(userData));

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
                            ? servicesData.map((service, idx) => (
                                <div key={idx}>
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
