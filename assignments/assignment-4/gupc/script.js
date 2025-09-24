document
  .getElementById("usernameInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      getProfile();
    }
  });

async function getProfile() {
  const username = document.getElementById("usernameInput").value.trim();
  const card = document.getElementById("profileCard");
  const errorMsg = document.getElementById("errorMsg");
  const loading = document.getElementById("loading");

  card.style.display = "none";
  errorMsg.style.display = "none";
  loading.style.display = "none";

  if (!username) {
    showError("⚠️ Please enter a username!");
    return;
  }

  try {
    loading.style.display = "block";

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    // user data
    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("name").textContent = data.name || data.login;
    document.getElementById("username").textContent = `@${data.login}`;
    document.getElementById("bio").textContent =
      data.bio || "This user hasn't added a bio yet.";
    document.getElementById("repos").textContent = data.public_repos;
    document.getElementById("followers").textContent = data.followers;
    document.getElementById("following").textContent = data.following;
    document.getElementById("profileLink").href = data.html_url;

    document.getElementById("location").textContent =
      data.location || "Not specified";
    document.getElementById("blog").textContent = data.blog || "None";
    document.getElementById("company").textContent =
      data.company || "Not specified";

    const joinedDate = new Date(data.created_at);
    document.getElementById("joined").textContent =
      joinedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    loading.style.display = "none";
    card.style.display = "block";
  } catch (error) {
    loading.style.display = "none";
    showError("❌ User not found! Please check the username.");
  }
}

function showError(message) {
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

const sampleUsernames = ["octocat", "torvalds", "gaearon", "sindresorhus"];

function getRandomSample() {
  const randomUsername =
    sampleUsernames[Math.floor(Math.random() * sampleUsernames.length)];
  document.getElementById("usernameInput").value = randomUsername;
  getProfile();
}

document
  .querySelector(".title h1")
  .addEventListener("dblclick", getRandomSample);
