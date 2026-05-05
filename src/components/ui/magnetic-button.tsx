import type React from "react";
import { MagneticCursor } from "./magnetic-cursor";
import { Button } from "@/components/ui/button";

export const MagneticButton = ({ children }: { children: React.ReactNode }) => (
  <MagneticCursor magneticFactor={0.4} cursorSize={30} blendMode="exclusion">
    <div className="flex items-center justify-center">
      <Button data-magnetic className="px-6 py-3 text-lg rounded-full">
        {children}
      </Button>
    </div>
  </MagneticCursor>
);
