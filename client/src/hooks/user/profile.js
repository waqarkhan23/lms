import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

const useGetUserProfileQuery = () => {
  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/profile`
      );
      return response.data.user;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to fetch user profile"
      );
    }
  };
  const queryFn = fetchUserProfile;
  const queryKey = "userProfile";
  return useQuery({ queryKey, queryFn, staleTime: "infinity" });
};

export default useGetUserProfileQuery;
