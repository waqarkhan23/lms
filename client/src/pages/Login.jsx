import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import useLoginMutation from "../hooks/auth/Login";
import useSignUpMutation from "@/hooks/auth/Signup";

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { mutate } = useLoginMutation();
  const { mutate: signup } = useSignUpMutation();

  const handleLoginInputChange = (event, type) => {
    if (type === "login") {
      setLoginInput({ ...loginInput, [event.target.id]: event.target.value });
    } else {
      setSignupInput({ ...signupInput, [event.target.id]: event.target.value });
    }
  };
  const handleSubmit = (type) => {
    let inputData = {};
    if (type === "login") {
      inputData = loginInput;
      mutate(inputData);
    } else {
      inputData = signupInput;
      signup(inputData);
      console.log("Signup submitted with:", inputData);
    }
  };
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account to access our services. Fill in your
                details below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => handleLoginInputChange(e, "signup")}
                  id="name"
                  placeholder="Eg. John"
                  required="true"
                  value={signupInput.name}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@domain.com"
                  required="true"
                  onChange={(e) => handleLoginInputChange(e, "signup")}
                  value={signupInput.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => handleLoginInputChange(e, "signup")}
                  type="password"
                  id="password"
                  required="true"
                  value={signupInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit("signup")}>Sign up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Welcome Back</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  onChange={(e) => handleLoginInputChange(e, "login")}
                  value={loginInput.email}
                  type="email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={loginInput.password}
                  onChange={(e) => handleLoginInputChange(e, "login")}
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubmit("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
