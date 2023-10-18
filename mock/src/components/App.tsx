import '../styles/App.css';
import REPL from './REPL';

/**
 * This function serves as the highest level component.
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
      </p>
      <REPL />      
    </div>
  );
}

export default App; // exporting the function