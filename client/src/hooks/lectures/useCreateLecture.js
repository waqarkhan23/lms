import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const useCreateLecture = () => {
  const mutationFn = async (data) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/course/create-lecture`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const mutation = useMutation({ mutationFn });
  return mutation;
};

export default useCreateLecture;
