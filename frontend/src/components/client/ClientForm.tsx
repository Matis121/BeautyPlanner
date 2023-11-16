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
import { useState } from "react";

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

  // VALIDATE NUMBER MAXLENGTH
  const [phoneInput, setPhoneInput] = useState("");

  const handleNumberLenght = e => {
    if (e.target.value.length > e.target.maxLength) {
      const truncatedValue = e.target.value.slice(0, 9);
      setPhoneInput(truncatedValue);
      return;
    }
    setPhoneInput(e.target.value);
  };

  return (
    <div className={`${props.noPadding ? "p-0" : "p-4"}`}>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="py-6 px-12 bg-gray-50 rounded-xl shadow-sm flex items-center">
          <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
            Klienci
          </span>
          <DialogTrigger asChild>
            <Button>Dodaj klienta</Button>
          </DialogTrigger>
        </div>
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
              maxLength={9}
              type="number"
              inputMode="numeric"
              onChange={handleNumberLenght}
              value={phoneInput}
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
              maxLength={45}
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
