import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { me } from '../services';

const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await me();
        setUser(response.data.user);
      } catch (error) {
        if (router.pathname === '/admin') {
          router.push('/login');
        }
      }
    };
    if (hasCookie('XSRF-TOKEN')) {
      checkAuth();
    }
  }, [router]);

  return user;
};

export default useAuth;
