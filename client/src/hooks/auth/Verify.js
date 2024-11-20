import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const useVerifyEmailMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutationFn = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/verify`,
        {
          code: data,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Verification failed");
    }
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Email verification successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return mutation;
};

export default useVerifyEmailMutation;
