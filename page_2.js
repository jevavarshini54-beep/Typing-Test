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

	console.log(document.getElementById('input-box'));
	let textGenerated = false;
	document.getElementById('input-box').addEventListener("input", () =>{

		if (!isRunning && time>0){
			if(!textGenerated){
				textDisp = generateText();
				document.getElementById('text_area').innerHTML = textDisp;
				textGenerated = true;
			}
		}

		if (!isRunning){
			startTimer();
		}
	});

	document.querySelector(".typing-area").addEventListener("click",()=>{
		inputBox.focus();
		if (!isRunning && time>0){
			if(!textGenerated){
				textDisp = generateText();
				document.getElementById('text_area').innerHTML = textDisp;
				textGenerated = true;
			}
		}

		if (!isRunning){
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
		progressCircle.style.background = `conic-gradient(white 0deg ${degree}deg,#121212 ${degree}deg 360deg)`;
	}

	const words = {
		easy : ["cat","dog","sun","moon","star","tree","leaf","grass","bird","fish",
	"book","pen","paper","chair","table","phone","glass","plate","clock","door",
	"apple","banana","orange","mango","grape","bread","rice","water","juice","milk",
	"house","school","garden","market","bridge","village","window","kitchen","room","street",
	"happy","smile","laugh","swim","travel","study","cook",
	"blue","green","yellow","purple","white","black","brown","silver","gold","pink",
	"shirt","dress","shoes","socks","jacket","button","pocket","cotton","fabric","belt",
	"teacher","student","friend","parent","brother","sister","family","uncle","aunt","baby",
	"mountain","river","ocean","forest","beach","island","desert","garden","field","valley",
	"rabbit","tiger","lion","horse","monkey","elephant","panda","goat","sheep","zebra",
	"morning","evening","winter","summer","spring","autumn","today","tomorrow","week","month",
	"music","guitar","piano","drum","violin","picture","camera","movie","artist","story",

	"planet","rocket","cloud","shadow","bottle","basket","blanket","candle","circle","square",
	"diamond","engine","farmer","feather","finger","flower","garage","hammer","helmet","island",
	"jungle","kitten","ladder","lantern","mirror","notebook","package","pencil","pillow","rocket",
	"sandwich","station","teacher","thunder","tractor","traffic","umbrella","village","wallet","whistle",
	"airport","animal","icecream","jewelry","language","library","magazine","medicine","midnight",
	"necklace","painting","passport","playground","rainbow","restaurant","sandals","shoulder","snowman","sunrise",
	"telephone","toothbrush","vegetable","waterfall","adventure","birthday","breakfast","chocolate","classroom","friendship",

	"air","fire","earth","stone","wood","metal","energy","nature","planet","space",
	"garden","farmer","travel","picture","holiday","freedom","journey","memory","puzzle","weather",
	"blank","border","button","center","choice","circle","corner","danger","detail","energy",
	"future","gather","golden","handle","honest","jacket","journey","kingdom","library","message",
	"morning","natural","outside","partner","plastic","problem","purpose","rainbow","respect","science",
	"season","special","station","support","teacher","ability","balance",
	"capture","comfort","correct","pattern","quality","remember","service","treasure","victory",
	"advice","arrival","battery","blanket","courage","distance","exercise","favorite","hospital","keyboard",
	"language","mountain","neighbor","practice","question","resource","solution","together","vacation","wildlife"],

	medium: ["today,","tomorrow.","welcome!","perhaps","between","computer",
	"practice","keyboard","language","remember","beautiful","important","student","creative","exercise","discover",
	"adventure","hospital","community","different","mountain","education","knowledge","sunlight",
	"don't","can't","won't","you're","they're","it's","that's","we're","isn't","doesn't",
	"haven't","shouldn't","Monday","Friday","January","Science","English","OpenAI",
	"JavaScript","Keyboard","Morning","Holiday","Teacher","Library","2026","2025","10pm","7am","3rd","25th",
	"room2","chapter5","day1","score98","level3","year2024","hello,","world.","really?","amazing!","careful:",
	"perhaps;","listen,","wait.","correct!","seriously?","friendship","responsible","technology","experience","collection",
	"performance","generation","imagination","conversation","understand",

	"confidence","difficulty","information","environment","management","walking","learning","watching","speaking","thinking",
	"traveling","painting","studying","listening","building","airport","breakfast","newspaper","restaurant","playground",
	"telephone","headphones","chocolate","vegetables","dictionary","welcome.","thanks!","goodbye.","excited!","awesome!",
	"carefully","wonderful","excellent","fantastic","brilliant","meeting","project","internet","document","software",
	"hardware","resource","question","solution","research","honestly","normally","actually",
	"possibly","probably","seriously","recently","especially","version2","update3","task12","group7","round5",
	"user24","match8","result4","stage2","unit6","weather.","journey,","message!","network?","science:",
	"history;","teacher.","college!","picture,","freedom?","understanding","communication","concentration","organization",
	"preparation","celebration","cooperation","opportunity","player1","winner2","captain7","student25","team3",
	"slowly","happily","quietly","politely","carefully","frequently","recently","naturally","regularly","normally"],

	difficult: ["extraordinary","configuration","(implementation)","responsibility","communication","understanding",
	"concentration","representation","administration","transformation","identification","recommendation",
	"algorithm","database","framework","!deployment","JavaScript'","TypeScript","authentication",
	"optimization","asynchronous.","@inheritance","constructor","programming","architecture",
	"Version2.0","update-v5","build2026","release_10","patch-3","alpha7",
	"beta2","score=98","rank#1","100%","user_name","system32","12/06/2026","03:45pm","7:30am",
	"25th-Aug","2026-07-15","day_12","session8","week-4","!chapter10","Wait!","Really?","Amazing.","However,",
	"seriously;","carefully:","listen,","unexpectedly.","fortunately!","perhaps?",

	"don't","shouldn't","couldn't","you're","they've","it's","wouldn't","haven't","can't",
	"Artificial","MachineLearning","OpenAI","ChatGPT","NeuralNetwork","{DeepLearning}","DataScience","CyberSecurity","CloudComputing",
	"@username","#Trending","$500","email@example","password170","file_name","config.json","index.html",
	"main.js","style.css","temperature=32","height:170","width:120","score:95%",
	"speed=120km","memory64GB","international","misinterpretation","characteristic","extraordinarily",
	"(counterproductive)","unbelievable","miscommunication","professionalism","Error404","Warning!","Success:",
	"Failed?","retry();","execute()","console.log","returnFalse","whileLoop","forEach",
	"achievement","opportunity","civilization","environmental","philosophical","psychological",
	"technological","mathematical","developer_mode","frontend-dev","backend_api","full-stack",
	"commit-v2","mergeRequest","pushOrigin","branch-main"]
	}

	let currentWords = words[difficulty];
	function generateText(){
		let text=[];

		for (let i=0; i<words[difficulty].length; i++){
			let randomWords = currentWords[Math.floor(Math.random()*currentWords.length)];
			text.push(randomWords);
		}
		return text.join(" ")
	}

	document.getElementById('input-box').addEventListener("input", (e) => {
		let typed = e.target.value;
		let display = "";

		for (let i=0; i<textDisp.length; i++){
			if (i<typed.length){
				if (typed[i] === textDisp[i]){
					display += `<span class="correct">${textDisp[i]}</span>`;
				}
				else{
					if (textDisp[i] === " "){
						display += `<span class="wrong">_</span>`;
					}
					else{
						display += `<span class="wrong">${textDisp[i]}</span>`;
					}
				}
			}

			else{
				display+= `<span class="remaining">${textDisp[i]}</span>`;
			}
			}
		document.getElementById('text_area').innerHTML = display;
	});
});