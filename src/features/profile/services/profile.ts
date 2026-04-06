export type UserProfile = {
  id: string;
  phone: string;
  email?: string;
};

export async function fetchUserProfile(): Promise<UserProfile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '25030024',
        phone: '+91 9876543210',
        email: 'john@example.com',
      });
    }, 800);
  });
}
