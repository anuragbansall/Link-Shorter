import { useNavigate } from "react-router";
import { updateLink } from "../api/linkApi";

const useUpdateLink = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateLink,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  return mutation;
};

export default useUpdateLink;
