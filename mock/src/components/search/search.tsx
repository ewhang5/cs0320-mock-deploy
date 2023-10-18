import searchResults from "../../data/search/searchResults";

/**
 * This exports the function to search a CSV based on the given commmand.
 * @param csv 
 * @param commandString 
 * @returns 
 */
export default function search(csv: string, commandString: string) {
    if (csv === "") {
        return "cannot search before loading file"
      } if (commandString.substring(0, 15) === "search column =") {
        let input = commandString.split("=");
        let column = input[1].substring(1, input[1].length - 7)
        if (input[1].substring(input[1].length - 6) === "value ") {
          let value = input[2].substring(1, input[2].length - 8)
          if (input[2].substring(input[2].length - 7) === "header ") {
            let header = input[3].substring(1)
            return JSON.stringify(searchResults.get(column + " " + value + " " + header));
          }
        }
      } else if (commandString.substring(0, 14) === "search value =") {
        let input = commandString.split("=");
          let value = input[1].substring(1, input[1].length - 8)
          if (input[1].substring(input[1].length - 7) === "header ") {
            let header = input[2].substring(1)
            return JSON.stringify(searchResults.get(value + " " + header));
          }
      }
      return "failure to search";
}