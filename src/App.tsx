// COMPONENT
import { Hangman } from './components/Hangman'

// STYLE
import './App.css';
import GlobalStyle from './styles/global'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import light from './styles/themes/light'
import dark from './styles/themes/dark'

// UTIL
import { usePersistedState } from './hooks/usePersistedState'

function App() {
	const [ theme, setTheme ] = usePersistedState<DefaultTheme>('theme', light)

	const toggleTheme = () => setTheme(theme.title === 'light' ? dark : light)

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Hangman title="hangman" toggleTheme={toggleTheme} theme={theme.title}/>
			</div>
		<GlobalStyle />
		</ThemeProvider>
	);
}

export default App;
