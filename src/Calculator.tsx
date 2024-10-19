import React, { useState } from 'react';
import { Plus, Minus, X, Divide, Equal } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');
  const [inputProcess, setInputProcess] = useState('');
  const [isExponent, setIsExponent] = useState(false);

  const handleNumberClick = (num: string) => {
    if (currentValue === '0' && num === '0' && !isExponent) return;
    
    let newValue = currentValue;
    if (isExponent) {
      newValue += num;
    } else {
      newValue = currentValue === '0' ? num : currentValue + num;
    }
    setCurrentValue(newValue);
    setDisplay(newValue);
    updateInputProcess(newValue);
  };

  const handleOperationClick = (op: string) => {
    if (previousValue && currentValue) {
      handleEqualClick();
      setPreviousValue(display);
    } else if (currentValue) {
      setPreviousValue(currentValue);
    } else if (!previousValue) {
      setPreviousValue('0');
    }
    setOperation(op);
    setCurrentValue('');
    setIsExponent(false);
    updateInputProcess('', op);
  };

  const handleEqualClick = () => {
    if (!previousValue && !currentValue) return;

    const prev = parseFloat(previousValue || '0');
    const current = parseFloat(currentValue || previousValue);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        result = current;
    }

    const resultString = result.toExponential(2);
    setDisplay(resultString);
    setPreviousValue(resultString);
    setCurrentValue('');
    setOperation('');
    setIsExponent(false);
    setInputProcess(`${prev} ${operation} ${current} = ${resultString}`);
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperation('');
    setInputProcess('');
    setIsExponent(false);
  };

  const handleExponentClick = () => {
    if (currentValue.includes('e')) return;
    const newValue = currentValue + 'e';
    setCurrentValue(newValue);
    setDisplay(newValue);
    setIsExponent(true);
    updateInputProcess(newValue);
  };

  const updateInputProcess = (value: string, op: string = operation) => {
    let process = '';
    if (previousValue) {
      process += previousValue + ' ' + op + ' ';
    }
    process += value;
    setInputProcess(process);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <div className="mb-4 bg-gray-100 p-2 rounded">
        <div className="text-right text-lg text-gray-600 h-6 mb-1 overflow-x-auto whitespace-nowrap">
          {inputProcess}
        </div>
        <div className="text-right text-3xl font-bold overflow-x-auto whitespace-nowrap">
          {display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
          >
            {num}
          </button>
        ))}
        <button onClick={handleClear} className="bg-red-500 text-white p-3 rounded hover:bg-red-600 transition-colors">
          C
        </button>
        <button onClick={handleExponentClick} className="bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition-colors">
          EE
        </button>
        <button onClick={() => handleOperationClick('+')} className="bg-gray-300 p-3 rounded hover:bg-gray-400 transition-colors">
          <Plus size={24} />
        </button>
        <button onClick={() => handleOperationClick('-')} className="bg-gray-300 p-3 rounded hover:bg-gray-400 transition-colors">
          <Minus size={24} />
        </button>
        <button onClick={() => handleOperationClick('*')} className="bg-gray-300 p-3 rounded hover:bg-gray-400 transition-colors">
          <X size={24} />
        </button>
        <button onClick={() => handleOperationClick('/')} className="bg-gray-300 p-3 rounded hover:bg-gray-400 transition-colors">
          <Divide size={24} />
        </button>
        <button onClick={handleEqualClick} className="bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors">
          <Equal size={24} />
        </button>
      </div>
    </div>
  );
};

export default Calculator;