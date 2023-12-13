import { Route, Routes } from 'react-router-dom';
import HomePage from '@pages/home';
import StoryPage from '@pages/story';
import ProfilePage from '@pages/profile';
import LoginPage from '@pages/login';
import RegisterPage from '@pages/register';
import NotFoundPage from '@pages/notfound';
import LogoutPage from '@pages/logout';
import RedirectPage from '@pages/redirect';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/u/:username" element={<ProfilePage />} />
      <Route path="/story/:id" element={<StoryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/redirect" element={<RedirectPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
