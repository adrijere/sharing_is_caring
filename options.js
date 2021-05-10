let tagsListElement = document.getElementById("tagsList");
const defaultTagList = [
    {value: "nocode", name: 'No Code' },
    {value: "marketing", name: 'Marketing' },
    {value: "crypto", name: 'Crypto' },
    {value: "sales", name: 'Sales' },
    {value: "linkedin tips", name: 'Linkedin tips' },
    {value: "email", name: 'Email' },
    {value: "webinar", name: 'Webinar' },
    {value: "newsletter", name: 'Newsletter' },
    {value: "e-commerce", name: 'E-commerce</' }
]

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ tagsList });
}

// Add a button to the tagsListElement for each supplied color
function constructOptions(tagsList) {
  chrome.storage.sync.get("tagsList", (data) => {
    // For each color we were provided…
    for (let tag of tagsList) {
      // …create a button with that color…
      let input = document.createElement("input");
      input.dataset.value = tag.value;
      input.style.backgroundColor = tag.name;

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      tagsListElement.appendChild(input);
    }
  });
}

// Initialize the tagsListElement by constructing the color options
constructOptions(defaultTagList);