const GEMINI_API_KEY = "";//Insert API key here
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

document.getElementById("input-box").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        let input = document.getElementById("input-box").value; //extract input 
        console.log(input); 

        /**TODOs: 
         * 1. Display input on chatbox screen
         * 2. Send request to Gemini API and extract response
         * 3. Display response on chatbox screen
        */
        let inputContainer = document.getElementById("inputforchatbox");
        inputContainer.textContent = input;
        fetch(GEMINI_API_URL, {
            method: "POST",
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      //Here to insert request input
                      text: input,
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
              let responseContainer = document.createElement("div");
              responseContainer.textContent = response;
              inputContainer.appendChild(responseContainer);
            })
            .catch((error) => {
              console.log("Error: "+error);
            });

            document.getElementById("input-box").value = "";
    }
})