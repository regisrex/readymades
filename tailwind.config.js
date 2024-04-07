/** @type {import('tailwindcss').Config} */
import { defaultTheme } from 'tailwindcss'
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				brand: '#E78E4D',
				normal: '#51697F'
			},
			screens : {
				'msm' : '0px'
			}
		},
	},
	plugins: []
};
