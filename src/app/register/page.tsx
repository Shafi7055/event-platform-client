import AuthForm from '@/app/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <AuthForm mode="register" />
    </div>
  );
}
