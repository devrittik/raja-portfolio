import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-primary/10 text-primary">
          <Compass className="size-8" strokeWidth={2} />
        </span>
        <p className="mt-8 font-display text-7xl font-extrabold tracking-tight text-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Off the survey grid.</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          The page you&apos;re looking for has been demolished, relocated, or never broke ground.
          Let&apos;s get you back to something that exists.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <ArrowLeft /> Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
