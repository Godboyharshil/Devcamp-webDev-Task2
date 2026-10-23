import { useState , useEffect, useRef } from 'react'
import Question from './questions'




function Quiz({ onFinish, difficulty }) {
    const handleShuffle = () => {
    const shuffled = [...questions]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setquestions(shuffled);
  };
    let pool
    if (difficulty === 1) {
        pool = [
                { question: "Which hook manages state in React?", options: ["useFetch", "useState", "useStyle", "useRender"], answer: 1 },
                { question: "Which hook is used for side effects?", options: ["useState", "useContext", "useEffect", "useReducer"], answer: 2 },
                { question: "What is the correct syntax to import React in a component?", options: ["import { react } from 'react'", "import React.* from 'react'", "include React", "import React from 'react'"], answer: 3 },
                { question: "What tool is commonly used to bundle React applications quickly?", options: ["Webpack", "Vite", "Parcel", "Babel"], answer: 1 },
                { question: "Which symbol is used to embed expressions in JSX?", options: ["( )", "{ }", "[ ]", "< >"], answer: 1 },
                { question: "What property is used to pass data from a parent component to a child component?", options: ["state", "context", "props", "bind"], answer: 2 },
                { question: "What function is used to update state in a useState hook?", options: ["updateState()", "The second element returned by useState", "setStateValue()", "modifyState()"], answer: 1 },
                { question: "What does HTML stand for?", options: ["High Tech Multi Language", "Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], answer: 1 },
                { question: "Which CSS framework is utility-first and used in your project?", options: ["Bootstrap", "Foundation", "Tailwind CSS", "Bulma"], answer: 2 },
                { question: "What command creates a new React project using Vite?", options: ["npx react-init", "npm start-react", "npx new-react-app", "npm create vite@latest"], answer: 3 }
        ]
    } else if (difficulty === 2) {
        pool = [
                    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: 2 },
                    { question: "Largest planet in our solar system?", options: ["Mars", "Jupiter", "Saturn", "Neptune"], answer: 1 },
                    { question: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], answer: 3 },
                    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"], answer: 0 },
                    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Saturn", "Mercury"], answer: 1 },
                    { question: "What is the main component of the sun?", options: ["Liquid lava", "Helium and Hydrogen", "Oxygen", "Carbon dioxide"], answer: 1 },
                    { question: "Which ocean is the largest?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3 },
                    { question: "What year was JavaScript created?", options: ["1991", "1995", "2000", "1985"], answer: 1 },
                    { question: "Which data structure uses LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Array", "Tree"], answer: 1 },
                    { question: "What does SQL stand for?", options: ["Structured Query Language", "Strong Question Language", "Simple Query Logic", "Standard Quick Language"], answer: 0 }
                ]
    } else {
        pool = [
                    { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: 2 },
                    { question: "Chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2 },
                    { question: "Which element has the highest atomic number on this list?", options: ["Iron", "Gold", "Uranium", "Silver"], answer: 2 },
                    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: 2 },
                    { question: "What is the speed of light in a vacuum (approx.)?", options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "3,000,000 km/s"], answer: 0 },
                    { question: "Which country has the most natural lakes?", options: ["USA", "Canada", "Russia", "Australia"], answer: 1 },
                    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: 2 },
                    { question: "In what year did the Titanic sink?", options: ["1912", "1905", "1920", "1898"], answer: 0 },
                    { question: "Which gas makes up the majority of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 2 },
                    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 }
                ]
    }
    const [questions, setquestions] = useState(pool)
    const [selectedOption, setSelectedOption] = useState(null)
    const [score, setScore] = useState(0)
    const [QuestionNumber, setQuestionNumber] = useState(1)
    const [timeLeft, setTimeLeft] = useState(300)
    const scoreRef = useRef(score)
    const questionsRef = useRef(questions)
    useEffect(() => { scoreRef.current = score }, [score])
    useEffect(() => { questionsRef.current = questions }, [questions])
    useEffect(() => {
        handleShuffle()
    }, [])
    useEffect(() => {
        if (timeLeft === 0) {
            onFinish(scoreRef.current, questionsRef.current.length, questionsRef.current)
            return
        }
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
        return () => clearTimeout(timer)
    }, [timeLeft])
    const currentQuestion = questions[QuestionNumber - 1]
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
    const secs = String(timeLeft % 60).padStart(2, '0')

    function handleOptionClick(index) {
        setSelectedOption(index)
    }

    function handleNext() {
        const newScore = selectedOption === currentQuestion.answer ? score + 1 : score
    setScore(newScore)
        if (QuestionNumber < questions.length) {
            setSelectedOption(null)
            setQuestionNumber(QuestionNumber + 1)
        } else {
            onFinish(newScore, questions.length, questions)
        }
    }

    return (
        <div className="bg-purple-950 min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="whitespace-pre-line">React Quiz{"\n"}</h1>
            <p className={`text-2xl font-mono font-bold ${timeLeft <= 30 ? 'text-red-400' : 'text-white'}`}>{mins}:{secs}</p>
            <p>{QuestionNumber} / {questions.length} {"\n"}</p>

            <Question
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedOption={selectedOption}
                onOptionClick={handleOptionClick}
            />

            {selectedOption !== null && (
                <button className="m-2 p-2 border-2 border-yellow-400 text-white rounded"
                    onClick={handleNext}>
                    {QuestionNumber === questions.length ? 'See Results' : 'Next'}
                </button>
            )}
        </div>
    )
}

export default Quiz