const headerRight = document.querySelector(".header-right");
const navbarList = document.querySelector(".navbar-list");
const iframesWrapper = document.querySelector(".iframes-wrapper");
const iframesList = document.querySelector(".iframes-list");
const homeButton = document.querySelector("#homeButton");
const inputSearch = document.querySelector("#inputSearch");
const toggleMenu = document.querySelector(".toggle-menu")

toggleMenu.addEventListener("click", () => {
  toggleMenu.classList.add("toggleLeft")
})

let voiceS = new SpeechRecognition();
voiceS.lang = "en-US";
let publicVideos = [];


function voiceSearch() {
  voiceS.start();
}

voiceS.onresult = (ev) => {
  const transcript = ev.results[0][0].transcript;
  inputSearch.value = transcript;
  console.log(transcript);
};

voiceS.onerror = (er) => {
  console.error("Ovoz yozishda xatolik", er.error);
  console.log(voiceS);
};

async function getAllUser() {
  let users = await axios.get("http://localhost:5050/users");
  users = users.data.data;
  console.log(users);
  for (const user of users) {
    navbarList.innerHTML += `
        <li class="channel" onclick="getAllVideos('${user.userId}')">
            <a href="#">
                <img src="http://localhost:5050/uploads/${user.profileImg}" alt="channel-icon" width="30px" height="30px">
                <span>${user.username}</span>
            </a>
        </li>
    `;
  }

  const channels = navbarList.querySelectorAll(".channel");
  channels.forEach((ch) => {
    ch.addEventListener("click", () => {
      channels.forEach((ch) => ch.classList.remove("active"));
      ch.classList.add("active");
    });
  });
}

async function getAllVideos(selectedUser, findVideos) {
  let allVideos;

  if (findVideos) {
    allVideos = findVideos;
  } else {
    let res = await axios.get("http://localhost:5050/files");
    allVideos = res.data.data;

    publicVideos = allVideos;
  }

  if (selectedUser) {
    allVideos = allVideos.filter(
      (video) => String(video.user.userId) === String(selectedUser),
    );
  }

  iframesList.innerHTML = null;

  if (allVideos.length === 0) {
    iframesList.innerHTML = `<h2 style="padding: 20px;">Bu foydalanuvchi videolar yuklamagan</h2>`;
    return;
  }

  for (const video of allVideos) {
    iframesList.innerHTML += `
        <li class="iframe" data-id=${video.user.userId}>
            <video src="http://localhost:5050/uploads/${video.viewFile}" controls=""></video>
            <div class="iframe-footer">
                <img src="http://localhost:5050/uploads/${video.user.profileImg}" alt="channel-icon">
                <div class="iframe-footer-text">
                    <h3 class="channel-name">${video.videoInput}</h3>
                    <h2 class="iframe-title">${video.user.username}</h2>
                    <time class="uploaded-time">${video.date} | ${new Date().toLocaleTimeString()}</time>
                    <div class="download" href="${video.downloadLink}">
                        <span>${video.size} MB</span>
                    </div>
                </div>
            </div>
        </li>
    `;
  }
}

inputSearch.addEventListener("input", (e) => {
  let searchEl = inputSearch.value.trim().toLowerCase();

  let findVideos = publicVideos.filter((video) =>
    video.videoInput.toLowerCase().includes(searchEl),
  );

  getAllVideos(null, findVideos);
});

headerRight.innerHTML += `
    <a id="list" href="../frontend/admin.html">
        <img class="avatar-img" src="./img/avatar.jpg" alt="avatar-img" width="32px" height="32px">
    </a>
`;

getAllUser();
getAllVideos();
voiceSearch();
