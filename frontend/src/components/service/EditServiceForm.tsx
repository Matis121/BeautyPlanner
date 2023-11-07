import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editService } from "../../api/User";
import { useMutation, useQueryClient } from "react-query";

const EditServiceForm = props => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // USE STATE
  const [open, setOpen] = useState(false);
  const [durationService, setDurationService] = useState();

  // EDIT FORM VALUES
  const [serviceName, setServiceName] = useState(props.name);
  const [servicePrice, setServicePrice] = useState(props.price);

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({});

  const resetValues = () => {
    resetField("name");
    resetField("duration");
    resetField("price");
  };

  const errorValue = "Uzupełnij pole";

  const editServiceMutation = useMutation(serviceStructure =>
    editService(userData, props.serviceId, serviceStructure)
  );

  const onSubmit = async () => {
    const serviceStructure = {
      id: crypto.randomUUID(),
      name: getValues("name"),
      duration: durationService,
      price: getValues("price"),
    };

    try {
      await editServiceMutation.mutateAsync(serviceStructure);
      resetValues();
      setOpen(false);
      queryClient.invalidateQueries("services");
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  const durationServiceTable = Array.from(
    { length: 49 },
    (_, index) => index * 5
  );

  const formatTime = time => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (time === 0) {
      return `0`;
    }
    if (time % 60 === 0) {
      return `${hours} h`;
    }
    return time > 60 ? `${hours} h ${minutes} min` : `${time} min`;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Edytuj</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informacje o usłudze</DialogTitle>
          <DialogDescription>
            Wypełnij formularz, aby dodać nową usługę.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nazwa
              </Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                className={`col-span-3  ${
                  errors.name ? "border-red-500" : "null"
                }`}
                placeholder={`${errors.name ? errorValue : ""}`}
                maxLength={30}
                value={serviceName}
                onChange={e => setServiceName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Czas trwania
              </Label>
              <Select onValueChange={e => setDurationService(e)}>
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Czas trwania" />
                </SelectTrigger>
                <SelectContent className="overflow-y-auto max-h-[13rem]">
                  <SelectGroup>
                    {durationServiceTable.map(time => (
                      <SelectItem key={time} value={`${time}`}>
                        {formatTime(time)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Cena
              </Label>
              <Input
                type="number"
                id="price"
                {...register("price", { required: true })}
                className={`col-span-3  ${
                  errors.price ? "border-red-500" : "null"
                }`}
                placeholder={`${errors.price ? errorValue : ""}`}
                maxLength={25}
                value={servicePrice}
                onChange={e => setServicePrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Anuluj
            </Button>
            <Button type="submit">Zapisz</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceForm;
