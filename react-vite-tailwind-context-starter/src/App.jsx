import React, { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';

function App() {
    const { count, setCount } = useStateContext();

    const handleCounter = () => {
        setCount((count) => count + 1);
    };

    useEffect(() => {
        document.body.addEventListener('keydown', handleCounter);
    }, []);

    return (
        <div className=" bg-slate-600 text-white w-screen h-screen flex flex-col justify-center items-center">
            <h1 className=" text-xl">
                React + Vite + Tailwind - JS <span className="ml-3 bg-rose-500 p-2 rounded-xl">(Starter Template)</span>
            </h1>
            <h1 className="text-md m-5">React Context Setup Included</h1>
            <div className="p-2">
                <h1 className="text-xl bg-rose-500 px-3 py-1 rounded-full cursor-pointer" onClick={handleCounter}>
                    Count : {count}
                </h1>
            </div>
            <h1 className="text-md m-5">Press any key to Increment</h1>
        </div>
    );
}

export default App;
