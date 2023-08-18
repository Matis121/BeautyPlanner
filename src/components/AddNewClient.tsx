import React from 'react';
import { useClientStore } from "../stores/store";
import { useForm } from "react-hook-form";

const AddNewClient = (props) => {
  const addClient = useClientStore((state) => state.addClient);
  const clientStore = useClientStore((state) => state.clients);

  const {register, handleSubmit, getValues, resetField, formState:{ errors }} = useForm({});
  const errorValue = "This field is required";

  const onSubmit = () => {
    const clientStructure = {
      id: crypto.randomUUID(),
      firstName: getValues("firstName"),
      surName: getValues("lastName"),
      phoneNumber: getValues("phoneNumber")
    };
    addClient(clientStructure);
    props.setShowAddClientBox(false);
    resetField("firstName");
    resetField("lastName");
    resetField("phoneNumber");
  }

  return (
    <div className={`${props.showAddClientBox === true ? "flex" : "hidden" } fixed w-full h-full bg-slate-500/60 items-center justify-center z-10`}>
      <div className="fixed flex flex-col gap-6 items-center justify-center bg-white p-24 rounded-xl z-10 drop-shadow-md">
        <button onClick={() => props.setShowAddClientBox(false)} type="button" className="absolute top-3 right-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Close</button>
        <p className='text-lg'>Add your new client</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="firstname">First name:</label>
          {errors.firstName && <span className='text-xs mb-2 text-red-500'>{errorValue}</span>}
          <input type="text" {...register("firstName", {required: true})}  id='firstName' className={`focus:outline-none border rounded-md p-2 mr-2 ${errors.firstName ? 'border-red-500' : ''}`} />
          <label htmlFor="lastName">Last name:</label>
          {errors.lastName && <span className='text-xs mb-2 text-red-500'>{errorValue}</span>}
          <input type="text" {...register("lastName", {required: true})} id='lastName' className={`focus:outline-none border rounded-md p-2 mr-2 ${errors.lastName ? 'border-red-500' : ''}`}/>
          <label htmlFor="phoneNumber">Phone number:</label>
          {errors.phoneNumber && <span className='text-xs mb-2 text-red-500'>{errorValue}</span>}
          <input type="number" {...register("phoneNumber", {required: true})} id='phoneNumber' className={`focus:outline-none border rounded-md p-2 mr-2 ${errors.phoneNumber ? 'border-red-500' : ''}`}/>
          <input type='submit' value={"Add client"}  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" />
        </form>
      </div>
    </div>
  )
}

export default AddNewClient;