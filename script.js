
const messages = document.getElementById('messages');
const input = document.getElementById('input');

const aiName = "NexorAI";
const personality = "NexorAI is Rahul`s’s AI friend, 14 years old, loves cricket, KL Rahul, and FC Barcelona.";

async function sendMessage(){
  const text = input.value;
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';

  const prompt = personality + "\nUser: " + text + "\n" + aiName + ": ";

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAPI
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 80
    })
  });

  const data = await response.json();
  const reply = data.choices[0].text.trim();
  addMessage(reply, 'bot');
}

function addMessage(text, sender){
  const div = document.createElement('div');
  div.classList.add('message', sender);
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
