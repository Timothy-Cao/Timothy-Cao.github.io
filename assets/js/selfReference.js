

function generateQuestion() {
    const totalOptions = 6;
    const correctAnswerIndex = Math.floor(Math.random() * totalOptions); // Random index for the correct answer
    const options = ["None", "Some", "All"];
    const references = ["the above", "the below", "all statements"];
    const truthValues = ["true", "false", "are different"];
    const statements = new Array(totalOptions).fill('');

    // Helper function to generate a statement
    function generateStatement(option, reference, truthValue) {
        return `${option} of ${reference} ${truthValue}.`;
    }

    // Generate false statements
    for (let i = 0; i < totalOptions; i++) {
        if (i !== correctAnswerIndex) {
            // Ensure the false statement does not logically conflict
            // This simplistic approach picks random elements; refine this to ensure logical consistency
            const option = options[Math.floor(Math.random() * options.length)];
            const reference = references[Math.floor(Math.random() * references.length)];
            const truthValue = truthValues[Math.floor(Math.random() * truthValues.length)];
            statements[i] = generateStatement(option, reference, truthValue);
        }
    }

    // Generate the correct statement based on the false ones
    // This is a placeholder logic; actual implementation depends on the logic to assess the falsity of other statements
    const correctOption = options[Math.floor(Math.random() * options.length)];
    const correctReference = references[Math.floor(Math.random() * references.length)];
    const correctTruthValue = truthValues[Math.floor(Math.random() * truthValues.length)];
    statements[correctAnswerIndex] = generateStatement(correctOption, correctReference, correctTruthValue);

    return {
        question: "Which of the following statements is correct?",
        statements,
        correctAnswer: `Statement ${correctAnswerIndex + 1} is correct.`,
    };
}