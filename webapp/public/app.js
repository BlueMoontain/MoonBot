const commandsList =
  document.getElementById("commandsList");

const createBtn =
  document.getElementById("createBtn");

const responsesContainer =
  document.getElementById("responsesContainer");

const addResponseBtn =
  document.getElementById("addResponseBtn");

const feedbackMessage =
  document.getElementById("feedbackMessage");

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

function addResponseField() {

  const wrapper =
    document.createElement("div");

  wrapper.className = "response-editor";

  wrapper.innerHTML = `
    <select class="response-type">
      <option value="text">Text</option>
      <option value="gif">GIF</option>
      <option value="image">Image</option>
      <option value="video">Video</option>
    </select>

    <textarea
      class="response-content"
      placeholder="Response content"
    ></textarea>
  `;

  responsesContainer.appendChild(wrapper);
}

addResponseBtn.addEventListener(
  "click",
  addResponseField
);

addResponseField();

// ===== Create Command =====
createBtn.addEventListener("click", async () => {

  const name =
    document.getElementById("commandName").value;

  if (!name) return;

  const responseEditors =
    document.querySelectorAll(".response-editor");

  const responses = [];

  responseEditors.forEach(editor => {

    const type =
      editor.querySelector(".response-type").value;

    const content =
      editor.querySelector(".response-content").value;

    if (!content) return;

    responses.push({
      type,
      content
    });
  });

  if (!responses.length) return;

  await fetch("/api/commands", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name,
      responses
    })
  });

  loadCommands();

  document.getElementById("commandName").value = "";

responsesContainer.innerHTML = "";

addResponseField();

showFeedback(
  "Another whisper joins the moonlit archives..."
);
});

// createBtn.addEventListener("click", async () => {

//   const name =
//     document.getElementById("commandName").value;

//   const response =
//     document.getElementById("commandResponse").value;

//   if (!name || !response) return;

//   await fetch("/api/commands", {

//     method: "POST",

//     headers: {
//       "Content-Type": "application/json"
//     },

//     body: JSON.stringify({

//       name,

//       responses: [
//         {
//           type: "text",
//           content: response
//         }
//       ]
//     })
//   });

//   loadCommands();
// });


// ===== Delete =====
async function deleteCommand(name) {

  const confirmed = confirm(
    `Cast "${name}" into the void forever?`
  );

  if (!confirmed) return;

  await fetch(`/api/commands/${name}`, {
    method: "DELETE"
  });

  loadCommands();

  showFeedback(
    `"${name}" has been erased from memory...`
  );
}
function showFeedback(message, type = "success") {

  feedbackMessage.textContent = message;

  feedbackMessage.className = "";

  feedbackMessage.classList.add(
    type === "success"
      ? "feedback-success"
      : "feedback-error"
  );

  feedbackMessage.style.display = "block";

  setTimeout(() => {
    feedbackMessage.style.display = "none";
  }, 3000);
}

// ===== Init =====
loadCommands();