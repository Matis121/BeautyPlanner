import { useClientStore } from "../../stores/store";
import { Button } from "@/components/ui/button";
import EditClientForm from "./EditClientForm";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientTable = () => {
  const clients = useClientStore(state => state.clients);
  const removeClient = useClientStore(state => state.removeClient);
  const handleDeleteClient = id => {
    removeClient(id);
  };

  console.log(clients);

  return (
    <div className="relative w-full p-4 h-5/6 overflow-y-auto">
      <Table className="bg-white rounded-md ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">LP</TableHead>
            <TableHead className="w-[300px]">Imię Nazwisko</TableHead>
            <TableHead className="w-[300px]">Telefon</TableHead>
            <TableHead className="w-[100px]">Wizyty</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client, idx) => (
            <TableRow>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>
                {client.firstName + " "}
                {client.lastName}
              </TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell>{/* KOD DO WIZYT */}</TableCell>
              <TableCell className="text-right">
                <EditClientForm
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
                  onClick={() => handleDeleteClient(client.id)}
                >
                  Usuń
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
