document.addEventListener("DOMContentLoaded", () => {
	let options_lvl = document.querySelectorAll(".lvl_buttons");
	let options_time = document.querySelectorAll(".time_buttons");
	let selected_level = "";
	let selected_time = "";
	localStorage.removeItem('level');
	localStorage.removeItem('time');
	
	options_lvl.forEach(btn_lvl => {
		btn_lvl.addEventListener("click", () => {

			options_lvl.forEach(b_lvl => b_lvl.classList.remove("active"));
			btn_lvl.classList.add("active");

		if (btn_lvl.dataset.level){
			selected_level = btn_lvl.dataset.level;
			localStorage.setItem("level",selected_level);
		}
		});
	});

	options_time.forEach(btn_time => {
		btn_time.addEventListener("click", () => {

			options_time.forEach(b_time => b_time.classList.remove("active"));
			btn_time.classList.add("active");

		if (btn_time.dataset.time){
			selected_time = btn_time.dataset.time;
			localStorage.setItem("time",selected_time);
		}
		});
	});

	let startBtn = document.getElementById('start_test');

	startBtn.addEventListener("click", () => {

		let lvl = localStorage.getItem("level");
		let secs = localStorage.getItem("time");

		if (!lvl){
			alert("Please select level");
			return;
		}

		if (!secs){
			alert("Please select time");
			return;
		}

		window.location.href = "page-2.html";
	});
});