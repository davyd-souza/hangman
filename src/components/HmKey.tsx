// STYLE
import styled from 'styled-components'
const StyledButton = styled.button`
	background-color: var(--primary-clr);

	text-transform: uppercase;
	font-size: 1.8rem;
	color: var(--font-clr);

	border-radius: 8px;

	cursor: pointer;


	&:disabled {
		background-color: var(--accent-clr);
	}
`

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
	
	return <StyledButton
			// className="HmKey"
			value={letter} 
			onClick={handleGuess}
			disabled={isDisabled}
		>
			{letter}
		</StyledButton>
}