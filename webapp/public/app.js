const commandsList =
  document.getElementById("commandsList");

const createBtn =
  document.getElementById("createBtn");

// ===== Load Commands =====
async function loadCommands() {

  const res =
    await fetch("/api/commands");

  const commands =
    await res.json();

  commandsList.innerHTML = "";

  for (const [name, data] of Object.entries(commands)) {

    const card =
      document.createElement("div");

    card.className = "command-card";

    const responsesHtml = data.responses
      .map(response => `
        <div class="response-item">
          <strong>${response.type}</strong> :
          ${response.content}
        </div>
      `)
      .join("");

    card.innerHTML = `
      <h3>!${name}</h3>

      <p>
        ${data.responses.length} response(s)
      </p>

      <div class="responses-list">
        ${responsesHtml}
      </div>

      <button onclick="deleteCommand('${name}')">
        Delete
      </button>
    `;

    commandsList.appendChild(card);
  }
}

// // ===== Load Commands =====
// async function loadCommands() {

//   const res =
//     await fetch("/api/commands");

//   const commands =
//     await res.json();

//   commandsList.innerHTML = "";

//   for (const [name, data] of Object.entries(commands)) {

//     const responsesHtml = data.responses
//   .map(response => `
//     <div class="response-item">
//       <strong>${response.type}</strong> :
//       ${response.content}
//     </div>
//   `)
//   .join("");

// card.innerHTML = `
//   <h3>!${name}</h3>

//   <p>
//     ${data.responses.length} response(s)
//   </p>

//   <div class="responses-list">
//     ${responsesHtml}
//   </div>

//   <button onclick="deleteCommand('${name}')">
//     Delete
//   </button>
// `;

//     commandsList.appendChild(card);
//   }
// }


// ===== Create Command =====
createBtn.addEventListener("click", async () => {

  const name =
    document.getElementById("commandName").value;

  const response =
    document.getElementById("commandResponse").value;

  if (!name || !response) return;

  await fetch("/api/commands", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      name,

      responses: [
        {
          type: "text",
          content: response
        }
      ]
    })
  });

  loadCommands();
});


// ===== Delete =====
async function deleteCommand(name) {

  await fetch(`/api/commands/${name}`, {
    method: "DELETE"
  });

  loadCommands();
}


// ===== Init =====
loadCommands();