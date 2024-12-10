import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useCreateLecture from "@/hooks/lectures/useCreateLecture";
import Lectures from "./components/Lectures";
import useGetLectures from "@/hooks/lectures/useGetLecuters";

const CreateLecture = () => {
  const [title, setTitle] = useState("");
  const { id } = useParams();
  console.log(id);
  const isLoading = false;
  const navigate = useNavigate();
  const { mutate: createLecture } = useCreateLecture();
  const { data: lectures } = useGetLectures(id);
  const handleSubmit = (e) => {
    e.preventDefault();
    createLecture({ courseId: id, lectureTitle: title });
    console.log({ title });
  };

  return (
    <div className="container  p-6">
      <Card className="w-full ">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6" />
            Create New Lecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Lecture Title</Label>
              <Input
                id="title"
                placeholder="Enter lecture title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to course
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                {isLoading ? (
                  <Loader2 size={16} className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" /> create lecture
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <Lectures lectures={lectures} />
      </Card>
    </div>
  );
};

export default CreateLecture;
