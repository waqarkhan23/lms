import Course from "@/components/Course";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import useGetUserProfileQuery from "@/hooks/user/profile";
import useUpdateProfileMutation from "@/hooks/user/updateProfile";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const enrolledCourses = [1, 2, 3];
  const [userName, setUserName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: user, isLoading, refetch } = useGetUserProfileQuery();
  const { mutate: updateUserProfile, isLoading: updating } =
    useUpdateProfileMutation();
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  const updateProfile = () => {
    const formData = new FormData();
    formData.append("name", userName);
    if (profileImage) {
      formData.append("profilePhoto", profileImage);
    }
    updateUserProfile(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        refetch();
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0 mt-20">
      <h1 className="font-bold text-2xl text-center md:text-left">
        My Learning
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4">
        <div className="flex flex-col items-center">
          <Avatar className="cursor-pointer h-24 w-24 md:h-32 md:w-32 ">
            <AvatarImage src={user?.photoUrl} alt="@shadcn" />
            <AvatarFallback className="text-5xl">
              {user?.name.split("")[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="font-semibold text text-gray-900 dark:text-gray-100 ">
            Name:{" "}
            <span className=" font-normal text-gray-900 dark:text-gray-100">
              {user?.name}
            </span>
          </div>
          <div className="font-semibold text text-gray-900 dark:text-gray-100 ">
            Email:{" "}
            <span className=" font-normal text-gray-900 dark:text-gray-100">
              {user?.email}
            </span>
          </div>
          <div className="font-semibold text text-gray-900 dark:text-gray-100 ">
            Role:{" "}
            <span className=" font-normal text-gray-900 dark:text-gray-100">
              {user?.role}
            </span>
          </div>
          <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  onClick={() => {
                    setUserName(user?.name || "");
                    setIsDialogOpen(true);
                  }}
                >
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile information here.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label>Name</label>
                    <input
                      type="text"
                      value={userName}
                      placeholder="User Name"
                      className="col-span-3"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label>Profile image</label>
                    <input
                      onChange={(e) => setProfileImage(e.target.files[0])}
                      type="file"
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={updateProfile} disabled={isLoading}>
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        wait{" "}
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h1
          className=" font-medium text-lg my-2
        "
        >
          Course you are enrolled{" "}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
          {user?.enrolledCourses.length <= 0 ? (
            <p> You have not enrolled in any course</p>
          ) : (
            enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0 mt-20">
      <Skeleton className="w-48 h-8 mb-4" />
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4">
        <div className="flex flex-col items-center">
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24 mt-2" />
        </div>
      </div>
      <div className="mt-8">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((_, index) => (
            <CourseSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
};

export default Profile;
