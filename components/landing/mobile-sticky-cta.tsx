import Link from "next/link";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur md:hidden">
      <Button asChild size="lg" className="w-full">
        <Link href="/ai-species">
          <Camera className="size-4" />
          AI 어종 판별하기
        </Link>
      </Button>
    </div>
  );
}
