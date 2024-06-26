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
  color: #6666FF; 
}

.quiz-feedback {
  margin-top: 10px;
  font-style: italic;
  color: #333;
}

</style>

<script>
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}
</script>

<button id="scrollToTopButton" onclick="scrollToTop()">Scroll to Top</button>

<h1>Brain Teasers</h1>
<h3>For those with itchy brains.</h3>
<p>Enjoy a diverse collection of puzzles and riddles. New puzzles are sometimes cycled in each month. </p>

<div class="bubble-section">
  <div id="howto" class="hidden" style="margin-bottom: 20px;">
    <img src="{{ '/assets/images/fermi.jpg' | relative_url }}"><br>
  <h3>Enrico Fermi</h3>
    <p>During the development of the atomic bomb at the Trinity test, Enrico Fermi dropped pieces of paper from his hand during the atomic blast. By observing the distance the paper traveled, he estimated that the bomb was roughly equivalent to 10 kilotons of TNT. This estimate was later verified to be within an order of magnitude of the actual yield of 21 kilotons. This process, now named Fermi estimations, is used today to estimate measurements that are difficult to calculate. The premise of the method is that overestimates and underestimates generally cancel each other out across orders of magnitude during calculations. The challenging part of making Fermi estimations is devising a path of calculations that minimizes uncertainty and variance.</p>
    <p>In Science Olympiad, Fermi Questions ask for estimates given in powers of ten. For example, an estimated answer of 300 km is put into scientific notation as 3⋅10<sup>2</sup>, and the exponent on the ten is used as the answer, yielding 2. If the estimate was 600 km, or 6⋅10<sup>2</sup>, then the answer would be 3, rounding up.</p>
  </div>
  <h3>Fermi Question Examples</h3>
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
          You have: <span id="points">0</span> points<br />
          Question: <span id="qnumber">0</span>/<span id="tnumber"></span><br />
      </div>
      <div id="fermi-source" class="content"></div>
  </div>
</div>
<script src="{{ '/assets/js/fermi.js' | relative_url }}"></script>

<br> <!-- Visual divider -->

<div class="bubble-section">
  <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 20px;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/jHDx0oL0KCM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  <h3>Tetris Puzzles</h3>
  <p>Tetris has evolved significantly from its origins as a single-player, high-score-focused game, where the main strategy was executing quad line clears. Nowadays, it has shifted towards a competitive player vs. player format, introducing a variety of strategic plays for attacking and defending. Among these strategies, the "full clear" or "perfect clear"—eliminating all pieces from the board in one move—stands out as a major offensive tactic. Achieving a full clear requires considerable puzzle-solving skills and foresight, representing one of the most powerful attacks against an opponent. However, this strategy can be challenging to execute, especially with complex solutions. The video above is an example of a 10 perfect clears in a row. </p>
  <p>Try one yourself! The goal is to full clear from the given board state. You can hold up to 1 piece at a time. For more information on the controls, click the settings button. </p> 
  <a href="https://jstris.jezevec10.com/?play=6&map=51132" target="_blank">Play here!</a>
  <p> Hint: you may need to "spin" pieces into place</p>
  <br>
  <img id="tetrisPuzzleImage" src="{{ '/assets/images/tetris_puzzle1.png' | relative_url }}" style="width: 300px; height: auto;"><br>
  <div>
    <button onclick="toggleTetrisSolution()">Play Solution</button>
  </div>
</div>

<script>
function toggleTetrisSolution() {
  var img = document.getElementById('tetrisPuzzleImage');
  if (img.src.includes('tetris_puzzle1.png')) {
    img.src = "{{ '/assets/gifs/tetris_solution.gif' | relative_url }}";
  } else {
    img.src = "{{ '/assets/images/tetris_puzzle1.png' | relative_url }}";
  }
}
function toggleChessSolution() {
  var img = document.getElementById('chessPuzzleImage');
  var solutionDiv = document.getElementById('chessSolution');
  if (img.src.includes('chess_puzzle1.png')) {
    img.src = "{{ '/assets/gifs/chess_solution.gif' | relative_url }}";
    solutionDiv.style.display = "block"; // This line will display the text explanation below the gif.
  } else {
    img.src = "{{ '/assets/images/chess_puzzle1.png' | relative_url }}";
    solutionDiv.style.display = "none"; // This hides the text explanation when the puzzle image is shown.
  }
}

</script>

<br> <!-- Visual divider -->

<div class="bubble-section">
  <h3>Chess Puzzles</h3>
  <p>Chess has exploded in popularity since Netflix show the Queen's Gambit, the Hans Niemann drama, the rise of online chess and rise of chess streamers. With all these new players starting out on chess, one of the best ways to learn chess independently is to play chess puzzles. A chess puzzle isn't nessesarily about checkmating, but rather  involves finding a series of forced or calculated moves - a "tactic" that guarantees an advantage. Try out this moderately challenging puzzle! Theme: Backrank mate</p>
  <h3>Black to move</h3>
  <img id="chessPuzzleImage" src="../assets/images/chess_puzzle1.png" style="width: 400px; height: auto;">
  <div>
    <button onclick="toggleChessSolution()">Play solution</button>
    <div id="chessSolution" style="display:none;">
      <p>Bishop to G4 threatens a fork between the backrank mate on e1 and the queen! The continuation is white pushes pawn to f3 enabling escape from the backrank on e1.</p>
    </div>
  </div>
</div>

<br> <!-- Visual divider -->

<div class="bubble-section">
  <h3>Logic Puzzles</h3>

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

<br> <!-- Visual divider -->

