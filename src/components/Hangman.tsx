// DEPENDENCY
import { useState, useEffect } from 'react'

// COMPOMENT
import { Keyboard } from './Keyboard'

// UTIL
import { randomWord } from '../words'

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

const letters = "qwertyuiopasdfghjklçzxcvbnm"

export function Hangman({ title="Hangman", maxGuesses = 6, imgs = [img0, img1, img2, img3, img4, img5, img6] }: HangmanProps) {
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

	const checkGuess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const btn = e.target as HTMLButtonElement
		setGuessed(prevState => [btn.value, ...prevState])
		setWrongCnt(wrongCnt + (answer.includes(btn.value) ? 0 : 1))
	}

	const handleGameOver = () => setGameOver(true)

	const handleRestart = () => restart()

	const handleWin = () => setWin(true)

	useEffect(() => {
		if (wrongCnt === maxGuesses) handleGameOver()
		if (answer.split("").every(l => guessed.includes(l))) handleWin()
	}, [maxGuesses, guessed, wrongCnt, answer])

	return (
		<>
			<header className="Hangman-header">
				<h2>{title}</h2>
			</header>

			<section className="Hangman-notify">
				{ win && <p className="Hangman-tag win">you win!</p> }
				{ gameOver && <p className="Hangman-tag lose">you lose</p> }
			</section>

			<main className="Hangman-guess">
				<img
					className="Hangman-img" 
					src={imgs[wrongCnt]} 
					alt={`out of ${maxGuesses} you guessed wrong: ${wrongCnt} times`} 
				/>
				
				<div className="Hangman-answer">
				{
						gameOver
							? answer.split("").map(l => <div className="Hangman-letter"> {l} </div>)
							: answer.split("").map(l => <div className="Hangman-letter"> { guessed.includes(l) ? `${l}` : "" } </div>)
				}

				</div>
			</main>

			<section className="Hangman-keyboard">
				<Keyboard letters={letters} checkGuess={checkGuess} isDisabled={gameOver || win} guessed={guessed}/>
				<button
					className="Hangman-reset" 
					onClick={handleRestart}
				>
					Restart
				</button>
			</section>
			
		</>

	)
}