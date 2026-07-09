import React, { useEffect, useState } from "react";
import Button from "../../Components/Common/Button";
import Avatar from "../../Components/Common/Avatar";
import { IoMdLink } from "react-icons/io";
import { TbHandClick } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import { Link } from "react-router";
import useAnalytics from "@/hooks/useAnalytics";
import useLinks from "@/hooks/useLinks.";

function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState([]);

  const { data: user, isLoading, isError } = useUser();
  const {
    data: analytics,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
    error: analyticsError,
  } = useAnalytics();
  const {
    data: links,
    isLoading: isLinksLoading,
    isError: isLinksError,
    error: linksError,
  } = useLinks();

  useEffect(() => {
    if (analytics?.data) {
      setAnalyticsData([
        {
          logo: <IoMdLink />,
          title: "Total Links",
          value: analytics.data.totalLinks,
          color: "bg-blue-500/10 text-blue-500",
        },
        {
          logo: <TbHandClick />,
          title: "Total Clicks",
          value: analytics.data.totalClicks,
          color: "bg-green-500/10 text-green-500",
        },
        {
          logo: <FaEye />,
          title: "Unique Visitors",
          value: analytics.data.totalUniqueClicks,
          color: "bg-purple-500/10 text-purple-500",
        },
      ]);
    }
  }, [analytics]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading user data.</p>;
  }

  return (
    <main className="w-full pb-4">
      <header className="w-full p-6 md:p-10 bg-blue-500/5 flex items-center gap-8 border border-blue-500/10 rounded-xl">
        <Avatar className="scale-180 hidden md:flex">
          {user?.data?.username?.charAt(0)?.toUpperCase() || "U"}
        </Avatar>

        <div className="flex flex-col gap-2 min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-zinc-800 truncate min-w-0 max-w-full">
            Welcome back,{" "}
            <span className="text-blue-500 capitalize block md:inline truncate max-w-full">
              {user?.data?.username || "User"} !
            </span>
          </h1>
          <p className="text-zinc-500">Welcome to your dashboard!</p>
          <Link
            to="/dashboard/create-link"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 w-max hover:bg-blue-600 transition-colors"
          >
            Create New Link
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6 my-8">
        {analyticsData.length === 0 ? (
          <div className="col-span-3 text-center py-8">
            {isAnalyticsLoading ? (
              <p className="text-zinc-500">Loading analytics...</p>
            ) : isAnalyticsError ? (
              <p className="text-red-500">
                Error fetching analytics: {analyticsError.message}
              </p>
            ) : (
              <p className="text-zinc-500">No analytics data available.</p>
            )}
          </div>
        ) : (
          analyticsData.map((data, index) => (
            <div
              key={index}
              className="w-full p-6 border border-zinc-200 rounded-xl shadow-[0_0px_10px_rgba(0,0,0,0.05)] flex flex-col items-start"
            >
              <span className={`p-4 ${data.color} rounded-xl text-2xl mb-4`}>
                {data.logo}
              </span>

              <h2 className="text-zinc-500">{data.title}</h2>
              <p className="text-3xl font-semibold text-zinc-800">
                {data.value}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="w-full rounded-xl border border-zinc-200 shadow-[0_0px_10px_rgba(0,0,0,0.05)] my-8">
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <h2 className="text-zinc-800 font-semibold text-lg">Recent Links</h2>
          <Link to="/dashboard/my-links">View All</Link>
        </div>

        <div className="w-full">
          {links?.data?.length === 0 ? (
            <div className="col-span-3 text-center py-8">
              {isLinksLoading ? (
                <p className="text-zinc-500">Loading links...</p>
              ) : isLinksError ? (
                <p className="text-red-500">
                  Error fetching links: {linksError.message}
                </p>
              ) : (
                <p className="text-zinc-500">No links available.</p>
              )}
            </div>
          ) : (
            links?.data
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((link) => (
                <div
                  key={link._id}
                  className="flex items-center gap-4 px-6 py-4 border-t border-b border-zinc-200 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <span className="p-3 bg-blue-500/10 text-blue-500 rounded-xl text-xl">
                    <IoMdLink />
                  </span>

                  <div className="flex flex-col gap-2 grow min-w-0">
                    <a
                      className="text-zinc-800 font-medium truncate hover:text-blue-500 transition-colors"
                      href={link.shortLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.shortLink}
                    </a>

                    <a
                      className="text-zinc-500 text-sm truncate hover:text-blue-500 transition-colors"
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.originalUrl}
                    </a>
                  </div>

                  <div className="flex-col gap-2 ml-auto shrink-0 hidden md:flex">
                    <p className="text-zinc-800 font-medium">
                      {link.analytics?.totalClicks || "N/A"} Clicks
                    </p>

                    <p className="text-zinc-500 text-sm truncate">
                      {link.analytics?.totalUniqueClicks || "N/A"} Unique
                      Visitors
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
