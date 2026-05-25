let time = parseInt(localStorage.getItem('time'));
console.log(time);
document.querySelector('.timing').innerHTML = time;

let difficulty = localStorage.getItem('level');
console.log(difficulty);

let isRunning = false;
let interval = null;

const timeDisplay = document.querySelector('.timing');
const textDisplay = document.querySelector('.typing-area');
const toggleBtn = document.getElementById('toggle-button');
const popUp = document.getElementById('pop-up');
const inputBox = document.getElementById('input-box');

function startTimer() {
	isRunning = true;
	interval = setInterval( () => {
		--time;
		timeDisplay.innerHTML = time;
	
		if (time ==0){
			endTest();
		}
	}, 1000);
}
console.log(document.querySelector('.input-box'));
document.getElementById('input-box').addEventListener("input", () =>{
	if (isRunning === false){
		startTimer();
	}
});