import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	:root {
		--max-width: 60rem;
		--kbd-height: min(100rem/2.15, 25vh);
		--board-w: min(60rem, (100vh - var(--inset-top) - var(var(--keyboard-h) - 12vh - 6vh) * 5/6))
		--inset-top: env(safe-area-inset-top);
			
		--primary-font: 'Mitr', sans-serif;

		--primary-clr: ${props => props.theme.colors.primary};
		--bg-clr: ${props => props.theme.colors.background};
		--accent-clr: ${props => props.theme.colors.accent};
		--font-clr: ${props => props.theme.colors.font};
		
		--filter-white: invert(95%) sepia(100%) saturate(14%) hue-rotate(213deg) brightness(104%) contrast(104%);
	}

	* {
		margin: 0;
		padding: 0;
		border: 0;
		touch-action: manipulation;
		font-family: var(--primary-font);
	}

	html {
		background-color: var(--bg-clr);
	}

	body {
		height: 100%;
		width: 100vw;

		overflow-x: hidden;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`