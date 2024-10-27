// BJ-MENU

let winsElement = JSON.parse(localStorage.getItem("wins")) || 0;
let balance = JSON.parse(localStorage.getItem("balance")) || 0;

// BJ-MENU

const hitUI = document.getElementById("hit");
const standUI = document.getElementById("stand");

const startBTN = document.getElementById("start-btn");
const balanceBTN = document.getElementById("add-bnlnc");
const error$ = document.getElementById("error");
const priceUI = document.getElementById("price");
const inputBet = document.getElementById("input-bet");
const betBTN = document.getElementById("betButton");

function updateWinsUI() {
    const Blackjacks = document.getElementById("wins");
    if (Blackjacks) {
        Blackjacks.textContent = winsElement;
    }
}

function updateBalanceUI() {
    const balanceUI = document.getElementById("balance");
    if (balanceUI) {
        balanceUI.textContent = balance;
    }
}

let inputValue = 200; 

function countdownError(seconds) {
    setTimeout(function() {
        error$.textContent = "";
    }, seconds * 3000);
}

updateWinsUI();
updateBalanceUI();

if (betBTN) {
    betBTN.addEventListener("click", function() {
        inputValue = inputBet.value ? parseInt(inputBet.value) : 200;
        error$.textContent = "";
        inputBet.value = "";
        if (inputValue >= 50 && inputValue <= 1000) {
            priceUI.textContent = "$" + inputValue;
        } else {
            error$.textContent = "Please pick a number between 50 & 1000";
            inputValue = 200;
        }
    });
}

if (balanceBTN) {
    balanceBTN.addEventListener("click", function() {
        balance += 25;
        updateBalanceUI();
        localStorage.setItem("balance", balance.toString());
    });
}

if (startBTN) {
    startBTN.addEventListener("click", function() {
        if (balance >= inputValue) {
            error$.textContent = "";
            balance -= inputValue;
            localStorage.setItem("balance", balance.toString());
            updateBalanceUI();
            window.location.href = './BJ-game';
        } else {
            error$.textContent = "$" + inputValue + " is required to start the match";
        }
    });
}

// BJ-GAME

function randomNum() {
    return Math.floor(Math.random() * 10) + 1;
}

function delButtons() {
    hitUI.remove();
    standUI.remove();
}

let CardsPlayer = [randomNum(), randomNum()];
let PlayerSum = 0;

let CardsBOT = [randomNum(), randomNum()];
let BOTSum = 0;

function renderCards() {
    BOTSum = CardsBOT.reduce((sum, card) => sum + card, 0);
    PlayerSum = CardsPlayer.reduce((sum, card) => sum + card, 0);

    if (PlayerCardsUI) PlayerCardsUI.textContent = CardsPlayer.join(" ");
    if (BOTcardsUI) BOTcardsUI.textContent = CardsBOT.join(" ");

    if (numPlayerTotalUI && numBOTtotalUI) {
        numPlayerTotalUI.textContent = BOTSum;
        numBOTtotalUI.textContent = PlayerSum;
    }
}

const timerElement = document.getElementById("timer");
let timeLeft = 3;

timerElement.textContent = timeLeft;
let timeoutID = setTimeout(function counter() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft > 0) {
        timeoutID = setTimeout(counter, 1000);
    } else {
        clearTimeout(timeoutID);
        timerElement.textContent = "Started";
        gameStarted = true;
        renderGame();
    }
}, 1000);

const PlayerCardsUI = document.getElementById("PlayerCardsDisplay");
const numPlayerTotalUI = document.getElementById("numPlayerTotal");
const BOTcardsUI = document.getElementById("BOTcardsDisplay");
const numBOTtotalUI = document.getElementById("numBOTtotal");
const randBotName = document.getElementById("customizationP-1");
const resultShow = document.getElementById("result");
const rematchBtn = document.getElementById("rematch")

const randomBotNames = ['Alex', 'Mihai', 'GIGI', 'Anthony', 'Jimmy', 'Alexa', 'Madalin', 'Anuta', 'Jack', 'Johny', 'Karina', 'Andreea'];
const randomItem = randomBotNames[Math.floor(Math.random() * randomBotNames.length)];

if (randBotName) {
    randBotName.innerHTML = `${randomItem} <h6>(BOT)</h6>`;
}

let maxStands = 0;
let maxStandsSec = 0;

if (hitUI) {
    hitUI.addEventListener("click", function() {
        if (gameStarted) {
            CardsPlayer.push(randomNum());
            maxStands = 0;
            standUI.style.opacity = "100%";
            renderGame();
        }
    });
}

if (standUI) {
    standUI.addEventListener("click", function() {
        if (gameStarted && maxStands < 2 && maxStandsSec < 3) {
            CardsBOT.push(randomNum());
            maxStands++;
            maxStandsSec++;
            renderGame();
            if (maxStands === 2 || maxStandsSec === 3) {
                standUI.style.opacity = "60%";
            }
        }
    });
}
if (rematchBtn){
    rematchBtn.addEventListener("click", ()=>{
        window.location.href = './BJ-menu'
    })
}

function renderGame() {
    renderCards();

    if (BOTSum === 21) {
        resultShow.innerHTML = `${randomItem} Won`;
        delButtons();
    } else if (BOTSum > 21) {
        resultShow.innerHTML = `You Won! +$${inputValue * 2}`;
        winsElement++;
        localStorage.setItem("wins", winsElement.toString());
        updateWinsUI();
        balance += inputValue * 2;
        localStorage.setItem("balance", balance.toString());
        updateBalanceUI();
        delButtons();
    }
    
    if (PlayerSum === 21) {
        resultShow.innerHTML = `You Won! +$${inputValue * 2}`;
        winsElement++;
        localStorage.setItem("wins", winsElement.toString());
        balance += inputValue * 2;
        localStorage.setItem("balance", balance.toString());
        updateBalanceUI();
        delButtons();
    } else if (PlayerSum > 21) {
        resultShow.innerHTML = `${randomItem} Won`;
        delButtons();
    }
}
