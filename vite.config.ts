/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig(function ({ mode }) {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    base: '/weather-app/',
    define: {
      'process.env.VITE_APIKEY': JSON.stringify(isProduction ? process.env.VITE_APIKEY : import.meta.env.VITE_APIKEY),
    },
  };
});

