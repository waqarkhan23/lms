import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Edit2 } from "lucide-react";
import useGetCoursesQuery from "@/hooks/courses/useGetAllCourses";

const AddCourse = () => {
  const navigate = useNavigate();
  const { data: allCourses } = useGetCoursesQuery();

  const handleAddNewCourse = () => {
    navigate("/admin/courses/create-course");
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Lets Add Some Courses
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Manage your course catalog and create new learning experiences.
        </p>
        <Button
          onClick={handleAddNewCourse}
          className="flex items-center gap-2"
        >
          <PlusCircle size={18} />
          <span>Create a new course</span>
        </Button>
      </div>
      <div className="overflow-x-hidden w-full">
        <Table>
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Course Title</TableHead>
              <TableHead className="w-[20%]">Price</TableHead>
              <TableHead className="w-[20%]">Status</TableHead>
              <TableHead className="w-[20%]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allCourses && allCourses.length === 0 ? (
              "No Courses Right Now"
            ) : (
              <>
                {" "}
                {allCourses?.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell className="font-medium">
                      {course.courseTitle}
                    </TableCell>
                    <TableCell>
                      {course.coursePrice
                        ? `$${course.coursePrice.toFixed(2)}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={course.isPublished ? "success" : "secondary"}
                        className="px-2 py-1 text-xs"
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() =>
                          navigate(`/admin/courses/edit-course/${course._id}`)
                        }
                      >
                        <Edit2 size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddCourse;
