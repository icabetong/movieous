import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
}

const theme = extendTheme({ 
	config,
	fonts: {
		heading: "Rubik",
		body: "Rubik"
	},
	colors: {
		primary:  {
			50: '#ffe5e5',
			100: '#fdb7b8',
			200: '#f6898a',
			300: '#f15b5b',
			400: '#eb2e2d',
			500: '#d21614',
			600: '#a40e0e',
			700: '#760809',
			800: '#480304',
			900: '#1e0000',
		},
		secondary: {
			50: '#e8f3fe',
			100: '#cad9e8',
			200: '#abbfd4',
			300: '#8aa6c2',
			400: '#6a8caf',
			500: '#517396',
			600: '#3d5975',
			700: '#2b4054',
			800: '#182635',
			900: '#020e17',
		},
		surface: {
			50: '#edf2fa',
			100: '#d2d7e0',
			200: '#b6bdc8',
			300: '#98a3b2',
			400: '#7b889c',
			500: '#626f82',
			600: '#4b5666',
			700: '#353d49',
			800: '#1f252d',
			900: '#060c14',
		},
		text: {
		main: "#fff",
		secondary: "#DDDDDD"
		},
	},
	styles: {
		global: {
			"body": {
				bg: "surface.800",
			}
		}
	}
})

export default theme;