const CV_FILENAME = "CV-MRAZ.pdf"

const font = 32;
const height = window.screen.height * 0.80;
const maxLines = (height / font) - 3;
const lines = [];
var speed = 25;

var writing = false;

/*
Commands:
"help"
"about"
"cv"
"shutdown"
"links"
"socials"
*/
/*
TODO:
1. history of searching (up/down keys)
*/



function getResult(text) {
    text = text.toLowerCase();
    const msg = [];
    msg.push("C:\\MrazFilip > " + text);
    if(text === "help") {
        msg.push("Here are all available commands:");
        msg.push(["Help", "Help - Displays list of all available commands"]);
        msg.push(["About", "About - Displays my personal information"]);
        msg.push(["CV", "CV - Shows download options of my CV"]);
        msg.push(["Links", "Links - Displays all of my work related links links"]);
        msg.push(["Socials", "Socials - Displays all of my social media links"]);
    }
    else if(text === "about") {
        msg.push("Here is some basic information about me:");
        msg.push(["Name:", "Name: Filip Mráz"]);
        msg.push(["Age:", "Age: 19"]);
        msg.push(["Gender:", "Gender: M"]);
        msg.push(["Nationality:", "Nationality: Czech"]);
        msg.push(["Languages:", "Languages: Czech, English, German, Russian"]);
        msg.push(["Programming languages:", "Programming languages: C#, Python, PHP, HTML, CSS, JS, SQL"]);
        msg.push(["Education:", "Education: Private Secondary School of Information Technology"]);
    }
    else if(text === "cv") {
        msg.push("Download my CV:")
        msg.push(["Preview", "Preview", CV_FILENAME])
        msg.push(["Download", "Download", CV_FILENAME])
    }
    else if(text === "links") {
        msg.push("Here are my work related links:");
        msg.push(["GitHub", "GitHub - My GitHub profile", "https://github.com/MrazFilip"]);
        msg.push(["LinkedIn", "LinkedIn - My LinkedIn profile", "https://www.linkedin.com/in/filip-mr%C3%A1z-0ab002229/"]);
    }
    else if(text === "socials") {
        msg.push("Here are my social media links:");
        msg.push(["Facebook", "Facebook - My Facebook profile", "https://www.facebook.com/filip.mraz.50/"]);
        msg.push(["Instagram", "Facebook - My Instagram profile", "https://www.instagram.com/filip__mraz/"]);
    }
    else {
        msg.push("'" + text + "'" + " is not recognized as one of the available commands");
        msg.push("Try the 'help' command to list all available commands");
    }
    msg.push("‎");

    addElement(msg)
}

function addElement(text) {
    for (let i = 0; i < text.length; i++) {
        var p = document.createElement("p");
        lines.push(p);
        if(typeof text[i] !== "string") {
            if(text[i].length > 2) {
                var a = document.createElement("a");
                if(text[i][2].includes(".pdf") && text[i][0] === "Download") {
                    a.href = text[i][2];
                    a.download = text[i][2];
                }
                else {
                    a.href = text[i][2];
                    a.target = "_"
                }
                lines[lines.lastIndexOf(p)].appendChild(a);
            }
            else {
                var span = document.createElement("span");
                lines[lines.lastIndexOf(p)].appendChild(span);
            }
        }
        /*
        while(lines.length > maxLines) {
            lines.shift();
            document.getElementById("list").firstChild.remove();
        }*/
        document.getElementById("list").appendChild(p);
    }

    let j = 0;
    let currentParagraph = lines.length - text.length;
    let linesWritten = 0;

    const intervalId = setInterval(function () {
        if(linesWritten === text.length) {
            writing = false;
            clearInterval(intervalId);
        }

        if(typeof text[linesWritten] === "string") {
            lines[currentParagraph].innerHTML += text[linesWritten][j];
            j++;
        }
        else if (j < text[linesWritten][0].length) {
            lines[currentParagraph].firstChild.innerHTML += text[linesWritten][0][j]
            j++;
        }
        else {
            lines[currentParagraph].innerHTML += text[linesWritten][1][j];
            j++;
        }

        if(typeof text[linesWritten] === "string") {
            if (j === text[linesWritten].length) {
                currentParagraph++;
                linesWritten++;
                j = 0;
            }
        }
        else {
            if(j === text[linesWritten][1].length) {
                currentParagraph++;
                linesWritten++;
                j = 0;
            }
        }
    }, speed);

    document.getElementById("input").value = '';
}

/*
window.addEventListener('resize', function () {
    window.location.reload();
});
*/

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter' && writing === false) {
        writing = true;
        getResult(document.getElementById("input").value);
        document.getElementById('input').style.width = 0;
        currentWidth = 0;
    }
});

window.onkeydown = inputFocus;

function inputFocus(){
    document.getElementById("input").focus();
}

var currentWidth = 0;

document.addEventListener("keydown", function (event) {
    if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === 32) {
        currentWidth += 14.2941;
        document.getElementById('input').style.width = currentWidth + "px";
    }
    else if(event.keyCode === 8 && document.getElementById('input').value.length > 0) {
        currentWidth -= 14.2941;
        document.getElementById('input').style.width = currentWidth + "px";
    }
});

var blink = false
const blinkTimer = setInterval(function () {
    if(!blink) {
        document.getElementById('input_line').style.setProperty("--blinking_cursor", "transparent");
        blink = true;
    }
    else {
        document.getElementById('input_line').style.setProperty("--blinking_cursor", "var(--text)");
        blink = false;
    }
}, 250);

var input = document.getElementById('input');

input.addEventListener('select', function () {
    this.selectionStart = this.selectionEnd;
});
