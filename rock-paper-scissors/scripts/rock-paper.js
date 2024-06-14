const score = JSON.parse(localStorage.getItem('score'))  || {
    ties: 0,
    wins: 0,
    losses: 0
};
updateScore();
/*
// if (score === null) {}
if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0,
    }
}
*/

// EVENTLISTENERS instead of using onclick
// ||||||||||||||||||||||||||||||||||||||||||||||

// guru
document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));
// intermediate
document.querySelector('.js-paper-button').addEventListener('click', () => {
    return playGame('paper')
});
// beginner  
document.querySelector('.js-scissors-button').addEventListener('click', function(){
    return playGame('scissors')
});

// reset Score eventListener
let msgContainer = document.querySelector('.js-askyesno-container')

document.querySelector('.js-reset-button').addEventListener('click', () => {
    msgContainer.style.display = 'block'
    document.querySelector('.js-askyesno-container')
        .innerHTML = `
            <p class="msg">Are you sure you want to reset the score?</p>
            <section class='center-items'>
                <button class='yes'>Yes</button>
                <button class='no'>No</button>
                <button class='no'>Cancle</button>
            </section>`;
    document.querySelector('.yes').addEventListener('click', () => {
        resetButton()
        msgContainer.style.display = 'none';
    });
    document.querySelectorAll('.no').forEach(button => {
        button.addEventListener('click', function() {
            msgContainer.style.display = 'none'
        })
    })
});

// auto play eventListener
document.querySelector('.js-auto-play').addEventListener('click', () => autoPlay());

// adding eventListers to keypress to allow the use of keyboard to play game.
document.body.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'r'){
        playGame('rock');
    } else if (event.key.toLocaleLowerCase() === 'p') {
        playGame('paper');
    } else if (event.key.toLocaleLowerCase() === 's') {
        playGame('scissors');
    } else if(event.key.toLocaleLowerCase() === 'a'){
        autoPlay();
    } else if (event.key.toLocaleLowerCase() === 'backspace'){
        resetButton();
    };
    // console.log(event)
});
// EVENTLISTENERS   ENDS;
// ||||||||||||||||||||||||||||||||||||||||||||||

function updateScore(){
    document.querySelector('.display-score')
        .textContent = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`
}
    // result color
    function changeResultColor(resultElem) {
    // change the result element: 
    // if lose, show red.
    // if win, show green.
    // else show, pink for tie.
    if (resultElem.textContent === 'You win'){
        resultElem.style.color = 'rgb(0, 255, 0)';

    } else if (resultElem.textContent === 'You lose'){
        resultElem.style.color = 'rgb(255, 31, 31)'

    } else if (resultElem.textContent === 'Tie') {
        resultElem.style.color = '#ffaaaa';
    };
};

// animate the result to slide by adding the animate-result class into it.
function animateResult(resultElem) {
    resultElem.classList.add('animate-result');
};

function showWin(result){
    // get reuslt element 
    let resultElem = document.querySelector('.display-win');

    document.querySelector('.display-win')
        .textContent = result.replace('.', '');
    changeResultColor(resultElem);
    animateResult(resultElem)
};

function displayPlayerMove(playerMove, computerMove){
    document.querySelector('.display-player-move')
        .innerHTML = `You <img class="moves-emoji" src="img/${playerMove}.png" alt="paper-emoji">
    <img class="moves-emoji" src="img/${computerMove}.png" alt="rock-emoji"> Computer`
};

let isAutoPlay = false;
let intervalId;
function autoPlay(){
    /* play the game every 2s
    you know the game uses a pickComputerMove() to take the computer move, we can still reuse it to also take a move for playerMove while computer chooses it own move in the playGame() by itself Calling the pickComputerMove() function */
    const autoPlayElem = document.querySelector('.js-auto-play');

    if (!isAutoPlay) {
        // setInterval returns an id.
        //  we save this id in a variable and remove it again using clearInterval() function.
        intervalId = setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 2000);
        //  change Text to 
        autoPlayElem.innerText = 'Stop Auto Play'
        isAutoPlay = true;
                        
    } else if (isAutoPlay) {
        autoPlayElem.innerText = 'Auto Play'
        clearInterval(intervalId);
        isAutoPlay = false;
    };
};

function playGame(playerMove){
    let computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        }else if (computerMove === 'paper') {
            result = 'You win.';
        }else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    }else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        }else if (computerMove === 'paper') {
            result = 'You lose.';
        }else if (computerMove === 'scissors') {
            result = 'You win.';
        }

    }else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        }else if (computerMove === 'paper') {
            result = 'Tie.';
        }else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
    };
    //  update scores
    if (result === 'You win.') {
        score.wins += 1;
    }else if (result === 'You lose.') {
        score.losses += 1;
    }else if (result === 'Tie.') {
        score.ties += 1;
    }
    // save scores in local storage.
    localStorage.setItem('score', JSON.stringify(score));
    updateScore();
    // alert(`You picked ${playerMove}, computer picked ${computerMove} ${result}\n Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`);

    // display player move
    showWin(result);
    displayPlayerMove(playerMove, computerMove);
}

function resetButton() {
    score.losses = 0;
    score.ties = 0; 
    score.wins = 0;
    localStorage.removeItem('score');
    updateScore();
};

function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = ''

    if (randomNumber >= 0 && randomNumber <= 1/3 ) {
        computerMove = 'rock';
    }else if (randomNumber >= 1/3 && randomNumber <= 2/3) {
        computerMove = 'paper';
    }else if (randomNumber >= 2/3 && randomNumber <= 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}

// showing or hiding scores. 
function showScoreOrHide(option) {
    // get the score element
    let scoreElem = document.querySelector('.display-score');
    // check, if show: display win
    if (option === 'show') {
        Object.assign(scoreElem.style, {
            display: 'block'
        });
    } else {
        scoreElem.style.display = 'none'
    };
};
