import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/authApi";
import { queryClient } from "../main";

const useUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return mutation;
};

export default useUpdateUser;
