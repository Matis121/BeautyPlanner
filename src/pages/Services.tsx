import { useServiceStore } from "../stores/store";
import BasicLayout from "@/layout/BasicLayout";
import ServiceTable from "@/components/sevice/ServiceTable";
import ServiceForm from "@/components/sevice/ServiceForm";

const Services = () => {
  const services = useServiceStore(state => state.services);

  return (
    <>
      <BasicLayout>
        <section
          className={`flex flex-col w-full h-full bg-neutral-100 ${
            services.length === 0 ? "items-center justify-center" : ""
          }`}
        >
          {services.length > 0 ? <ServiceForm /> : null}
          {services.length === 0 ? (
            <div className="flex flex-col justify-center items-center p-12 rounded-xl">
              <p className=" text-2xl font-light text-neutral-600">
                Dodaj pierwszą usługe do bazy
              </p>
              <ServiceForm />
            </div>
          ) : (
            <ServiceTable />
          )}
        </section>
      </BasicLayout>
    </>
  );
};

export default Services;
