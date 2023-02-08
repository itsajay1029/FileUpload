const btn = document.querySelector("#submitButton");
const nameInput = document.querySelector("#nameInput");
const fileInput = document.querySelector("#fileInput");
const desInput = document.querySelector("#desInput");
const dataContainer = document.querySelector(".containerForData");

// btn.addEventListener("click", (e) => {
//   console.log("Clicked");

//   if (nameInput.value === "") return;

//   if (fileInput.value === "") return;

//   if (desInput.value === "") return;
// });

// fetch All data and display in the container

let fetchedData = [];
fetchData();

async function fetchData() {
  await fetch("http://localhost:8000")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data;
    });
  showData();
}

function showData() {
  //   dataContainer.innerHTML = "";
  //   fetchedData.map((data) => {
  //     const base64String = btoa(
  //       String.fromCharCode(...new Uint8Array(data.image.data.data))
  //     );
  //     const box = document.createElement("div");
  //     box.classList.add("box");
  //     box.innerHTML += `<p>${data.name}</p>`;
  //     // box.innerHTML += `<img src=data:image/png;base64,${base64String} />`;
  //     dataContainer.appendChild(box);
  //   });
}
