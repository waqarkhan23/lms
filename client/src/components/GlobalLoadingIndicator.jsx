import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const GlobalLoadingIndicator = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isFetching || isMutating) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 200);

      return () => {
        clearInterval(timer);
      };
    } else {
      setProgress(100);
    }
  }, [isFetching, isMutating]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress
        value={progress}
        className="w-full h-1 transition-all duration-500 ease-in-out"
        style={{ opacity: isFetching || isMutating ? 1 : 0 }}
      />
      {(isFetching || isMutating) && (
        <div className="fixed bottom-4 right-4">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default GlobalLoadingIndicator;
