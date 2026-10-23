function Home({difficulty, setDifficulty, onStart}){
    return (
        <body className="bg-purple-950 min-h-screen ">
        <div className=" items-center justify-center text-5xl font-bold text-red-500 p-10">
            Quiz website
        </div>
        <div>
        <p>This is a simple quiz website built with React.You will get 10 questions and have to complete them all within 5 minutes.</p>
        </div>
        <div>
            <p>Choose difficulty</p>
        <button className={`m-2 p-2 border-2 rounded transition-all ${difficulty === 1 ? 'bg-green-500 text-purple-950 font-bold border-green-300' : 'border-green-400 text-white'}`} onClick={() => setDifficulty(1)}>Easy</button>
        <button className={`m-2 p-2 border-2 rounded transition-all ${difficulty === 2 ? 'bg-yellow-500 text-purple-950 font-bold border-yellow-300' : 'border-yellow-400 text-white'}`} onClick={() => setDifficulty(2)}>Medium</button>
        <button className={`m-2 p-2 border-2 rounded transition-all ${difficulty === 3 ? 'bg-red-500 text-white font-bold border-red-300' : 'border-red-400 text-white'}`} onClick={() => setDifficulty(3)}>Hard</button>
        </div>
        <div className="mt-6">
                    {/* Start button just changes the stage, leaving difficulty stored in App */}
                    <button 
                        className="p-3 bg-blue-600 text-white rounded font-bold" 
                        onClick={onStart}
                    >
                        Start Quiz
                    </button>
        </div>
        </body>
    )
}
export default Home