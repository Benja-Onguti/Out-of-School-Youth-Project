document.addEventListener("DOMContentLoaded", function() {
    const img = document.querySelector(".donate-form img");

    img.addEventListener("click", function() {
        const fullscreenDiv = document.createElement("div");
        fullscreenDiv.classList.add("fullscreen-img");

        const enlargedImg = document.createElement("img");
        enlargedImg.src = img.src;

        const closeButton = document.createElement("span");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add("close-btn");

        closeButton.addEventListener("click", function() {
            fullscreenDiv.remove();
        });

        fullscreenDiv.appendChild(enlargedImg);
        fullscreenDiv.appendChild(closeButton);
        document.body.appendChild(fullscreenDiv);
    });
});
