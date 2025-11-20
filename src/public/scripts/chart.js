const API = "http://localhost:5000";

function load() {
  fetch(`${API}/messages`, { credentials: "include" })
    .then(res => res.json())
    .then(data => {
      let box = document.getElementById("messages");
      box.innerHTML = "";

      data.forEach(m => {
        let div = document.createElement("div");
        div.className = "bubble";
        if (m.username === localStorage.username) div.classList.add("me");

        let fileHTML = "";
        if (m.file) {
          fileHTML = `<br><a href="${API}/uploads/${m.file}" target="_blank">📎 ${m.file}</a>`;
        }

        div.innerHTML = `
          <b>${m.username}</b><br>
          ${m.text || ""}
          ${fileHTML}
          <div class="timestamp">${m.timestamp}</div>
        `;

        box.appendChild(div);
      });

      box.scrollTop = box.scrollHeight;
    });
}

setInterval(load, 1200);

function send() {
  let text = document.getElementById("text").value;
  let file = document.getElementById("file").files[0];

  if (!text && !file) return;

  let form = new FormData();
  form.append("text", text);
  if (file) form.append("file", file);

  fetch(`${API}/send`, {
    method: "POST",
    body: form,
    credentials: "include",
  });

  document.getElementById("text").value = "";
  document.getElementById("file").value = "";
}