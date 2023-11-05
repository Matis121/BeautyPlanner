import BasicLayout from "@/layout/BasicLayout";
import ServiceTable from "@/components/service/ServiceTable";
import ServiceForm from "@/components/service/ServiceForm";
import { getUserServices } from "../api/User";
import { useQuery } from "react-query";

const Services = () => {
  // USER DATA
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  // FETCH DATA
  const { data } = useQuery(["services"], () => getUserServices(userData));

  if (!data) {
    return null;
  }

  return (
    <>
      <BasicLayout>
        <section
          className={`flex flex-col w-full h-full bg-neutral-100 ${
            data.length === 0 ? "items-center justify-center" : ""
          }`}
        >
          {data.length > 0 ? <ServiceForm /> : null}
          {data.length === 0 ? (
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
