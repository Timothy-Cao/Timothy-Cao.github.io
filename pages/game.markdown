---
layout: page
permalink: /game/
---

# Test

# Snakes and Ladders Game Board
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Interactive Snakes and Ladders Board</title>
<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
  }
  .board {
    display: grid;
    grid-template-columns: repeat(10, 50px);
    grid-template-rows: repeat(10, 50px);
    gap: 5px;
  }
  .cell {
    width: 50px;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    background-color: #fff;
    border: 1px solid #000;
    position: relative;
  }
  .pawn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 2px;
    cursor: pointer;
  }
  .start, .end {
    margin: 10px;
    padding: 10px;
    border: 1px solid #000;
    background-color: #fff;
  }
  .red { background-color: red; }
  .blue { background-color: blue; }
  .green { background-color: green; }
  .yellow { background-color: yellow; }
</style>
</head>
<body>

<div class="start">Start: 0</div>
<div class="board">
  <!-- JavaScript will populate this -->
</div>
<div class="end">End: 101</div>

<script>
  const boardContainer = document.querySelector('.board');
  let selectedPawn = null;

  function populateBoard() {
    for (let i = 100; i >= 1; i--) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-cell', i);
      boardContainer.appendChild(cell);
    }
  }

  function addPawns() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    colors.forEach(color => {
      const pawn = document.createElement('div');
      pawn.classList.add('pawn', color);
      pawn.setAttribute('data-color', color);
      pawn.addEventListener('click', selectPawn);
      document.querySelector('[data-cell="1"]').appendChild(pawn);
    });
  }

  function selectPawn(event) {
    event.stopPropagation();
    if (selectedPawn) {
      selectedPawn.classList.remove('selected');
    }
    selectedPawn = event.target;
    selectedPawn.classList.add('selected');
  }

  function movePawn(event) {
    if (!selectedPawn) return;
    event.target.appendChild(selectedPawn);
    selectedPawn.classList.remove('selected');
    selectedPawn = null;
  }

  document.addEventListener('DOMContentLoaded', () => {
    populateBoard();
    addPawns();
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', movePawn));
  });
</script>

</body>
</html>
