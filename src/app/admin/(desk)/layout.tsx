import { Suspense } from "react";
import { DeskLayoutShell } from "@/components/admin/DeskLayoutShell";

export default function DeskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DeskLayoutShell>
      <Suspense fallback={null}>
        <main className="mx-auto max-w-6xl">{children}</main>
      </Suspense>
    </DeskLayoutShell>
  );
}