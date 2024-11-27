import { QueryClient, useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const useAddNewCourseMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const mutationFn = async (courseData) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/course/create`,
        courseData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to add new course");
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "Course added successfully",
        description: "The course has been added to the system",
        appearance: "success",
      });
      queryClient.invalidateQueries("addedCourses");
      navigate("/admin/courses");
    },
    onError: (error) => {
      toast({
        title: "Failed to add course",
        description: error.message,
        appearance: "error",
      });
    },
  });
  return mutation;
};

export default useAddNewCourseMutation;
