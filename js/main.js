const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

document.getElementById("clickableLogo").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Select all images inside the gallery
const galleryImages = document.querySelectorAll(".galleryContainer .item img");

// Create a modal container dynamically
const modal = document.createElement("div");
modal.classList.add("imageModal");
modal.innerHTML = `
  <div class="modalContent">
    <span class="close">&times;</span>
    <img class="modalImage" src="" alt="Full Image">
  </div>
`;
document.body.appendChild(modal);

const modalImage = modal.querySelector(".modalImage");
const closeModal = modal.querySelector(".close");

// Open modal on image click
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = img.src;
  });
});

// Close modal when "X" is clicked
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
