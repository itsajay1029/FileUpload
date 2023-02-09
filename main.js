const btn = document.querySelector("#submitButton");
const nameInput = document.querySelector("#nameInput");
const fileInput = document.querySelector("#fileInput");
const desInput = document.querySelector("#desInput");
const dataContainer = document.querySelector(".containerForData");

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ajay1029/upload";
const CLOUDINARY_UPLOAD_PRESET = "social-media";
var file;

fileInput.addEventListener("change", () => {
  file = fileInput.files[0];
  console.log("Changed");
});

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("Clicked");

  if (nameInput.value === "") return;

  if (file === null && desInput.value === "") return;

  let str;
  if (file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    await fetch(CLOUDINARY_URL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        str = data.url.toString();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const data = {
    name: nameInput.value,
    description: desInput.value,
    image: str,
  };

  await fetch("http://localhost:8000/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  showData();
});

// fetch All data and display in the container

let fetchedData = [];
let timeout = setTimeout(fetchData, 3000);

async function fetchData() {
  await fetch("http://localhost:8000")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data;
    });
  showData();
}

function showData() {
  dataContainer.innerHTML = "";
  fetchedData.map((data) => {
    const box = document.createElement("div");
    box.classList.add("box");
    if (data.image) box.innerHTML += `<img src=${data.image} />`;
    if (data.description)
      box.innerHTML += `<div class="des"><p>${data.description}</p></div>`;
    box.innerHTML += `<div class="name"><p><span>${data.name}</span> posted this !</p></div>`;
    dataContainer.appendChild(box);
  });
}
