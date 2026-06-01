document.addEventListener("DOMContentLoaded", () => {
	function loadHistory(){
		let history = JSON.parse(localStorage.getItem("typingHistory")) || [];
		let container = document.getElementById('history-table');

		if (history.length === 0){
			container.innerHTML = `<p class="noHistory">No history yet! Complete a test to see your results.</p>`
		}

		else{
			let html_structure = `<table>
															<tr>
																<th>S.No</th>
																<th>Date</th>
																<th>Difficulty</th>
																<th>Duration (secs)</th>
																<th>WPM</th>
																<th>CPM</th>
																<th>Accuracy</th>
															</tr>`;
													
			history.reverse().forEach((result,index) => {
				html_structure += `<tr>
														<td>${index+1}</td>
														<td>${result.date}</td>
														<td>${result.difficulty}</td>
														<td>${result.time}</td>
														<td>${result.wpm}</td>
														<td>${result.cpm}</td>
														<td>${result.accuracy}</td>
													</tr>`;
			});
			html_structure += `</table>`;
			container.innerHTML = html_structure;
		}
	}

	function clearHistory(){
		localStorage.removeItem('typingHistory');
		loadHistory();
	}

	document.getElementById("clear-btn").addEventListener('click',clearHistory);
	loadHistory();
});