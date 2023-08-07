import { useState, useEffect } from 'react'
import './App.css'

// --------- code to generate random six digit hexadecimal code ----------  //
const generateRandomColor = () => {
  // Storing all letter and digit combinations
  // for html color code
  let letters = "0123456789ABCDEF";
  // HTML color code starts with #
  let randomColorCode = '#';

  // Generating 6 times as HTML color code
  // consist of 6 letter or digits
  for (let i = 0; i < 6; i++) {
    randomColorCode += letters[(Math.floor(Math.random() * letters.length))];
  }
  return randomColorCode;
}

// Let's change the boolean true, false  => correct, wrong
enum Result{
  Correct,
  Wrong
}

function App() {
  const [color, setColor] = useState<string>("")
  // const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined)
  const [isCorrect, setIsCorrect] = useState<Result | undefined>(undefined)

  const [answers, setAnswers] = useState<string[]>([])






  const pickColor = () => {
    //TODO: generate  a random color code here
    const actualColor = generateRandomColor()
    setColor(actualColor)
    setAnswers([actualColor, generateRandomColor(), generateRandomColor()].sort(() => 0.5 - Math.random()))
    console.log("aswer ", answers);
  }

  useEffect(() => {
    pickColor()
  }, []);



  const checkColor = (answer: string) => {
    console.log("val color: ", answer, color);
    if (answer === color) {
      setIsCorrect(Result.Correct)
      setTimeout(() => {
        pickColor()
        setIsCorrect(undefined)
      }, 500)

    }
    else {
      setIsCorrect(Result.Wrong)
    }
  }



  return (
    <>
      <div className="App">
        <div className="container">
          <div className="color__window" style={{ backgroundColor: color }}>

          </div>
          <div className="btns">
            {
              answers?.map((answer, index) => {
                return (
                  <button key={index} onClick={() => checkColor(answer)}>{answer}</button>
                )
              })
            }
          </div>
          {isCorrect == Result.Correct && <p style={{ color: "green", margin: "20px" }}>Correct Answer</p>}
          {isCorrect == Result.Wrong && <p style={{ color: "red", margin: "20px" }}>Wrong Answer</p>}
        </div>
      </div>
    </>
  )
}

export default App
