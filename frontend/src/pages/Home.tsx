import BasicLayout from "@/layout/BasicLayout";
import { useEffect, useState } from "react";

const Home = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);

  console.log(backendData);

  return (
    <BasicLayout>
      <p>Homepage</p>
    </BasicLayout>
  );
};

export default Home;
