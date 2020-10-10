var username = document.getElementById('username');
var saveScoreButton = document.getElementById('saveScoreButton');
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreButton.disabled = !username.value;
});


saveHighScore = e => {
    console.log("clicked the same button!");
    e.preventDefault();
}