import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { addNewClient } from "../api/User";
import { useQueryClient, useMutation } from "react-query";
import { UserDataContext } from "@/Contexts/UserDataContext";
import { useContext } from "react";

const useClientForm = () => {
  // QUERY CLIENT
  const queryClient = useQueryClient();

  // USER DATA CONTEXT
  const { userData }: any = useContext(UserDataContext);

  // USE STATE
  const [open, setOpen] = useState(false);
  // VALIDATE NUMBER MAXLENGTH
  const [phoneInput, setPhoneInput] = useState("");

  useEffect(() => {
    reset();
    setPhoneInput("");
  }, [open]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({});
  const errorValue = "Uzupełnij pole";

  // TOAST
  const { toast } = useToast();
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
    const clientStructure: any = {
      id: crypto.randomUUID(),
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      gender: getValues("gender"),
      phoneNumber: getValues("phoneNumber"),
      mailAddress: getValues("emailAddress"),
      birthDay: getValues("birthDay"),
      visits: [],
    };

    try {
      await addNewClientMutation.mutateAsync(clientStructure);
      setOpen(false);
      queryClient.invalidateQueries("clients");
    } catch (error) {
      console.error("Error adding new service:", error);
    }
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
    phoneInput,
    setPhoneInput,
    addNewClientMutation,
  };
};

export default useClientForm;
