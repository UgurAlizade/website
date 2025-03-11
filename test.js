/*   async function sendMessage() {
    let userMessage = document.getElementById("userInput").value;
    let apiKey="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"

    let response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    let data = await response.json();
    console.log(data.choices[0].message.content)
  } */