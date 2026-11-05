'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import RequireSession from '@/app/components/RequireSession';
import UserAvatar from '@/app/components/UserAvatar';
import { setAuthSession, useSession, type AuthUser } from '@/lib/auth-client';
import { apiRequest } from '@/lib/api-client';

function ProfileEditor() {
  const { data: session } = useSession();
  const email = session?.user.email ?? '';
  const [name, setName] = useState(session?.user.name ?? '');
  const [image, setImage] = useState(session?.user.image ?? '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const { user } = await apiRequest<{ user: AuthUser }>('/api/profile', {
        method: 'PATCH',
        body: JSON.stringify({ name: name.trim(), image: image.trim() }),
      });
      if (session) setAuthSession({ ...session, user });
      setName(user.name);
      setImage(user.image || '');
      toast.success('Profile updated.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to update your profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="profile-page section-wrap">
      <div className="profile-heading">
        <span className="eyebrow">A little more about you</span>
        <h1>Your <span>profile.</span></h1>
        <p>Let your neighbors know who&apos;s showing up for the community.</p>
      </div>
      <form className="profile-card profile-editor" onSubmit={handleSubmit}>
        <UserAvatar image={image} name={name} className="profile-avatar" />
        <p className="profile-email">{email}</p>
        <label className="form-field">
          Display name
          <input className="form-input" value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} />
        </label>
        <label className="form-field">
          Profile photo URL
          <input className="form-input" type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://images.unsplash.com/..." />
          <span className="form-help">Use a public image URL that begins with http:// or https://.</span>
        </label>
        <button type="submit" className="button button-primary form-submit" disabled={saving}>{saving ? 'Saving…' : 'Save profile'} <span aria-hidden="true">↗</span></button>
      </form>
    </main>
  );
}

export default function ProfilePage() {
  return <RequireSession><ProfileEditor /></RequireSession>;
}
