import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../api/User";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const payload = {
      username,
      password,
    };

    const user = await postLogin(payload);
    if (user.token) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      toastEvent();
    }
  }

  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Błąd",
      description: "Podałeś nieprawidłowe dane do logowania",
    });
  };

  return (
    <div className=" w-full h-screen bg-neutral-800 flex items-center justify-center flex-col relative">
      <Toaster />
      <Link to="/register" className=" text-white absolute top-6 right-6">
        Stwórz konto
      </Link>

      <div className="p-12 bg-neutral-400 rounded-md flex justify-center flex-col">
        <label htmlFor="username">Nazwa użytkownika</label>
        <Input
          onChange={e => setUsername(e.target.value)}
          value={username}
          id="username"
          className=" mb-4"
        />
        <label htmlFor="password">Hasło</label>
        <Input
          onChange={e => setPassword(e.target.value)}
          value={password}
          id="password"
        />
        <Button onClick={handleLogin} className="mt-8 self-end">
          Zaloguj się
        </Button>
      </div>
    </div>
  );
};

export default Login;
