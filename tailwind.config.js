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
                    200: '#B0D0EA',
                    300: '#85B7DC',
                    400: '#5796C2',
                    500: '#4382AE',
                    600: '#366E99',
                    700: '#2A5678',
                    800: '#1E3F58',
                    900: '#132838',
                },
                'brand-gold': {
                    50:  '#FDF8EE',
                    100: '#F9EDCF',
                    200: '#F2D99F',
                    300: '#E8C46E',
                    400: '#D4A843',
                    500: '#B8912E',
                    600: '#9A7724',
                },
            },
        },
    },

    plugins: [forms],
};
