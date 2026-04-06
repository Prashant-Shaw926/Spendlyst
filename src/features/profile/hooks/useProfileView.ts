import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../../store';
import { fetchUserProfile, type UserProfile } from '../services/profile';

export function useProfileView() {
  const userName = useAppStore((state) => state.userName);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();

        if (isMounted) {
          setProfile(data);
          setErrorMessage(null);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Unable to load your profile right now.',
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const accountFields = useMemo(() => {
    if (!profile) {
      return [];
    }

    return [
      { label: 'Username', value: userName },
      { label: 'Phone', value: profile.phone },
      ...(profile.email ? [{ label: 'Email Address', value: profile.email }] : []),
    ];
  }, [profile, userName]);

  return {
    accountFields,
    errorMessage,
    isLoading,
    profile,
    userName,
  };
}
