import { createStore, withProps } from '@ngneat/elf';

interface AuthProps {
  isLoggedIn: boolean;
  userEmail: string;
  refreshToken: string;
}

const authStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ isLoggedIn: false, userEmail: '', refreshToken: '' })
);

export const setLogin = (email: string, accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('user_email', email);
  authStore.update(state => ({
    ...state,
    isLoggedIn: true,
    userEmail: email,
    refreshToken,
  }));
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  const response = await fetch('http://localhost:3000/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  setLogin(data.userEmail, data.access_token, data.refresh_token);
};

export const checkLoginStatus = () => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const userEmail = localStorage.getItem('user_email');
  if (accessToken && userEmail && refreshToken) {
    authStore.update(state => ({
      ...state,
      isLoggedIn: true,
      userEmail,
      refreshToken,
    }));
  }
}

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_email');
  authStore.update(state => ({
    ...state,
    isLoggedIn: false,
    userEmail: '',
    refreshToken: '',
  }));
};
