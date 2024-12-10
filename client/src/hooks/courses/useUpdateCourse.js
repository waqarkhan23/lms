import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";
const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
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

      return response.data;
    } catch (error) {
      throw new Error(error.message || "Failed to update course");
    }
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "Course updated successfully",
        description: "Your course has been updated successfully!",
      });
      queryClient.invalidateQueries("addedCourses");
      navigate("/admin/courses");
    },
  });
};

export default useUpdateCourse;
