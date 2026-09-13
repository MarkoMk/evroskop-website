const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "../public")));

app.use(
    "/js",
    express.static(path.join(__dirname, "../src/js"))
);

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/pages/index.html"));
});

// Robotics page
app.get("/robotics", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/pages/robotics.html"));
});

// Sheet Metal Fabrication page
app.get("/sheet-metal", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/pages/sheet-metal.html"));
});

// Start server
app.listen(PORT, () => {
    console.log(`Evroskop website running at http://localhost:${PORT}`);
});