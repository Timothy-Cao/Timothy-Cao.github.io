---
layout: page
permalink: /riddle/
---

<style>
.bubble-section {
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}

button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
}

.quiz-options li {
  cursor: pointer;
  list-style-type: none;
  padding: 10px;
  background-color: #ddd;
  border: none;
  margin: 5px 0;
  text-align: center;
  user-select: none;
  border-radius: 5px;
}

.quiz-options li:hover {
  background-color: #ccc;
}

#quiz-popup {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 80%;
  margin: 20px auto;
  background-color: #fff;
}

.quiz-question, .puzzle h3 {
  margin: 20px 0;
  color: #6666FF; /* Standardized color for puzzle headers */
}

.quiz-feedback {
  margin-top: 10px;
  font-style: italic;
  color: #333;
}
</style>

<script>
function toggleSpoiler(spoilerId) {
  const spoiler = document.getElementById(spoilerId);
  spoiler.style.display = spoiler.style.display === "none" ? "block" : "none";
}
</script>

<h2>Generated Logic Puzzles</h2>

<h3>Fermi Estimations</h3>

<div id="howto" class="hidden" style="margin-bottom: 20px;">
    <p>In Science Olympiad, Fermi questions are a type of question that asks for answers given in powers of ten. For example, an estimated answer of 300 km is put in scientific notation as 3⋅10<sup>2</sup>, and the exponent on the ten is used as the answer, yielding 2. If the estimate was 600 km, or 6⋅10<sup>2</sup>, then the answer would be 3, rounding up.</p>
    <ul>
        <li>5 points for the correct power of ten</li>
        <li>3 points for one off</li>
        <li>1 point for two off</li>
    </ul>
    <p>Want to know more? Click <a href="https://scioly.org/wiki/index.php/Fermi_Questions">here</a>.</p>
</div>

<div class="content-container">
    <div class="field">
        <label class="label" id="fermi-question"></label>
        <div class="control">
            <input onkeypress="enter(event)" class="input" id="fermi-answer" type="number" pattern="[0-9]*" />
        </div>
    </div>
    <br>
    <button onclick="check_answer()" id="fermi-button" class="button is-link">Check Answer</button>
    <div id="result" class="content"></div>
    <div id="score" class="content">
        You currently have: <span id="points">0</span> points<br />
        You are on question: <span id="qnumber">0</span>/<span id="tnumber"></span><br />
    </div>
    <div id="fermi-source" class="content"></div>
</div>

<script src="{{ '/assets/js/fermi.js' | relative_url }}"></script>

<hr> <!-- Visual divider -->

<!-- GENERATED SELF-REFERENCE PUZZLE -->
<script src="{{ '/assets/js/questionGenerate.js' | relative_url }}"></script>
<div id="generated-riddle"></div>

<script>
document.addEventListener('DOMContentLoaded', (event) => {
  try {
    const { question, statements, correctAnswer } = generateQuestion();
    
    let contentHtml = `<div class="puzzle"><h3>Self-Reference Puzzles</h3><p>${question}</p><ol>`;
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
