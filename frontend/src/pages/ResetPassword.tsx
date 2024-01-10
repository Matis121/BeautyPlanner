import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/User";
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import i18next from "i18next";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pl/zod.json";

const ResetPassword = () => {
  const { token }: any = useParams();
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
      title: "Udało się!",
      description: "Twoje hasło do konta zostało zaktualizowane.",
    });
  };

  // ZOD TRANSLATION
  i18next.init({
    lng: "pl",
    resources: {
      pl: { zod: translation },
    },
  });
  z.setErrorMap(zodI18nMap);

  // ZOD WITH REACT HOOK FORM
  const schema = z
    .object({
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

  // LOGIN TO APP
  const submitData = async (data: any) => {
    const user = await resetPassword(data, token);
    if (user.success) {
      toastEvent();
      reset();
      navigate("/login");
    } else {
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
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl font-semibold tracking-tight mb-3">
            Nowe hasło
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Ustal nowe hasło dla swojego konta
          </p>
          <form
            onSubmit={handleSubmit(submitData)}
            className="w-full flex flex-col"
          >
            <Input
              {...register("password")}
              className="mb-3 w-80"
              placeholder="Nowe hasło"
              type="password"
            />
            {errors.password && typeof errors.password.message === "string" && (
              <p className="text-sm text-muted-foreground -mt-2 mb-2 text-red-500">
                {errors.password.message}
              </p>
            )}
            <Input
              {...register("confirmPassword")}
              className="mb-3 w-80"
              placeholder="Powtórz nowe hasło"
              type="password"
            />
            {errors.confirmPassword &&
              typeof errors.confirmPassword.message === "string" && (
                <p className="text-sm text-muted-foreground -mt-2 mb-2 text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            <Button type="submit" className="mt-3 self-end">
              Zapisz
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
