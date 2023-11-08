import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../api/User";
import { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("user") !== null;

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

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Błąd",
      description: "Podałeś nieprawidłowe dane do logowania",
    });
  };

  return (
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
        <Link to="/register" className="absolute top-6 right-6">
          <Button variant="link">Stwórz konto</Button>
        </Link>
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl font-semibold tracking-tight mb-3">
            Zaloguj się
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Wpisz nazwę użytkownika oraz ustawione wcześniej hasło
          </p>
          <Input
            onChange={e => setUsername(e.target.value)}
            value={username}
            id="username"
            className=" mb-4"
            placeholder="Nazwa użytkownika"
          />
          <Input
            onChange={e => setPassword(e.target.value)}
            value={password}
            id="password"
            placeholder="Hasło"
            type="password"
          />
          <Button onClick={handleLogin} className="mt-6 self-end">
            Zaloguj się
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Login;
