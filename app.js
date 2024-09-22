const express = require('express');
const app = express();
const path = require('path');

// Set the port
const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to check working hours
function workingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // Sunday - Saturday : 0 - 6
    const hour = now.getHours();
    
    // Check if it's Monday to Friday and between 9 AM and 5 PM
    if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
        next(); // During working hours, proceed
    } else {
        res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
}

// Use middleware
app.use(workingHours);

// Route for home page
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Route for services page
app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

// Route for contact page
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
