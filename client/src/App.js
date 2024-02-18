import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import AuthProvider from './providers/authProvider';
import PrivateRoutes from './components/PrivateRoute';
function App() {
  return (
    <>
    <AuthProvider key='authprovider'> 
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />

          <Route element={<PrivateRoutes />}>

              <Route path='/dashboard' element={<p>I am protected</p>} />

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
