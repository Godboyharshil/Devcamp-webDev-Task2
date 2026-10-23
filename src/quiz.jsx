import { useState , useEffect} from 'react'
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
            { question: "Which hook manages state in React?", options: ["useState", "useFetch", "useStyle", "useRender"], answer: 0 },
            { question: "Which hook is used for side effects?", options: ["useEffect", "useState", "useContext", "useReducer"], answer: 0 }
        ]
    } else if (difficulty === 2) {
        pool = [
            { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: 2 },
            { question: "Largest planet in our solar system?", options: ["Mars", "Jupiter", "Saturn", "Neptune"], answer: 1 }
        ]
    } else {
        pool = [
            { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: 2 },
            { question: "Chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2 }
        ]
    }
    const [questions, setquestions] = useState(pool)
    const [selectedOption, setSelectedOption] = useState(null)
    const [score, setScore] = useState(0)
    const [QuestionNumber, setQuestionNumber] = useState(1)
    useEffect(() => {
        handleShuffle()
    }, [])
    const currentQuestion = questions[QuestionNumber - 1]

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