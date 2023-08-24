import { useClientStore } from "@/stores/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

const useCustomForm = () => {
  const [open, setOpen] = useState(false);
  const addClient = useClientStore(state => state.addClient);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({});
  const errorValue = "Uzupełnij pole";

  const onSubmit = () => {
    const clientStructure = {
      id: crypto.randomUUID(),
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      gender: getValues("gender"),
      phoneNumber: getValues("phoneNumber"),
      mailAddress: getValues("emailAddress"),
      birthDay: getValues("birthDay"),
      visits: {},
    };

    const toastClientAdded = () => {
      toast({
        title: "Zadanie wykonane!",
        description: "Osoba została dodana do bazy klientów.",
      });
    };

    const resetValues = () => {
      resetField("firstName");
      resetField("lastName");
      resetField("gender");
      resetField("phoneNumber");
      resetField("emailAddress");
      resetField("birthDay");
    };

    addClient(clientStructure);
    resetValues();
    toastClientAdded();
    setOpen(false);
  };

  return {
    open,
    setOpen,
    register,
    handleSubmit,
    errors,
    errorValue,
    onSubmit,
  };
};

export default useCustomForm;
