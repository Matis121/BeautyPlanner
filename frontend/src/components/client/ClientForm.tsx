import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCustomForm from "@/hooks/useClientForm";

const ClientForm = props => {
  const {
    open,
    setOpen,
    register,
    handleSubmit,
    errors,
    errorValue,
    onSubmit,
  } = useCustomForm();

  return (
    <div className={`${props.noPadding ? "p-0" : "p-4"}`}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Dodaj klienta</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Podstawowe dane klienta</DialogTitle>
            <DialogDescription>
              Po wypełnieniu wymaganych pól, nowy klient zostanie dodany bo
              bazy.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-4 py-4"
          >
            <Input
              placeholder="Imię *"
              id="firstName"
              {...register("firstName", { required: true })}
              className={`col-span-3  ${
                errors.firstName ? "border-red-500" : "null"
              }`}
              maxLength={20}
            />
            <Input
              placeholder="Nazwisko"
              id="lastName"
              {...register("lastName")}
              className="col-span-3"
              maxLength={25}
            />
            <Input
              placeholder="Telefon"
              id="phoneNumber"
              {...register("phoneNumber")}
              className="col-span-3"
              type="number"
              maxLength={15}
            />
            <Input
              placeholder="E-mail"
              id="emailAddress"
              {...register("emailAddress", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              className="col-span-3"
            />
            <div className="w-full">
              <Label
                htmlFor="birthDay"
                className=" text-xs font-normal text-gray-500"
              >
                Data urodzenia
              </Label>
              <Input
                id="birthDay"
                {...register("birthDay")}
                className="col-span-3 text-gray-500"
                type="date"
              />
            </div>
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

export default ClientForm;
