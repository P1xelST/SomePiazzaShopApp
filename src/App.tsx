import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Route, Routes, RouterProvider, createBrowserRouter, Link } from 'react-router-dom';


function App() {
	const [counter, setCounter] = useState<number>(0);
	
	const addCounter = (e:MouseEvent) => {
		console.log(e);
		setCounter(counter + 1);
		console.log(counter);
	};

	return (
		<>
			<Button children="hello" onClick={addCounter}></Button>
			<Button appearence='big' children="hello" onClick={addCounter}></Button>
			<Input placeholder='Email'/>
			
		</>
	);
}

export default App;
