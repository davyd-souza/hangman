// STYLE
import './HmKey.css'

// UTIL
type HmKeyProps = {
	letter: string
	isDisabled: boolean
	checkGuess: (letter: string) => void
}


export function HmKey({ letter, isDisabled, checkGuess}: HmKeyProps) {

	const handleGuess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const btn = e.target as HTMLButtonElement
		checkGuess(btn.value)
	}
	
	return <button
			className="HmKey"
			value={letter} 
			onClick={handleGuess}
			disabled={isDisabled}
		>
			{letter}
		</button>
}