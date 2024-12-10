import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useGetCourseByIdQuery = ({ id }) => {
  const queryKey = "getCourseById";

  const fetchCourseById = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/course/get-course/${id}`
      );
      return response.data.course;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to fetch course by ID"
      );
    }
  };
  const queryFn = fetchCourseById;
  const query = useQuery({ queryKey, queryFn, staleTime: "infinity" });
  return query;
};

export default useGetCourseByIdQuery;
