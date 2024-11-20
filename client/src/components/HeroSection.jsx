import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center  ">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Courses For You
        </h1>
        <p className="text-gray-200 dark:to-gray-400 mb-8">
          Discover ,Learn, and Upskill with our wide range of courses
        </p>
        <form
          action=""
          className=" max-w-xl mx-auto mb-6 dark:bg-gray-800 bg-white flex items-center rounded-full shadow-lg overflow-hidden"
        >
          <Input
            type="text"
            placeholder="Search course..."
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900  dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button className="bg-blue-600 dark:bg-gray-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">
            Search
          </Button>
        </form>
        <Button className="bg-white dark:bg-gray-800 rounded-full text-blue-600 hover:text-white ">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
