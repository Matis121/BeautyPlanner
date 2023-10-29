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

const EditServiceForm = props => {
  const [open, setOpen] = useState(false);
  const [durationService, setDurationService] = useState();

  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({});

  const errorValue = "Uzupełnij pole";

  const onSubmit = async () => {
    const serviceStructure = {
      id: crypto.randomUUID(),
      name: getValues("name"),
      duration: durationService,
      price: getValues("price"),
    };

    const res = await editService(userData, props.serviceId, serviceStructure);

    const resetValues = () => {
      resetField("name");
      resetField("duration");
      resetField("price");
    };

    resetValues();
    setOpen(false);
  };

  const durationServiceTable = Array.from(
    { length: 13 },
    (_, index) => index * 5
  );

  return (
    <div className="p-4">
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
                          {time + "min"}
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
    </div>
  );
};

export default EditServiceForm;
