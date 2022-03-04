# Adding Custom utility classes in Tailwindcss

To achieve this, customize your tailwind.config.js file by adding `new plugin`:

```
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {},
  plugins: [
    plugin(({ addUtilities }) => { // Custom utilities
      const newUtilities = {
        '.row': {
          display: 'flex',
          'flex-wrap': 'wrap',
        },
        '.stack': {
          display: 'flex',
          'flex-direction': 'column',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
```
