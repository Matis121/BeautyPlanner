import { useServiceStore } from "../../stores/store";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ServiceTable = () => {
  const services = useServiceStore(state => state.services);
  const removeService = useServiceStore(state => state.removeService);
  const handleDeleteService = id => {
    removeService(id);
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
          {services.map((service, idx) => (
            <TableRow>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{service.name + " "}</TableCell>
              <TableCell>{service.duration} min</TableCell>
              <TableCell>{service.price} zł</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="link"
                  onClick={() => handleDeleteService(service.id)}
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
