document.getElementById("submit").onclick = () =>{
    const apikey = document.getElementById("password").value;
    browser.storage.local.set({apikey:apikey}).then(() => {alert("key saved");});
}