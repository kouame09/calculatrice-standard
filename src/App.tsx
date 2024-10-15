import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState('');
  const [previousValue, setPreviousValue] = useState('');

  const handleNumberClick = (num: string) => {
    if (display === '0' || operator) {
      setDisplay(num);
      setCurrentValue(num);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (currentValue) {
      setOperator(op);
      setPreviousValue(currentValue);
      setCurrentValue('');
    }
  };

  const handleEqualsClick = () => {
    if (currentValue && previousValue && operator) {
      const current = parseFloat(currentValue);
      const previous = parseFloat(previousValue);
      let result = 0;

      switch (operator) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '/':
          result = previous / current;
          break;
      }

      setDisplay(result.toString());
      setCurrentValue(result.toString());
      setPreviousValue('');
      setOperator('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperator('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-72">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Calculator</h1>
          <Calculator className="text-gray-600" size={24} />
        </div>
        <div className="bg-gray-200 p-4 rounded mb-4">
          <p className="text-right text-2xl font-semibold">{display}</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === '=') handleEqualsClick();
                else if (['+', '-', '*', '/'].includes(btn)) handleOperatorClick(btn);
                else handleNumberClick(btn);
              }}
              className={`p-3 text-lg font-medium rounded ${
                btn === '=' ? 'col-span-2 bg-blue-500 text-white' : 'bg-gray-300'
              } hover:bg-opacity-80 transition-colors`}
            >
              {btn}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="col-span-4 p-3 text-lg font-medium rounded bg-red-500 text-white hover:bg-opacity-80 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;