
// Exporting the current Time..
export let time;

// Function to display current time...
export function displayCurrentTime() {

  // taking the Data function for current time...
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  time = `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
  return time;
}



