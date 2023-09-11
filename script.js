const terminal = document.querySelector('.terminal');
const input = document.getElementById('terminal-input');

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const command = input.value.trim(); // Remove leading/trailing whitespace
        const response = executeCommand(command);
        appendResponse(response);
        input.value = '';
    }
});

function executeCommand(command) {
    if (command === 'help') {
        return 'Available commands: help, repo, project';
    } else if (command === 'repo') {
        return `Repository Information:
    - Repository Name: Terminal Website
    - Author: TheDevConnor
    - Description: A terminal style portfolio website
    - URL: [Link to Repo](https://github.com/TheDevConnor/TerminalWebsite)`;
    } else if (command.startsWith('project')) {
        const projectArgs = command.split(' ');
        if (projectArgs.length === 2) {
            const projectName = projectArgs[1];
            return `Project Information for ${projectName}: (Insert details here)`;
        } else {
            return 'Usage: project <project name>';
        }
    }
    return `Unknown command: ${command}`;
}

function appendResponse(response) {
    const output = document.querySelector('.output');
    const responseText = document.createElement('pre');
    responseText.textContent = response;
    output.appendChild(responseText);

    // Clear the terminal output after 5 seconds
    setTimeout(() => {
        responseText.remove();
    }, 5000);
}
