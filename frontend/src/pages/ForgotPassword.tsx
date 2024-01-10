import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/User";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuArrowLeft } from "react-icons/lu";
import i18next from "i18next";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pl/zod.json";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("user") !== null;

  const [submitError, setSubmitError] = useState("");
  const [emailInput, setEmailInput] = useState("");

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
      description: "Wiadomość została przesłana na podany e-mail.",
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
  const schema = z.object({
    email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ERROR RESET
  useEffect(() => {
    setSubmitError("");
  }, [emailInput]);

  // LOGIN TO APP
  const submitData = async (data: any) => {
    const user = await forgotPassword(data);
    if (user.success) {
      toastEvent();
      reset();
    } else {
      setSubmitError(user.error);
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
          <Button variant="link">
            <LuArrowLeft className="mr-1" />
            Wróć
          </Button>
        </Link>
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-2xl font-semibold tracking-tight mb-3">
            Zapomniałem hasło
          </h1>
          <p className="text-sm text-muted-foreground mb-6 w-80 text-center">
            Wpisz e-mail na który wysłana zostanie wiadomość pozwalające na
            ustawienie nowego hasła
          </p>
          <form
            onSubmit={handleSubmit(submitData)}
            className="w-full flex flex-col"
          >
            <Input
              {...register("email")}
              value={emailInput}
              onChange={e => {
                setEmailInput(e.target.value);
              }}
              className="w-80 mb-3"
              placeholder="E-mail"
              type="text"
            />
            {errors.email && errors.email.message === "string" && (
              <p className="text-sm text-muted-foreground -mt-2 mb-2 text-red-500">
                {errors.email.message}
              </p>
            )}
            <p className="text-sm text-muted-foreground -mt-2 mb-2 text-red-500">
              {submitError}
            </p>
            <Button type="submit" className="mt-3 self-end">
              Wyślij
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
