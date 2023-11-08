import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { registerUser } from "../api/User";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const resetValues = () => {
    setUsername("");
    setPassword("");
    setPassword2("");
  };

  async function createAccount() {
    const user = {
      username,
      password,
    };
    if (password === password2) {
      const res = await registerUser(user);
      if (res.success) {
        console.log(res.success);
        toastEvent();
        resetValues();
      } else {
        console.log(res.error);
      }
    }
  }

  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      description: "Konto zostało utworzone w systemie",
    });
  };

  return (
    // <div className=" w-full h-screen bg-neutral-800 flex items-center justify-center flex-col relative">
    //   <Toaster />
    //   <Link to="/login" className=" text-white absolute top-6 right-6">
    //     Zaloguj się
    //   </Link>
    //   <div className="p-12 bg-neutral-400 rounded-md flex justify-center flex-col">
    //     <label htmlFor="username">Nazwa użytkownika</label>
    //     <Input
    //       onChange={e => setUsername(e.target.value)}
    //       id="username"
    //       className=" mb-4"
    //     />
    //     <label htmlFor="password">Hasło</label>
    //     <Input onChange={e => setPassword(e.target.value)} id="password" />
    //     <Button onClick={createAccount} className="mt-8 self-end">
    //       Stwórz konto
    //     </Button>
    //   </div>
    // </div>
    <section className="flex">
      <div className="w-1/2 h-screen linear-gradient">
        <div className="p-10 w-fit">
          <p className="logo font-bold text-2xl p-4 bg-white rounded-lg">
            BeautyPlanner
          </p>
        </div>
      </div>
      <div className="w-1/2 h-screen flex items-center justify-center flex-col relative">
        <Toaster />
        <Link to="/login" className="absolute top-6 right-6">
          <Button variant="link">Zaloguj się</Button>
        </Link>
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl font-semibold tracking-tight mb-3">
            Stwórz nowe konto
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Wprowadź nazwę użytkownika oraz ustaw hasło do konta
          </p>
          <Input
            onChange={e => setUsername(e.target.value)}
            value={username}
            className=" mb-3"
            id="username"
            placeholder="Nazwa użytkownika"
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            value={password}
            className=" mb-3"
            id="password"
            placeholder="Hasło"
            type="password"
          />
          <Input
            onChange={e => setPassword2(e.target.value)}
            value={password2}
            className=" mb-3"
            id="repeatPassword"
            placeholder="Powtórz hasło"
            type="password"
          />
          <Button onClick={createAccount} className="w-full">
            Utwórz konto
          </Button>
          <div className="line my-8">
            <span className="text-muted-foreground px-4 bg-white">
              Utwórz konto przy pomocy
            </span>
          </div>
          <Button className="w-full" variant="outline">
            <FcGoogle size={25} className="mr-2" />
            Google
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Register;
