import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";

const useUpdateProfileMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutationFn = async (data) => {
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/profile/update`,

        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  return useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully!",
        isClosable: true,
      });
      queryClient.invalidateQueries("userProfile");
    },
    onError: (error) => {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
        isClosable: true,
      });
    },
  });
};

export default useUpdateProfileMutation;
