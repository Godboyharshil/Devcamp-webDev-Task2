function Question({ question, options, selectedOption, onOptionClick }) {
    return (
        <div>
            <h2>{question}</h2>
            <p>Choose the correct answer:</p>

            {options.map((option, index) => (
                <button className="m-2 p-2 border rounded text-white border-white"
                    key={index}
                    onClick={() => onOptionClick(index)}
                    style={{
                        background: selectedOption === index ? 'purple' : ''
                    }}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default Question