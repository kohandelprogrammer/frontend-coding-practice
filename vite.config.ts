<<<<<<< HEAD
import react from '@vitejs/plugin-react'
=======
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
>>>>>>> 1021562 (feat: first commit)
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
=======
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
>>>>>>> 1021562 (feat: first commit)
})
