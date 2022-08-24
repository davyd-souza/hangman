// DEPENDENCY
import { useState, useEffect } from 'react'

// UTIL
import { randomWord } from '../words'

import img0 from '../imgs/0.jpg'
import img1 from '../imgs/1.jpg'
import img2 from '../imgs/2.jpg'
import img3 from '../imgs/3.jpg'
import img4 from '../imgs/4.jpg'
import img5 from '../imgs/5.jpg'
import img6 from '../imgs/6.jpg'

type HangmanProps = Readonly<{
	maxGuesses?: number
	imgs?: string[]
}>

export function Hangman({ maxGuesses = 6, imgs = [img0, img1, img2, img3, img4, img5, img6] }: HangmanProps) {
	const [ answer, setAnswer] = useState<string>(randomWord())
	const [ guessed, setGuessed ] = useState<string[]>([])
	const [ wrongCnt, setWrongCnt ] = useState<number>(0)
	const [ gameOver, setGameOver ] = useState<boolean>(false)
	const [ win, setWin ] = useState<boolean>(false)

	const generateButtons = () => {
		return "abcedfghijklmnopqrstuvwxyz".split("").map(l => 
			<button 
				key={l}
				value={l}
				onClick={handleGuess}
				disabled={guessed.includes(l) || gameOver || win}
				style={{margin: '2px', padding: '2px'}}
			>
					{l}
			</button>
		)
	}

	const restart = () => {
		setAnswer(randomWord())
		setGuessed([])
		setWrongCnt(0)
		setGameOver(false)
		setWin(false)
	}

	const handleGuess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const btn = e.target as HTMLButtonElement
		setGuessed(prevState => [btn.value, ...prevState])
		setWrongCnt(wrongCnt + (answer.includes(btn.value) ? 0 : 1))
	}

	const handleGameOver = () => setGameOver(true)

	const handleRestart = () => restart()

	const handleWin = () => setWin(true)

	useEffect(() => {		
		console.log("> [useEffect] answer:", answer)
		if (wrongCnt === maxGuesses) handleGameOver()
		if (answer.split("").every(l => guessed.includes(l))) handleWin()
	}, [maxGuesses, guessed, wrongCnt, answer])

	return (

		<div className="Hangman">
			{ win && <p>You WIN!!</p> }
			{ gameOver && <p>You Lose</p> }

			<img src={imgs[wrongCnt]} alt={`out of ${maxGuesses} you guessed wrong: ${wrongCnt} times`} />

			<div className="Hangman-word">
				<p>
					{
						answer.split("").map(l => guessed.includes(l) ? ` ${l} ` : " _ ")
					}
				</p>
			</div>

			<div className="Hangman-count">
				<h2>Count</h2>
				<p>
					{
						wrongCnt
							? `${wrongCnt}/${maxGuesses}`
							: `There have been no attempts yet.`
					}
				</p>
				<p>
					{
						answer
							? `Answer has: ${answer.length} letters.`
							: `There's no answer.`
					}
				</p>
			</div>

			<div className="Hangman-keyboard">{ generateButtons()	}</div>
			<button onClick={handleRestart}>Restart</button>
		</div>
	)
}