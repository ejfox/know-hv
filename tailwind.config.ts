import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        sapgreen: {
          50: '#F0F0EF',
          100: '#E7E5DF',
          200: '#D3D2BB',
          300: '#BCC18F',
          400: '#A1B563',
          500: '#799E43',
          600: '#507D2A',
          700: '#4A6129',
          800: '#3F4922',
          900: '#32351D',
          950: '#28281A'
        }
      }
    }
  }
}
