const btn = document.createElement("button");
btn.id = "copybtn";
document.body.appendChild(btn);

btn.onclick = async () =>{
    const {apikey=null} = await browser.storage.local.get("apikey");
    if(!apikey) return alert("please set api key in extension popup");

    btn.classList.add('loading');
    const curr_url = window.location.href;
    const prompt = `return only the code for the following hackerrank problem in cpp , no comments, give simple codes :${curr_url}`;
    const cleankey = apikey.trim();

    try{const data = await browser.runtime.sendMessage({
            type: "FETCH_GEMINI",
            apikey: apikey.trim(),
            prompt: prompt
        });
        if (data.error) throw new Error(data.error);

    if (!data || data.error) {
            throw new Error(data?.error || "Unknown API error");
        }

    if (!data.candidates || !data.candidates[0].content) {
            throw new Error("No code was generated. Check your prompt or API quota.");
        }
    
    const code = data.candidates[0].content.parts[0].text.replace(/```[a-z]*\n|```/g, '');
    await navigator.clipboard.writeText(code);
    }
    catch(e){
        console.error(e);
    }
    finally {
        btn.classList.remove('loading');
    }
}



