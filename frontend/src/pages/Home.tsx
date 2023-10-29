import BasicLayout from "@/layout/BasicLayout";
import { getClients } from "../api/User";
import { useEffect } from "react";

const Home = () => {
  const userToken = localStorage.getItem("user");
  const userData = JSON.parse(userToken).username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getClients(userData);
        console.log(result);
        // handle the result here, such as setting it to a state variable
      } catch (error) {
        // handle errors here
        console.error("Error fetching clients:", error);
      }
    };

    fetchData();
  }, [userData]);

  return (
    <BasicLayout>
      <p>Homepage</p>
    </BasicLayout>
  );
};

export default Home;
