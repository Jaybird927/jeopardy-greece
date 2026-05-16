# Ancient Greece Jeopardy Game

A fully functional Jeopardy game featuring 5 Greek city-states as contestants.

## Teams
- **Corinth** (Pegasus emblem)
- **Sparta** (Lambda shield)
- **Megara** (Bull emblem)
- **Athens** (Owl of Athena)
- **Argos** (Theater masks)

## Setup Instructions

### 1. Add Team Images
Save the team profile images in the project folder with these exact names:
- `corinth.png` - Image #1 (Pegasus)
- `sparta.png` - Image #2 (Lambda shield)
- `megara.png` - Image #4 (Bull)
- `athens.png` - Image #5 (Owl)
- `argos.png` - Image #6 (Theater masks)

### 2. Customize Categories and Questions
Edit the `script.js` file to add your categories and questions:

1. Find the `categories` array (around line 3) and replace with your 5 category names
2. Find the `questions` array and replace the placeholder questions and answers

Example format:
```javascript
categories: [
    "Greek Mythology",
    "Ancient Warfare",
    "Philosophy",
    "Architecture",
    "Daily Life"
],
questions: [
    // Category 1
    [
        { question: "This god ruled Mount Olympus", answer: "Who is Zeus?", value: 100 },
        // ... more questions
    ],
    // ... more categories
]
```

### 3. Run the Game
Simply open `jeopardy.html` in a web browser!

## How to Play
1. Click on any point value to reveal the question
2. Press "Show Answer" to reveal the correct answer
3. Award points to the team that answered correctly
4. The clue will gray out once used
5. Continue until all questions are answered

## Features
- **Score Tracking**: Automatic score updates for all 5 teams
- **Visual Feedback**: Hover effects and animations
- **Keyboard Shortcuts**:
  - ESC to close modal
  - SPACE to show answer
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Greek Theme**: Gold and blue color scheme inspired by ancient Greece

## Customization
- Edit `styles.css` to change colors and styling
- Modify `script.js` to add more features or change game logic
- Update `jeopardy.html` to adjust layout

Enjoy your game!
