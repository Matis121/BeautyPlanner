import { useServiceStore } from "../stores/store";
import { useForm } from "react-hook-form";

const AddNewServices = props => {
  const addService = useServiceStore(state => state.addService);

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    formState: { errors },
  } = useForm({});
  const errorValue = "This field is required";

  const onSubmit = () => {
    const serviceStructure = {
      id: crypto.randomUUID(),
      name: getValues("name"),
      price: getValues("price"),
      duration: getValues("duration"),
    };
    addService(serviceStructure);
    props.setShowAddServiceBox(false);
    resetField("name");
    resetField("price");
    resetField("duration");
  };

  return (
    <div
      className={`${
        props.showAddServiceBox === true ? "flex" : "hidden"
      } fixed w-full h-full bg-slate-500/60 items-center justify-center z-10`}
    >
      <div className="fixed flex flex-col gap-6 items-center justify-center bg-white p-24 rounded-xl z-10 drop-shadow-md">
        <button
          onClick={() => props.setShowAddServiceBox(false)}
          type="button"
          className="absolute top-3 right-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Close
        </button>
        <p className="text-lg">Add your new service</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="serviceName">Service name:</label>
          {errors.name && (
            <span className="text-xs mb-2 text-red-500">{errorValue}</span>
          )}
          <input
            type="text"
            {...register("name", { required: true })}
            id="serviceName"
            className={`focus:outline-none border rounded-md p-2 mr-2 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          <label htmlFor="servicePrice">Price:</label>
          {errors.price && (
            <span className="text-xs mb-2 text-red-500">{errorValue}</span>
          )}
          <input
            type="number"
            {...register("price", { required: true })}
            id="servicePrice"
            className={`focus:outline-none border rounded-md p-2 mr-2 ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          <label htmlFor="serviceDuration">Duration:</label>
          {errors.duration && (
            <span className="text-xs mb-2 text-red-500">{errorValue}</span>
          )}
          <input
            type="number"
            {...register("duration", { required: true })}
            id="serviceDuration"
            className={`focus:outline-none border rounded-md p-2 mr-2 ${
              errors.duration ? "border-red-500" : ""
            }`}
          />
          <input
            value={"Add service"}
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          />
        </form>
      </div>
    </div>
  );
};

export default AddNewServices;
