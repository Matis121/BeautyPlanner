import { useQuery, useQueryClient, useMutation } from "react-query";
import { getUserServices, removeService } from "../../api/User";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditServiceForm from "./EditServiceForm";

const ServiceTable = () => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data } = useQuery(["services"], () => getUserServices(userData));


  // MUTATION
  const removeServiceMutation = useMutation(serviceId =>
    removeService(userData, serviceId)
  );

  const handleRemoveService = async serviceId => {
    try {
      await removeServiceMutation.mutateAsync(serviceId);
      queryClient.invalidateQueries("services");
    } catch (error) {
      console.error("Error removing service:", error);
    }
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
            <TableHead className="text-right">Edytuj / Usuń</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            ? data.map((service: any, idx: number) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{service.name + " "}</TableCell>
                  <TableCell>{service.duration} min</TableCell>
                  <TableCell>{service.price} zł</TableCell>
                  <TableCell className="text-right flex items-center justify-end">
                    <EditServiceForm
                      serviceId={service.id}
                      name={service.name}
                      duration={service.duration}
                      price={service.price}
                    />
                    <Button
                      variant="link"
                      onClick={() => handleRemoveService(service.id)}
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

export default ServiceTable;
