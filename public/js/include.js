$(document).ready(function () {
    // Navbar einfügen
    $("#navbar").load("../inc/navbar.html");

    // Footer einfügen
    $("#footer").load("../inc/footer.html");

    // Get the value of the "page" parameter from the URL
    const page = new URLSearchParams(window.location.search).get("page");

    // Load specific pages corresponding to the "page" parameter

    var pages = {
        home: "../pages/home.html",
        imprint: "../pages/imprint.html",
        faqs: "../pages/faqs.html",
        signUp: "../pages/signUp.html",
        signIn: "../pages/signIn.html",
        menu: "../pages/menu.html",
        flags: "../pages/flags.html",
        createGame: "../pages/createGame.html",
        game: "../pages/game.html",
        profile: "../pages/profile.html",
        highscores: "../pages/highscores.html",
    };
    if (page === null) {
        window.location = "index.html?page=home";
    } else {
        var pagePath = pages[page] || "../pages/404.html";
        $("#content").load(pagePath);
    }
});
