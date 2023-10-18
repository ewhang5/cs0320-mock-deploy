import '../styles/main.css';

/**
 * This interface sets up the prop history as a 2D array.
 */
interface REPLHistoryProps{
    history: string[][]
}

/**
 * This function checks what kind of command was inputted and returns different components depending on that.
 * @param input 
 * @returns 
 */
function checkForBrief(input: string[]) {
    if (input[0] === "brief") {
        if ((input[1] === "view" || input[1].substring(0, 6) === "search") && (input[2] !== "failure to view file" && input[2] !== "failure to search" && input[2] !== "cannot search before loading file")) {
            let csv = JSON.parse(input[2])
            return (
                <table className="border">
                    {csv.map((row: string[]) => createTableRow(row))}
                </table>
            )
        } else {
            return (
                <p>Output: {input[2]}</p>
            );
        }
    } else {
        if ((input[0] === "view" || input[0].substring(0, 6) === "search") && (input[1] !== "failure to view file" && input[1] !== "failure to search" && input[1] !== "cannot search before loading file")) {
            let csv = JSON.parse(input[1])
            return (
                <div>
                    <div>
                        <p>Command: {input[0]}</p>
                        <p>Output:</p>
                    </div>
                    <div className="repl-history">
                        <table className="border">
                            {csv.map((row: string[]) => createTableRow(row))}
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <p>Command: {input[0]}</p>
                    <p>Output: {input[1]}</p>
                </div>)
        }
    }
}

/**
 * This function creates a table row with each item being an input in the row.
 * @param row 
 * @returns 
 */
function createTableRow(row: string[]) {
    return (
        <tr>
            {row.map((item) => <td className="border">{item}</td>)}
        </tr>
    )
}

/**
 * This function sets up the history box for viewing the commands.
 * @param props 
 * @returns 
 */
export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history" aria-label='output'>
            {props.history.map((history) => checkForBrief(history))}           
        </div>
    );
}