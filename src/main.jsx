import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Stairs from './components/Stairs.jsx'
import { ReactLenis } from 'lenis/react'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
       <GoogleOAuthProvider clientId="788120234028-qkfb51einddh6svb0la7btciu5vtv5nb.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
       </GoogleOAuthProvider>
    </ReactLenis>
  </StrictMode>,
)
