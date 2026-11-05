'use client';

import Image from 'next/image';
import { useState } from 'react';

interface UserAvatarProps {
  image?: string | null;
  name: string;
  className: string;
}

export default function UserAvatar({ image, name, className }: UserAvatarProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const imageUrl = (() => {
    if (!image) return null;
    try {
      const url = new URL(image);
      return ['http:', 'https:'].includes(url.protocol) ? image : null;
    } catch {
      return null;
    }
  })();

  const showImage = Boolean(imageUrl && failedImageUrl !== imageUrl);

  return (
    <span
      className={`user-avatar ${className}`}
      role="img"
      aria-label={showImage ? `${name}'s profile picture` : `Default avatar for ${name}`}
    >
      {showImage && imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          width={88}
          height={88}
          unoptimized
          onError={() => setFailedImageUrl(imageUrl)}
        />
      ) : (
        name.trim().charAt(0).toUpperCase() || 'N'
      )}
    </span>
  );
}
