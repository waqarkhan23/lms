/* eslint-disable react/prop-types */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const Lectures = ({ lectures = [] }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Course Lectures</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture, index) => (
          <Card
            key={lecture.id}
            className="overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800"
          >
            <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-6">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold tracking-wide">
                  Lecture {index + 1}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="text-xl font-extrabold mb-4 text-gray-800 dark:text-white">
                {lecture.lectureTitle}
              </h3>
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-gray-300 text-gray-600 hover:border-purple-500 hover:text-purple-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-purple-400 dark:hover:text-purple-400"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {lectures.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl">No lectures available for this course.</p>
          <Button className="mt-4">Add Your First Lecture</Button>
        </div>
      )}
    </div>
  );
};

export default Lectures;
