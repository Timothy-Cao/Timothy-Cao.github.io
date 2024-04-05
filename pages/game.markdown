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
<title>Snakes and Ladders Board</title>
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
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1px solid #000;
  }
  .start, .end {
    margin: 10px;
    padding: 10px;
    border: 1px solid #000;
    background-color: #fff;
  }
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

  function populateBoard() {
    let cells = [];
    for (let i = 100; i >= 1; i--) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = i;
      cells.push(cell);
    }
    cells.forEach(cell => boardContainer.appendChild(cell));
  }

  populateBoard();
</script>

</body>
</html>
