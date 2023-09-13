const terminal=document.querySelector('.terminal');const input=document.getElementById('terminal-input');input.focus();terminal.addEventListener('click',function(){input.focus()});input.addEventListener('keydown',function(event){if(event.key==='Enter'){const command=input.value.trim();const response=executeCommand(command);appendResponse(response);input.value=''}});function checkProject(projectName){switch(projectName){case 'zura':{return `<img src="images/zura.png" alt="Zura Logo" width="100" height="100">
    Zura is a custom programming language that I created. 
    It is a dynamically typed language and is a high level language. Which I plane to turn
    into a low level language. It is currently in development and is 
    not ready for use. You can find the repository <a target="_blank" href="https://github.com/TheDevConnor/Zura-v2">here</a>.`}
case 'chess':{return `Chess is a chess engine that I made using python. It is not that great of a 
    chess engine, but it is a chess engine. You can find the repository <a target="_blank" href="https://github.com/TheDevConnor/Basic-Python-Chess-Engine">here</a>.`}
case 'wordle':{return `Wordle is a word game that I made using html, css, and javascript. It is a game where 
you have to guess a word in 6 tries. You can find the repository <a target="_blank" href="https://github.com/TheDevConnor/Wordle-Clone">here</a>, and the video <a target="_blank" href="https://www.youtube.com/watch?v=savPJTlsv2k&t=160s">here</a>.`}}}
function executeCommand(command){if(command==='help'){return'Available commands: help, repo, contact, project, clear'}else if(command==='repo'){return `
    Repository Information:
    - Repository Name: Terminal Website
    - Author: TheDevConnor
    - Description: A terminal style portfolio website
    - URL: <a target="_blank" href="https://github.com/TheDevConnor/TerminalWebsite">Link to Repo</a>`}else if(command.startsWith('project')){const projectArgs=command.split(' ');if(projectArgs.length===2){const projectName=projectArgs[1];return `Project Information for ${projectName}: 
            ${checkProject(projectName)}`}else{return"Please provide a project name from the list: zura, chess, wordle"}}else if(command==='clear'){document.querySelector('.output').innerHTML='';return''}else if(command==='about'){return `
I am a 18 year old programmer in his first year of collage. I have been programming 
for 4 years now. I have made many projects in many different languages. I have 
made a chess engine in python, a wordle clone in html, css, and javascript, and a 
custom programming language in c++. I am currently working on a custom programming 
language in c++ called Zura. I also have a youtube channel where I post 
videos about programming. You can find my channel <a target="_blank" href="https://www.youtube.com/channel/UCpEYiOD5VxkK3iK7JmtbrPQ">here</a>.`}
else if(command==='contact'){return `
    Contact Information:
    - Discord: thedevconnor
    - Github: <span><a target="_blank" href="https://github.com/TheDevConnor">Link to Github</a></span>
    - Email: <a href="mailto:connorharris427@gmail.com"><span class="email">connorharris427@gmail.com</span>`}
return `Unknown command: ${command}`}
function appendResponse(response){const output=document.querySelector('.output');const responseText=document.createElement('pre');responseText.innerHTML=response;output.appendChild(responseText)}