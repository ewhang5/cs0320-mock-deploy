import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

/**
 * This defines value, setValue, and ariaLabel.
 */
interface ControlledInputProps {
    value: string, 
    setValue: Dispatch<SetStateAction<string>>,
    ariaLabel: string 
  }
  
  /**
   * This function is exported and creates a ControlledInput function to be used in REPLInput.
   * @param param0 
   * @returns 
   */
  export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input type="text" className="repl-command-box"
            value={value} 
            placeholder="Enter command here!"
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}>
      </input>
    );
  }