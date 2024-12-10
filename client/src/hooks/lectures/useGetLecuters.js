import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useGetLectures = (courseId) => {
  console.log(courseId);
  const queryKey = "lectures";

  const fetchLectures = async () => {
    try {
      const response = await axiosInstance.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/course/get-course-lectures/${courseId}`
      );
      return response.data.lectures;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch lectures");
    }
  };
  const queryFn = fetchLectures;
  const query = useQuery({ queryKey, queryFn, staleTime: "infinity" });
  return query;
};

export default useGetLectures;
