import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  const mutationFn = async ({ data, id }) => {
    console.log("Updating course", data, id);
    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_BASE_URL}/course/update-course/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      queryClient.invalidateQueries("addedCourses");
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to update course");
    }
  };

  return useMutation({ mutationFn });
};

export default useUpdateCourse;
