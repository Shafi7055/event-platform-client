import AuthForm from '@/app/components/AuthForm';

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-image">
        <span className="eyebrow">Good things happen together</span>
        <h2>Show up for what matters.</h2>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
