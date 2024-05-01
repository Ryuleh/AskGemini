const GEMINI_API_KEY = "AIzaSyBDluKKJczAfrsD2WnngU4Uc5nHuZ3ZpCY"; // Insert API key here
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

document.getElementById("input-box").addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    let input = document.getElementById("input-box").value; // extract input
    console.log(input); // this is the user input

    // Display input on chatbox screen
    let questionContainer = document.createElement("div").innerHTML(input);
    questionContainer.textContent = input;
    let chatboxContainer = document.getElementById("chatbox").innerText(input);
    chatboxContainer.appendChild(questionContainer);

    // Send request to Gemini API and extract response
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from Gemini API");
      }

      const result = await response.json();
      // Display response on chatbox screen
      let responseText = result["candidates"][0]["content"]["parts"][0]["text"];
      let responseContainer = document.createElement("div");
      responseContainer.textContent = responseText;
      chatboxContainer.appendChild(responseContainer);
    } catch (error) {
      console.log("Error: " + error);
    }

    document.getElementById("input-box").value = "";
  }
});
