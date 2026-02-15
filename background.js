browser.runtime.onMessage.addListener((request) => {
  if (request.type === "FETCH_GEMINI") {
    return fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${request.apikey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: request.prompt }] }]
      })
    })
    .then(response => response.json())
    .catch(err => ({ error: err.message }));
  }
});