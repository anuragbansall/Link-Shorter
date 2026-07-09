import { getAnalytics } from "@/api/analyticsApi";
import { useQuery } from "@tanstack/react-query";

const useAnalytics = () => {
  const analyticsQuery = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  return analyticsQuery;
};

export default useAnalytics;
