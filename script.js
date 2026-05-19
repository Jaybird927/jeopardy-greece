// Game Data Structure
const gameData = {
    categories: [
        "Ancient Spartan Education",
        "Greek Alphabet",
        "Ancient Athenian Education",
        "Use in Mathematics"
    ],
    questions: [
        // Category 1: Ancient Spartan Education
        [
            { question: "True or False? Ancient Spartan women had more education than ancient Athenian women.", answer: "True", value: 100 },
            { question: "True or False? Ancient Spartans cared if you stole food.", answer: "False - They only cared if you were CAUGHT stealing food, because that was the disappointing part to them.", value: 200 },
            { question: "What did ancient Spartan women do while their husbands were at war?", answer: "Protected their husband's belongings, including their children.", value: 300 },
            { question: "What happened to ancient Spartan men at the age of 20?", answer: "They were given a test designed to challenge their fitness level, military capability, and leadership skills.", value: 400 },
            { question: "What were the 3 main subjects ancient Spartans studied?", answer: "athletics, dancing, and weapon training", value: 500 }
        ],
        // Category 2: Greek Alphabet
        [
            { question: "True or False? The Greek alphabet is the ancestor of all modern European alphabets.", answer: "True", value: 100 },
            { question: "True or False? Italian was the language the Greeks adopted to create the Greek script.", answer: "False - Phoenician", value: 200 },
            { question: "Which of the following is true about the Greek alphabet?\na) The Greek alphabet is still written right to left.\nb) The 2 branches of the alphabet were Doric and Ionic.\nc) It is the first 'true' alphabet, which means it was written with vowels and consonants.", answer: "C", value: 300 },
            { question: "What was the official script of Athens?", answer: "Ionic", value: 400 },
            { question: "What were three works that were written with the Greek script, mentioned earlier? (Hint: I_____, T_______, O______)", answer: "Iliad, Theogony, and Odyssey", value: 500 }
        ],
        // Category 3: Ancient Athenian Education
        [
            { question: "True or False? Athenian women were given the same education as men.", answer: "False", value: 100 },
            { question: "What age were Athenian boys sent off to a government-run school?", answer: "6 or 7", value: 200 },
            { question: "The Athenian education system was guided by the concept of _______, meaning more than education, as it referred to the full development of a citizen: morally upright, intellectually capable, physically fit, and artistically literate.", answer: "paideia", value: 300 },
            { question: "Why were Athenian students forced to memorize all their material?", answer: "Books were expensive in ancient Greek times, meaning that only wealthy people could afford them.", value: 400 },
            { question: "What were four of the subjects focused on in ancient Athenian learning?", answer: "reading, writing, music, poetry, athletics, philosophy, and rhetoric.", value: 500 }
        ],
        // Category 4: Use in Mathematics
        [
            { question: "True or False? There are many letters in the Greek alphabet that are used in mathematical problems.", answer: "True", value: 100 },
            { question: "LOWERCASE Sigma in math is:\na) The exact same thing as the MAD.\nb) The mean.\nc) Effectively the same thing as the MAD, with slight calculation differences.", answer: "c", value: 200 },
            { question: "How do you get the number Pi?", answer: "By dividing a circle's perimeter by its width.", value: 300 },
            { question: "What is the job of UPPERCASE Sigma?\na) A giant plus sign, telling you to add all the numbers together.\nb) The mode.\nc) A large multiplication sign, so you don't get confused with the letter X.", answer: "a", value: 400 },
            { question: "What two things does Mu represent in math?", answer: "The mean and one millionth of a meter.", value: 500 }
        ]
    ]
};

// Team Scores
const scores = {
    corinth: 0,
    sparta: 0,
    megara: 0,
    athens: 0,
    argos: 0
};

// Current Question
let currentQuestion = null;

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    initializeBoard();
    initializeEventListeners();
});

function initializeBoard() {
    // Set category headers
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach((header, index) => {
        header.textContent = gameData.categories[index];
    });
}

function initializeEventListeners() {
    // Clue click events
    const clues = document.querySelectorAll('.clue');
    clues.forEach(clue => {
        clue.addEventListener('click', function() {
            if (!this.classList.contains('used')) {
                const category = parseInt(this.dataset.category);
                const questionIndex = parseInt(this.dataset.question);
                showQuestion(category, questionIndex, this);
            }
        });
    });

    // Show answer button
    document.querySelector('.show-answer-btn').addEventListener('click', function() {
        document.querySelector('.answer-text').style.display = 'block';
        this.style.display = 'none';
        // Enable team buttons after showing answer
        document.querySelector('.team-buttons').style.display = 'block';
    });

    // Team buttons
    const teamButtons = document.querySelectorAll('.team-btn');
    teamButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const team = this.dataset.team;
            awardPoints(team);
        });
    });

    // Incorrect button
    document.querySelector('.incorrect-btn').addEventListener('click', function() {
        markIncorrect();
    });

    // Close modal
    document.querySelector('.close-modal').addEventListener('click', closeModal);

    // Close modal when clicking outside
    document.getElementById('question-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function showQuestion(category, questionIndex, clueElement) {
    const question = gameData.questions[category][questionIndex];
    currentQuestion = { ...question, clueElement };

    // Populate modal
    document.querySelector('.question-value').textContent = `$${question.value}`;
    document.querySelector('.question-text').textContent = question.question;
    document.querySelector('.answer-text').textContent = question.answer;

    // Reset answer display
    document.querySelector('.answer-text').style.display = 'none';
    document.querySelector('.show-answer-btn').style.display = 'inline-block';

    // Hide team buttons until answer is shown
    document.querySelector('.team-buttons').style.display = 'none';

    // Check if question is True/False or Multiple Choice
    const isTrueFalse = question.question.toLowerCase().includes('true or false');
    const isMultipleChoice = question.question.includes('a)') || question.question.includes('b)') || question.question.includes('c)');

    // Show/hide incorrect button based on question type
    const incorrectBtn = document.querySelector('.incorrect-btn');
    if (isTrueFalse || isMultipleChoice) {
        incorrectBtn.style.display = 'block';
    } else {
        incorrectBtn.style.display = 'none';
    }

    // Show modal
    document.getElementById('question-modal').style.display = 'block';
}

function awardPoints(team) {
    if (currentQuestion) {
        scores[team] += currentQuestion.value;
        updateScore(team);

        // Mark clue as used and add team logo
        currentQuestion.clueElement.classList.add('used');

        // Get team logo image source
        const teamImages = {
            corinth: 'corinth.png',
            sparta: 'sparta.png',
            megara: 'megara.png',
            athens: 'athens.png',
            argos: 'argos.jpg'
        };

        // Replace clue content with team logo
        currentQuestion.clueElement.innerHTML = `<img src="${teamImages[team]}" alt="${team}" style="width: 8vh; height: 8vh; border-radius: 50%; object-fit: cover;">`;

        closeModal();

        // Check if game is over (someone reached 1500)
        if (scores[team] >= 1500) {
            setTimeout(() => showGameOver(), 500);
        }
    }
}

function markIncorrect() {
    if (currentQuestion) {
        // Mark clue as used
        currentQuestion.clueElement.classList.add('used');

        // Replace clue content with incorrect X image
        currentQuestion.clueElement.innerHTML = `<img src="incorrect.jpg" alt="incorrect" style="width: 8vh; height: 8vh; border-radius: 50%; object-fit: cover;">`;

        closeModal();
    }
}

function updateScore(team) {
    document.getElementById(`${team}-score`).textContent = `$${scores[team]}`;
}

function closeModal() {
    document.getElementById('question-modal').style.display = 'none';
    currentQuestion = null;
}

function showGameOver() {
    // Create standings array
    const standings = Object.entries(scores).map(([team, score]) => ({
        team,
        score
    })).sort((a, b) => b.score - a.score); // Sort by score descending

    // Team data
    const teamData = {
        corinth: { name: 'Corinth', image: 'corinth.png' },
        sparta: { name: 'Sparta', image: 'sparta.png' },
        megara: { name: 'Megara', image: 'megara.png' },
        athens: { name: 'Athens', image: 'athens.png' },
        argos: { name: 'Argos', image: 'argos.jpg' }
    };

    // Build standings HTML with proper tie handling
    let standingsHTML = '';
    let currentRank = 1;
    let previousScore = null;

    standings.forEach((standing, index) => {
        const team = standing.team;

        // Handle ties - if score is different from previous, update rank
        if (previousScore !== null && standing.score < previousScore) {
            currentRank = index + 1;
        }

        const isWinner = currentRank === 1 ? 'winner' : '';
        const medal = currentRank === 1 ? '🥇' : currentRank === 2 ? '🥈' : currentRank === 3 ? '🥉' : '';

        standingsHTML += `
            <div class="standing-item ${isWinner}">
                <div class="standing-left">
                    <div class="standing-rank">${medal || currentRank}</div>
                    <img src="${teamData[team].image}" alt="${teamData[team].name}" class="standing-logo">
                    <div class="standing-name">${teamData[team].name}</div>
                </div>
                <div class="standing-score">${standing.score}</div>
            </div>
        `;

        previousScore = standing.score;
    });

    document.getElementById('standings-container').innerHTML = standingsHTML;
    document.getElementById('gameover-modal').style.display = 'block';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }

    // Space to show answer
    if (e.key === ' ' && document.getElementById('question-modal').style.display === 'block') {
        e.preventDefault();
        const showBtn = document.querySelector('.show-answer-btn');
        if (showBtn.style.display !== 'none') {
            showBtn.click();
        }
    }
});
