import { useState } from 'react';

export default function counter(){
    const [ count, setCount ] = useState(0);

    return (
        <main>
            <h1>Counter</h1>
            <p>{ count }</p>
            <button onClick={() => setCount(count + 1)}>
                +1
            </button>
            <button onClick={() => setCount(count - 1)}> 
                -1
            </button>
        </main>
    )
} 