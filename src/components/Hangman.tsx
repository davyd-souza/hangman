// DEPENDENCY
import { useState, useEffect } from 'react'

// COMPOMENT
import { HmKey } from './HmKey'

// STYLE
import styled from 'styled-components'
const Header = styled.header`
	text-transform: uppercase;
  text-align: center;
  color: var(--font-clr);
	font-size: 1.5rem;
`

const NotifySection = styled.section`
	width: 100%;
	height: 5vh;
	
	display: flex;
	align-items: center;
	justify-content: center;

	margin: 0.4rem 0;
`

const Tag = styled.p`
	width: 20vw;
	padding: 0.2rem;

	color: #fff;
	text-transform: uppercase;
	text-align: center;

	border-radius: 8px;

	&.win { background-color: rgb(00, 179, 00); }
	&.lose { background-color: rgb(179, 00, 00); }
`

const GuessSection = styled.section`
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`

const StyledImg = styled.img`
	max-width: 100%;
	width: 18rem;

	filter: ${props => props.theme.title === 'dark' ? 'var(--filter-white)' : ''};
`

const AnswerSection = styled.div`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`

const Letter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 3.5rem;
	height: 3.5rem;

	font-size: 1.4rem;
	text-transform: uppercase;
	color: var(--font-clr);

	border-radius: 8px;
	background-color: var(--primary-clr);
`

const Keyboard = styled.section`
	width: 100%;
	margin-top: 1rem;
	height: var(--kbd-height);
	display: grid;
	gap: 0.5rem;

	grid-template-columns: repeat(10, 1fr);
	grid-auto-rows: 1fr;

	text-transform: uppercase;
`
const RestartBtn = styled.button`
	background-color: var(--primary-clr);

	text-transform: uppercase;
	font-size: 1.5rem;
	color: var(--font-clr);

	grid-column: span 4;

	border-radius: 8px;

	cursor: pointer;
`

// UTIL
import { randomWord } from '../words'

// import img0 from '../imgs/test.svg'
import img0 from '../imgs/0.png'
import img1 from '../imgs/1.png'
import img2 from '../imgs/2.png'
import img3 from '../imgs/3.png'
import img4 from '../imgs/4.png'
import img5 from '../imgs/5.png'
import img6 from '../imgs/6.png'

type HangmanProps = Readonly<{
	title: string
	maxGuesses?: number
	imgs?: string[]
}>

const letters = "qwertyuiopasdfghjklzxcvbnm".split("")

export function Hangman({ title, maxGuesses = 6, imgs = [img0, img1, img2, img3, img4, img5, img6] }: HangmanProps) {
	const [ answer, setAnswer ] = useState<string>(randomWord())
	const [ guessed, setGuessed ] = useState<string[]>([])
	const [ wrongCnt, setWrongCnt ] = useState<number>(0)
	const [ gameOver, setGameOver ] = useState<boolean>(false)
	const [ win, setWin ] = useState<boolean>(false)

	const restart = () => {
		setAnswer(randomWord())
		setGuessed([])
		setWrongCnt(0)
		setGameOver(false)
		setWin(false)
	}

	const checkGuess = (letter: string) => {		
		setGuessed(prevState => [...prevState, letter])
		setWrongCnt(wrongCnt + (answer.includes(letter) ? 0 : 1 ))
	}

	useEffect(() => {
		if (wrongCnt === maxGuesses) setGameOver(true)
		if (answer.split("").every(l => guessed.includes(l))) setWin(true)
	}, [maxGuesses, guessed])


	return (
		<>		
			<Header>
				<h2>{title}</h2>
			</Header>

			<NotifySection>
				{ win && <Tag className="win">you win!</Tag> }
				{ gameOver && <Tag className="lose">you lose</Tag> }
			</NotifySection>

			<GuessSection>
				<StyledImg
					src={imgs[wrongCnt]} 
					alt={`out of ${maxGuesses} you guessed wrong: ${wrongCnt} times`} 
				/>

				<AnswerSection>
				{
					gameOver
						? answer.split("").map(l => <Letter> {l} </Letter>)
						: answer.split("").map(l => <Letter> { guessed.includes(l) ? `${l}` : "" } </Letter>)
				}
				</AnswerSection>
			</GuessSection>

			<Keyboard>
				{
					letters.map(letter => <HmKey 
							key={letter}
							letter={letter}
							isDisabled={win || gameOver || guessed.includes(letter)}
							checkGuess={checkGuess}
						/>
					)
				}
				<RestartBtn onClick={restart}>
					Restart
				</RestartBtn>
			</Keyboard>

		</>

	)
}