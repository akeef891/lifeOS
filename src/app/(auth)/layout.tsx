import { Suspense } from "react";
import { FirebaseConfigGate } from "@/components/auth/FirebaseConfigGate";
import { GuestGuard } from "@/components/auth/GuestGuard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseConfigGate>
      <Suspense fallback={null}>
        <GuestGuard>{children}</GuestGuard>
      </Suspense>
    </FirebaseConfigGate>
  );
}
