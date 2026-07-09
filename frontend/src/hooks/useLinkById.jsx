import { useQuery } from "@tanstack/react-query";
import { getLinkById } from "../api/linkApi";

const useLinkById = (id) => {
  const linkByIdQuery = useQuery({
    queryKey: ["linkById", id],
    queryFn: () => getLinkById(id),
    enabled: !!id,
  });

  return linkByIdQuery;
};

export default useLinkById;
