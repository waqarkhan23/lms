import Course from "@/components/Course";

const MyLearning = () => {
  const isLoading = false;
  const learningCourses = [1, 2];
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0 mt-20">
      <h1 className="font-bold text-2xl">My Learning</h1>
      <div className="my-5 ">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : learningCourses.length === 0 ? (
          <p>You are not enrolled in any course</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Course />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
