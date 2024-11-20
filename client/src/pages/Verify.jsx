import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import useVerifyEmailMutation from "@/hooks/auth/Verify";
import { useToast } from "@/hooks/use-toast";

function Verify() {
  const [otp, setOtp] = useState("");
  const {
    mutate: sendOTP,
    isLoading,
    isError,
    error,
  } = useVerifyEmailMutation();
  const { toast } = useToast();

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    sendOTP(otp, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Email verified successfully!",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description:
            error.message || "Failed to verify email. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Please enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            className="justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {isError && (
            <p className="text-red-500 text-sm mt-2">
              {error?.message || "An error occurred. Please try again."}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={otp.length !== 6 || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Verify;
