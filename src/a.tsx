import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
console.log(1);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    5
  </StrictMode>,
)
