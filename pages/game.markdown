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
<title>Interactive Snakes and Ladders with Dice</title>
<style>
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    font-size: 10px;
    justify-content: center;
    align-items: center;
  }
  .pawn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 2px;
    cursor: pointer;
    position: absolute;
  }
  .red { background-color: red; }
  .purple { background-color: purple; }
  .highlight { border: 2px solid red; }
</style>
</head>
<body>

<div class="start">Start: 1</div>
<div class="board">
  <!-- JavaScript will populate this -->
</div>
<div class="end">End: 100</div>
<div id="dice"></div>

<script>
  const boardContainer = document.querySelector('.board');
  let selectedPawn = null;
  let diceValues = [];

  function populateBoard() {
    for (let i = 1; i <= 100; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-cell', i);
      cell.textContent = i;
      boardContainer.appendChild(cell);
    }
  }

  function addPawns() {
    const colors = ['red', 'red', 'purple', 'purple'];
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
    clearHighlights();
    if (selectedPawn) {
      selectedPawn.classList.remove('selected');
    }
    selectedPawn = event.target;
    selectedPawn.classList.add('selected');
    showAvailableMoves();
  }

  function showAvailableMoves() {
    if (!selectedPawn) return;
    const currentPos = parseInt(selectedPawn.parentNode.getAttribute('data-cell'), 10);
    diceValues.forEach(dice => {
      highlightMove(currentPos + dice);
      highlightMove(currentPos - dice);
      if (currentPos % dice === 0) highlightMove(currentPos / dice);
      highlightMove(currentPos * dice);
    });
  }

  function highlightMove(position) {
    if (position >= 1 && position <= 100) {
      document.querySelector(`[data-cell="${position}"]`).classList.add('highlight');
    }
  }

  function clearHighlights() {
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('highlight'));
  }

  function movePawn(event) {
    if (!selectedPawn || !event.target.classList.contains('highlight')) return;
    event.target.appendChild(selectedPawn);
    selectedPawn.classList.remove('selected');
    selectedPawn = null;
    clearHighlights();
    consumeDice();
  }

  function rollDice() {
    diceValues = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
    document.getElementById('dice').textContent = `Dice rolls: ${diceValues.join(', ')}`;
  }

  function consumeDice() {
    diceValues.shift();
    if (diceValues.length === 0) rollDice();
    document.getElementById('dice').textContent = `Dice rolls: ${diceValues.join(', ')}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    populateBoard();
    addPawns();
    rollDice();
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', movePawn);
      cell.style.position = 'relative'; // Ensure pawn positioning works correctly.
    });
  });
</
