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
  }
</style>


<style>
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
  .quiz-question {
    margin: 20px 0;
  }
  .quiz-feedback {
    margin-top: 10px;
  }
</style>


insert self-referencing riddle generator code here


insert fermi estimation puzzle generator code here


<!-----------------------------TETRIS PUZZLE ----------------------------->
<div class="bubble-section">

<h2><span style=": #6666FF;">Tetris Puzzles</span></h2>
<p>A surprisingly hard puzzle that may arise from PCO. </p>
<p>The goal is to fully clear the board.</p>
<img src="../assets/images/tetris_puzzle1.png" style="width: 300px; height: auto;"><br>
<a href="https://jstris.jezevec10.com/?play=6&map=51132" target="_blank">Play it yourself!</a>
<div>
  <button onclick="toggleSpoiler('tetrisSpoiler1')">Show/Hide Hint</button>
  <div id="tetrisSpoiler1" style="display:none;">
    Piece order: O L I Z S. Three of the pieces need to be spun in.
  </div>
</div>
</div>

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
<!-----------------------------CHESS PUZZLE ----------------------------->
<div class="bubble-section">
<h2><span style=": #6666FF;">Chess Puzzles</span></h2>
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
<!-----------------------------LOGIC PUZZLE ----------------------------->
<div class="bubble-section">
    <h2><span style=": #6666FF;">Logic Puzzles</span></h2>
    <p>New puzzles are cycled in every month!</p>

    <div class="puzzle">
        <h3 style=": #6666FF;">Meta Puzzle</h3>
        <p>What is the correct answer?</p>
        <ol>
            <li>All of the below</li>
            <li>None of the below</li>
            <li>All of the above</li>
            <li>One of the above</li>
            <li>None of the above</li>
            <li>None of the above.</li>
        </ol>
    </div>

    <div class="puzzle">
        <h3 style=": #6666FF;">Triangle Puzzle</h3>
        <p>Draw 3 straight lines on top of this image to create 9 triangles:</p>
        <img src="../assets/images/triangle_puzzle.png" alt="Triangle Puzzle">
    </div>

    <div class="puzzle">
        <h3 style=": #6666FF;">Scooter Puzzle</h3>
        <p>Amanda lives with her teenage son, Matt, in the countryside—a car ride away from Matt’s school. Every afternoon, Amanda leaves the house at the same time, drives to the school at a constant speed, picks Matt up exactly when his chess club ends at 5 p.m., and then they immediately return home together at the same constant speed. But one day, Matt isn’t feeling well, so he leaves chess practice early and starts to head home on his portable scooter.</p>
        <p>After Matt has been scooting for an hour, Amanda comes across him in her car (on her usual route to pick him up), and they return together, arriving home 40 minutes earlier than they usually do. How much chess practice did Matt miss?</p>
    </div>

    <div class="puzzle">
        <h3 style=": #6666FF;">Chameleon Puzzle</h3>
        <p>There are 13 Red, 15 Green, and 17 Blue Chameleons at some point of time. Whenever two Chameleons of the different s meet both of them change their  to the third . Is it ever possible for all Chameleons to become of the same ?</p>
    </div>

    <div class="puzzle">
        <h3 style=": #6666FF;">Handshake Puzzle</h3>
        <p>Five couples, including Obama and Michelle, meet at a bar. Eager to greet one another, every person shakes hands with those they haven't previously met. After the greetings, Michelle asks everyone about the number of hands they shook and gets nine different answers.</p>
        <p>Question: How many hands did Obama shake?</p>
    </div>
</div>

<!-----------------------------MATH PUZZLE ----------------------------->
<div class="bubble-section">
    <h2><span style=": #6666FF;">Math Puzzle</span></h2>

    <div class="puzzle">
        <h3 style=": #6666FF;">The Four 4's Puzzle</h3>
        <p>Using exactly four \(4\)'s and the operations \(+\), \(-\), \(\times\), \(\div\), \(\sqrt{x}\), and \(x^y\), and brackets, how many integers starting from 0 can you produce?</p>
        <p>For instance:<br>
        \(0 = 44 - 44\) <br>
        \(1 = \frac{44}{44}\) <br>
        \(2 = \frac{4}{4} + \frac{4}{4}\) <br>
        ... and so on.
        </p>
        <p>How many integers can you form?</p>

        <div class="bonus-section">
            <h4 style=": #6666FF;">Bonus Challenge:</h4>
            <p>Can you generalize your solution to produce any positive integer?</p>
        </div>
    </div>
</div>
