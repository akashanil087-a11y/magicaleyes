import { useEffect, useState, type ReactNode } from "react";
import { NotFoundPage } from "@/components/ui/404-page-not-found";

interface ConnectionGateProps {
  children: ReactNode;
}

export default function ConnectionGate({ children }: ConnectionGateProps) {
  const [online, setOnline] = useState<boolean>(() =>
    typeof navigator === "undefined" ? true : navigator.onLine
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!online) {
    return (
      <NotFoundPage
        title="You're offline"
        message="Looks like your internet connection is lost. Please check your network and try again."
        actionLabel="Try Again"
        onAction={() => window.location.reload()}
      />
    );
  }

  return <>{children}</>;
}
