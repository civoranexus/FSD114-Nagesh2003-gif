import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
export const server = "http://localhost:5000";
import { CoursesProvider } from './context/CoursesContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CoursesProvider>
    <App />
    </CoursesProvider>
    </AuthProvider>
  </StrictMode>,
)
