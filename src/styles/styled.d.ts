import 'styled-components'

declare module 'styled-components' {
	export interface DefaultTheme {
		title: string

		colors: ColorsProps
	}
}

interface ColorsProps {
	background: string
	primary: string
	accent: string
	font: string
}