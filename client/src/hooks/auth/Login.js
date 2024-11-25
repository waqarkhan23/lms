import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

const useLoginMutation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutationFn = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        data
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      navigate("/");
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useLoginMutation;
