import { useClientStore } from "../../stores/store";
import { Button } from "@/components/ui/button";
// import EditClientForm from "./EditClientForm";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ServiceTable = () => {
  const clients = useClientStore(state => state.clients);
  const removeClient = useClientStore(state => state.removeClient);
  const handleDeleteClient = id => {
    removeClient(id);
  };

  return (
    <div className="overflow-y-auto mb-20 m-4 shadow-md max-h-full">
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>LP</TableHead>
            <TableHead>Nazwa</TableHead>
            <TableHead>Czas trwania</TableHead>
            <TableHead>Cena</TableHead>
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

export default ServiceTable;
