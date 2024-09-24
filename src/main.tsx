import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './hooks/theme.tsx'
import { AuthProvider } from './hooks/auth.tsx'
import { FirestoreProvider } from './hooks/firestore.tsx'
import { GlobalProvider } from './hooks/global.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <FirestoreProvider>
        <GlobalProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </GlobalProvider>
      </FirestoreProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
