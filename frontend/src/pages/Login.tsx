import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../api/User";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("user") !== null;

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  // TOAST
  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      title: "Błąd",
      description: "Podałeś nieprawidłowe dane do logowania",
    });
  };

  // ZOD WITH REACT HOOK FORM
  const schema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  // LOGIN TO APP
  const submitData = async data => {
    const user = await postLogin(data);
    if (user.token) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      toastEvent();
    }
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
          <form
            onSubmit={handleSubmit(submitData)}
            className="w-full flex flex-col"
          >
            <Input
              {...register("username")}
              className="mb-4"
              placeholder="Nazwa użytkownika"
            />
            <Input
              {...register("password")}
              placeholder="Hasło"
              type="password"
            />
            <Button type="submit" className="mt-6 self-end">
              Zaloguj się
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
