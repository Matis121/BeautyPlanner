import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCustomForm from "@/hooks/useClientForm";

const ClientForm = props => {
  const {
    open,
    setOpen,
    register,
    handleSubmit,
    errors,
    errorValue,
    onSubmit,
  } = useCustomForm();

  return (
    <div className={`${props.noPadding ? "p-0" : "p-4"}`}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Dodaj klienta</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Podstawowe dane klienta</DialogTitle>
            <DialogDescription>
              Po wypełnieniu wymaganych pól, nowy klient zostanie dodany bo
              bazy.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  Imię*
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName", { required: true })}
                  className={`col-span-3  ${
                    errors.firstName ? "border-red-500" : "null"
                  }`}
                  placeholder={`${errors.firstName ? errorValue : ""}`}
                  maxLength={20}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Nazwisko
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className="col-span-3"
                  maxLength={25}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Płeć
                </Label>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Wybierz płeć" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup {...register("gender")}>
                      <SelectItem value="woman">Kobieta</SelectItem>
                      <SelectItem value="man">Mężczyzna</SelectItem>
                      <SelectItem value="kid">Dziecko</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Telefon
                </Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className="col-span-3"
                  type="number"
                  maxLength={15}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="emailAddress" className="text-right">
                  E-mail
                </Label>
                <Input
                  id="emailAddress"
                  {...register("emailAddress", {
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="birthDay" className="text-right">
                  Data urodzenia
                </Label>
                <Input
                  id="birthDay"
                  {...register("birthDay")}
                  className="col-span-3"
                  type="date"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Anuluj
              </Button>
              <Button type="submit">Zapisz</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientForm;
