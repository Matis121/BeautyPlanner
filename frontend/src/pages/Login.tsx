import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../api/User";
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

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

  // FETCH DATA

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/login/success`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // LOGIN TO APP
  const submitData = async (data: any) => {
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
      <div className="w-1/2 h-screen linear-gradient hidden md:block">
        <div className="p-10 w-fit">
          <p className="logo font-bold text-2xl p-4 bg-white rounded-lg">
            BeautyPlanner
          </p>
        </div>
      </div>
      <div className="w-full h-screen flex items-center justify-center flex-col relative md:w-1/2">
        <p className="logo font-bold text-2xl absolute top-6 left-6 md:hidden">
          BeautyPlanner
        </p>
        <Toaster />
        <Link to="/register" className="absolute top-6 right-6">
          <Button variant="link">Stwórz konto</Button>
        </Link>
        <div className="flex justify-center items-center flex-col relative">
          <div className="flex items-center flex-col rounded-md bg-green-200 py-3 px-8 opacity-75 mb-10">
            <span className="font-semibold text-lg text-green-900 mb-1">
              Konto testowe
            </span>
            <p className="text-green-900">Login: test2024</p>
            <p className="text-green-900">Hasło: test2024</p>
          </div>
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
            <Button type="submit" className="mt-4 self-end">
              Zaloguj się
            </Button>
            <Link to="/forgotPassword" className=" self-center">
              <Button className="mb-2 mt-4" variant="link">
                Zapomniałeś hasło?
              </Button>
            </Link>
          </form>
          <div className="line my-8">
            <span className="text-muted-foreground px-4 bg-white">
              Zaloguj się przy pomocy
            </span>
          </div>
          <form
            action={`${import.meta.env.VITE_SERVER_URL}/auth/google/`}
            method="get"
            className="w-full"
          >
            <Button className="w-full" variant="outline">
              <FcGoogle size={25} className="mr-2" />
              Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
