import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router";
import { queryClient } from "../main";

const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard");
    },
  });

  return mutation;
};

export default useLogin;
