import React, { useState, useEffect } from "react";

const wordSets = {
  aeenors: ["arenose"],
  aeeirst: ["aeriest", "seriate"],
  aegiort: ["goatier"],
  eilnort: ["retinol"],
  aeinost: ["atonies"],
  aeilnos: ["anisole", "sealion"],
  aeeinst: ["etesian"],
  aeiinrt: ["inertia"],
  aaeilor: ["olearia"],
  aeinnot: ["enation"],
  adenort: ["tornade"],
  aeilnot: ["elation", "toenail"],
  eeilort: ["troelie"],
  aceinot: ["aconite", "anoetic"],
  aeiorst: ["oariest", "otaries", "roastie"],
  abeinot: ["niobate"],
  aenortu: ["outearn"],
  aeeilnr: ["aliener"],
  eeiorst: ["erotise"],
  aeinrst: [
    "anestri",
    "antsier",
    "nastier",
    "ratines",
    "resiant",
    "retains",
    "retinas",
    "retsina",
    "stainer",
    "starnie",
    "stearin",
  ],
  aeginrt: ["granite", "gratine", "ingrate", "tangier", "tearing"],
  aadeior: ["aeradio"],
  aeinrtu: ["ruinate", "taurine", "uranite", "urinate"],
  aeilost: ["isolate"],
  einortu: ["routine"],
  aeinors: ["erasion"],
  aeeinrt: ["arenite", "retinae", "trainee"],
  adeinrt: ["antired", "detrain", "trained"],
  deeinor: ["ordinee"],
  eeilnor: ["eloiner"],
  einorst: ["norites", "oestrin", "orients", "stonier", "tersion", "triones"],
  adeinos: ["adonise", "anodise", "sodaine"],
  aeeilnt: ["lineate"],
  adeilor: ["dariole"],
  aeeorst: ["roseate"],
  aceiort: ["erotica"],
  aeimnor: ["moraine", "romaine"],
  aeeilrt: ["atelier", "realtie"],
  aaeilno: ["aeolian"],
  adeiost: ["iodates", "toadies"],
  aeilnrt: ["entrail", "latrine", "ratline", "reliant", "retinal", "trenail"],
  aeinort: ["notaire", "otarine"],
  aeimnot: ["amniote"],
  aenorst: ["atoners", "santero", "senator", "treason"],
  adeiors: ["radioes", "roadies", "soredia"],
  aaeeint: ["taeniae"],
  aeeiort: ["etaerio"],
  aeginor: ["origane"],
  aeilnor: ["aileron", "alerion", "alienor"],
  adeinor: ["aneroid"],
};

const Scrabble = () => {
  const [keys, setKeys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userInput, setUserInput] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const shuffledKeys = Object.keys(wordSets).sort(() => Math.random() - 0.5);
    setKeys(shuffledKeys);
  }, []);

  const currentKey = keys[currentIndex];
  const validWords = wordSets[currentKey];

  const handleGuess = () => {
    if (validWords.includes(userInput.toLowerCase())) {
      setFeedback("Correct!");
      setShowAnswers(true);
    } else {
      setFeedback("Incorrect.");
    }
    setUserInput("");
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % keys.length);
    setFeedback("");
    setUserInput("");
    setShowAnswers(false);
  };

  const toggleInfo = () => {
    setShowInfo((prev) => !prev);
  };

  return (
  <div className="bg-gray-900 text-white px-4">
    <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-4 text-center flex items-center justify-center gap-2">
          Scrabble Trainer
        </h1>
        <p className="text-lg text-gray-400 text-center mb-6 flex items-center justify-center">
          Unscramble letters to find valid words!
          <button
            className="ml-2 bg-gray-900 text-white rounded-full w-7 h-7 flex items-center justify-center text-m font-bold"
            onClick={toggleInfo}
          >
            ?
          </button>
        </p>
        <p className="text-center mb-4">
          <strong>Question {currentIndex + 1} of {keys.length}</strong>
        </p>

        <div className="text-center mb-6">
          <h2 className="text-4xl font-mono">{currentKey}</h2>
        </div>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <input
            type="text"
            value={userInput}
            placeholder="Enter your guess"
            className="p-2 rounded bg-gray-700 text-white"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="bg-blue-600 px-6 py-2 rounded-lg shadow"
            onClick={handleGuess}
          >
            Submit
          </button>
          <button
            className="bg-yellow-600 px-6 py-2 rounded-lg shadow"
            onClick={() => setShowAnswers(true)}
          >
            Check Answers
          </button>
          <button
            className="bg-green-600 px-6 py-2 rounded-lg shadow"
            onClick={handleNext}
          >
            Next
          </button>
        </div>

        {feedback && (
          <div
            className={`text-2xl font-bold text-center mb-6 ${
              feedback === "Correct!" ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedback}
          </div>
        )}

        {showAnswers && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Valid Answers:</h3>
            <ul className="list-disc list-inside">
              {validWords.map((word, index) => (
                <li key={index}>
                  <a
                    href={`https://www.thefreedictionary.com/${word}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {word}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-auto">
            <div className="p-8 bg-gray-800 rounded-lg mt-20 mx-auto max-w-md">
              <h2 className="text-2xl font-bold mb-4">About Scrabble Trainer</h2>
              <p>
                These are the top 50 most likely arrangements of letters that form valid Scrabble words. 
                The letters are sorted alphabetically, so when you sort your tiles in the game, you can recognize these words more easily.
              </p>
              <button
                className="mt-6 p-2 bg-gray-600 rounded hover:bg-gray-500"
                onClick={toggleInfo}
              >
                Close
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Scrabble;
