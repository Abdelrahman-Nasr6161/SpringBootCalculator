import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent, faBackspace, faDivide, faSquareRootVariable, faMultiply, faSubtract, faAdd, faPlusMinus, faEquals } from '@fortawesome/free-solid-svg-icons';
import { useState , useEffect } from 'react';
import axios from 'axios';
function App() {
  const [input, setInput] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation when the component mounts
    setAnimate(true);
  }, []);
  const handleButtonClick = (value) => {
    if (input =="E")
    {
      setInput("");
    }
    switch (value) {
      case 'CE':
      case 'C':
        setInput('');
        break;
      case 'backspace':
        setInput((prev) => prev.slice(0, -1)); // Remove the last character
        break;
      case '1/x':
        let old = input;
        setInput("1/(");
        setInput((prev)=>prev + old + ')');
        // setInput((prev) => prev + '1/'); // Add 1/
        break;
      case 'sqrt':
        setInput((prev) => prev + '√'); // Add sqrt(
        break;
      case 'x^2':
        setInput((prev) => prev + '²'); // Add ^2
        break;
      case '×':
        setInput((prev) => prev + '×'); // Add *
        break;
      case '/':
        setInput((prev) => prev + '÷'); // Add /
        break;
      case '=':
        send(input); // Send the expression for evaluation
        break;
        case '+/-':
          setInput((prev) => {
            if (prev.startsWith('-(') && prev.endsWith(')')) {
              // Remove the surrounding -() when toggling back
              return prev.slice(2, -1);
            } else if (prev === "") {
              return '-';
            } else if (prev.startsWith('-')) {
              return prev.slice(1); 
            } else {
              return `-(${prev})`;
            }
          });
          break;
        default:
          setInput((prev) => prev + value); 
          break;
    }
  };

  // Function to send the expression to the backend
  const send = async (expression) => {
    // this result a7la awy b2a bsra7a , axios >> 
    expression = expression.replace(/√/g, 'sqrt').replace(/²/g,"^2").replace(/%/g,'*(1/100)').replace(/÷/g,"/").replace(/x/g,'*')
    console.log('Sending:', expression); // Log the expression being sent
    try {
      const response = await axios.post("http://localhost:8080/api/evaluate",{
        "expression" : expression
      })
      console.log('Result from server :',response.data);
      setInput(String(response.data))
    } catch (error) {
      console.log("error while connecting to serverside for evaluation",error);
    }
  };

  return (
    <div className=' bg-gradient-to-br from-amber-900 to-gray-900 h-screen overflow-scroll'>
      <div className={`p-8 text-3xl font-bold text-white transition-transform duration-1000 ease-out ${animate ? 'translate-x-0' : 'translate-x-full'}`}>
        This Calculator was made by Abdel Rahman Nasr , ID : 22010887 <br />
        hope you enjoy it
      </div>
      <div className='h-screen flex justify-center'>
      <div className={`bg-gray-500 font-bold text-black pt-6 rounded-3xl px-4 w-72 h-brbs shadow-2xl shadow-gray-600 transition-transform duration-700 ease-out ${animate ? 'translate-x-0' : '-translate-x-full'}` } >
        <div className='grid-cols-[3fr_1fr] grid space-x-2'>
        <div className='bg-amber-400 mb-2 text-red-500 flex justify-center rounded-md'>
          The Brbs Calculator :)
        </div>
        <div className='bg-amber-950 mb-2 rounded-lg shadow-inner shadow-black'>
          
        </div>
        </div>
        {/* Green display area */}
        <div className='bg-green-400 px-4 py-4 w-full h-12 rounded-xl flex items-center mb-2 overflow-x-scroll overflow-y-clip shadow-inner shadow-gray-900'>
          <div>{input}</div> {/* Display the current input */}
        </div>
        <div>
        <div className='flex'> 
          <button onClick={() => handleButtonClick('(')} className='border-2 w-1/2 h-16 rounded-tl-3xl active:scale-105 bg-gray-400'> ( </button>
          <button onClick={() => handleButtonClick(')')} className='border-2 w-1/2 h-16 rounded-tr-3xl active:scale-105 bg-gray-400'> ) </button>
        </div>
        <div className='flex'>
          <button onClick={() => handleButtonClick('CE')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> CE </button>
          <button onClick={() => handleButtonClick('C')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> C </button>
          <button onClick={() => handleButtonClick('backspace')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'>
            <FontAwesomeIcon icon={faBackspace} />
          </button>
          <button onClick={() => handleButtonClick('%')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'>
            <FontAwesomeIcon icon={faPercent} />
          </button>
        </div>
        <div className='flex'>
          <button onClick={() => handleButtonClick('1/x')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> <sup>1</sup>&frasl;<sub>x</sub></button>
          <button onClick={() => handleButtonClick('x^2')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> x² </button>
          <button onClick={() => handleButtonClick('sqrt')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'>
            <FontAwesomeIcon icon={faSquareRootVariable} />
          </button>
          <button onClick={() => handleButtonClick('/')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'>
            <FontAwesomeIcon icon={faDivide} />
          </button>
        </div>
        <div className='flex'> 
          <button onClick={() => handleButtonClick('7')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 7 </button>
          <button onClick={() => handleButtonClick('8')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 8 </button>
          <button onClick={() => handleButtonClick('9')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 9 </button>
          <button onClick={() => handleButtonClick('-')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'>
            <FontAwesomeIcon icon={faSubtract} />
          </button>
        </div>
        <div className='flex'> 
          <button onClick={() => handleButtonClick('4')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 4 </button>
          <button onClick={() => handleButtonClick('5')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 5 </button>
          <button onClick={() => handleButtonClick('6')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 6 </button>
          <button onClick={() => handleButtonClick('x')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'>
            <FontAwesomeIcon icon={faMultiply} />
          </button>
        </div>
        <div className='flex'> 
          <button onClick={() => handleButtonClick('1')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 1 </button>
          <button onClick={() => handleButtonClick('2')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 2 </button>
          <button onClick={() => handleButtonClick('3')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> 3 </button>
          <button onClick={() => handleButtonClick('+')}className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
        <div className='flex'> 
          <button onClick={() => handleButtonClick('+/-')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400 rounded-bl-3xl'>
            <FontAwesomeIcon icon={faPlusMinus} />
          </button>
          <button onClick={() => handleButtonClick('0')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'>  0 </button>
          <button onClick={() => handleButtonClick('.')} className='border-2 w-1/4 h-16 active:scale-105 bg-gray-400'> . </button>
          <button className='equal border-2 w-1/4 h-16 rounded-br-3xl active:scale-105' onClick={() => handleButtonClick('=')}>
            <FontAwesomeIcon icon={faEquals} />
          </button>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;