const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: "",
  aiHand: "",
};

const hands = [...document.querySelectorAll(".select img")];

// First function
function handSelection(e) {
  game.playerHand = this.dataset.option;
  hands.forEach((element) => (element.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 4px tomato";
}

const aiChoice = () =>
  hands[Math.floor(Math.random() * hands.length)].dataset.option;

function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "paper" && ai === "rock") ||
    (player === "rock" && ai === "scissors") ||
    (player === "scissors" && ai === "paper")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

// Publish result
function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;
  if (result == "win") {
    document.querySelector("p.wins span").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "You win!";
    document.querySelector('[data-summary="who-win"]').style.color = "lime";
  } else if (result == "loss") {
    document.querySelector("p.losses span").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Computer win!";
    document.querySelector('[data-summary="who-win"]').style.color =
      "orangered";
  } else {
    document.querySelector("p.draws span").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Draw!";
    document.querySelector('[data-summary="who-win"]').style.color = "grey";
  }
}

function resetChoices(remove) {
  document.querySelector(`[data-option="${remove}"]`).style.boxShadow = "";
  game.playerHand = "";
  game.aiHand = "";
}

// Steering function
function startGame() {
  !game.playerHand && alert("First choose hand");
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResult(game.playerHand, game.aiHand, gameResult);
  resetChoices(game.playerHand);
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));

document.querySelector(".start").addEventListener("click", startGame);
