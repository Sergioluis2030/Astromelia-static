import React from 'react'
import { SettingsProvider } from './context/SettingsContext'
import { CartProvider } from './context/CartContext'
import { AppRouter } from './routes/AppRouter'

export default function App() {
  return (
    <SettingsProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </SettingsProvider>
  )
}
