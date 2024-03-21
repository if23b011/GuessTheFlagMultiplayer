$(document).ready(function () {
    // Navbar einfügen
    $("#navbar").load("../inc/navbar.html");

    // Footer einfügen
    $("#footer").load("../inc/footer.html");

    // Get the value of the 'page' parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");

    // Load specific pages corresponding to the 'page' parameter

    var pages = {
        home: "../pages/home.html",
        about: "../pages/about.html",
        contact: "../pages/contact.html",
        imprint: "../pages/imprint.html",
        faqs: "../pages/faqs.html",
    };
    if (page === null) {
        window.location = "index.html?page=home";
    } else {
        var pagePath = pages[page] || "../pages/404.html";
        $("#content").load(pagePath);
    }
});
