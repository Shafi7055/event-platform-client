'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import RequireSession from '@/app/components/RequireSession';
import { useSession } from '@/lib/auth-client';
import { getDemoProfile, saveDemoProfile } from '@/lib/demo-store';

function ProfileEditor() {
  const { data: session } = useSession();
  const email = session?.user.email ?? '';
  const [profile] = useState(() => getDemoProfile(email, session?.user.name ?? ''));
  const [name, setName] = useState(profile.name);
  const [image, setImage] = useState(profile.image);
  const [saving, setSaving] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      saveDemoProfile(email, { name: name.trim(), image: image.trim() });
      toast.success('Profile preview saved in this browser. Connect your API to update your account.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save the profile preview.');
    } finally {
      setSaving(false);
    }
  };

  const previewImage = (() => {
    try {
      const url = new URL(image);
      return url.protocol === 'https:' && url.hostname === 'images.unsplash.com' ? image : null;
    } catch {
      return null;
    }
  })();

  return (
    <main className="profile-page section-wrap">
      <div className="profile-heading">
        <span className="eyebrow">A little more about you</span>
        <h1>Your <span>profile.</span></h1>
        <p>Let your neighbors know who&apos;s showing up for the community.</p>
      </div>
      <form className="profile-card profile-editor" onSubmit={handleSubmit}>
        <div className="profile-avatar">
          {previewImage
            ? <Image src={previewImage} alt="Profile photo preview" width={88} height={88} unoptimized />
            : name.trim().charAt(0).toUpperCase() || 'N'}
        </div>
        <p className="profile-email">{email}</p>
        <label className="form-field">
          Display name
          <input className="form-input" value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} />
        </label>
        <label className="form-field">
          Profile photo URL
          <input className="form-input" type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://images.unsplash.com/..." />
          <span className="form-help">For this preview, paste an Unsplash photo URL.</span>
        </label>
        <p className="demo-notice">Profile edits are saved in this browser preview only.</p>
        <button type="submit" className="button button-primary form-submit" disabled={saving}>{saving ? 'Saving…' : 'Save profile'} <span aria-hidden="true">↗</span></button>
      </form>
    </main>
  );
}

export default function ProfilePage() {
  return <RequireSession><ProfileEditor /></RequireSession>;
}
