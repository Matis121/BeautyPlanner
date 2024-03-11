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
import EditClientForm from "./EditClientForm";
import { getClients, removeClient } from "../../api/User";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { LuFileClock } from "react-icons/lu";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientTable = () => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken: string | null = localStorage.getItem("user") ?? "";
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data } = useQuery(["clients"], () => getClients(userData));

  // MUTATION
  const removeClientMutation = useMutation((clientId: number) =>
    removeClient(userData, clientId)
  );

  const handleRemoveClient = async (clientId: any) => {
    try {
      await removeClientMutation.mutateAsync(clientId);
      queryClient.invalidateQueries("clients");
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
            <TableHead>Imię i nazwisko</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead className="text-center">Wizyty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ? data.map((client: any, idx: number) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    <p>
                      {client.firstName + " "}
                      {client.lastName}
                    </p>
                  </TableCell>
                  <TableCell>
                    {client.phoneNumber ? (
                      <p>
                        <span className="text-gray-700 font-semibold">
                          +48{" "}
                        </span>
                        {client.phoneNumber}
                      </p>
                    ) : (
                      <p className="text-gray-400">Nie podano</p>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {client && client.visits && client.visits.length > 0 ? (
                      <div className="flex justify-center gap-3">
                        <p className="">{client.visits.length}</p>
                        <Link
                          to={`/clients/${client.id}`}
                          className="flex items-end gap-2"
                        >
                          <LuFileClock
                            size={20}
                            className=" text-gray-500 hover:text-black cursor-pointer"
                          />
                        </Link>
                      </div>
                    ) : (
                      <p className="text-gray-400">Brak wizyt</p>
                    )}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-3">
                    <EditClientForm
                      clientId={client.id}
                      selectedClient={{
                        id: client.id,
                        firstName: client.firstName,
                        lastName: client.lastName,
                        phoneNumber: client.phoneNumber,
                        mailAddress: client.mailAddress,
                        birthDay: client.birthDay,
                      }}
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
                            Potwierdzenie usunięcia klienta
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Klient zostanie trwale usunięty z twojej bazy,
                            natomiast wizyty dalej będą widoczne w kalendarzu.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Anuluj</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleRemoveClient(client.id)}
                          >
                            Usuń klienta
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

export default ClientTable;
