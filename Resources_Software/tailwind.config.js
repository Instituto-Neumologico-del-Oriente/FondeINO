// Configuración de Tailwind CSS para FondeINO
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Azul principal (color corporativo FondeINO)
        primary: {
          50: '#e8f5f9',
          100: '#b3e0f2',
          200: '#80ccec',
          300: '#4db8e6',
          400: '#26a9e0',
          500: '#0098d6',
          600: '#0077ab',
          700: '#005580',
          800: '#003d5c',
          900: '#002638',
        },
        // Verde acento (solidaridad y crecimiento)
        accent: {
          50: '#f1f8f4',
          100: '#d4ead9',
          200: '#a9d5b4',
          300: '#7ec08f',
          400: '#53ab6a',
          500: '#2e7d32',
          600: '#1b5e20',
          700: '#164e1a',
          800: '#113e15',
          900: '#0c2e10',
        },
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Instrument Sans', 'sans-serif'],
      },
    },
  },
};