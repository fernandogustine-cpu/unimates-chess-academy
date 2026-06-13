let puzzles = [
  {title:"Puzzle 1: Back Rank", fen:"White: Kg1 Qd1 Ra1 Re1 pawns g2 h2 | Black: Kg8 Qd8 Ra8 Re8 pawns g7 h7", question:"White to move. Find the winning move.", answer:"Rxe8+"},
  {title:"Puzzle 2: Fork", fen:"White: Kg1 Qd1 Nb5 | Black: Kg8 Qd8 Ra8", question:"White to move. Find a knight fork.", answer:"Nc7"},
  {title:"Puzzle 3: Pin", fen:"White: Kg1 Bb5 | Black: Kg8 Qd8 Nc6", question:"White to move. How can White increase pressure?", answer:"Bxc6"}
];
let currentPuzzle = 0;
let score = Number(localStorage.getItem("score") || 0);

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if(id==="student") loadStudent();
  if(id==="videos") loadVideos();
  if(id==="puzzles") loadPuzzle();
}

function saveStudent(){
  const student = {
    name: document.getElementById("studentName").value,
    rating: document.getElementById("studentRating").value
  };
  localStorage.setItem("student", JSON.stringify(student));
  loadStudent();
}

function loadStudent(){
  const saved = JSON.parse(localStorage.getItem("student") || "{}");
  document.getElementById("studentProfile").innerHTML = saved.name
    ? `<strong>${saved.name}</strong><br>Rating: ${saved.rating || "Not set"}<br>Progress saved on this device.`
    : "No student profile saved yet.";
  const homework = JSON.parse(localStorage.getItem("homework") || "[]");
  document.getElementById("homeworkList").innerHTML = homework.length
    ? homework.map(h=>`<li><strong>${h.title}</strong>: ${h.description}</li>`).join("")
    : "<li>No homework assigned yet.</li>";
}

function addHomework(){
  const title = document.getElementById("hwTitle").value;
  const description = document.getElementById("hwDescription").value;
  if(!title || !description) return alert("Please add homework title and instructions.");
  const homework = JSON.parse(localStorage.getItem("homework") || "[]");
  homework.push({title, description});
  localStorage.setItem("homework", JSON.stringify(homework));
  document.getElementById("hwTitle").value = "";
  document.getElementById("hwDescription").value = "";
  alert("Homework added.");
}

function addVideo(){
  const title = document.getElementById("videoTitle").value;
  const url = document.getElementById("videoUrl").value;
  if(!title || !url) return alert("Please add video title and YouTube link.");
  const videos = JSON.parse(localStorage.getItem("videos") || "[]");
  videos.push({title, url});
  localStorage.setItem("videos", JSON.stringify(videos));
  document.getElementById("videoTitle").value = "";
  document.getElementById("videoUrl").value = "";
  alert("Video added.");
}

function loadVideos(){
  const videos = JSON.parse(localStorage.getItem("videos") || "[]");
  document.getElementById("videoList").innerHTML = videos.length
    ? videos.map(v=>`<div class="video-item"><h3>${v.title}</h3><a href="${v.url}" target="_blank">Open lesson</a></div>`).join("")
    : "<p>No videos added yet. Add lessons from the Coach Dashboard.</p>";
}

function loadPuzzle(){
  const p = puzzles[currentPuzzle];
  document.getElementById("puzzleTitle").textContent = p.title;
  document.getElementById("puzzleFen").textContent = p.fen;
  document.getElementById("puzzleQuestion").textContent = p.question;
  document.getElementById("puzzleResult").textContent = "";
  document.getElementById("puzzleAnswer").value = "";
  document.getElementById("score").textContent = score;
}

function checkPuzzle(){
  const answer = document.getElementById("puzzleAnswer").value.trim().toLowerCase();
  const correct = puzzles[currentPuzzle].answer.toLowerCase();
  if(answer === correct){
    score++;
    localStorage.setItem("score", score);
    document.getElementById("puzzleResult").textContent = "Correct! Well done.";
  } else {
    document.getElementById("puzzleResult").textContent = `Try again. Coach hint: look for forcing moves.`;
  }
  document.getElementById("score").textContent = score;
}

function nextPuzzle(){
  currentPuzzle = (currentPuzzle + 1) % puzzles.length;
  loadPuzzle();
}

loadStudent();
loadVideos();
loadPuzzle();
