var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What was the first muscle car?", "What car does Steve Mcqueen drive in the movie bullitt?", "What is the top selling car in America for 2015?", "What car does Paul Walker build in the origional The Fast and The Furious?", "What is the fastest production Subaru?", "What is America's best selling vehicle of all time?", "What is the capital of Colombia?", "What is the capital of India?"];
var answerArray = [["Pontiac GTO", "Ford Mustang", "Chevrolet Corvette", "Plymouth Cuda"], ["Chevrolet Corvette","Ford Mustang","Dodge Challenger","Pontiac GTO"], ["Honda Accord", "Nissan Altima", "Toyota Camry", "Ford Fusion"], ["Mitsubishi Evo","Mitsubishi Eclipse","Toyota Supra","Honda Civic Si"], ["BRZ", "Legacy", "Outback", "WRXSTI"], ["Ford F-series","Honda Accord","Chevrolet Silverado","Toyota Corolla"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/pontiac.jpg'>", "<img class='center-block img-right' src='assets/images/mustang.jpg'>", "<img class='center-block img-right' src='assets/images/camry.jpg'>", "<img class='center-block img-right' src='assets/images/supra.jpg'>", "<img class='center-block img-right' src='assets/images/WRXSTI.jpg'>", "<img class='center-block img-right' src='assets/images/Ford.jpg'>"];
var correctAnswers = ["A. Pontiac GTO", "B. Ford Mustang", "C. Toyota Camry", "C. Toyota Supra", "D. WRXSTI", "A. Ford F-series"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/button-09.mp3");


// detects state of readiness
$(document).ready(function() {
// function that creates start button and initial screen
function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

// 

$("body").on("click", ".start-button", function(event){
	clickSound.play();
	generateHTML();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");

		clearInterval(theClock);
		generateWin();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
});

}); 

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000);  
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 5) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}
