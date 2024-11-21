import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://miro.medium.com/v2/resize:fit:1000/1*KDMx1YspSrBcFJG-NDZgDg.png"
          alt="nexxtjs logo"
          className="w-full h-36 rounded-t-lg object-cover"
        />
        <CardContent className="px-5 py-4 space-y-3 ">
          <h1 className="hover:underline font-bold truncate text-lg">
            Next js Complete Course in Hindi
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="cursor-pointer h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className=" font-medium text-sm">Instructor</h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              Medium
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>Rs 5,000</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Course;
