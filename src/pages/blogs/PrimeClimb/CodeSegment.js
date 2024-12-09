import React, { useState, useEffect } from "react";

const PythonRunner = () => {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const loadPyodide = async () => {
      const pyodideInstance = await window.loadPyodide();
      setPyodide(pyodideInstance);
    };

    loadPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodide) {
      setOutput("Pyodide is still loading...");
      return;
    }

    try {
      // Prepare the complete code with your game logic and user-provided robot strategy
      const completeCode = `
import random

def isValid(pos):
    return pos is not None and 0 <= pos <= 101 and int(pos) == pos

def generate_operations(start, die):
    res = [start + die, start - die, start * die, start / die]
    return [int(r) for r in res if isValid(r) and start != 101]

def generate_legal_moves_2(positions, dice_rolls):
    total = set()
    for die_order in [(dice_rolls[0], dice_rolls[1]), (dice_rolls[1], dice_rolls[0])]:
        for pawn_order in [(0, 0), (0, 1), (1, 0), (1, 1)]:
            temp_pos = [positions[0], positions[1]]
            d1, d2 = die_order
            p1, p2 = pawn_order

            new_positions = generate_operations(temp_pos[p1], d1)

            for new_pos in new_positions:
                temp_pos[p1] = new_pos
                temp_pos[1 - p1] = positions[1 - p1]

                new_positions2 = generate_operations(temp_pos[p2], d2)
                for new_pos2 in new_positions2:
                    temp_pos[p2] = new_pos2
                    total.add(tuple(sorted(temp_pos)))

    return total

def generate_legal_moves_1(position, dice_rolls):
    total = set()
    start_pos = position[0]

    for die_order in [(dice_rolls[0], dice_rolls[1]), (dice_rolls[1], dice_rolls[0])]:
        temp_pos = start_pos

        first_moves = generate_operations(temp_pos, die_order[0])
        for move in first_moves:
            if move == 101:
                total.add(101)
                continue

            second_moves = generate_operations(move, die_order[1])
            total.update(second_moves)

    return total

def play_singleplayer_game(robot_strategy, log_path=False):
    pawns = [0, 0]
    turn_count = 0

    while pawns:
        turn_count += 1
        dice_rolls = [random.randint(1, 10), random.randint(1, 10)]

        if len(pawns) == 2:
            legal_moves = generate_legal_moves_2(pawns, dice_rolls)
        elif len(pawns) == 1:
            legal_moves = generate_legal_moves_1(pawns, dice_rolls)
        else:
            break

        if not legal_moves:
            continue

        selected_move = robot_strategy(pawns, dice_rolls, legal_moves)

        if len(pawns) == 2:
            pawns[0], pawns[1] = selected_move
        elif len(pawns) == 1:
            pawns[0] = selected_move

        pawns = [pawn for pawn in pawns if pawn != 101]

    return turn_count

# User's custom robot code
${code}

# Testing the provided robot strategy
robot_result = play_singleplayer_game(custom_robot)
`;

      const result = await pyodide.runPythonAsync(completeCode);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <h2>Write Your Robot Code</h2>
      <textarea
        rows="10"
        cols="50"
        placeholder="Write your robot code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br />
      <button onClick={runCode}>Run Game Simulation</button>
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
};

export default PythonRunner;
