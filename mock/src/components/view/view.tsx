/**
 * This exports the view function that returns the CSV if it has been loaded.
 * @param csv 
 * @returns 
 */
export default function view(csv: string) {
    if (csv !== "") {
        return csv 
    }
    return "failure to view file"
}