import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "../use-toast";
const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutationFn = async ({ id }) => {
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_BASE_URL}/course/delete-course/${id}`
      );
      queryClient.invalidateQueries("addedCourses");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete course"
      );
    }
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "Course deleted",
        description: "The course has been deleted successfully!",
        variant: "success",
        isClosable: true,
      });
    },
  });
  return mutation;
};

export default useDeleteCourse;
