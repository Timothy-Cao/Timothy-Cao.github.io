function generateQuestion(statements) {
    // Determine the truth of each statement and store it
    const truths = statements.map(([_, truth]) => truth);
    
    // Determine the correct answer based on the truths of the statements
    let correctAnswer;
    if (truths.every(truth => truth === true)) {
      correctAnswer = "All of the above";
    } else if (truths.every(truth => truth === false)) {
      correctAnswer = "None of the above";
    } else {
      // Adjust this logic based on your specific requirements
      correctAnswer = "One of the above";
    }
    
    // Generate the question text
    let questionText = "Which of the following statements is correct?\n";
    statements.forEach(([statement], index) => {
      questionText += `${index + 1}. ${statement}\n`;
    });
    
    // Add generic options
    questionText += "A. All of the above\nB. None of the above\nC. One of the above\n";
    
    return { questionText, correctAnswer };
  }
  
  // Example usage
  const statements = [
    ["A square has four sides.", true],
    ["Triangles have four sides.", false],
    ["The sum of angles in a triangle is 180 degrees.", true]
  ];
  
  const { questionText, correctAnswer } = generateQuestion(statements);
  console.log(questionText);
  console.log(`Correct Answer: ${correctAnswer}`);
  