const commandsList =
  document.getElementById("commandsList");

const createBtn =
  document.getElementById("createBtn");

const cancelEditBtn =
  document.getElementById("cancelEditBtn");

const editorTitle =
  document.getElementById("editorTitle");

const responsesContainer =
  document.getElementById("responsesContainer");

const addResponseBtn =
  document.getElementById("addResponseBtn");

const feedbackMessage =
  document.getElementById("feedbackMessage");

const searchInput =
  document.getElementById("searchInput");

  let editingCommand = null;

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

    card.dataset.commandName = name;

    const responsesHtml = data.responses
  .map(response => {

    let preview = "";

    switch (response.type) {

      case "image":
      case "gif":

        preview = `
          <img
            src="${response.content}"
            class="media-preview"
          >
        `;
        break;

      case "video":

        preview = `
          <video
            class="media-preview"
            controls
          >
            <source
              src="${response.content}"
            >
          </video>
        `;
        break;

      default:

        preview = `
          <p>${response.content}</p>
        `;
    }

    return `
      <div class="response-item">

        <strong>
          ${response.type}
        </strong>

        ${preview}

      </div>
    `;
  })
  .join("");

card.innerHTML = `
  <div class="command-header">

    <h3>!${name}</h3>

    <span class="response-count">
      ${data.responses.length} response(s)
    </span>

  </div>

  <div class="responses-list">
    ${responsesHtml}
  </div>

  <div class="command-actions">

    <button
      class="edit-btn"
      onclick="editCommand('${name}')"
    >
      Edit
    </button>

    <button
      class="delete-btn"
      onclick="deleteCommand('${name}')"
    >
      Delete
    </button>

  </div>
    `;

    commandsList.appendChild(card);
  }
}
//search dans panel
searchInput.addEventListener(
  "input",
  filterCommands
);
function filterCommands() {

  const search =
    searchInput.value.toLowerCase();

  const cards =
    document.querySelectorAll(".command-card");

  cards.forEach(card => {

    const commandName =
      card.dataset.commandName.toLowerCase();

    const visible =
      commandName.includes(search);

    card.style.display =
      visible
        ? "block"
        : "none";
  });
}

function addResponseField() {

  const wrapper =
    document.createElement("div");

  wrapper.className = "response-editor";

wrapper.innerHTML = `
  <div class="response-toolbar">

    <select class="response-type">
      <option value="text">Text</option>
      <option value="gif">GIF</option>
      <option value="image">Image</option>
      <option value="video">Video</option>
    </select>

    <button
      type="button"
      class="remove-response-btn"
    >
      ✖
    </button>

  </div>

  <textarea
    class="response-content"
    placeholder="Response content"
  ></textarea>
`;

  responsesContainer.appendChild(wrapper);

  const removeBtn =
  wrapper.querySelector(
    ".remove-response-btn"
  );

  removeBtn.addEventListener(
  "click",
  () => {

    console.log("REMOVE CLICK");

    console.log(
      document.querySelectorAll(
        ".response-editor"
      ).length
    );

    wrapper.remove();

    updateRemoveButtons();
    
    console.log("REMOVED");
  }
);
}

addResponseBtn.addEventListener(
  "click",
  addResponseField
);


addResponseField();

updateRemoveButtons();

async function editCommand(name) {

editingCommand = name;

  createBtn.textContent =
    "💾 Enregistrer les modifications";

  cancelEditBtn.style.display =
  "inline-block";

  editorTitle.textContent =
  `📝 Modification de !${name}`;

  const res =
    await fetch("/api/commands");

  const commands =
    await res.json();

  const command =
    commands[name];

  if (!command) return;

  // ===== Fill command name =====
  document.getElementById("commandName").value =
    name;

  // ===== Clear current editors =====
  responsesContainer.innerHTML = "";

  // ===== Rebuild responses =====
  command.responses.forEach(response => {

    const wrapper =
      document.createElement("div");

    wrapper.className = "response-editor";

wrapper.innerHTML = `
  <div class="response-toolbar">

    <select class="response-type">
      <option value="text">Text</option>
      <option value="gif">GIF</option>
      <option value="image">Image</option>
      <option value="video">Video</option>
    </select>

    <button
      type="button"
      class="remove-response-btn"
    >
      ✖
    </button>

  </div>

  <textarea
    class="response-content"
  >${response.content}</textarea>
`;
wrapper.querySelector(".response-type").value =
  response.type;

responsesContainer.appendChild(wrapper);

const removeBtn =
  wrapper.querySelector(
    ".remove-response-btn"
  );

removeBtn.addEventListener(
  "click",
  () => {

    const editors =
      document.querySelectorAll(
        ".response-editor"
      );

    if (editors.length <= 1) {
      return;
    }

    wrapper.remove();
  }
);

});

updateRemoveButtons();

document
  .querySelectorAll(".command-card")
  .forEach(card => {

    card.classList.remove("editing");
  });

const activeCard =
  document.querySelector(
    `[data-command-name="${name}"]`
  );

if (activeCard) {
  activeCard.classList.add("editing");
}
  showFeedback(
    `"${name}" C'est effectivement modifiable, allons-y !`
  );
}
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

updateRemoveButtons();

showFeedback(
  "J'ai lu trop vite, j'ai pas retenu... (c'est bien sauvegardé :P)"
);
});
// ===== Cancel Button =====
cancelEditBtn.addEventListener(
  "click",
  () => {

    editingCommand = null;

    editorTitle.textContent =
      "Create a Command";

    createBtn.textContent =
      "Add Command";

    document.getElementById(
      "commandName"
    ).value = "";

    responsesContainer.innerHTML = "";

    addResponseField();

    document
      .querySelectorAll(".command-card")
      .forEach(card => {

        card.classList.remove("editing");
      });

    cancelEditBtn.style.display =
      "none";
  }
);
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
    `"${name}" est supprimé ! Finito ! N'en parlons plus.`
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
async function loadUser() {

  const response =
    await fetch("/api/me");

  const data =
    await response.json();

  const user =
    data.user;

  document.getElementById(
    "admin-info"
  ).textContent =

    `Connected as ${user.username}`;
}

function updateRemoveButtons() {

  const editors =
    document.querySelectorAll(
      ".response-editor"
    );

  const removeButtons =
    document.querySelectorAll(
      ".remove-response-btn"
    );

  const canRemove =
    editors.length > 1;

  removeButtons.forEach(btn => {

    btn.style.display =
      canRemove
        ? "inline-block"
        : "none";
  });
}

loadUser();


// ===== Init =====
loadCommands();