import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/authApi";
import { useNavigate } from "react-router";
import { queryClient } from "../main";

const useLogout = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  return mutation;
};

export default useLogout;
