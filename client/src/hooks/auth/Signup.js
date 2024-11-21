import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mutationFn = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        data
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "An error occurred during sign up"
        );
      } else if (error.request) {
        throw new Error("No response received from server");
      } else {
        throw new Error("Error setting up the request");
      }
    }
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "Sign Up Successful",
        description: "Check your email for a verification Code",
      });
      navigate("/verify");
    },
    onError: (error) => {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        appearance: "error",
        variant: "destructive",
      });
    },
  });
  return mutation;
};

export default useSignUpMutation;
