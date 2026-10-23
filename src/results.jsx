function Results({ score, total, difficulty, questions, onRestart }) {
    const percentage = Math.round((score / total) * 100)

    const difficultyLabel = difficulty === 1 ? 'Easy' : difficulty === 2 ? 'Medium' : 'Hard'
    const difficultyColor = difficulty === 1 ? 'text-green-400' : difficulty === 2 ? 'text-yellow-400' : 'text-red-400'

    const getMessage = () => {
        if (percentage === 100) return "Perfect Score!"
        if (percentage >= 80)  return "Great Job!"
        if (percentage >= 60)  return "Not Bad!"
        if (percentage >= 40)  return "Keep Practicing"
        return "Better Luck Next Time"
    }

    return (
        <div className="bg-purple-950 min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-bold text-red-500 mb-2">Quiz Complete!</h1>

            <p className={`text-lg mb-8 ${difficultyColor}`}>Difficulty: {difficultyLabel}</p>

            <div className="flex flex-col items-center mb-6">
                <div className="text-9xl font-bold">{score}
                    <span className="text-5xl text-gray-400">/{total}</span>
                </div>
                <p className="text-3xl text-purple-300 mt-2">{percentage}%</p>
            </div>

            <p className="text-2xl mb-10">{getMessage()}</p>
            <div className="w-full max-w-2xl mt-10 px-4">
                <h2 className="text-2xl font-bold mb-4">Question Review</h2>
                    {questions.map((q, i) => (
                    <div key={i} className="mb-4 p-4 rounded border border-purple-400 text-left">
                        <p className="font-bold mb-1">{i + 1}. {q.question}</p>
                        <p className="text-white-400"> {q.options[q.answer]}</p>
                    </div>
                ))}
            </div>

            <button
                className="p-3 px-6 text-white rounded font-bold text-lg border-2 border-purple-500 hover:bg-purple-500 transition-all"
                onClick={onRestart}
            >
                Play Again
            </button>
        </div>
    )
}

export default Results