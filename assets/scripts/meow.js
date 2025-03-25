//
// theme switcher
//

const themes = [
    "styles.css",
    "dark.css",
    "meow.css"
]

const currentTheme = [
    "default",
    "dark",
    "work in progress ;P"
]

let i = 0;
function cycleTheme() {
    i++;
    const theme = document.getElementById("theme");
    theme.href = "assets/styles/" + themes[i];
    if (i == 3) {
        i = 0;
        theme.href = "assets/styles/" + themes[i];
    }
    console.log("theme is: " + currentTheme[i]);

    const button = document.getElementById("switcher");
    button.textContent = "Cycle theme: " + "(" + currentTheme[i] + ")";
}

//
// stuff for loading content
//

function loadContent(content) {
    const quizcontent = document.getElementById("content");
    quizcontent.innerHTML='<object type="text/html" data="' + content +  '" ></object>';
}

//
// the quiz code
//

