import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

/**
 * This function is exported and serves as a top level component for the REPL.
 * @returns 
 */
export default function REPL() {
  const [history, setHistory] = useState<string[][]>([])

  return (
    <div className="repl">  
      <REPLHistory history={history}/>
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory}/>
    </div>
  );
}
