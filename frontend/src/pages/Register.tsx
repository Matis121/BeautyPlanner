import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { registerUser } from "../api/User";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  // TOAST
  const { toast } = useToast();
  const toastEvent = () => {
    toast({
      description: "Konto zostało utworzone w systemie",
    });
  };

  // ZOD
  const schema = z
    .object({
      username: z.string().min(4).max(30),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Hasło nie jest identyczne",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // CREATE NEW ACCOUNT
  const submitData = async data => {
    const res = await registerUser(data);
    if (res.success) {
      console.log(res.success);
      toastEvent();
      reset();
    } else {
      console.log(res.error);
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
          <form onSubmit={handleSubmit(submitData)} className="w-full">
            <Input
              className=" mb-3"
              placeholder="Nazwa użytkownika"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-sm text-muted-foreground -mt-2 mb-2 text-red-500">
                {errors.username.message}
              </p>
            )}
            <Input
              className=" mb-3"
              placeholder="Hasło"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-muted-foreground -mt-2 mb-2 text-red-500">
                {errors.password.message}
              </p>
            )}
            <Input
              className=" mb-3"
              placeholder="Powtórz hasło"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-muted-foreground -mt-2 mb-2 text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
            <Button className="w-full" type="submit">
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
