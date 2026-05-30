import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start organizing tasks, notes, and focus in one place."
    >
      <RegisterForm />
    </AuthShell>
  );
}
