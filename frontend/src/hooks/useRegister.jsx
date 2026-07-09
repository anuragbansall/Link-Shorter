import { QueryClient, useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router";
import { queryClient } from "../main";

const useRegister = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard");
    },
  });

  return mutation;
};

export default useRegister;
