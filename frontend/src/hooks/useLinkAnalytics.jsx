import { getAnalyticsByLinkId } from "@/api/analyticsApi";
import { useQuery } from "@tanstack/react-query";

const useLinkAnalytics = () => {
  const linkAnalyticsQuery = useQuery({
    queryKey: ["link-analytics"],
    queryFn: getAnalyticsByLinkId,
  });

  return linkAnalyticsQuery;
};

export default useLinkAnalytics;
