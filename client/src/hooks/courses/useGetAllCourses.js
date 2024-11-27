import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

const useGetCoursesQuery = () => {
  const queryKey = "addedCourses";
  const fetchAddedCourses = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/course/allCourses`
      );
      return response.data.courses;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch added courses");
    }
  };
  const queryFn = fetchAddedCourses;

  const query = useQuery({ queryKey, queryFn, staleTime: "infinity" });
  return query;
};
export default useGetCoursesQuery;
