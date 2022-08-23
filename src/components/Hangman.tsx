// DEPENDENCY
import { useState } from 'react'

// UTIL
type HangmanProps = Readonly<{
	maxGuesses?: number
	imgs?: string[]
}>

export function Hangman({ maxGuesses = 6 }: HangmanProps) {
	const [ answer, setAnswer] = useState<string>('apple')
	const [ guessed, setGuessed ] = useState<string[]>([])

	const generateButtons = () => {
		return "abcedfghijklmnopqrstuvwxyz".split("").map(l => 
			<button 
				key={l}
				value={l}
				onClick={handleGuess}
				disabled={guessed.includes(l)}
				style={{margin: '2px', padding: '2px'}}
			>
					{l}
			</button>
		)
	}

	const handleGuess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const btn = e.target as HTMLButtonElement
		setGuessed(prevState => [btn.value, ...prevState])
	}

	return (

		<div className="Hangman">
			<div className="Hangman-word">
				{
					answer.split("").map(l => guessed.includes(l) ? l : " _ ")
				}
			</div>

			<div className="Hangman-count">
				<h2>Count</h2>
				<p>
					{
						answer
							? `Answer has: ${answer.length} letters.`
							: `There's no answer.`
					}
				</p>
			</div>

			<div className="Hangman-keyboard">{ generateButtons()	}</div>
			<button>Restart</button>
		</div>
	)
}