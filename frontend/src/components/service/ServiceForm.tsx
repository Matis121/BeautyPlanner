import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { addNewService } from "../../api/User";
import { useToast } from "@/components/ui/use-toast";

const ServiceForm = () => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken: string | null = localStorage.getItem("user") ?? "";
  const userData = JSON.parse(userToken).username;

  // USE STATE
  const [open, setOpen] = useState(false);
  const [durationService, setDurationService] = useState();

  useEffect(() => {
    reset();
  }, [open]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({});

  const { toast } = useToast();
  const handleToast = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Usługa została dodana do bazy.",
    });
  };

  const addNewServiceMutation = useMutation(serviceStructure =>
    addNewService(userData, serviceStructure)
  );

  const onSubmit = async () => {
    const serviceStructure: any = {
      id: crypto.randomUUID(),
      name: getValues("name"),
      duration: durationService,
      price: getValues("price"),
    };

    try {
      await addNewServiceMutation.mutateAsync(serviceStructure);
      queryClient.invalidateQueries("services");
      setOpen(false);
      handleToast();
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };

  const durationServiceTable = Array.from(
    { length: 49 },
    (_, index) => index * 5
  );

  const formatTime = (time: number) => {
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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Dodaj usługę</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Informacje o usłudze</DialogTitle>
            <DialogDescription>
              Wypełnij formularz, aby dodać nową usługę.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-4 py-4"
          >
            <Input
              placeholder="Nazwa usługi"
              id="name"
              {...register("name", { required: true })}
              className={`col-span-3  ${
                errors.name ? "border-red-500" : "null"
              }`}
              maxLength={30}
            />
            <Select required onValueChange={(e: any) => setDurationService(e)}>
              <SelectTrigger className="col-span-2 text-gray-500">
                <SelectValue
                  placeholder="Czas trwania"
                  className="text-black"
                />
              </SelectTrigger>
              <SelectContent className="overflow-y-auto max-h-[13rem]">
                <SelectGroup>
                  {durationServiceTable.map(time => (
                    <SelectItem
                      key={time}
                      value={`${time}`}
                      className="hover:cursor-pointer"
                    >
                      {formatTime(time)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              placeholder="Cena"
              type="number"
              step="any"
              id="price"
              {...register("price", { required: true })}
              className={`col-span-3  ${
                errors.price ? "border-red-500" : "null"
              }`}
              maxLength={25}
            />
            <div className="flex self-end gap-4">
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

export default ServiceForm;
