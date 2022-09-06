// COMPONENT
import { Hangman } from './components/Hangman'

// STYLE
import './App.css';
import { ThemeProvider } from 'styled-components'
import light from './styles/themes/light'
import GlobalStyle from './styles/global'

function App() {

	return (
		<ThemeProvider theme={light}>
			<div className="App">
				<Hangman title="hangman"/>
			</div>
		<GlobalStyle />
		</ThemeProvider>
	);
}

export default App;
