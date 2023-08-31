const CV_FILENAME = "CV-MRAZ.pdf"
const font = 26;
const font_width = 14.2941;
const input = document.getElementById('input');
const list = document.getElementById("list");

let speed = 10;
let writing = false;
let height = document.getElementById('content').clientHeight;
let maxLines = (height / (font + 5)) - 1; //-1 for the input field row
let lines = [];

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
1. fix text scrolling
2. opening animation
*/

function plainText(text) {
    this.innerText = text;
}

function coloredText(text) {
    this.innerText = text;
}

function pageLink(text, pageUrl) {
    this.innerText = text;
    this.pageUrl = pageUrl;
}

function downloadLink(text, downloadUrl) {
    this.innerText = text;
    this.downloadUrl = downloadUrl;
}

function getResult(text) {
    text = text.toLowerCase();
    const msg = [];
    msg.push([new plainText("C:\\MrazFilip > " + text)]);
    if(text === "help") {
        msg.push([new plainText("Here are all available commands:")]);
        msg.push([new coloredText("Help"), new plainText(" - Displays list of all available commands")]);
        msg.push([new coloredText("About"), new plainText(" - Displays my personal information")]);
        msg.push([new coloredText("CV"), new plainText(" - Shows download options of my CV")]);
        msg.push([new coloredText("Links"), new plainText(" - Displays all of my work related links links")]);
        msg.push([new coloredText("Socials"), new plainText(" - Displays all of my social media links")]);
    }
    else if(text === "about") {
        msg.push([new plainText("Here is some basic information about me:")]);
        msg.push([new coloredText("Name:"), new plainText(" Filip Mráz")]);
        msg.push([new coloredText("Age:"), new plainText( " 19")]);
        msg.push([new coloredText("Gender:"), new plainText(" M")]);
        msg.push([new coloredText("Nationality:"), new plainText(" Czech")]);
        msg.push([new coloredText("Languages:"), new plainText(" Czech, English, German, Russian")]);
        msg.push([new coloredText("Programming languages:"), new plainText(" C#, Python, PHP, HTML, CSS, JS, SQL")]);
        msg.push([new coloredText("Education:"), new plainText(" Private Secondary School of Information Technology")]);
    }
    else if(text === "cv") {
        msg.push([new plainText("Download my CV:")])
        msg.push([new pageLink("Preview", CV_FILENAME)]);
        msg.push([new downloadLink("Download", CV_FILENAME)]);
    }
    else if(text === "links") {
        msg.push([new plainText("Here are my work related links:")]);
        msg.push([new pageLink("GitHub", "https://github.com/MrazFilip"), new plainText(" - My GitHub profile")]);
        msg.push([new pageLink("LinkedIn", "https://www.linkedin.com/in/filip-mr%C3%A1z-0ab002229/"), new plainText(" - My LinkedIn profile")]);
    }
    else if(text === "socials") {
        msg.push([new plainText("Here are my social media links:")]);
        msg.push([new pageLink("Facebook","https://www.facebook.com/filip.mraz.50/"), new plainText(" - My Facebook profile")]);
        msg.push([new pageLink("Instagram", "https://www.instagram.com/filip__mraz/"), new plainText(" - My Instagram profile",)]);
    }
    else {
        msg.push([new plainText("'" + text + "'" + " is not recognized as one of the available commands")]);
        msg.push([new plainText("Try the 'help' command to list all available commands")]);
    }
    msg.push([new plainText("‎")]);

    addElements(msg)
}

function addElements(fullText) {
    for (let i = 0; i < fullText.length; i++) {
        let p = document.createElement("p");
        list.appendChild(p);
        lines.push(p);

        for (let j = 0; j < fullText[i].length; j++) {
            if(fullText[i][j] instanceof coloredText) {
                let span = document.createElement("span");
                list.lastChild.appendChild(span);
            }
            else if(fullText[i][j] instanceof pageLink) {
                let a = document.createElement("a");
                a.href = fullText[i][j].pageUrl;
                a.target = "_";
                list.lastChild.appendChild(a);
            }
            else if(fullText[i][j] instanceof downloadLink) {
                let a = document.createElement("a");
                a.href = fullText[i][j].downloadUrl;
                a.download = fullText[i][j].downloadUrl;
                list.lastChild.appendChild(a);
            }
        }
    }

    while (lines.length >= maxLines) {
        lines.shift();
        list.firstChild.remove();
    }

    let currentChar = 0;
    let currentElement = 0;
    let currentParagraph = lines.length - fullText.length;
    let linesWritten = 0;

    const intervalId = setInterval(function () {
        if(linesWritten === fullText.length) {
            writing = false;
            clearInterval(intervalId);
        }
        else if(currentElement === fullText[linesWritten].length) {
            currentElement = 0;
            currentParagraph++;
            linesWritten++;
        }
        else if(currentChar === fullText[linesWritten][currentElement].innerText.length) {
            currentChar = 0;
            currentElement++;
        }

        if(fullText[linesWritten][currentElement] instanceof plainText) {
            lines[currentParagraph].innerHTML += fullText[linesWritten][currentElement].innerText[currentChar];
            currentChar++;
        }
        else if(fullText[linesWritten][currentElement] instanceof coloredText) {
            lines[currentParagraph].getElementsByTagName("span")[0].innerHTML += fullText[linesWritten][currentElement].innerText[currentChar];
            currentChar++;
        }
        else if(fullText[linesWritten][currentElement] instanceof pageLink || fullText[linesWritten][currentElement] instanceof downloadLink) {
            lines[currentParagraph].getElementsByTagName("a")[0].innerHTML += fullText[linesWritten][currentElement].innerText[currentChar];
            currentChar++;
        }
    }, speed);

    input.value = '';
}

window.addEventListener('resize', function () {
    height = document.getElementById('content').clientHeight;
    maxLines = (height / (font + 5)) - 1; //-1 for the input field row
});

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter' && writing === false) {
        writing = true;
        getResult(input.value);
        input.style.width = 0;
        currentWidth = 0;
    }
});

window.onkeydown = inputFocus;

function inputFocus(){
    input.focus();
}

let currentWidth = 0;

document.addEventListener("keydown", function (event) {
    if(input.value.length > (window.screen.width * 0.7) / font_width) {
        input.value = input.value.slice(0, -1);
        return
    }
    if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === 32) {
        currentWidth += font_width;
        input.style.width = currentWidth + "px";
    }
    else if(event.keyCode === 8 && input.value.length > 0) {
        currentWidth -= font_width;
        input.style.width = currentWidth + "px";
    }
});

let blink = false
blinkTimer = setInterval(function () {
    currentWidth = input.value.length * font_width;
    input.style.width = currentWidth;

    if(!blink) {
        document.getElementById('input_line').style.setProperty("--blinking_cursor", "transparent");
        blink = true;
    }
    else {
        document.getElementById('input_line').style.setProperty("--blinking_cursor", "var(--text)");
        blink = false;
    }
}, 250);

input.addEventListener('select', function () {
    this.selectionStart = this.selectionEnd;
});
