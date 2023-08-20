import React from "react"
import { useClientStore } from "../stores/store"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AddNewClient = props => {
  const addClient = useClientStore(state => state.addClient)
  const clientStore = useClientStore(state => state.clients)

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({})
  const errorValue = "Pole obowiązkowe"

  const resetValues = () => {
    props.setShowAddClientBox(false)
    resetField("firstName")
    resetField("lastName")
    resetField("phoneNumber")
  }

  const onSubmit = () => {
    const clientStructure = {
      id: crypto.randomUUID(),
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      gender: getValues(),
      phoneNumber: getValues("phoneNumber"),
      mailAddress: getValues("emailAddress"),
      birthDay: getValues(),
      visits: {},
    }
    addClient(clientStructure)
    resetValues()
  }

  return (
    <div
      className={`${
        props.showAddClientBox === true ? "flex" : "hidden"
      } fixed w-full h-full bg-slate-500/60 items-center justify-center z-10`}
    >
      <div className="fixed flex flex-col gap-6 items-center justify-center bg-white p-24 rounded-xl z-10 drop-shadow-md">
        <Button
          variant="ghost"
          onClick={() => props.setShowAddClientBox(false)}
          className="absolute top-3 right-5"
        >
          Zamknij
        </Button>
        <p className="text-lg">
          <strong>Podstawowe dane klienta</strong>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="grid grid-cols-[110px_1fr] gap-x-8 gap-y-4">
            <label htmlFor="firstname" className="text-right">
              Imię
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                {...register("firstName", { required: true })}
                id="firstName"
                className={`focus:outline-none border rounded-md p-2 mr-2 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <span className="text-xs mb-2 text-red-500">{errorValue}</span>
              )}
            </div>
            <label htmlFor="lastName" className="text-right">
              Nazwisko
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                {...register("lastName")}
                id="lastName"
                className={`focus:outline-none border rounded-md p-2 mr-2 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <span className="text-xs mb-2 text-red-500">{errorValue}</span>
              )}
            </div>
            <label htmlFor="lastName" className="text-right">
              Płeć
            </label>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Wybierz płeć" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="woman">Kobieta</SelectItem>
                  <SelectItem value="man">Mężczyzna</SelectItem>
                  <SelectItem value="kid">Dziecko</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <label htmlFor="phoneNumber" className="text-right">
              Telefon
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                {...register("phoneNumber")}
                id="phoneNumber"
                className={`focus:outline-none border rounded-md p-2 mr-2 ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
              />
              {errors.phoneNumber && (
                <span className="text-xs mb-2 text-red-500">{errorValue}</span>
              )}
            </div>
            <label htmlFor="emailAddress" className="text-right">
              E-mail
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                {...register("emailAddress")}
                id="emailAddress"
                className={`focus:outline-none border rounded-md p-2 mr-2 ${
                  errors.emailAddress ? "border-red-500" : ""
                }`}
              />
              {errors.emailAddress && (
                <span className="text-xs mb-2 text-red-500">{errorValue}</span>
              )}
            </div>
            <label htmlFor="birthDay" className="text-right">
              Data urodzenia
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                {...register("birthDay")}
                id="birthDay"
                className={`focus:outline-none border rounded-md p-2 mr-2 ${
                  errors.birthDay ? "border-red-500" : ""
                }`}
              />
              {errors.birthDay && (
                <span className="text-xs mb-2 text-red-500">{errorValue}</span>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-8">
            <Button
              onClick={() => props.setShowAddClientBox(false)}
              className="mr-2"
            >
              Anuluj
            </Button>
            <Button type="submit" value={"Add client"}>
              Zapisz
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewClient
