let solutions=[];
let solutionCount = 1;

let solutionImageNames = ["cos x", "sin x", "e<sup>x</sup>", "sec<sup>2</sup>x", "2x", "7x<sup>6</sup>", "-cosec<sup>2</sup>x", "-cosec x cot x", "1", "1/x", "sec x tan x"];


let solutionVelocityX = 2;
let solutionVelocityY = 2;

let lives = 3;

let gameWidth = window.screen.width;
let gameHeight = window.screen.height*3/4;

let score = 0;

let questionArray = ["sin x", "-cos x", "e<sup>x</sup>", "tan x", "x<sup>2</sup>", "x<sup>7</sup>", "cot x", "cosec x", "x", "ln x", "sec<sup>2</sup> x"];

const solutionMap = new Map();
solutionMap.set("sin x", "cos x");
solutionMap.set("-cos x", "sin x");
solutionMap.set("e<sup>x</sup>", "e<sup>x</sup>");
solutionMap.set("tan x", "sec<sup>2</sup>x");

solutionMap.set("x<sup>2</sup>", "2x");
solutionMap.set("x<sup>7</sup>", "7x<sup>6</sup>");
solutionMap.set("cot x", "-cosec<sup>2</sup>x");
solutionMap.set("cosec x", "-cosec x cot x");

solutionMap.set("x", "1");
solutionMap.set("ln x", "1/x");
solutionMap.set("sec<sup>2</sup> x", "sec x tan x");

window.onload = function() {
    setTimeout(changeBackground, 5000);
    setTimeout(addsolutions, 7000); 
    setTimeout(() => {
        setInterval(movesolutions, 1000 / 60);
    }, 8000);

}

function changeBackground(){
    document.body.style.backgroundImage = "url('iceagebackground.gif')";
    document.getElementById("question").innerHTML = "";
}

function addsolutions() {

    let questionCurr = "";
    questionCurr = questionArray[Math.floor(Math.random()*11)];
    document.getElementById("question").innerHTML = questionCurr;
    let answer = solutionMap.get(questionCurr);
    solutions = [];
    solutionCount = Math.floor(Math.random()*5) + 3;

    for (let i = 0; i < solutionCount; i++) {
        
        const solutionImage = document.createElement("div");
        solutionImage.innerHTML = solutionImageNames[Math.floor(Math.random()*11)];
        if(i == 0)
            solutionImage.innerHTML = answer;
        solutionImage.className = "blocker";

        solutionImage.onclick = function() {

            if(solutionImage.innerHTML === answer){

                score += 1;
                document.getElementById("score").innerHTML = score;

                for(let i = 0; i<solutions.length; i++){
                    document.body.removeChild(solutions[i].image);
                }
                solutions = [];

            }else{
                document.body.removeChild(this);
                lives--;
                //remove this solution from array
                let remaining_solutions = [];
                for (let i = 0; i < solutions.length; i++) {
                    if (solutions[i].image !== this) {
                        remaining_solutions.push(solutions[i]);
                    }
                }
                solutions = remaining_solutions;
                if(lives == 2){
                    document.getElementById("heart1").remove();
                }
                if(lives == 1){
                    document.getElementById("heart2").remove();
                }
                if(lives == 0){
                    document.getElementById("heart3").remove();
                    for(let i = 0; i<solutions.length; i++){
                        document.body.removeChild(solutions[i].image);
                    }
                    solutions = [];
                    document.getElementById("question").innerHTML = "GAME OVER";
                    return;
                }
            }
            if(solutions.length == 0)
                addsolutions();
        }
        document.body.appendChild(solutionImage);
        
        
        const rect = solutionImage.getBoundingClientRect();
        let solution = {
            image: solutionImage,
            width: rect.width,
            height: rect.height,
            x: randomPosition(gameWidth - rect.width),
            y: randomPosition(gameHeight - rect.height),
            velocityX: solutionVelocityX + Math.floor(Math.random()*3),
            velocityY: solutionVelocityY + Math.floor(Math.random()*3)
        };
        
        solutionImage.style.left = solution.x + "px";
        solutionImage.style.top  = solution.y + "px";
        

        solutions.push(solution);

    }
}

function movesolutions() {
    for (let i = 0 ; i < solutions.length; i++) {
        let solution = solutions[i];
        solution.x += solution.velocityX;
        if (solution.x < 0 || solution.x + solution.width > gameWidth) {
            solution.x -= solution.velocityX;
            solution.velocityX *= -1;
            
        }
        solution.y += solution.velocityY;
        if (solution.y < 0 || solution.y + solution.height > gameHeight) {
            solution.y -= solution.velocityY;
            solution.velocityY *= -1;
        }
        solution.image.style.left = solution.x + "px";
        solution.image.style.top  = solution.y + "px";

    }
}

function randomPosition(limit) {
    return Math.floor((Math.random() * limit));
}