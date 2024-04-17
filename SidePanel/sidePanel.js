const GEMINI_API_KEY = "AIzaSyBUUoCnG63V9BS3GxxDIpqT3CFC7_meODI";
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

        fetch(GEMINI_API_URL, {
            method: "POST",
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      //Here to insert request input
                      text: "Hello can you teach me what 1+1 =?",
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
            });
    }
})