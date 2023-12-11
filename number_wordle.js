const NOMBRE_DE_REPONSES = 8;
const TOTAL_DIGIT = 4;
let numberGuess = NOMBRE_DE_REPONSES;
let estimationActuel = [];

const prompt=require("prompt-sync")({sigint:true}); 

//Randomize function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

estimationActuel = getRandomInt(10);
//console.log(estimationActuel);


// Randomized Answer
let randomizedAnswer = Array.from({ length: 1 }, () => Array(TOTAL_DIGIT).fill(null)); 
for (let i=0; i < TOTAL_DIGIT; i++){
  randomizedAnswer[0][i] = getRandomInt(10);
}
console.table(randomizedAnswer);


// Create Game Table
function Empty2DArray(cols) { 
  return Array.from({ length: 1 }, () => Array(cols).fill(null)); 
} 

// Manipulation of Game Table
function GameTable(gameTable){
  for (let col=0; col<TOTAL_DIGIT; col++){
      gameTable[0][col] = prompt("Put a number: ");
  }
  return gameTable;
}


function checkReponse(answer,result){
  let colorTable = Empty2DArray(TOTAL_DIGIT);
  for (let colA=0; colA<TOTAL_DIGIT; colA++){
    let sameNumber = false;
    let colR = 0;
    while (colR<TOTAL_DIGIT && !(sameNumber)){
      if (result[0][colR]==answer[0][colA]){
        if (colR==colA){
          colorTable[0][colA]="vert";
          sameNumber = true;
        }else{
          colorTable[0][colA]="jaune";
          sameNumber = true;
        }
      }else{
        colorTable[0][colA]="rouge";
      }colR++;
    }
  }
  return colorTable;
}

//Main Game
function MainGame(attempt,answer,total_attempt=NOMBRE_DE_REPONSES){
  let attempt_no = 0;
  let bool = true;
  while (attempt_no<NOMBRE_DE_REPONSES){
    let colorTable = checkReponse(attempt,answer);
    let col = 0;
    let allCorrect = true
    while(allCorrect && col<TOTAL_DIGIT){
      if (colorTable[0][col]=="rouge" || colorTable[0][col]=="jaune"){
        allCorrect = false;
        bool = allCorrect;
      } else {
        col++;
        bool = allCorrect;
      }
    }
    if (allCorrect==false){
      console.log("Try again");
      attempt = GameTable(Empty2DArray(TOTAL_DIGIT));
      attempt_no++;
    }else{
      console.log("Congrats!!!");
    }
  }
  if (bool==false){
    console.log("You Lost");
  }
}

console.log(MainGame(GameTable(Empty2DArray(TOTAL_DIGIT)),randomizedAnswer));









