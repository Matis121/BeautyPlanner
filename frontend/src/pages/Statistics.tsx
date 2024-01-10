import BasicLayout from "@/layout/BasicLayout";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const Statistics = () => {
  // USER DATA
  // const userToken: string | null = localStorage.getItem("user") ?? "";
  // const userData = JSON.parse(userToken).username;

  // FETCH CLIENTS

  // VARIABLES

  // RANDOM DATA

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <BasicLayout>
      <section className="flex flex-col w-full h-full gap-6">
        <div className="px-1 flex items-center">
          <span className="text-2xl font-semibold leading-6 text-gray-700 mr-6">
            Statystyki
          </span>
        </div>
        <div className="overflow-y-auto w-full h-96 shadow-md rounded-md bg-white p-5 relative">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-4 text-xl">
            Wkrótce dostępne
          </span>
          <ResponsiveContainer className="blur-sm z-0">
            <AreaChart
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </BasicLayout>
  );
};

export default Statistics;
