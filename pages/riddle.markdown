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

#scrollToTopButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 12px;
  z-index: 1000;
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

/* Table of Contents */
#table-of-contents {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
}

#table-of-contents ul {
  list-style-type: none;
  padding: 0;
}

#table-of-contents ul li a {
  text-decoration: none;
  color: #333;
  cursor: pointer;
}
</style>

<script>
function toggleSpoiler(spoilerId) {
  const spoiler = document.getElementById(spoilerId);
  spoiler.style.display = spoiler.style.display === "none" ? "block" : "none";
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#table-of-contents ul li a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  });
});
</script>

<div id="table-of-contents">
  <h4>Table of Contents</h4>
  <ul>
    <li><a href="#fermi-estimations">Fermi Estimations</a></li>
    <li><a href="#self-reference-puzzles">Self-Reference Puzzles</a></li>
    <li><a href="#tetris-puzzles">Tetris Puzzles</a></li>
    <li><a href="#chess-puzzles">Chess Puzzles</a></li>
    <li><a href="#logic-puzzles">Logic Puzzles</a></li>
  </ul>
</div>

<button id="scrollToTopButton" onclick="scrollToTop()">Scroll to Top</button>

<h2 id="fermi-estimations">Fermi Estimations</h2>
<div class="bubble-section">
  <div id="howto" class="hidden" style="margin-bottom: 20px;">
      <p>In Science Olympiad, Fermi questions are a type of question that asks for estimates given in powers of ten. For example, an estimated answer of 300 km is put in scientific notation as 3⋅10<sup>2</sup>, and the exponent on the ten is used as the answer, yielding 2. If the estimate was 600 km, or 6⋅10<sup>2</sup>, then the answer would be 3, rounding up.</p>
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
</div>
<script src="{{ '/assets/js/fermi.js' | relative_url }}"></script>

<hr> <!-- Visual divider -->

<h2 id="self-reference-puzzles">Self-Reference Puzzles</h2>
<div class="bubble-section">
  <script src="{{ '/assets/js/questionGenerate.js' | relative_url }}"></script>
  <div id="generated-riddle"></div>
</div>

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

<h2 id="tetris-puzzles">Tetris Puzzles</h2>
<div class="bubble-section">
  <p>The goal is to fully clear the board by filling the bottom 4 rows. You can hold up to 1 piece at a time. </p> 
  <a href="https://jstris.jezevec10.com/?play=6&map=51132" target="_blank">Play it yourself!</a>
  <p> Hint: you may need to "spin" pieces into place</p>
  <br>
  <img src="{{ '/assets/images/tetris_puzzle1.png' | relative_url }}" style="width: 300px; height: auto;"><br>
  <div>
    <button onclick="toggleSpoiler('tetrisSolution')">Show/Hide Solution</button>
    <div id="tetrisSolution" style="display:none;">
      <img src="{{ '/assets/gifs/tetris_solution.gif' | relative_url }}" style="width: 300px; height: auto;">
    </div>
  </div>
</div>


<hr> <!-- Visual divider -->

<h2 id="chess-puzzles">Chess Puzzles</h2>
<div class="bubble-section">
  <p>Black to move</p>
  <img src="../assets/images/chess_puzzle1.png" style="width: 400px; height: auto;">
  <div>
    <button onclick="toggleSpoiler('chessSolution')">Show/Hide Solution</button>
    <div id="chessSolution" style="display:none;">
      <img src="{{ '/assets/gifs/chess_solution.gif' | relative_url }}" style="width: 300px; height: auto;">
      <p>Bishop to G4 threatens a fork between the backrank mate on e1 and the queen! The continuation is white pushes pawn to f3 enabling escape from the backrank on e1.</p>
    </div>
  </div>
</div>

<hr> <!-- Visual divider -->

<h2 id="logic-puzzles">Logic Puzzles</h2>
<div class="bubble-section">
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
