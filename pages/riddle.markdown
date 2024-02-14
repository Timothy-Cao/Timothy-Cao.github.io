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


<!-- Placeholder for the generated riddle -->
<script src="{{ '/assets/js/questionGenerate.js' | relative_url }}"></script>
<div id="generated-riddle"></div>

<script>
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOMContentLoaded event fired.');
  try {
    const { question, statements, correctAnswer } = generateQuestion();
    console.log('Question generated:', question);
    
    // Construct the HTML for the question and its multiple-choice options
    let contentHtml = `<div class="puzzle"><h3>Generated Riddle</h3><p>${question}</p><ol>`;
    statements.forEach((statement, index) => {
      contentHtml += `<li>${statement}</li>`;
    });
    contentHtml += `</ol><p>Correct Answer: ${correctAnswer}</p></div>`;
    
    // Insert the generated content into the page
    document.getElementById('generated-riddle').innerHTML = contentHtml;
  } catch (error) {
    console.error('Error generating question:', error);
  }
});
</script>


insert fermi estimation puzzle generator code here


<!-----------------------------TETRIS PUZZLE ----------------------------->
<div class="bubble-section">

<h2>Tetris Puzzles</h2>
<p>A surprisingly hard puzzle that may arise from PCO. </p>
<p>The goal is to fully clear the board.</p>
<a href="https://jstris.jezevec10.com/?play=6&map=51132" target="_blank">Play it yourself!</a>
<br>
<img src="../assets/images/tetris_puzzle1.png" style="width: 300px; height: auto;">
<br>
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
<!-----------------------------LOGIC PUZZLE ----------------------------->
<div class="bubble-section">
    <h2>Logic Puzzles</h2>
    <p>New puzzles are cycled in every month!</p>

    <div class="puzzle">
        <h3 style=": #6666FF;">Triangle Puzzle</h3>
        <p>Draw 3 straight lines on top of this image to create 9 triangles:</p>
        <img src="../assets/images/triangle_puzzle.png" alt="Triangle Puzzle">
    </div>

    <div class="puzzle">
        <h3 style=": #6666FF;">Chameleon Puzzle</h3>
        <p>There are 13 Red, 15 Green, and 17 Blue Chameleons at some point of time. Whenever two Chameleons of the different s meet both of them change their  to the third . Is it ever possible for all Chameleons to become of the same ?</p>
    </div>

    <div class="puzzle">
        <h3 style=": #6666FF;">Handshake Puzzle</h3>
        <p>Five couples, including Obama and Michelle, meet at a bar. Eager to greet one another, every person shakes hands with those they haven't previously met. After the greetings, Michelle asks everyone about the number of hands they shook and gets nine different answers.</p>
        <p>How many hands did Obama shake?</p>
    </div>
</div>

