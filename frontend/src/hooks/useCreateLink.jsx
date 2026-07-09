import { useNavigate } from "react-router";
import { createLink } from "../api/linkApi";
import { useMutation } from "@tanstack/react-query";

const useCreateLink = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      navigate("/dashboard/my-links");
    },
  });

  return mutation;
};

export default useCreateLink;
