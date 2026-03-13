import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'brand-blue': {
                    50:  '#EBF3FA',
                    100: '#D7E7F5',
                    300: '#85B7DC',
                    400: '#5796C2',
                    500: '#4382AE',
                    600: '#366E99',
                },
            },
        },
    },

    plugins: [forms],
};
