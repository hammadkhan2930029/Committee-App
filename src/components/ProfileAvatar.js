import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { AppImages } from '../constant/appImages';

export const ProfileAvatar = ({ imageUri, style, ...rest }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imageUri]);

  const normalizedUri =
    typeof imageUri === 'string' ? imageUri.trim() : imageUri;
  const lowercaseUri =
    typeof normalizedUri === 'string' ? normalizedUri.toLowerCase() : '';
  const isPlaceholderLikeUri =
    !lowercaseUri ||
    lowercaseUri === 'null' ||
    lowercaseUri === 'undefined' ||
    lowercaseUri.endsWith('/profile.png') ||
    lowercaseUri.endsWith('/avatar.png') ||
    lowercaseUri.endsWith('/default.png') ||
    lowercaseUri.includes('placeholder') ||
    lowercaseUri.includes('default-avatar') ||
    lowercaseUri.includes('default_profile') ||
    lowercaseUri.includes('no-image');
  const shouldUseRemoteImage =
    !!normalizedUri && !hasError && !isPlaceholderLikeUri;

  return (
    <Image
      key={shouldUseRemoteImage ? normalizedUri : 'profile-avatar-fallback'}
      source={
        shouldUseRemoteImage ? { uri: normalizedUri } : AppImages.profileAvatar
      }
      style={style}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
};
