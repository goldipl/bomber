import gamePage from "./gamePage.js";

const startPage = () => {
    app.innerHTML = `
  <section class="homeContainer" id="homeContainer">
	<h1 class="game-title">Bomberman</h1>
    <button class="startButton" id="startButton">START</button>
  </section>
  `;

    const startButton = document.getElementById("startButton");

    startButton.onclick = () => {
        gamePage();
    };
};

startPage();