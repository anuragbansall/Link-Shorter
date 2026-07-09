import useAnalytics from "@/hooks/useAnalytics";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdLink } from "react-icons/io";
import { TbHandClick } from "react-icons/tb";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);

  const { data, isLoading, isError, error } = useAnalytics();

  console.log(data?.data);

  useEffect(() => {
    if (data?.data) {
      setAnalyticsData([
        {
          logo: <IoMdLink />,
          title: "Total Links",
          value: data.data.totalLinks,
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          logo: <TbHandClick />,
          title: "Total Clicks",
          value: data.data.totalClicks,
          color: "bg-green-500/10 text-green-500",
        },
        {
          logo: <FaEye />,
          title: "Unique Visitors",
          value: data.data.totalUniqueClicks,
          color: "bg-purple-500/10 text-purple-500",
        },
      ]);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <main className="w-full pb-4">
      <div className="grid md:grid-cols-3 gap-6">
        {analyticsData.map((data, index) => (
          <div
            key={index}
            className="w-full p-6 border border-zinc-200 rounded-xl shadow-[0_0px_10px_rgba(0,0,0,0.05)] flex flex-col items-start relative overflow-hidden"
          >
            <span
              className={`${data.color} absolute right-2 bottom-2 text-[10rem] opacity-5 -rotate-10`}
            >
              {data.logo}
            </span>

            <span className={`p-4 ${data.color} rounded-xl text-2xl mb-4`}>
              {data.logo}
            </span>

            <h2 className="text-zinc-500">{data.title}</h2>
            <p className="text-3xl font-semibold text-zinc-800">{data.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Analytics;
