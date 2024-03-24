import { createStore, withProps } from '@ngneat/elf';

interface AuthProps {
  isLoggedIn: boolean;
  userEmail: string;
}

const authStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ isLoggedIn: false, userEmail: '' })
);

export const setLogin = (email: string, accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('user_email', email);
  authStore.update(state => ({
    ...state,
    isLoggedIn: true,
    userEmail: email,
  }));
};

export const checkLoginStatus = () => {
  const accessToken = localStorage.getItem('access_token');
  const userEmail = localStorage.getItem('user_email');
  if (accessToken && userEmail) {
    authStore.update(state => ({
      ...state,
      isLoggedIn: true,
      userEmail,
    }));
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_email');
  authStore.update(state => ({
    ...state,
    isLoggedIn: false,
    userEmail: '',
  }));
};
