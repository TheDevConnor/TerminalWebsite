const terminal = document.querySelector('.terminal');
const input = document.getElementById('terminal-input');
input.focus();
terminal.addEventListener('click', function () {
  input.focus();
});

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const command = input.value.trim();
    const response = executeCommand(command);
    appendResponse(response);
    input.value = '';
  }
});

function checkProject(projectName) {
    if (projectName === 'all') {
        return checkProject('zura') + checkProject('chess') + 
               checkProject('wordle') + checkProject('terminal');
    } else if (projectName === 'zura') {
        return `
        Project Information:
        - Project Name: Zura
        - Author: TheDevConnor
        - Description: A custom low level programming language written in c++ 
                       and compiled to x86 assembly
        - URL: <a target="_blank" href="https://github.com/TheDevConnor/Zura-Transpiled">Link to Repo</a>`;
    } else if (projectName === 'chess') {
        return `
        Project Information:
        - Project Name: Chess
        - Author: TheDevConnor
        - Description: A chess engine written in python
        - URL: <a target="_blank" href="https://github.com/TheDevConnor/Basic-Python-Chess-Engine">Link to Repo</a>`;
    } else if (projectName === 'wordle') {
        return `
        Project Information:
        - Project Name: Wordle
        - Author: TheDevConnor
        - Description: A wordle clone written in html, css, and javascript
        - URL: <a target="_blank" href="https://github.com/TheDevConnor/Wordle-Clone">Link to Repo</a>
        - YouTube Video: <a target="_blank" href="https://www.youtube.com/watch?v=savPJTlsv2k">Link to Video</a>`;
    } else if (projectName === 'terminal') {
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
  if (command === 'help') {
    return `Available commands: help, contact, project, 
                    about, youtube, clear`;
  } else if (command.startsWith('project')) {
    const projectArgs = command.split(' ');
    if (projectArgs.length === 2) {
      const projectName = projectArgs[1];
      return `Project Information for ${projectName}: 
            ${checkProject(projectName)}`;
    } else {
      return "Please provide a project name from the list: zura, chess, wordle, terminal, or all";
    }
  } else if (command === 'clear') {
    document.querySelector('.output').innerHTML = '';
    return '';
  } else if (command === 'about') {
    return ` Hi, my name is Connor Harris. I have been programming for about 5 years now.
    I am currently a student at the Indian River State College and plan to go to FIU. 
    I am currently working on a few projects, including a custom programming language thats main
    focus is to be easy and simple to use. I am a self taught programmer, and I have learned
    everything I know from the internet and the people around me. I am always looking to learn
    more and improve my skills. I have a passion for programming and I hope to one day make a
    career out of it.`;
  } else if (command === 'contact') {
    return `
    Contact Information:
    - Discord: thedevconnor
    - Github: <span><a target="_blank" href="https://github.com/TheDevConnor">Link to Github</a></span>
    - Email: <a href="mailto:connorharris427@gmail.com"><span class="email">connorharris427@gmail.com</span></a>`;
  } else if (command === 'youtube') {
    return `
    YouTube Information:
    - YouTube Channel: TheDevConnor
    - URL: <a target="_blank" href="https://www.youtube.com/channel/UCpEYiOD5VxkK3iK7JmtbrPQ">Link to Channel</a>`;
  }
  return `Unknown command: ${command}`;
}

function appendResponse(response) {
  const output = document.querySelector('.output');
  const responseText = document.createElement('pre');
  responseText.innerHTML = response;
  output.appendChild(responseText);
}
