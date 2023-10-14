// Made by : GIGI-CodeAce / Robert

// BJ-MENU

let winsElement = JSON.parse(localStorage.getItem("wins")) || 0;

let balance = JSON.parse(localStorage.getItem("balance")) || 0;

const startBTN = document.getElementById("start-btn");
const balanceBTN = document.getElementById("add-bnlnc");
const error$ = document.getElementById("error")
const priceUI = document.getElementById("price")
const inputBet = document.getElementById("input-bet")
const betBTN = document.getElementById("betButton")

function updateWinsUI() {
    const Blackjacks = document.getElementById("wins");
    if (Blackjacks) {
        Blackjacks.textContent = winsElement;
    }
}

function  updateBalanceUI(){
    if (balanceBTN){
        balanceBTN.textContent = balance
    }
}

let inputValue = 100

function countdownError(seconds) {
    setTimeout(function() {
      error$.textContent = "";
    }, seconds * 3000);
  }

updateWinsUI()
updateBalanceUI()



if (betBTN){
    betBTN.addEventListener("click", function(){
        inputValue = inputBet.value
        error$.textContent = ""
        inputBet.value = ""
            if (inputValue > 49 && inputValue < 1001){
                priceUI.textContent = "$" + inputValue
            }   else {
                error$.textContent = "Please pick a number between 50 & 1000"
            }
        })
}


if (balanceBTN){
    balanceBTN.addEventListener("click", function() {
            balance += 25;
       updateBalanceUI();
        localStorage.setItem("balance", balance.toString());
    });
}
if (startBTN){
    startBTN.addEventListener("click", function() {
        if (balance >= inputValue){
            error$.textContent = ""
            balance -= inputValue
            localStorage.setItem("balance", balance.toString());
            updateBalanceUI();
            const redirectUrl = 'BJ-game.html';
            window.location.href = redirectUrl;
        } else{
            error$.textContent = "$ " + inputValue + " are required in order to start the match"
        }
    });
    
}

// BJ-GAME 


    function randomNum(){
        return Math.floor(Math.random() * 10) + 1;
    }
    function delButtons() {
        hitUI.remove();
        standUI.remove();
    }

    function updateWinsUI() {
        const Blackjacks = document.getElementById("wins");
        if (Blackjacks) {
            Blackjacks.textContent = winsElement;
        }
    }
    
    let CardsPlayer = []
    CardsPlayer.push(randomNum())
    CardsPlayer.push(randomNum())
    let PlayerSum = 0
    
    let CardsBOT = []
    CardsBOT.push(randomNum())
    CardsBOT.push(randomNum())
    let BOTSum = 0
    
    function renderCards() {
        BOTSum = 0;
        PlayerSum = 0;
        if (PlayerCardsUI){
            PlayerCardsUI.textContent = ""
        }
        if (BOTcardsUI){
            BOTcardsUI.textContent = ""
        }
    
        for (var i = 0; i < CardsBOT.length; i++) {
            BOTSum += CardsBOT[i];
        }
        for (var i = 0; i < CardsPlayer.length; i++) {
            PlayerSum += CardsPlayer[i]
        }
    
        for (let i = 0; i < CardsPlayer.length; i++) {
            if (PlayerCardsUI){
                PlayerCardsUI.textContent += CardsPlayer[i] + " "
            }
        }
        for (let i = 0; i < CardsBOT.length; i++) {
            if (BOTcardsUI){
                BOTcardsUI.textContent += CardsBOT[i] + " "
            }
        }

        if (numPlayerTotalUI){
            numPlayerTotalUI.textContent = BOTSum; 
            numBOTtotalUI.textContent = PlayerSum;        
        }
    }

    function updateBalanceUI() {
        const balanceUI = document.getElementById("balance");
        if (balanceUI){
            balanceUI.textContent = balance;
        }
    }

    let PlayerTurn = false
    let gameStarted = false
    
    const PlayerCardsUI = document.getElementById("PlayerCardsDisplay")
    const numPlayerTotalUI = document.getElementById("numPlayerTotal")
    
    const BOTcardsUI = document.getElementById("BOTcardsDisplay")
    const numBOTtotalUI = document.getElementById("numBOTtotal")
    
    const randBotName = document.getElementById("customizationP-1")
    const timerElement = document.getElementById("timer");
    const resultShow = document.getElementById("result")
    const retryMenu = document.getElementById("rematch")
    
    const hitUI = document.getElementById("hit")
    const standUI = document.getElementById("stand")
    
    const randomBotNames = ['Alex', 'Mihai', 'GIGI', 'Anthony', 'Jimmy', 'Alexa', 'Madalin', 'Anuta','Jack','Johny','Karina','Andreea'];
    
    const randomItem = getRandomItemFromArray(randomBotNames);
    
    function getRandomItemFromArray(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    const BOTtag = `<h6>(BOT)</h6>`
    let PlusAmmount = `<span style="color: hsl(120, 100%, 30%);"> +${inputValue * 2}</span>`

    if (randBotName){
        randBotName.innerHTML =`${randomItem} ${BOTtag}`
    }
    
    
    function countdownTimer(seconds) {
        if (seconds >= 1) {
            if (timerElement){
                timerElement.textContent = seconds;
            }
            setTimeout(function() {
                countdownTimer(seconds - 1);
            }, 1000);
        } else {
            if (timerElement){
                timerElement.textContent = "Started";

                gameStarted = true
                renderGame()
            }
        }
    }
    countdownTimer(3);
    
    if (retryMenu){
        retryMenu.addEventListener("click", function(){
            if (gameStarted === true){
                const redirectUrl = 'BJ-menu.html';
                window.location.href = redirectUrl;
            }
        })
    }

    let maxStands = 0
    let maxStandsSec = 0

    if (hitUI){
        hitUI.addEventListener("click", function() {
            if (gameStarted){
                    CardsPlayer.push(randomNum())
                    maxStands = 0
                    standUI.style.opacity = "100%" 
                    renderGame()
                    if (maxStandsSec === 3){
                        maxStandsSec -= 1
                    }
                }
        })
    }
    
    
    if (standUI){
        standUI.addEventListener("click", function() {
            if (gameStarted && maxStands < 2 && maxStandsSec < 3){
                CardsBOT.push(randomNum()) 
                maxStands++
                maxStandsSec++
                renderGame()

                if (maxStands === 2 || maxStandsSec === 3 ){
                    standUI.style.opacity = "60%" 
                }
                
            
            } 
        })
    }

    if (true){

        function renderGame(){

            renderCards()

            if (BOTSum === 21) {
                resultShow.innerHTML = `${randomItem} Won`
                numPlayerTotalUI.style.color = "hsl(120, 100%, 40%)"
                delButtons()
            }   else if (BOTSum > 21){
                numPlayerTotalUI.style.color = "hsl(0, 100%, 60%)"
                delButtons()
                resultShow.innerHTML = `You Won! ${PlusAmmount} `
                winsElement++;
                localStorage.setItem("wins", winsElement.toString());
                updateWinsUI()
                balance += inputValue * 2
                localStorage.setItem("balance", balance.toString());
                updateBalanceUI()
            }
            if (PlayerSum === 21) {
                winsElement++
                updateWinsUI()
                localStorage.setItem("wins", winsElement.toString());
                balance += inputValue * 2
                localStorage.setItem("balance", balance.toString());
                updateBalanceUI()
                numBOTtotalUI.style.color = "hsl(120, 100%, 40%)"
                delButtons()
                resultShow.innerHTML = `You Won! ${PlusAmmount} `
            }   else if (PlayerSum > 21){
                numBOTtotalUI.style.color = "hsl(0, 100%, 60%)"
                resultShow.innerHTML = `${randomItem} Won `
                delButtons()
}

        }
    }

    // Made by : GIGI-CodeAce / Robert
