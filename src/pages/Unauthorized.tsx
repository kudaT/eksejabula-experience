
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="h-16 w-16 text-yellow-500 mb-6" />
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-lg text-muted-foreground mb-8">
        You don't have permission to access this page.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="default">
          <Link to="/">Return Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/sign-in">Sign In as Admin</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
