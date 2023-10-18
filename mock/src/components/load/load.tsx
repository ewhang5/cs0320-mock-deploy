import BadCSV from "../../data/csv/BadCSV";
import BasicHeaderCSV from "../../data/csv/BasicHeaderCSV";
import BasicNoHeaderCSV from "../../data/csv/BasicNoHeaderCSV";
import EmptyCSV from "../../data/csv/EmptyCSV";

/**
 * This file creates a function to load a csv.
 */
const fileMap = new Map<string, Array<Array<string>>>(); // a constant mocking file paths to the relative CSV objects
  fileMap.set("mock/src/data/csv/BadCSV.ts", BadCSV);
  fileMap.set("mock/src/data/csv/BasicHeaderCSV.ts", BasicHeaderCSV);
  fileMap.set("mock/src/data/csv/BasicNoHeaderCSV.ts", BasicNoHeaderCSV);
  fileMap.set("mock/src/data/csv/EmptyCSV.ts", EmptyCSV);

/**
 * This is the load_file function that is being exported. This makes sure the file is not a bad CSV.
 * @param file_path 
 * @returns JSON string of the CSV
 */
export default function load_file(file_path: string) {
    if (fileMap.has(file_path) && file_path != "mock/src/data/csv/BadCSV.ts") {
        return ["successfully loaded file: " + file_path, JSON.stringify(fileMap.get(file_path))];
      }
    return ["failure to load file: " + file_path, ""];
}