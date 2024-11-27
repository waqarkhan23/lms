import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 4000, revenue: 2400 },
  { name: "Feb", sales: 3000, revenue: 1398 },
  { name: "Mar", sales: 2000, revenue: 9800 },
  { name: "Apr", sales: 2780, revenue: 3908 },
  { name: "May", sales: 1890, revenue: 4800 },
  { name: "Jun", sales: 2390, revenue: 3800 },
  { name: "Jul", sales: 3490, revenue: 4300 },
];

const Analytics = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Total Sales
            </CardTitle>
            <Badge className="bg-white text-indigo-600 text-xs sm:text-sm">
              Last 30 days
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-5xl font-extrabold mb-2">
              1,234
            </div>
            <div className="flex items-center text-sm">
              <ArrowUpIcon className="mr-2 h-4 w-4 text-green-400" />
              <span className="text-green-400">12%</span>
              <span className="ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-pink-500 to-rose-600 text-white">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              Total Revenue
            </CardTitle>
            <Badge className="bg-white text-rose-600 text-xs sm:text-sm">
              This Year
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-5xl font-extrabold mb-2">
              $89,742
            </div>
            <div className="flex items-center text-sm">
              <ArrowDownIcon className="mr-2 h-4 w-4 text-red-400" />
              <span className="text-red-400">3%</span>
              <span className="ml-2">from last year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-4 sm:p-6">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Sales & Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300} className="mt-4">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ fill: "#82ca9d", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
