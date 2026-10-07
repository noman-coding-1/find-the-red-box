// ===============================
// Find the Red Box Game
// ===============================

const boxes = document.querySelectorAll(".box");
const startBtn = document.querySelector("#start");
const info = document.querySelector(".info");


const startSound = document.querySelector("#startSound");
const boxSound = document.querySelector("#boxSound");
const wrongSound = document.querySelector("#wrongSound");



// ===============================
// Game Variables
// ===============================

let currentLevel = 1;
let dangerBox = null;
let gameStarted = false;
let timeLeft = 10;
let timer;





// ===============================
// Level Selection
// ===============================

const levelButtons = document.querySelectorAll(".level, .level-slected");

levelButtons.forEach(function (level, index) {

    level.addEventListener("click", function () {

        // Game চললে Level change হবে না
        if (gameStarted) {
            return;
        }

        // Selected Level
        currentLevel = index + 1;

        // সব Level normal করা
        levelButtons.forEach(function (item) {
            item.classList.remove("level-slected");
            item.classList.add("level");
        });

        // Click করা Level selected করা
        level.classList.remove("level");
        level.classList.add("level-slected");

        // Info update
        info.innerHTML = `
            <span>Level: ${currentLevel}</span>
            <span>|</span>
            <span>Press Start Game</span>
        `;
    });

});


// ===============================
// Start Game
// ===============================

startBtn.addEventListener("click", function () {

    gameStarted = true;
    timeLeft = 10;

    document.querySelector(".game-container").classList.add("game-started");
    startBtn.textContent = "Game Running...";


   startSound.currentTime = 0;
   startSound.play();

    startNewRound();
    startTimer();


    

   



});


// ===============================
// New Round
// ===============================

function startNewRound() {

    // Random Red Box নির্বাচন
    dangerBox = Math.floor(Math.random() * boxes.length);

    console.log("Red Box:", dangerBox + 1);

    // সব Box hide/normal থাকবে
    boxes.forEach(function (box) {
        box.style.backgroundColor = "#1253a6";
    });

    info.innerHTML = `
        <span>Level: ${currentLevel}</span>
        <span>|</span>
        <span>Time: ${timeLeft}s</span>
    `;
}


// ===============================
// Timer
// ===============================

function startTimer() {

    clearInterval(timer);

    timer = setInterval(function () {

        timeLeft--;

        info.innerHTML = `
            <span>Level: ${currentLevel}</span>
            <span>|</span>
            <span>Time: ${timeLeft}s</span>
        `;

        // Time শেষ
        if (timeLeft <= 0) {

            clearInterval(timer);

            gameStarted = false;

            startBtn.textContent = "▶ Start Game";

            info.innerHTML = `
                <span style="color:#ffcc00;">
                    ⏰ Time's Up!
                </span>
                <span>|</span>
                <span>Level: ${currentLevel}</span>
            `;
        }

    }, 1000);
}


// ===============================
// Box Click
// ===============================

boxes.forEach(function (box, index) {

    box.addEventListener("click", function () {

        boxSound.currentTime = 0;
        boxSound.play();

        startSound.pause();
        startSound.currentTime = 0;


        // Game শুরু না হলে কিছু হবে না
        if (gameStarted === false) {
            return;
        }


        // ===============================
        // Correct Box
        // ===============================

        if (index === dangerBox) {

            clearInterval(timer);

            gameStarted = false;

            // Red Box দেখানো
            box.style.backgroundColor = "#ff3048";

            // Level বাড়ানো
            if (currentLevel < 5) {

                currentLevel++;

                info.innerHTML = `
                    <span style="color:#10c98a;">
                        ✅ Correct!
                    </span>
                    <span>|</span>
                    <span>Level ${currentLevel}</span>
                `;

            } else {

                // Level 5 complete
                info.innerHTML = `
                    <span style="color:#10c98a;">
                        🏆 You Completed All Levels!
                    </span>
                `;
            }

            startBtn.textContent = "▶ Start Game";
        }


        // ===============================
        // Wrong Box
        // ===============================

        else {

            clearInterval(timer);

            gameStarted = false;

            // আসল Red Box দেখানো
            boxes[dangerBox].style.backgroundColor = "#ff3048";

            startBtn.textContent = "↻ Try Again";

            info.innerHTML = `
                <span style="color:#ff3048;">
                    ❌ Wrong Box! You're Out!
                </span>
                <span>|</span>
                <span>Level: ${currentLevel}</span>
            `;
        }

    });

});