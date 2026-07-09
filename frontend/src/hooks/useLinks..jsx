import { useQuery } from "@tanstack/react-query";
import { getAllLinks } from "../api/linkApi";

const useLinks = () => {
  const linksQuery = useQuery({
    queryKey: ["links"],
    queryFn: getAllLinks,
  });

  return linksQuery;
};

export default useLinks;
