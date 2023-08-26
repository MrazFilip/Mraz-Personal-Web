const font = 32;
const height = window.screen.height * 0.80;
const maxLines = (height / font) - 1;
const lines = [];
const speed = 25;

/*
"help"
"about"
"cv"
"shutdown"
"links"
"socials" */

function getResult(text) {
    text = text.toLowerCase();
    const msg = [];
    msg.push("C:\\MrazFilip > " + text);
    if(text === "help") {
        msg.push("Here are all available commands:");
        msg.push("Help - Displays list of all available commands");
        msg.push("About - Displays my personal information");
        msg.push("CV - Shows download options of my CV");
        msg.push("Links - Displays all of my work related links links");
        msg.push("Socials - Displays all of my social media links");
    }
    else if(text === "about") {
        msg.push("Here is some basic information about me:");
        msg.push("Name: Filip Mráz");
        msg.push("Age: 19");
        msg.push("Gender: M");
        msg.push("Nationality: Czech");
        msg.push("Languages: Czech, English, German, Russian");
        msg.push("Programming languages: C#, Python, PHP, HTML, CSS, JS, SQL");
        msg.push("Education: Private Secondary School of Information Technology");
    }
    else if(text === "cv") {
        msg.push("Download my CV!")
    }
    else if(text === "links") {
    }
    else if(text === "socials") {
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
        if(lines.length > maxLines) {
            const list = document.getElementById("list");
            list.removeChild(list.firstChild);
            lines.shift();
        }
        document.getElementById("list").appendChild(p);
    }

    let j = 0;
    let currentParagraph = lines.length - text.length;
    let linesWritten = 0;

    const intervalId = setInterval(function () {
        if(linesWritten === text.length) {
            clearInterval(intervalId);
        }

        lines[currentParagraph].innerHTML += text[linesWritten][j];
        j++;

        if(j === text[linesWritten].length) {
            currentParagraph++;
            linesWritten++;
            j = 0;
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
    if (event.key === 'Enter') {
        getResult(document.getElementById("input").value)
    }
});

function inputFocus(){
    document.getElementById("input").focus();
}

window.onkeydown = inputFocus;