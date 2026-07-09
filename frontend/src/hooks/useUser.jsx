import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/authApi";

const useUser = () => {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  return userQuery;
};

export default useUser;
