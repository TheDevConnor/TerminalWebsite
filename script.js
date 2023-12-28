const terminal = document.querySelector(".terminal");
const promptTemplate = document.getElementById("prompt");
const commandStack = [];

const appendResponse = (response) => {
  const output = document.createElement("div");
  const responseText = document.createElement("pre");
  responseText.innerHTML = response;
  output.appendChild(responseText);
  output.classList.add("output");
  terminal.appendChild(output);
};

const appendInput = () => {
  const prompt = promptTemplate.content.cloneNode(true);

  const input = prompt.querySelector("input.terminal-input");
  terminal.appendChild(prompt);

  input.focus();

  let currentlyOnStack = commandStack.length;

  input.addEventListener("keydown", (e) => {
    const commandHistoryMovement = (direction) => {
      if (!direction && currentlyOnStack > 0) currentlyOnStack -= 1;
      if (direction && currentlyOnStack < commandStack.length)
        currentlyOnStack += 1;
      if (commandStack[currentlyOnStack])
        input.value = commandStack[currentlyOnStack];
      else input.value = "";

      input.focus();
      input.setSelectionRange(1000, 1000);
    };

    const specialKeys = {
      Enter: () => {
        const value = input.value;
        const output = document.createElement("div");
        output.classList.add("output");
        commandStack.push(value);
        executeCommand(value);
        terminal.appendChild(output);
        input.disabled = true;
        appendInput();
      },
      Tab: () => {
        const value = input.value;
        const args = value.split(" ");
        if (args.length === 1) {
          const commands = [
            "help",
            "github",
            "project",
            "clear",
            "about",
            "contact",
            "youtube",
            "fetch",
          ];
          const command = args[0];
          const matchingCommands = commands.filter((c) =>
            c.startsWith(command)
          );
          if (matchingCommands.length === 1) {
            input.value = matchingCommands[0];
          }
        } else if (args.length === 2) {
          const command = args[0];
          const arg = args[1];
          if (command === "project") {
            const projects = ["zura", "chess", "wordle", "terminal", "all"];
            const matchingProjects = projects.filter((p) => p.startsWith(arg));
            if (matchingProjects.length === 1) {
              input.value = `project ${matchingProjects[0]}`;
            }
          }
        }
      },
      ArrowUp: () => commandHistoryMovement(false),
      ArrowDown: () => commandHistoryMovement(true),
    };

    if (specialKeys[e.key]) {
      e.preventDefault();
      specialKeys[e.key]();
    }
  });
};

document.body.addEventListener("click", () => {
  const input = document.querySelector("input.terminal-input:not([disabled])");
  if (!input) return;
  input.focus();
});

appendInput();

function checkProject(projectName) {
  if (projectName === "all") {
    return (
      checkProject("zura") +
      checkProject("chess") +
      checkProject("wordle") +
      checkProject("terminal")
    );
  } else if (projectName === "zura") {
    return `
    Project Information:
        - Project Name: Zura
        - Author: TheDevConnor
        - Description: A custom low level programming language written in c++ 
                       and compiled to x86 assembly
        - URL: <a target="_blank" href="https://github.com/TheDevConnor/Zura-Transpiled">Link to Repo</a>`;
  } else if (projectName === "chess") {
    return `
    Project Information:
        - Project Name: Chess
        - Author: TheDevConnor
        - Description: A chess engine written in python
        - URL: <a target="_blank" href="https://github.com/TheDevConnor/Basic-Python-Chess-Engine">Link to Repo</a>`;
  } else if (projectName === "wordle") {
    return `
    Project Information:
        - Project Name: Wordle
        - Author: TheDevConnor
        - Description: A wordle clone written in html, css, and javascript
        - URL: <a target="_blank" href="https://github.com/TheDevConnor/Wordle-Clone">Link to Repo</a>
        - YouTube Video: <a target="_blank" href="https://www.youtube.com/watch?v=savPJTlsv2k">Link to Video</a>`;
  } else if (projectName === "terminal") {
    return `
    Project Information:
        - Project Name: Terminal Website
        - Author: TheDevConnor
        - Description: A terminal style portfolio website
        - URL: <a target="_blank" href="https://github.com/TheDevConnor/TerminalWebsite">Link to Repo</a>
        - YouTube Video: Comming Soon</a>`;
  } else {
    return "Please provide a project name from the list: zura, chess, wordle, or all";
  }
}

function executeCommand(command) {
  if (command === "help") {
    appendResponse(
      "Available commands: help, contact, project, about, youtube, fetch, clear"
    );
    return "";
  } else if (command === "github") {
    const response = `GitHub Information:
        - GitHub Username: TheDevConnor
        - URL: <a target="_blank" href="https://github.com/TheDevConnor">Link to Github</a>`;
    appendResponse(response);
    return "";
  } else if (command.startsWith("project")) {
    const projectArgs = command.split(" ");
    if (projectArgs.length === 2) {
      const projectName = projectArgs[1];
      const response = `Project Information for ${projectName}: ${checkProject(
        projectName
      )}`;
      appendResponse(response);
      return "";
    } else {
      const response =
        "Please provide a project name from the list: zura, chess, wordle, terminal, or all";
      appendResponse(response);
      return "";
    }
  } else if (command === "clear") {
    terminal.innerHTML = "";
    return "";
  } else if (command === "about") {
    const response = `Hi, my name is Connor Harris. I have been programming for about 5 years now.
        I am currently a student at the Indian River State College and plan to go to FIU. 
        I am currently working on a few projects, including a custom programming language that's main
        focus is to be easy and simple to use. I am a self-taught programmer, and I have learned
        everything I know from the internet and the people around me. I am always looking to learn
        more and improve my skills. I have a passion for programming and I hope to one day make a
        career out of it.`;
    appendResponse(response);
    return "";
  } else if (command === "contact") {
    const response = `Contact Information:
        - Discord: thedevconnor
        - Github: <span><a target="_blank" href="https://github.com/TheDevConnor">Link to Github</a></span>
        - Email: <a href="mailto:connorharris427@gmail.com"><span class="email">connorharris427@gmail.com</span></a>`;
    appendResponse(response);
    return "";
  } else if (command === "youtube") {
    const response = `YouTube Information:
        - YouTube Channel: TheDevConnor
        - URL: <a target="_blank" href="https://www.youtube.com/channel/UCpEYiOD5VxkK3iK7JmtbrPQ">Link to Channel</a>`;
    appendResponse(response);
    return "";
  } else if (command === "fetch") {
    const response = `.........................,,;;;;:;;;;;,'..';::::c::
.......'..........cc.....................',;::::cc
.......:lc;'.....:od:....................',,;:::::
........cddol:,'coodc'.';:;...............';,;::::
........'ldoddooooooollodd:................',,;;;:
  .......cdooooooooollodl:' .',;;;;::;;;;;;,''',,;
  .',,;:coooooooolllllllll:,'''''''''''''''''...',                  -------------------------
  .'codoooooooolooooooooooool,...................'                  About Me:
    .,codoooolooooooooooddol,.....................                  Name: Connor Harris
     .'cdoloooddooolodxxxdolc,'...................                  Age: 19
    .,lodoooolodxddoodddolllll;...................                  Location: Florida
   .;cllooooooodxooooollooool;... ....... ......                    Education: AA Engineering; plan for a BS in Computer Science
  ....,',oocloooooodoooooooolc;....',,,'...',,,. .                  Programming Languages: C++, C, Python, JavaScript, HTML, CSS
 ....,,,ldl'.,;cloooooooooool:,....',,,'...',,,...                  -------------------------
....,,,::::'.....';:clooddddl;,....',,,'...',,,...                  Contact Information:
..',,,'...''........'cooddol;,,....',,,'...',,,...                  Discord: thedevconnor
.',,,,'...',';cc:,..'col:;;,,,,....,,,,'...',,,. .                  Github: <a target="_blank" href="https://github.com/TheDevConnor">Link to Github</a>
';;;;;,. .,;:xOOOxl;;clccllc;;:'...,;,;,''',;;;. .                  Email: connorharris427@gmail.com
...'''.. ..'ckOOOkxxoooodxkkd:,....,;,,,;;,:lcc:'.                  -------------------------
....  ......:kOOkxkOdooooddkOxc....;;:::::,;clloc.                  YouTube Information:
............cOOOxdkOxooooodddkOd;,cloolccc:,,cod:.                  YouTube Channel: TheDevConnor
............lOOOxdkOkdoooldd::dxooddddol::;,,col'                   URL: <a target="_blank" href="https://www.youtube.com/channel/UCpEYiOD5VxkK3iK7JmtbrPQ">Link to Channel</a>
............lOOkxxkOkdoooloxocooloodo:,;;'.;lllc'                   -------------------------
.. .........oOOkxkxkOxoooddxkOOo;cxkxl,...'dkkd;. 
.......... .oOOkxkxkOdldkOOOOOOo..ckOOx;..oOOkc.`;
    appendResponse(response);
    return "";
  }

  if (command) {
    const response = `Invalid Command: ${command}`;
    appendResponse(response);
  }
  return "";
}
