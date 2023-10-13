import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { registerUser } from "../api/User";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function createAccount() {
    const user = {
      username,
      password,
    };
    const res = await registerUser(user);

    if (res.success) {
      console.log(res.success);
      toastEvent();
    } else {
      console.log(res.error);
    }

    setUsername("");
    setPassword("");
  }

  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Zadanie wykonane!",
      description: "Konto zostało utworzone w systemie",
    });
  };

  return (
    <div className=" w-full h-screen bg-neutral-800 flex items-center justify-center flex-col relative">
      <Toaster />
      <Link to="/login" className=" text-white absolute top-6 right-6">
        Zaloguj się
      </Link>
      <div className="p-12 bg-neutral-400 rounded-md flex justify-center flex-col">
        <label htmlFor="username">Nazwa użytkownika</label>
        <Input
          onChange={e => setUsername(e.target.value)}
          id="username"
          className=" mb-4"
        />
        <label htmlFor="password">Hasło</label>
        <Input onChange={e => setPassword(e.target.value)} id="password" />
        <Button onClick={createAccount} className="mt-8 self-end">
          Stwórz konto
        </Button>
      </div>
    </div>
  );
};

export default Register;
