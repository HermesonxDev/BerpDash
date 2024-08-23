import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './hooks/theme.tsx'
import { AuthProvider } from './hooks/auth.tsx'
import { FirestoreProvider } from './hooks/firestore.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <FirestoreProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FirestoreProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
