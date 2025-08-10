const offlineReplies = [
"Hello, Kaise Ho Aap?",
"Mera Name Hai Mickey!",
"Aap Kaha Se Ho?",
"Family Me Sab Kaise Hai",
"Aapka Din Kaisa Ja Raha Hai?",
"Aapko Kya Pasand Hai?",
"Aapka Favorite Cartoon Kya Hai?",
"Aapko Kya Pasand Hai?",
"Mujhe Aapse Baat Karke Bahut Khushi Hui!",
"Ok, Ab Main Chalta Hoon, Phir Milte Hai!"
];
let offlineIndex = 0; 
async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;
  appendMessage("You", message, "user");
  input.value = "";
try {
 const response = await fetch("http://localhost:3000/chat", {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
},
 body: JSON.stringify({ message })
});
 if (response.ok) {
 const data = await response.json();
 appendMessage("Mickey", data.reply, "mickey");
} else {
 throw new Error("API Error");
}
} 
 catch (err) {
 let reply = offlineReplies[offlineIndex];
 offlineIndex++;
 if (offlineIndex >= offlineReplies.length) {
 offlineIndex = 0; // phir se start
}
 appendMessage("Mickey", reply, "mickey");
}
}
function appendMessage(sender, message, type) {
 const chatBox = document.getElementById("chat-box");
 const msgDiv = document.createElement("div");
 msgDiv.classList.add("message", type);
 msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
 chatBox.appendChild(msgDiv);
 chatBox.scrollTop = chatBox.scrollHeight;
}
document.getElementById("user-input").addEventListener("keypress", function (e) {
 if (e.key === "Enter") {
 sendMessage();
}
});
function startVoice() {
 const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
 recognition.lang = "en-US";
 recognition.start();
 recognition.onresult = function (event) {
 const transcript = event.results[0][0].transcript;
 document.getElementById("user-input").value = transcript;
 sendMessage();
};
}
