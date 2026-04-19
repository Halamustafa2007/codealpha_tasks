const API = "http://localhost:5000";
const socket = io(API);

socket.on("update", () => {
  loadProjects();
  loadTasks();
});

async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  alert("Registered");
}

async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  alert("Login Success");
}

async function addProject() {
  const name = document.getElementById("projectName").value;

  await fetch(API + "/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  document.getElementById("projectName").value = "";
}

async function loadProjects() {
  const res = await fetch(API + "/projects");
  const data = await res.json();

  const box = document.getElementById("projects");
  box.innerHTML = "";

  data.forEach(project => {
    const div = document.createElement("div");
    div.className = "project-card";
    div.innerText = project.name;
    box.appendChild(div);
  });
}

async function addTask() {
  const title = document.getElementById("taskTitle").value;
  const assignedTo = document.getElementById("assignUser").value;
  const comment = document.getElementById("commentInput").value;
  const status = document.getElementById("status").value;

  await fetch(API + "/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      assignedTo,
      comment,
      status
    })
  });

  document.getElementById("taskTitle").value = "";
  document.getElementById("assignUser").value = "";
  document.getElementById("commentInput").value = "";
}

async function loadTasks() {
  const res = await fetch(API + "/tasks");
  const data = await res.json();

  document.getElementById("todo").innerHTML = "";
  document.getElementById("progress").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  data.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <b>${task.title}</b><br>
      Assigned: ${task.assignedTo}<br>
      Comment: ${task.comment}
    `;

    if (task.status === "To Do") {
      document.getElementById("todo").appendChild(div);
    }

    if (task.status === "In Progress") {
      document.getElementById("progress").appendChild(div);
    }

    if (task.status === "Done") {
      document.getElementById("done").appendChild(div);
    }
  });
}

loadProjects();
loadTasks();