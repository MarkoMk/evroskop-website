const express = require("express");
const path = require("path");

const contactRoutes = require("./routes/contact");

const app = express();
const PORT = 3000;


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(express.json());


// Public assets
app.use(
    express.static(
        path.join(__dirname, "../public")
    )
);


// Front-end JavaScript
app.use(
    "/js",
    express.static(
        path.join(__dirname, "../src/js")
    )
);


// Front-end data
app.use(
    "/data",
    express.static(
        path.join(__dirname, "../src/data")
    )
);


// ============================================================
// API ROUTES
// ============================================================

app.use(
    "/api/contact",
    contactRoutes
);


// ============================================================
// PAGE ROUTES
// ============================================================


// Homepage
app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../src/pages/index.html"
        )
    );
});


// Robotics main page
app.get("/robotics", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../src/pages/robotics.html"
        )
    );
});


// Individual robot page
app.get("/robotics/:slug", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../src/pages/robot-detail.html"
        )
    );
});


// Sheet Metal main page
app.get("/sheet-metal", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../src/pages/sheet-metal.html"
        )
    );
});


// Individual machine page
app.get("/sheet-metal/:slug", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../src/pages/machine-detail.html"
        )
    );
});


// About page
app.get("/about", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../src/pages/about.html"
        )
    );
});


// Contact page
app.get("/contact", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "../src/pages/contact.html"
        )
    );
});


// ============================================================
// 404
// ============================================================

app.use((req, res) => {

    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <title>Page Not Found | Evroskop Group</title>

            <link rel="stylesheet" href="/styles.css">
        </head>

        <body
            class="flex min-h-screen
                   items-center justify-center
                   bg-gray-50 px-6"
        >

            <main
                class="max-w-xl text-center"
            >

                <p
                    class="text-sm font-bold uppercase
                           tracking-[0.2em]
                           text-evroskop-blue"
                >
                    404
                </p>

                <h1
                    class="mt-4 text-4xl font-bold
                           text-evroskop-dark"
                >
                    Page not found.
                </h1>

                <p
                    class="mt-4 text-base leading-7
                           text-gray-600"
                >
                    The page you requested does not exist
                    or may have been moved.
                </p>

                <a
                    href="/"
                    class="mt-8 inline-flex
                           rounded-lg
                           bg-evroskop-dark
                           px-6 py-3
                           font-semibold text-white
                           transition
                           hover:bg-evroskop-blue"
                >
                    Back to Home
                </a>

            </main>

        </body>

        </html>
    `);

});


// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {

    console.log(
        `Evroskop website running at http://localhost:${PORT}`
    );

});