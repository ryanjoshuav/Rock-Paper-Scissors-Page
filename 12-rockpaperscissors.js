//rock = 1, paper = 2, scissor = 3
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


//using default operator || for simplification
let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0
};

/* use this if not using default operator
if (score === null){
    score = {
        wins : 0,
        losses : 0,
        ties : 0
    };
}
*/

updateScore();

function playGame(playerMove){
    randomNum = getRndInteger(1,3);

    if (playerMove === 'scissors') {
        if (randomNum == 1) {
            computerMove = 'rock';
            result = 'You lose';
        } else if (randomNum == 2) {
            computerMove = 'paper';
            result = 'You win';
        } else {
            computerMove = 'scissors';
            result = 'Its a tie';
        }
    }else if (playerMove === 'paper') {
        if (randomNum == 1) {
            computerMove = 'rock';
            result = 'You win';
        } else if (randomNum == 2) {
            computerMove = 'paper';
            result = 'Its a tie';
        } else {
            computerMove = 'scissors';
            result = 'You lose';
        }
    }else {
        if (randomNum == 1) {
            computerMove = 'rock';
            result = 'Its a Tie';
        } else if (randomNum == 2) {
            computerMove = 'paper';
            result = 'You lose';
        } else {
            computerMove = 'scissors';
            result = 'You win';
        }
    }

    if (result === 'You win') {
        score.wins++;
    }else if (result === 'You lose') {
        score.losses++;
    } else {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    resultsLine(playerMove, computerMove);
    /*
    alert (`You picked ${playerMove}. Computer picked ${computerMove}. ${result}. \nWins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    */
}

function updateScore(){
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

function resultsLine (playerMove, computerMove){
    document.querySelector('.js-result')
        .innerHTML = `${result}`;

    document.querySelector('.js-moves')
        .innerHTML = `You
        <img  class="move-icon" src="Icons/${playerMove}-emoji.png" alt=""> -
        <img class="move-icon" src="Icons/${computerMove}-emoji.png" alt="">
        Computer`;
        };

    


function scoreReset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score')

    updateScore();
}

let isAutoplaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoplaying){
        intervalId = setInterval(() => { 
            playerRanNum = getRndInteger(1,3);
            if (playerRanNum == 1) {
                playerMove = 'rock';           
            } else if (playerRanNum ==2) {
                playerMove = 'paper';            
            } else {
                playerMove = 'scissors';            
            }
            playGame(playerMove);
    
        }, 1000);
        isAutoplaying = true;
    } else {
        clearInterval(intervalId);
        isAutoplaying = false;
    }
    
}

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissors');
    }
})

