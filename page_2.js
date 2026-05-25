document.addEventListener("DOMContentLoaded", () => {
	let time = parseInt(localStorage.getItem('time'));
	console.log(time);
	document.querySelector('.timing').innerHTML = time;

	let difficulty = localStorage.getItem('level');
	console.log(difficulty);

	let isRunning = false;
	let isPaused = false;
	let interval = null;

	const timeDisplay = document.querySelector('.timing');
	const textDisplay = document.querySelector('.typing-area');
	const popUp = document.getElementById('pop-up');
	const inputBox = document.getElementById('input-box');
	const toggImg = document.getElementById('togg')

	function startTimer() {

		if (isRunning) {
			return;
		}

		isRunning = true;
		isPaused = false;

		toggImg.src = '/assets/pause_button.png';
		interval = setInterval( () => {
			--time;
			timeDisplay.innerHTML = time;
			updateCircle();
		
			if (time ==0){
				endTest();
			}
		}, 1000);
	}

	function pauseTimer() {
		clearInterval(interval);
		isRunning = false;
		isPaused = true;
		toggImg.src = '/assets/play_button.png';
	}

	console.log(document.querySelector('.input-box'));
	document.getElementById('input-box').addEventListener("input", () =>{
		if (isRunning === false && !isPaused && time>0){
			startTimer();
		}
	});

	function endTest(){
		clearInterval(interval);
		isRunning = false;
		interval = null;

		document.querySelector('.timing').innerHTML = 0;
		console.log("Test ended");
		document.getElementById('input-box').disabled = true;
	}

	const toggBtn = document.getElementById('toggle-button');

	toggBtn.addEventListener("click",() => {
		if (time<=0){
			return;
		}

		if(isRunning){
			pauseTimer();
		}

		else{
			startTimer();
		}
	});

	let progressCircle = document.querySelector('.progress');

	function updateCircle(){
		let totTime = parseInt(localStorage.getItem('time'));
		let fraction = time/totTime;

		let degree = 360*fraction;
		progressCircle.style.background = `conic-gradient(white 0deg ${degree}deg,#121212 ${degree}deg 360deg`;
}
});