import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice/authSlice";
import { useNavigate } from "react-router-dom";

const useLogoutMutation = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutationFn = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`);
    } catch (error) {
      throw new Error(error.response.data.message || "Failed to log out");
    }
  };
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch(logout(null));
      localStorage.removeItem("token");
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return mutation;
};

export default useLogoutMutation;
