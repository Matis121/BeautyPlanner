import { Button } from "@/components/ui/button";
import EditClientForm from "./EditClientForm";
import { getClients, removeClient } from "../../api/User";
import { useQuery } from "react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientTable = () => {
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  const { data } = useQuery(["Clients"], () => getClients(userData));

  const handleRemoveClient = async clientId => {
    const removeSpecificClient = await removeClient(userData, clientId);
  };

  return (
    <div className="overflow-y-auto mb-20 m-4 shadow-md max-h-full">
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>LP</TableHead>
            <TableHead>Imię Nazwisko</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Wizyty</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ? data.map((client, idx) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    {client.firstName + " "}
                    {client.lastName}
                  </TableCell>
                  <TableCell>{client.phoneNumber}</TableCell>
                  <TableCell>{/* KOD DO WIZYT */}</TableCell>
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
