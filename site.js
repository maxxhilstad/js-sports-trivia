
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {
	// todo: create your "getNextQuestion" function

	const getNextQuestion = async () => {
		const response = await fetch("https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple") // URL
		const json = await response.json() // Parse response
		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0] // Gets data

		const answers = shuffle([ ...incorrect, correct ]) // Shuffles answers

		return { question, answers, correct } // Returns data
	}

	// todo: create your "renderQuestion" function

	const renderQuestion = ({question, answers, correct}) => {
		questionElement.textContent = decodeHtml(question)
		answers.forEach(answer => {
			const button = document.createElement('button')
			button.textContent = decodeHtml(answer)
			answersElement.append(button)

			button.addEventListener('click', () => {
			if (answer === correct) {
				button.classList.add('correct')
				answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
				alert('Correct!')
				return
			}
			
			button.disabled = true
			alert('Incorrect!')
			
			})
		})

		
	}

	renderQuestion(await getNextQuestion())

	// todo: add the event listener to the "nextQuestion" button

	nextQuestionElement.addEventListener('click', async () => {
		answersElement.innerHTML = ''

		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)

	})

})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()