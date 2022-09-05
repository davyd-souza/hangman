// DEPENDENCY
import { useState, useEffect } from 'react'

// COMPOMENT
import { HmKey } from './HmKey'

// STYLE
import './Hangman.css'

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
		setGuessed([...guessed, letter])
		setWrongCnt(wrongCnt + (answer.includes(letter) ? 0 : 1 ))
	}

	useEffect(() => {
		if (wrongCnt === maxGuesses) setGameOver(true)
		if (answer.split("").every(l => guessed.includes(l))) setWin(true)
	}, [maxGuesses, guessed, wrongCnt])

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
				{
					letters.map(letter => <HmKey 
							key={letter}
							letter={letter}
							isDisabled={win || gameOver || guessed.includes(letter)}
							checkGuess={checkGuess}
						/>
					)
				}
				<button	className="Hangman-reset" onClick={restart}>
					Restart
				</button>
			</section>

		</>

	)
}