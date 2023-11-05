import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { addNewClient } from "../api/User";
import { useQueryClient, useMutation } from "react-query";

const useClientForm = () => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // USE STATE
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

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

  // TOAST
  const toastClientAdded = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Osoba została dodana do bazy klientów.",
    });
  };


  // MUTATION
  const addNewClientMutation = useMutation(clientStructure =>
    addNewClient(userData, clientStructure)
  );

  const onSubmit = async () => {
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

    try {
      await addNewClientMutation.mutateAsync(clientStructure);
      resetValues();
      setOpen(false);
      queryClient.invalidateQueries("clients");
    } catch (error) {
      console.error("Error adding new service:", error);
    }

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

export default useClientForm;
