import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import AuthProvider from './providers/authProvider';
import PrivateRoutes from './components/PrivateRoute';
import BoardPage from './pages/Dashboard/BoardPage';
import AnalyticsPage from './pages/Dashboard/AnalyticsPage';
import SettingsPage from './pages/Dashboard/SettingsPage';

function App() {
  return (
    <>
      <AuthProvider key='authprovider'>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route element={<PrivateRoutes />}>

              <Route path='/' element={<BoardPage />} />
              <Route path='/board' element={<BoardPage />} />
              <Route path='/analytics' element={<AnalyticsPage />} />
              <Route path='/setting' element={<SettingsPage />} />

            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
