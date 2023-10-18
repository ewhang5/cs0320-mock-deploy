import BadCSV from "../csv/BadCSV";
import BasicHeaderCSV from "../csv/BasicHeaderCSV";
import BasicNoHeaderCSV from "../csv/BasicNoHeaderCSV";
import EmptyCSV from "../csv/EmptyCSV";

/**
 * These are the mocked search results for given search commands.
 */
const searchResults = new Map<string, Array<Array<string>>>();

// search column = Data Type value = White header = true
searchResults.set(
  "Data Type White true",
  [["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"]]
);

// search column = 1 value = White header = true
searchResults.set(
  "1 White true",
  [["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"]]
);

// search column = value = White header = true
searchResults.set(
  "White true",
  [["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"]]
);

// search column = State value = RI header = true
searchResults.set("State RI true", BasicHeaderCSV);

// search column = value = RI header = true
searchResults.set(" RI true", BasicHeaderCSV);

// search column = value = header = false --> should fail
// search column = Star value = Rigel Kentaurus A header = false
searchResults.set("Star Rigel Kentaurus A false", EmptyCSV)

// search value = Rigel Kentaurus A header = false
searchResults.set("Rigel Kentaurus A false", [["71454", "Rigel Kentaurus A", "-0.50359", "-0.42128", "-1.1767"],
  ["71457", "Rigel Kentaurus A", "-0.50362", "-0.42139", "-1.17665"]])

// search column = 1 value = Rigel Kentaurus A header = false
searchResults.set("1 Rigel Kentaurus A false", [["71454", "Rigel Kentaurus A", "-0.50359", "-0.42128", "-1.1767"],
  ["71457", "Rigel Kentaurus A", "-0.50362", "-0.42139", "-1.17665"]])

// search column = State value = NY header = true
// search term that doesn't exist
searchResults.set("State NY true", EmptyCSV)

// search column = value = header = false
searchResults.set("false", EmptyCSV)

// search column = Blah value = Blah header = false searching an empty
searchResults.set("blah blah false", EmptyCSV)
export default searchResults;