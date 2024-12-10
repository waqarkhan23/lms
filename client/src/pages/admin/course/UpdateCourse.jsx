import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import RichTextEditor from "@/components/RichTextEditor";
import useUpdateCourse from "@/hooks/courses/useUpdateCourse";
import useDeleteCourse from "@/hooks/courses/useDeleteCourse";
import useGetCourseByIdQuery from "@/hooks/courses/useGetCourseById";
const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: editCourse } = useUpdateCourse();
  const [previewImage, setPreviewImage] = useState("");
  const { mutate: deleteCourse } = useDeleteCourse();
  const { data: courseData } = useGetCourseByIdQuery({ id: id });
  const [course, setCourse] = useState({
    title: courseData?.courseTitle || "",
    subtitle: courseData?.subTitle || "",
    description: courseData?.description || "",
    price: courseData?.coursePrice || "",
    level: courseData?.courseLevel || "",
    category: courseData?.category || "",
    // status: "",
    thumbnail: null,
  });

  console.log("Course data:", course);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse({ ...course, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleDelete = () => {
    console.log("Deleting course:", id);
    deleteCourse(
      { id: id },
      {
        onSuccess: () => {
          navigate("/admin/courses");
        },
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseTitle", course.title);
    formData.append("subTitle", course.subtitle);
    formData.append("description", course.description);
    formData.append("coursePrice", course.price);
    formData.append("courseLevel", course.level);
    formData.append("category", course.category);
    formData.append("courseThumbnail", course.thumbnail);

    editCourse({ data: formData, id: id });
    console.log("Updated course:", course);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Update Course</h1>
      <p className="text-center text-gray-600 mb-8">
        Update your course information below. Make sure to fill in all the
        necessary details to keep your course up-to-date.
      </p>
      <div className="flex justify-center mb-8">
        <Button asChild variant="outline" className="w-full max-w-md">
          <Link to={`/admin/courses/edit-course/${id}/lecture`}>
            Go to Lectures Page
          </Link>
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Course Details</CardTitle>
          <div className=" flex gap-2">
            <Button>Publish</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-2 border-red-500
                  text-red-500 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Course
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white dark:bg-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-bold">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
                    This action cannot be undone. This will permanently delete
                    the course and remove all associated data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete()}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Yes, delete course
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Course Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={course.subtitle}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <RichTextEditor input={course} setInput={setCourse} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Course Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={course.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Course Level</Label>
                <Select
                  name="level"
                  onValueChange={(value) =>
                    setCourse({ ...course, level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setCourse({ ...course, category: value })
                }
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="frontend">
                    Frontend Web Development
                  </SelectItem>
                  <SelectItem value="backend">Backend Development</SelectItem>
                  <SelectItem value="fullstack">
                    Full Stack Web Development
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="status">Course Status</Label>
              <Select
                name="status"
                onValueChange={(value) =>
                  setCourse({ ...course, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Course Thumbnail</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {previewImage && (
                <>
                  <img src={previewImage} alt="" className="w-64 m-4" />
                </>
              )}
            </div>

            <Button type="submit" className="w-full">
              Update Course
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateCourse;
