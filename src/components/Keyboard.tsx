// UTIL
type KeyboardProps = {
	letters: string
	checkGuess: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	guessed: string[]
	isDisabled: boolean
}


function Keyboard({ letters, checkGuess, guessed, isDisabled}: KeyboardProps) {

	const handleGuess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => checkGuess(e)
	
	return (
		<>
			{
				letters.split("").map(letter => {
					return <button
						className="Keyboard-key"
						key={letter}	
						value={letter} 
						onClick={handleGuess}
						disabled={isDisabled || guessed.includes(letter)}
						style={{margin: '2px', padding: '2px'}}
					>
						{letter}
					</button>
				})
			}
		</>	
	)
}

export { Keyboard }