const express = require('express')
const app = express()
const itemsRoutes = require('./routes/items')


// Middleware to parse JSON bodies
app.use(express.json())

// Use the items routes
app.use('/items', itemsRoutes);


app.use((req, res, next) => {
    return res.status(404).json({ error: "Not Found" });
});


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = app;