import { useQuery, useQueryClient, useMutation } from "react-query";
import { getUserServices, removeService } from "../../api/User";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditServiceForm from "./EditServiceForm";
import { UserDataContext } from "@/Contexts/UserDataContext";
import { useContext } from "react";

const ServiceTable = () => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA CONTEXT
  const { userData }: any = useContext(UserDataContext);

  // FETCH DATA
  const { data } = useQuery(["services"], () => getUserServices(userData));

  // MUTATION
  const removeServiceMutation = useMutation((serviceId: number) =>
    removeService(userData, serviceId)
  );

  const handleRemoveService = async (serviceId: any) => {
    try {
      await removeServiceMutation.mutateAsync(serviceId);
      queryClient.invalidateQueries("services");
    } catch (error) {
      console.error("Error removing service:", error);
    }
  };

  return (
    <div className="overflow-y-auto shadow-md rounded-md">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>LP</TableHead>
            <TableHead>Nazwa</TableHead>
            <TableHead>Czas trwania</TableHead>
            <TableHead>Cena</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ? data.map((service: any, idx: number) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    <p>{service.name}</p>
                  </TableCell>
                  <TableCell>
                    <p>{service.duration} min</p>
                  </TableCell>
                  <TableCell>
                    <p>{service.price} zł</p>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-3">
                    <EditServiceForm
                      serviceId={service.id}
                      name={service.name}
                      duration={service.duration}
                      price={service.price}
                    />
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <AlertDialogAction variant="destructive">
                          Usuń
                        </AlertDialogAction>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Potwierdzenie usunięcia usługi
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Usługa zostanie trwale usunięta z twojej bazy,
                            natomiast wizyty dalej będą widoczne w kalendarzu.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Anuluj</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleRemoveService(service.id)}
                          >
                            Usuń usługę
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceTable;
