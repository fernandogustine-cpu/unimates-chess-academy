const store = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const load = (key, fallback=[]) => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));

let defaultPuzzles = [
  {title:"Back Rank Mate", fen:"White: Kg1 Qd1 Ra1 Re1 pawns g2 h2 | Black: Kg8 Qd8 Ra8 Re8 pawns g7 h7", question:"White to move. Find the winning move.", answer:"Rxe8+"},
  {title:"Knight Fork", fen:"White: Kg1 Qd1 Nb5 | Black: Kg8 Qd8 Ra8", question:"White to move. Find the fork.", answer:"Nc7"},
  {title:"Pin and Win", fen:"White: Kg1 Bb5 | Black: Kg8 Qd8 Nc6", question:"White to move. Win material.", answer:"Bxc6"}
];
if(!localStorage.getItem("puzzles")) store("puzzles", defaultPuzzles);
let currentPuzzle = 0;

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.getElementById("pageTitle").textContent = id.charAt(0).toUpperCase()+id.slice(1);
  refreshAll();
}

function login(){
  const name = document.getElementById("loginName").value.trim();
  if(!name) return alert("Enter a name.");
  localStorage.setItem("currentUser", name);
  alert("Logged in as " + name);
}

function addStudent(){
  const students = load("students");
  students.push({name:studentName.value, rating:studentRating.value, goal:studentGoal.value});
  store("students", students);
  studentName.value=studentRating.value=studentGoal.value="";
  refreshAll();
}

function renderStudents(){
  const students = load("students");
  studentsList.innerHTML = students.length ? students.map((s,i)=>`
    <div class="row"><strong>${s.name}</strong><span>${s.rating}</span><span>${s.goal}</span><button class="danger" onclick="removeItem('students',${i})">Delete</button></div>
  `).join("") : "<p>No students added yet.</p>";
  studentCount.textContent = students.length;
}

function addCourse(){
  const courses = load("courses");
  courses.push({title:courseTitle.value, level:courseLevel.value, description:courseDescription.value});
  store("courses", courses);
  courseTitle.value=courseDescription.value="";
  refreshAll();
}

function renderCourses(){
  const courses = load("courses");
  coursesList.innerHTML = courses.length ? courses.map((c,i)=>`
    <div class="card"><h3>${c.title}</h3><p><strong>${c.level}</strong></p><p>${c.description}</p><button class="danger" onclick="removeItem('courses',${i})">Delete</button></div>
  `).join("") : "<p>No courses yet.</p>";
  courseCount.textContent = courses.length;
}

function addVideo(){
  const videos = load("videos");
  videos.push({title:videoTitle.value, url:videoUrl.value, category:videoCategory.value});
  store("videos", videos);
  videoTitle.value=videoUrl.value="";
  refreshAll();
}

function renderVideos(){
  const videos = load("videos");
  videosList.innerHTML = videos.length ? videos.map((v,i)=>`
    <div class="card"><h3>${v.title}</h3><p>${v.category}</p><a href="${v.url}" target="_blank">Open video</a><br><br><button class="danger" onclick="removeItem('videos',${i})">Delete</button></div>
  `).join("") : "<p>No videos yet.</p>";
  videoCount.textContent = videos.length;
}

function loadPuzzle(){
  const puzzles = load("puzzles", defaultPuzzles);
  if(!puzzles.length) return;
  const p = puzzles[currentPuzzle % puzzles.length];
  puzzleTitle.textContent = p.title;
  puzzleFen.textContent = p.fen;
  puzzleQuestion.textContent = p.question;
  puzzleAnswer.value = "";
  puzzleResult.textContent = "";
  puzzleScore.textContent = localStorage.getItem("puzzleScore") || 0;
}

function checkPuzzle(){
  const puzzles = load("puzzles", defaultPuzzles);
  const p = puzzles[currentPuzzle % puzzles.length];
  if(puzzleAnswer.value.trim().toLowerCase() === p.answer.trim().toLowerCase()){
    let score = Number(localStorage.getItem("puzzleScore") || 0) + 1;
    localStorage.setItem("puzzleScore", score);
    puzzleResult.textContent = "Correct. Strong move!";
  } else {
    puzzleResult.textContent = "Not yet. Look for checks, captures, and threats.";
  }
  puzzleScore.textContent = localStorage.getItem("puzzleScore") || 0;
}

function nextPuzzle(){
  currentPuzzle++;
  loadPuzzle();
}

function addPuzzle(){
  const puzzles = load("puzzles", defaultPuzzles);
  puzzles.push({title:newPuzzleTitle.value, fen:newPuzzleFen.value, question:newPuzzleQuestion.value, answer:newPuzzleAnswer.value});
  store("puzzles", puzzles);
  newPuzzleTitle.value=newPuzzleFen.value=newPuzzleQuestion.value=newPuzzleAnswer.value="";
  alert("Puzzle added.");
  loadPuzzle();
}

function savePGN(){
  const games = load("pgnGames");
  games.push({pgn:pgnText.value, date:new Date().toLocaleString()});
  store("pgnGames", games);
  pgnOutput.innerHTML = "<p>PGN saved locally.</p>";
}

function generatePGNNotes(){
  const text = pgnText.value;
  if(!text.trim()) return alert("Paste a PGN first.");
  pgnOutput.innerHTML = `
    <h3>Coach Fernando Training Notes</h3>
    <ul>
      <li>Identify the first moment where the position changed clearly.</li>
      <li>Check all forcing moves: checks, captures, threats.</li>
      <li>Review piece improvement before launching an attack.</li>
      <li>Write one improvement goal for the next game.</li>
      <li>Opening, middlegame, and endgame mistakes should be separated.</li>
    </ul>
    <p class="small">This is a starter local analysis tool. Full engine analysis requires a backend or chess engine integration.</p>
  `;
}

function addEvent(){
  const events = load("events");
  events.push({name:eventName.value, date:eventDate.value, venue:eventVenue.value});
  store("events", events);
  eventName.value=eventDate.value=eventVenue.value="";
  refreshAll();
}

function renderEvents(){
  const events = load("events");
  eventsList.innerHTML = events.length ? events.map((e,i)=>`
    <div class="card"><h3>${e.name}</h3><p>${e.date}</p><p>${e.venue}</p><button class="danger" onclick="removeItem('events',${i})">Delete</button></div>
  `).join("") : "<p>No events yet.</p>";
}

function removeItem(key, index){
  const arr = load(key);
  arr.splice(index,1);
  store(key,arr);
  refreshAll();
}

function refreshAll(){
  renderStudents(); renderCourses(); renderVideos(); renderEvents(); loadPuzzle();
}

refreshAll();