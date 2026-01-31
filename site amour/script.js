const pages = document.querySelectorAll(".page");
let current = 0;

function goNext(){
  pages[current].classList.remove("active");
  current++;
  pages[current].classList.add("active");
}

/******** MEMORY ********/
const symbols = ["❤️","❤️","🌹","🌹","💍","💍","🎂","🎂","💌","💌","✨","✨","😘","😘","🥰","🥰","💕","💕","💖","💖","💞","💞"];
symbols.sort(()=>Math.random()-0.5);

const memory = document.getElementById("memory");
const btn = document.getElementById("memoryBtn");
const msg = document.getElementById("memoryMsg");

let first=null, second=null, lock=false, found=0;

symbols.forEach(sym=>{
  const card=document.createElement("div");
  card.className="card";
  card.dataset.sym=sym;
  card.textContent="♡";
  card.onclick=()=>flip(card);
  memory.appendChild(card);
});

function flip(card){
  if(lock || card===first || card.classList.contains("done")) return;
  card.textContent=card.dataset.sym;
  if(!first){ first=card; return; }
  second=card; lock=true;

  if(first.dataset.sym===second.dataset.sym){
    first.classList.add("done");
    second.classList.add("done");
    found++;
    reset();
    if(found===symbols.length/2){
      msg.textContent="Bravo Louise ❤️";
      btn.disabled=false;
    }
  } else {
    setTimeout(()=>{
      first.textContent="♡";
      second.textContent="♡";
      reset();
    },700);
  }
}

function reset(){ first=null; second=null; lock=false; }

/******** ENVELOPPE ********/
function openEnvelope(){
  document.querySelector(".envelope").classList.add("open");
  document.getElementById("envBtn").disabled=false;
}

/******** PUZZLE IMAGE (24 pièces) ********/
const puzzle = document.getElementById("puzzleImage");
const puzzleMsg = document.getElementById("puzzleMsg");
const puzzleBtn = document.getElementById("puzzleBtn");

let order = [...Array(24).keys()];
shuffle(order);

let selectedIndex = null;

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function createPuzzle(){
  puzzle.innerHTML = "";
  order.forEach((n, i) => {
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    piece.style.backgroundPosition = `${(n % 4) * 33.333}% ${Math.floor(n / 4) * 20}%`;
    piece.dataset.index = i;
    piece.onclick = () => selectPiece(i);
    puzzle.appendChild(piece);
  });
}

function selectPiece(i){
  const pieces = document.querySelectorAll(".puzzle-piece");

  if(selectedIndex === null){
    selectedIndex = i;
    pieces[i].classList.add("selected");
    return;
  }

  // swap
  [order[selectedIndex], order[i]] = [order[i], order[selectedIndex]];

  selectedIndex = null;
  createPuzzle();
  checkPuzzle();
}

function checkPuzzle(){
  let ok = true;
  for(let i = 0; i < order.length; i++){
    if(order[i] !== i){
      ok = false;
      break;
    }
  }

  if(ok){
    puzzleMsg.textContent = "Puzzle réussi ❤️";
    puzzleBtn.disabled = false;
    puzzle.classList.add("success");
  }
}

createPuzzle();


/******** CODE ********/
function showHint(){
  document.getElementById("hint").style.display="block";
}

function checkCode(){
  const val=document.getElementById("codeAnswer").value.toLowerCase().trim();
  if(val.includes("dans ta chambre")){
    goNext();
  } else alert("Presque 😉");
}

/******** FINAL ********/
function checkCats(){
  const val=document.getElementById("catAnswer").value;
  if(val=="6"){
    document.getElementById("finalImage").style.display="block";
  } else alert("Non 😼 réessaie !");
}

/******** DERNIER DEFI - CHATS ********/
function checkCats(){
  const answer = document.getElementById("catAnswer").value.trim();
  const finalImage = document.getElementById("finalImage");

  const BONNE_REPONSE = 9; // <-- change le nombre si besoin

  if(answer === BONNE_REPONSE.toString()){
    finalImage.style.display = "block";
  } else {
    alert("Hmm… recompte bien les petits chats 😼");
  }
}

/******** JEU FINAL COEUR ********/
let heartClicks = 0;
const heart = document.getElementById("finalHeart");
const heartCount = document.getElementById("heartCount");
const finalImage = document.getElementById("finalImage");

if(heart){
  heart.addEventListener("click", () => {
    heartClicks++;
    heartCount.textContent = `Clics : ${heartClicks} / 5`;

    if(heartClicks >= 5){
      finalImage.style.display = "block";
      heart.style.pointerEvents = "none";
      heartCount.textContent = "Bravo mon amour ❤️";
    }
  });
}
