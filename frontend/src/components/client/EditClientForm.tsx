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
import { editClient } from "../../api/User";
import { useMutation, useQueryClient } from "react-query";

const EditClientForm = props => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  const [open, setOpen] = useState(false);

  // FORM EDIT VALUES
  const [firstName, setfirstName] = useState(props.selectedClient.firstName);
  const [lastName, setLastName] = useState(props.selectedClient.lastName);
  const [phoneNumber, setPhoneNumber] = useState(
    props.selectedClient.phoneNumber
  );
  const [email, setEmail] = useState(props.selectedClient.mailAddress);

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({});
  const errorValue = "Uzupełnij pole";

  // RESET FUNCTION
  const resetValues = () => {
    resetField("firstName");
    resetField("lastName");
    resetField("gender");
    resetField("phoneNumber");
    resetField("emailAddress");
    resetField("birthDay");
  };

  // VALIDATE NUMBER MAXLENGTH

  const handleNumberLenght = e => {
    if (e.target.value.length > e.target.maxLength) {
      const truncatedValue = e.target.value.slice(0, 9);
      setPhoneNumber(truncatedValue);
      return;
    }
    setPhoneNumber(e.target.value);
  };

  // MUTATION
  const editClientMutation = useMutation(clientStructure =>
    editClient(userData, props.clientId, clientStructure)
  );

  const onSubmit = async () => {
    const clientStructure = {
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      gender: getValues("gender"),
      phoneNumber: getValues("phoneNumber"),
      mailAddress: getValues("emailAddress"),
      birthDay: getValues("birthDay"),
    };

    try {
      await editClientMutation.mutateAsync(clientStructure);
      resetValues();
      setOpen(false);
      queryClient.invalidateQueries("clients");
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Edytuj</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Podstawowe dane klienta</DialogTitle>
          <DialogDescription>
            Wypełnij formularz, aby zmienić dane klienta.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-4 py-4"
        >
          <Input
            id="firstName"
            {...register("firstName", { required: true })}
            className={`col-span-3  ${
              errors.firstName ? "border-red-500" : "null"
            }`}
            maxLength={20}
            value={firstName}
            onChange={e => setfirstName(e.target.value)}
            placeholder="Imię *"
          />
          <Input
            id="lastName"
            {...register("lastName")}
            className="col-span-3"
            maxLength={25}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Nazwisko"
          />
          <Input
            id="phoneNumber"
            {...register("phoneNumber")}
            className="col-span-3"
            type="number"
            maxLength={9}
            value={phoneNumber}
            onChange={handleNumberLenght}
            placeholder="Telefon"
          />
          <Input
            id="emailAddress"
            {...register("emailAddress", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            className="col-span-3"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
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
              className="col-span-3"
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
  );
};

export default EditClientForm;
