const GEMINI_API_KEY = ""; //Insert API key here
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

let history = ""; 

document.getElementById("input-box").addEventListener("keydown", (event) => {
  
  if (event.key === "Enter") {
    event.preventDefault();

    let input = document.getElementById("input-box").value; //extract input
    console.log(input); //this is the user input
    history += (input + "\n");

    //Jamie:
    //This is a container that takes in questions and gives them their own
    //div in the HTML
    let questionContainer = document.createElement("div");
    //let inputContainer = document.getElementById("input-for-chatbox");
    let body = document.getElementById("body");
    questionContainer.textContent = input;
    questionContainer.setAttribute("id", "input-for-chatbox");
    body.appendChild(questionContainer);
    body.scrollTop = body.scrollHeight;

    //body.setAttribute("id", "input-for-chatbox");
    console.log(body.textContent + " " + input);

    let questionContainer = document.createElement("input-for-chatbox");
    let inputContainer = document.getElementById("input-for-chatbox");
    inputContainer.appendChild(questionContainer);
    questionContainer.textContent = input;

    fetch(GEMINI_API_URL, {
      method: "POST",
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                //Kaua:
                //Here to insert request input, which contains all the past convo history
                text: history,
              },
            ],
          },
        ],
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        //[*3: Here is the response]
        let response = result["candidates"][0]["content"]["parts"][0]["text"];
        console.log(response);
        history += (response + "\n");
        let responseContainer = document.createElement("div");
        responseContainer.setAttribute("id", "output-for-chatbox");
        responseContainer.textContent = response;
        //let outputContainer = document.getElemen  tById("output-for-chatbox");
        //outputContainer.appendChild(responseContainer);
        body.appendChild(responseContainer);
        body.scrollTop = body.scrollHeight;
      })
      .catch((error) => {
        console.log("Error: " + error);
      });

    document.getElementById("input-box").value = "";
  }

//Copy & paste response through highlighting
document.addEventListener('mouseup', function() {
  let selectedText = getSelectedText();
  if (selectedText.length > 0) { // Check if there's any selected text
    document.getElementById('input-box').value = selectedText; // Set the input box value to the selected text
  }
});

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
    return document.selection.createRange().text;
  }
  return "";
}

// Optional: Clear the selection after setting the input box value
document.addEventListener('mousedown', function() {
  window.getSelection().removeAllRanges();
});
});
