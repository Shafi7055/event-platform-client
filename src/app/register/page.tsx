import AuthForm from '@/app/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-image">
        <span className="eyebrow">Good things happen together</span>
        <h2>There&apos;s a place for you here.</h2>
      </div>
      <AuthForm mode="register" />
    </div>
  );
}
