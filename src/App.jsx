import { useState } from 'react'
import './App.css'
import Home from './Home'
import Quiz from './quiz'
import Results from './results'

function App() {
  const [stage, setStage] = useState('home')
  const [difficulty, setDifficulty] = useState(1)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [questions, setQuestions] = useState([])

  return (
    <>
            {stage === 'home'    && <Home difficulty={difficulty} setDifficulty={setDifficulty} onStart={() => {setStage('quiz'); }} />}
            {stage === 'quiz'    && <Quiz difficulty={difficulty} onFinish={(s, t, qs) => { setScore(s); setTotal(t); setQuestions(qs); setStage('results'); }} />}
            {stage === 'results' && <Results score={score} total={total} difficulty={difficulty} questions={questions} onRestart={() => setStage('home')} />}
        </>
  )
}

export default App
  