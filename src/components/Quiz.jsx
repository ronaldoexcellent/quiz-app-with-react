import { useState } from 'react';

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [start, set] = useState("hidden");
    const [sbtn, ssbtn] = useState("block");

    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Lisbon"],
            answer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter"
        }
    ];

    const handleAnswerOptionClick = (option) => {
        setSelectedOption(option);
        if (option === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestionIndex + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestionIndex(nextQuestion);
                setSelectedOption(null);
            } else {
                setIsQuizFinished(true);
            }
        }, 1500);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsQuizFinished(false);
        setSelectedOption(null);
    };

    const s = (e) => {
        set("block");
        ssbtn("hidden");
    };

    return (
        <div
            style={{
                borderTopStyle: "dashed",
                borderLeftStyle: "dotted",
                borderRightStyle: "double",
            }}
            className={`fixed w-screen h-screen bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 border-8 flex items-center justify-center ${selectedOption === questions[currentQuestionIndex].answer? 'border-green-500' : selectedOption == null ? 'border-gray-800' : 'border-red-500'}`
            }
        >
            <div className={`md:w-2/3 w-screen p-6 bg-gray-800 border-4 border-gray-500 text-white shadow-lg rounded-lg ${selectedOption === questions[currentQuestionIndex].answer? 'border-green-500' : selectedOption == null ? 'border-gray-500' : 'border-red-500'}`}>
                {isQuizFinished ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Your Score: {score} out of {questions.length}</h2>
                        <button onClick={restartQuiz} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Restart Quiz</button>
                    </div>
                ) : (
                    <>
                        <div onClick={(event) => s(event)} className={`text-center ${sbtn}`}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 animate-bounce">Start Quiz</button>
                        </div>
                        <div className={start}>
                            <h2 className="text-xl font-semibold mb-4">{`${currentQuestionIndex + 1}. `} &nbsp; {questions[currentQuestionIndex].question}</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {questions[currentQuestionIndex].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerOptionClick(option)}
                                        className={`p-2 rounded transition duration-300 text-left ${
                                            selectedOption === option
                                                ? option === questions[currentQuestionIndex].answer
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                                : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                        disabled={selectedOption !== null}
                                    >
                                        <span className="font-bold">{String.fromCharCode(65 + index)}. &nbsp; </span> {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz