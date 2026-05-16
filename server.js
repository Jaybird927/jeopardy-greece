const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from current directory
app.use(express.static(__dirname));

// Serve index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'jeopardy.html'));
});

app.listen(PORT, () => {
    console.log(`Jeopardy game running on port ${PORT}`);
});
