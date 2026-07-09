import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { deleteLink } from "../api/linkApi";
import { queryClient } from "../main";

const useDeleteLink = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (id) => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      navigate("/dashboard/my-links");
    },
  });

  return mutation;
};

export default useDeleteLink;
