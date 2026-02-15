document.getElementById("submit").onclick = async () => {
    const apikey = document.getElementById("password").value.trim();
    const btn = document.getElementById("submit");

    if (!apikey) return alert("Please enter a key.");

    btn.innerText = "Validating...";
    btn.disabled = true;

    try {
    
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apikey}`);
        
        if (response.ok) {
            await browser.storage.local.set({ apikey });
            alert("Key validated and saved!");
        } else {
            const errorData = await response.json();
            alert(`Invalid Key: ${errorData.error.message}`);
        }
    } catch (e) {
        alert("Connection error. Could not validate key.");
    } finally {
        btn.innerText = "Save Key";
        btn.disabled = false;
    }
};