import { Button } from "@/components/ui/button";
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
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data, isLoading } = useQuery(["clients"], () => getClients(userData));

  // MUTATION
  const removeClientMutation = useMutation(clientId =>
    removeClient(userData, clientId)
  );

  const handleRemoveClient = async clientId => {
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
            <TableHead>Wizyty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ? data.map((client, idx) => (
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
                  <TableCell>
                    {client && client.visits && client.visits.length > 0 ? (
                      <div className="flex items-center gap-3">
                        <Link to={`/clients/${client.id}`}>
                          <LuFileClock
                            size={22}
                            className=" text-gray-500 hover:text-black cursor-pointer"
                          />
                        </Link>
                        <p className="">{client.visits.length}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400">Brak wizyt</p>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <EditClientForm
                      clientId={client.id}
                      selectedClient={{
                        id: client.id,
                        firstName: client.firstName,
                        lastName: client.lastName,
                        phoneNumber: client.phoneNumber,
                        emailAddress: client.mailAddress,
                        birthDay: client.birthDay,
                      }}
                    />
                    <Button
                      variant="link"
                      onClick={() => handleRemoveClient(client.id)}
                    >
                      Usuń
                    </Button>
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
