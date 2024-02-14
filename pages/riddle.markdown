---
layout: page
permalink: /riddle/
---

<style>
.bubble-section {
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px; /* Added to ensure space between sections */
}

button {
  margin-bottom: 10px;
}

.quiz-options li {
  cursor: pointer;
  list-style-type: none;
  padding: 5px;
  border: 1px solid #ccc;
  margin: 5px 0;
}

#quiz-popup {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 80%;
  overflow: auto;
}

.quiz-question, .puzzle h3 {
  margin: 20px 0;
  color: #6666FF; /* Standardized color for puzzle headers */
}

.quiz-feedback {
  margin-top: 10px;
}
</style>

<script>
function toggleSpoiler(spoilerId) {
  const spoiler = document.getElementById(spoilerId);
  if (spoiler.style.display === "none") {
    spoiler.style.display = "block";
  } else {
    spoiler.style.display = "none";
  }
}
</script>


<div class="fermi-game">
  <div class="fermi-game">
      <label id="fermi-question"></label>
      <input onkeypress="enter(event)" id="fermi-answer" type="number" />
      <button onclick="negate_answer()" id="negate-button">+/-</button>
      <button onclick="check_answer()" id="fermi-button">Check Answer</button>
      <div id="result"></div>
      <div id="score">You currently have: <span id="points">0</span> points<br />
      You are on question: <span id="qnumber">0</span>/<span id="tnumber"></span></div>
      <div id="fermi-source"></div>
  </div>
</div>

<script src="{{ '/assets/js/fermi.js' | relative_url }}"></script>






<!-- GENERATED SELF-REFERENCE PUZZLE -->
<script src="{{ '/assets/js/questionGenerate.js' | relative_url }}"></script>
<div id="generated-riddle"></div>

<script>
document.addEventListener('DOMContentLoaded', (event) => {
  try {
    const { question, statements, correctAnswer } = generateQuestion();
    
    let contentHtml = `<div class="puzzle"><h3>Generated Self-Reference Riddle</h3><p>${question}</p><ol>`;
    statements.forEach((statement, index) => {
      contentHtml += `<li>${statement}</li>`;
    });
    contentHtml += `</ol>`;
    
    contentHtml += `<button onclick="toggleSpoiler('correctAnswer')">Show/Hide Correct Answer</button>`;
    contentHtml += `<div id="correctAnswer" style="display:none;"><p>${correctAnswer}</p></div></div>`;
    
    document.getElementById('generated-riddle').innerHTML = contentHtml;
  } catch (error) {
    console.error('Error generating question:', error);
  }
});
</script>

<hr> <!-- Visual divider -->

<!-- TETRIS PUZZLE -->
<div class="bubble-section">
  <h2>Tetris Puzzles</h2>
  <p>A surprisingly hard puzzle that may arise from PCO. The goal is to fully clear the board.</p>
  <a href="https://jstris.jezevec10.com/?play=6&map=51132" target="_blank">Play it yourself!</a><br>
  <img src="../assets/images/tetris_puzzle1.png" style="width: 300px; height: auto;"><br>
  <div>
    <button onclick="toggleSpoiler('tetrisSpoiler1')">Show/Hide Hint</button>
    <div id="tetrisSpoiler1" style="display:none;">
      Piece order: O L I Z S. Three of the pieces need to be spun in.
    </div>
  </div>
</div>

<hr> <!-- Visual divider -->

<!-- CHESS PUZZLE -->
<div class="bubble-section">
  <h2>Chess Puzzles</h2>
  <p>Difficulty: ~2400</p>
  <img src="../assets/images/chess_puzzle1.png" style="width: 400px; height: auto;">
  <div>
    <button onclick="toggleSpoiler('chessSpoiler1')">Show/Hide Solution</button>
    <div id="chessSpoiler1" style="display:none;">
      1... Bg4 2. Rxe8+ Rxe8 3. f3 Bxh5 ... or 3. h3 Bxh5
      This queen sacrifice creates a fork between the enemy queen and the threat of a backrank mate!
    </div>
  </div>
</div>

<hr> <!-- Visual divider -->

<!-- LOGIC PUZZLE -->
<div class="bubble-section">
  <h2>Logic Puzzles</h2>
  <p>New puzzles are cycled in every month!</p>

  <div class="puzzle">
    <h3>Chameleon Puzzle</h3>
    <p>There are 13 Red, 15 Green, and 17 Blue Chameleons at some point of time. Whenever two Chameleons of different colors meet both of them change to the third color. Is it ever possible for all Chameleons to become of the same color?</p>
  </div>

  <div class="puzzle">
    <h3>Handshake Puzzle</h3>
    <p>Five couples, including Obama and Michelle, meet at a bar. Eager to greet one another, every person shakes hands with those they haven't previously met. After the greetings, Michelle asks everyone about the number of hands they shook and gets nine different answers.</p>
    <p>Question: How many hands did Obama shake?</p>
  </div>
</div>
