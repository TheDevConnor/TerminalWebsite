const terminal = document.querySelector(".terminal");
const promptTemplate = document.getElementById("prompt");
let commandStack = JSON.parse(sessionStorage.getItem('commandHistory') || '[]');
let showTimestamps = false;

// Linux boot sequence messages
const bootMessages = [
  { text: "TheDevConnor Terminal v2.4.1 loading...", delay: 100, class: "boot-info" },
  { text: "", delay: 200, class: "" },
  { text: "[    0.000000] Linux version 6.8.0-thedevconnor (gcc version 13.2.0)", delay: 150, class: "boot-info" },
  { text: "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz root=UUID=thedevconnor", delay: 100, class: "boot-info" },
  { text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'", delay: 80, class: "boot-info" },
  { text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'", delay: 60, class: "boot-info" },
  { text: "[    0.001234] BIOS-provided physical RAM map:", delay: 70, class: "boot-info" },
  { text: "[    0.001234] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable", delay: 50, class: "boot-info" },
  { text: "[    0.001234] BIOS-e820: [mem 0x00000000000f0000-0x00000000000fffff] reserved", delay: 40, class: "boot-info" },
  { text: "[    0.002341] NX (Execute Disable) protection: active", delay: 90, class: "boot-info" },
  { text: "[    0.003456] SMBIOS 3.0.0 present.", delay: 60, class: "boot-info" },
  { text: "[    0.004567] DMI: TheDevConnor Terminal/Portfolio, BIOS v2.4.1 09/13/2025", delay: 80, class: "boot-info" },
  { text: "[    0.005678] Hypervisor detected: WebKit", delay: 70, class: "boot-info" },
  { text: "[    0.010000] tsc: Fast TSC calibration using PIT", delay: 90, class: "boot-info" },
  { text: "[    0.015432] tsc: Detected 2394.560 MHz processor", delay: 100, class: "boot-info" },
  { text: "[    0.020000] e820: update [mem 0x00000000-0x00000fff] usable ==> reserved", delay: 60, class: "boot-info" },
  { text: "[    0.025000] e820: remove [mem 0x000a0000-0x000fffff] usable", delay: 50, class: "boot-info" },
  { text: "[    0.030000] last_pfn = 0x20000 max_arch_pfn = 0x400000000", delay: 70, class: "boot-info" },
  { text: "[    0.035000] x86/PAT: Configuration [0-7]: WB  WC  UC- UC  WB  WP  UC- WT", delay: 80, class: "boot-info" },
  { text: "[    0.040000] found SMP MP-table at [mem 0x000f5680-0x000f568f]", delay: 60, class: "boot-info" },
  { text: "[    0.050000] RAMDISK: [mem 0x7e000000-0x7fffffff]", delay: 90, class: "boot-info" },
  { text: "[    0.060000] ACPI: Early table checksum verification disabled", delay: 70, class: "boot-info" },
  { text: "[    0.070000] ACPI: RSDP 0x00000000000F0490 000014 (v00 BOCHS )", delay: 50, class: "boot-info" },
  { text: "[    0.080000] Zone ranges:", delay: 100, class: "boot-info" },
  { text: "[    0.080000]   DMA32    [mem 0x0000000000001000-0x000000001fffffff]", delay: 40, class: "boot-info" },
  { text: "[    0.080000]   Normal   empty", delay: 60, class: "boot-info" },
  { text: "[    0.090000] SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=2, Nodes=1", delay: 80, class: "boot-info" },
  { text: "[    0.100000] ftrace: allocating 45123 entries in 177 pages", delay: 120, class: "boot-info" },
  { text: "[    0.150000] Dentry cache hash table entries: 65536 (order: 7, 524288 bytes)", delay: 90, class: "boot-info" },
  { text: "[    0.200000] Inode-cache hash table entries: 32768 (order: 6, 262144 bytes)", delay: 70, class: "boot-info" },
  { text: "[    0.250000] Mount-cache hash table entries: 1024 (order: 1, 8192 bytes)", delay: 60, class: "boot-info" },
  { text: "[    0.300000] CPU: Physical Processor ID: 0", delay: 80, class: "boot-info" },
  { text: "[    0.350000] CPU: Processor Core ID: 0", delay: 50, class: "boot-info" },
  { text: "[    0.400000] mce: CPU supports 10 MCE banks", delay: 90, class: "boot-info" },
  { text: "[    0.450000] Last level iTLB entries: 4KB 0, 2MB 0, 4MB 0", delay: 60, class: "boot-info" },
  { text: "[    0.500000] Last level dTLB entries: 4KB 0, 2MB 0, 4MB 0, 1GB 0", delay: 70, class: "boot-info" },
  { text: "[    0.600000] Freeing SMP alternatives memory: 32K", delay: 100, class: "boot-info" },
  { text: "[    0.700000] smpboot: Allowing 2 CPUs, 0 hotplug CPUs", delay: 90, class: "boot-info" },
  { text: "[    0.800000] PM: Registered nosave memory: [mem 0x0009f000-0x0009ffff]", delay: 70, class: "boot-info" },
  { text: "[    0.900000] PM: Registered nosave memory: [mem 0x000a0000-0x000effff]", delay: 50, class: "boot-info" },
  { text: "[    1.000000] e820: [mem 0x20000000-0xfebfffff] available for PCI devices", delay: 80, class: "boot-info" },
  { text: "[    1.100000] Booting paravirtualized kernel on bare hardware", delay: 90, class: "boot-info" },
  { text: "[    1.200000] clocksource: refined-jiffies: mask: 0xffffffff max_cycles: 0xffffffff", delay: 60, class: "boot-info" },
  { text: "[    1.300000] setup_percpu: NR_CPUS:8192 nr_cpumask_bits:2 nr_cpu_ids:2", delay: 70, class: "boot-info" },
  { text: "[    1.400000] percpu: Embedded 54 pages/cpu s184320 r8192 d28672 u1048576", delay: 100, class: "boot-info" },
  { text: "[    1.500000] Built 1 zonelists, mobility grouping on.  Total pages: 128905", delay: 80, class: "boot-info" },
  { text: "[    1.600000] Policy zone: DMA32", delay: 60, class: "boot-info" },
  { text: "[    1.700000] Kernel command line: BOOT_IMAGE=/boot/vmlinuz root=UUID=thedevconnor", delay: 50, class: "boot-info" },
  { text: "[    1.800000] PID hash table entries: 2048 (order: 2, 16384 bytes)", delay: 90, class: "boot-info" },
  { text: "[    1.900000] Memory: 498772K/524256K available", delay: 100, class: "boot-info" },
  { text: "[    2.000000] SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=2, Nodes=1", delay: 70, class: "boot-info" },
  { text: "[    2.100000] NR_IRQS: 524544, nr_irqs: 440, preallocated irqs: 16", delay: 80, class: "boot-info" },
  { text: "[    2.200000] Console: colour VGA+ 80x25", delay: 90, class: "boot-info" },
  { text: "[    2.300000] console [tty0] enabled", delay: 100, class: "boot-ok" },
  { text: "[    2.400000] clocksource: hpet: mask: 0xffffffff max_cycles: 0xffffffff", delay: 60, class: "boot-info" },
  { text: "[    2.500000] clocksource: tsc-early: mask: 0xffffffffffffffff max_cycles: 0x228825224ec", delay: 70, class: "boot-info" },
  { text: "[    2.600000] Calibrating delay loop (skipped), value calculated using timer frequency.. 4789.12", delay: 150, class: "boot-info" },
  { text: "", delay: 200, class: "" },
  { text: "Starting TheDevConnor Portfolio Services...", delay: 300, class: "boot-info" },
  { text: "", delay: 100, class: "" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Load Kernel Modules", delay: 200, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Create System Users", delay: 150, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Remount Root and Kernel File Systems", delay: 120, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Create Static Device Nodes in /dev", delay: 100, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Rule-based Manager for Device Events and Files", delay: 130, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Journal Service", delay: 110, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Flush Journal to Persistent Storage", delay: 140, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Load/Save Random Seed", delay: 90, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Create System Files and Directories", delay: 120, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Update UTMP about System Boot/Shutdown", delay: 100, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Network Time Synchronization", delay: 150, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Update is Completed", delay: 110, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started TheDevConnor Portfolio System", delay: 180, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Terminal Interface Service", delay: 160, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Started Command Processing Service", delay: 130, class: "boot-ok" },
  { text: "<span class='boot-bracket'>[</span>  <span class='boot-status'>OK</span>  <span class='boot-bracket'>]</span> Reached target Multi-User System", delay: 200, class: "boot-ok" },
  { text: "", delay: 300, class: "" },
  { text: "TheDevConnor Terminal System v2.4.1", delay: 400, class: "boot-info" },
  { text: "", delay: 200, class: "" },
];

let currentBootIndex = 0;

function displayBootMessage() {
  if (currentBootIndex >= bootMessages.length) {
    // Boot sequence complete, show the ASCII art and welcome
    setTimeout(() => {
      document.getElementById('bootSequence').style.display = 'none';
      const welcome = document.querySelector('.welcome');
      welcome.style.display = 'block';
      welcome.style.animation = 'fadeIn 1s ease-in';

      setTimeout(() => {
        appendInput();
      }, 800);
    }, 1000);
    return;
  }

  const message = bootMessages[currentBootIndex];
  const bootLine = document.createElement('div');
  bootLine.className = `boot-line ${message.class}`;
  bootLine.innerHTML = message.text;

  document.getElementById('bootSequence').appendChild(bootLine);

  // Auto-scroll to bottom
  terminal.scrollTop = terminal.scrollHeight;

  currentBootIndex++;
  setTimeout(displayBootMessage, message.delay);
}

// Start boot sequence on page load
window.addEventListener('load', () => {
  setTimeout(displayBootMessage, 500);
});

const appendResponse = (response, animated = false) => {
  const output = document.createElement("div");
  const responseText = document.createElement("pre");

  if (animated) {
    responseText.className = "typing";
    let i = 0;
    const typeWriter = () => {
      if (i < response.length) {
        responseText.innerHTML = response.charAt(i);
        i++;
        setTimeout(typeWriter, 20);
      } else {
        responseText.className = "";
        responseText.innerHTML = response;
      }
    };
    typeWriter();
  } else {
    responseText.innerHTML = response;
  }

  output.appendChild(responseText);
  output.classList.add("output");
  terminal.appendChild(output);
  terminal.scrollTop = terminal.scrollHeight;
};

const getCurrentTimestamp = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const appendInput = () => {
  const prompt = promptTemplate.content.cloneNode(true);
  const input = prompt.querySelector("input.terminal-input");
  const timestampSpan = prompt.querySelector(".timestamp");

  if (showTimestamps) {
    timestampSpan.textContent = getCurrentTimestamp();
  }

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
        const value = input.value.trim();
        const output = document.createElement("div");
        output.classList.add("output");

        if (value) {
          commandStack.push(value);
          sessionStorage.setItem('commandHistory', JSON.stringify(commandStack.slice(-50))); // Keep last 50 commands
        }

        executeCommand(value);
        terminal.appendChild(output);
        input.disabled = true;
        appendInput();
      },
      Tab: () => {
        e.preventDefault();
        const value = input.value;
        const args = value.split(" ");
        if (args.length === 1) {
          const commands = [
            "help", "github", "project", "clear", "about", "contact",
            "youtube", "fetch", "ls", "whoami", "skills", "time", "history"
          ];
          const command = args[0];
          const matchingCommands = commands.filter((c) => c.startsWith(command));
          if (matchingCommands.length === 1) {
            input.value = matchingCommands[0];
          }
        }
      },
      ArrowUp: () => commandHistoryMovement(false),
      ArrowDown: () => commandHistoryMovement(true),
      'KeyL': () => {
        if (e.ctrlKey) {
          e.preventDefault();
          executeCommand('clear');
        }
      }
    };

    if (specialKeys[e.key]) {
      e.preventDefault();
      specialKeys[e.key]();
    }
  });

  // Auto-complete functionality
  input.addEventListener("input", (e) => {
    const value = input.value;
    const args = value.split(" ");

    const autocomplete = input.parentElement.querySelector(".autocomplete");

    const updateAutocomplete = (suggestions, currentArg) => {
      const matchingSuggestions = suggestions.filter(s => s.startsWith(currentArg));
      if (matchingSuggestions.length === 1) {
        autocomplete.textContent = matchingSuggestions[0].slice(currentArg.length);
      } else {
        autocomplete.textContent = "";
      }

      // Position autocomplete based on text width
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.font = getComputedStyle(input).font;
      const textWidth = ctx.measureText(value).width;

      autocomplete.style.left = `${10 + textWidth}px`; // 5 matches input padding
    };

    if (args.length === 1) {
      const commands = [
        "help", "github", "project", "clear", "about", "contact",
        "youtube", "fetch", "ls", "whoami", "skills", "time", "history"
      ];
      updateAutocomplete(commands, args[0]);
    } else if (args.length === 2 && args[0] === "project") {
      const projects = ["zura", "chess", "wordle", "terminal", "all"];
      updateAutocomplete(projects, args[1]);
    } else {
      autocomplete.textContent = "";
    }
  });

};

document.body.addEventListener("click", () => {
  const input = document.querySelector("input.terminal-input:not([disabled])");
  if (input) input.focus();
});

function checkProject(projectName) {
  if (projectName === "all") {
    return (
      checkProject("zura") +
      checkProject("chess") +
      checkProject("wordle") +
      checkProject("terminal")
    );
  } else if (projectName === "zura") {
    return `Project Information:
    - Project Name: Zura
    - Author: TheDevConnor
    - Description: A custom low level programming language written in c++ 
                   and compiled to x86 assembly
    - URL: <a target="_blank" href="https://github.com/TheDevConnor/Zura-Transpiled">Link to Repo</a>`;
  } else if (projectName === "chess") {
    return `Project Information:
    - Project Name: Chess
    - Author: TheDevConnor
    - Description: A chess engine written in python
    - URL: <a target="_blank" href="https://github.com/TheDevConnor/Basic-Python-Chess-Engine">Link to Repo</a>`;
  } else if (projectName === "wordle") {
    return `Project Information:
    - Project Name: Wordle
    - Author: TheDevConnor
    - Description: A wordle clone written in html, css, and javascript
    - URL: <a target="_blank" href="https://github.com/TheDevConnor/Wordle-Clone">Link to Repo</a>
    - YouTube Video: <a target="_blank" href="https://www.youtube.com/watch?v=savPJTlsv2k">Link to Video</a>`;
  } else if (projectName === "terminal") {
    return `Project Information:
    - Project Name: Terminal Website
    - Author: TheDevConnor
    - Description: A terminal style portfolio website
    - URL: <a target="_blank" href="https://github.com/TheDevConnor/TerminalWebsite">Link to Repo</a>
    - YouTube Video: Coming Soon`;
  } else {
    return "Please provide a project name from the list: zura, chess, wordle, terminal, or all";
  }
}

function executeCommand(command) {
  if (!command) return;

  const commands = {
    "help": () => "Available commands: help, contact, project, about, youtube, fetch, clear, ls, whoami, skills, time, history",
    "ls": () => "help  contact  project  about  youtube  fetch  clear  whoami  skills  time  history",
    "whoami": () => "guest@TheDevConnor.com - You are viewing Connor Harris's portfolio terminal",
    "time": () => `Current time: ${new Date().toLocaleString()}`,
    "history": () => {
      if (commandStack.length === 0) return "No command history available";
      return commandStack.map((cmd, i) => `${i + 1}: ${cmd}`).join('\n');
    },

    "skills": () => `Technical Skills:
Programming Languages:
    - C++ (Intermediate)
    - C (Intermediate)  
    - Python (Advanced)
    - JavaScript (Advanced)
    - HTML/CSS (Advanced)
    - Assembly (Intermediate)

Technologies & Tools:
    - Git/GitHub
    - Linux/Unix
    - Compiler Design
    - Web Development
    - Algorithm Design`,

    "github": () => `GitHub Information:
    - GitHub Username: TheDevConnor
    - URL: <a target="_blank" href="https://github.com/TheDevConnor">Link to Github</a>`,

    "clear": () => {
      terminal.innerHTML = "";
      return "";
    },

    "about": () => {
      const birthDate = new Date('2004-11-24');
      const programmingStartDate = new Date('2019-11-24'); // Assuming you started programming around age 15
      const today = new Date();

      const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
      const yearsOfExperience = Math.floor((today - programmingStartDate) / (365.25 * 24 * 60 * 60 * 1000));

      return `Hi, my name is Connor Harris, and I'm a ${age}-year-old self-taught programmer with about ${yearsOfExperience} years of experience. I'm currently pursuing a Bachelor's degree 
in Computer Science at Florida Polytechnic University, with a focus on either software engineering or artificial intelligence. I'm passionate about creating developer tools and 
low-level systems — currently working on two programming languages, Zura and Lux, designed to make coding cleaner, simpler, and more powerful. Most of what I've learned has come 
from exploring, building, and learning from others online. I'm always striving to grow, and I hope to turn this passion into a lifelong career.`;
    },

    "contact": () => `Contact Information:
    - Discord: thedevconnor
    - Github: <a target="_blank" href="https://github.com/TheDevConnor">Link to Github</a>
    - Email: <a href="mailto:connorharris427@gmail.com">connorharris427@gmail.com</a>`,

    "youtube": () => `YouTube Information:
    - YouTube Channel: TheDevConnor
    - URL: <a target="_blank" href="https://www.youtube.com/channel/UCpEYiOD5VxkK3iK7JmtbrPQ">Link to Channel</a>`,

    "fetch": () => `👋 Hi, I'm TheDevConnor

💻 Building languages (Zura, Lux) • 🎓 CS student • ⚙️ Systems programming enthusiast
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 Languages I Use:
    • C         - Systems programming, low-level development
    • C++       - Language design, compilers, performance-critical apps  
    • Python    - Automation, scripting, rapid prototyping
    • HTML5     - Web structure and markup
    • CSS3      - Styling and responsive design
    • Zig       - Modern systems programming
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔗 Featured Projects:
    • Zura Language        - <a target="_blank" href="https://zuralang.com">Visit Website</a>
      Custom programming language compiled to x86 assembly
      
    • Terminal Website     - <a target="_blank" href="https://thedevconnor.github.io/TerminalWebsite/">Visit Website</a>
      Interactive terminal-style portfolio (you're using it now!)

    • Lux or Luma Language - <a target="_blank" href="https://github.com/TheDevConnor/Luma">Visit Website</a>
      Custom programming language compiled with llvm
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 GitHub Activity:
    • Profile: <a target="_blank" href="https://github.com/TheDevConnor">github.com/TheDevConnor</a>
    • Focus: Language design, systems programming, developer tools
    • Currently working on: Zura and Lux programming languages

💡 Fun Fact: Most of my learning comes from building things and exploring 
   new technologies. I believe in learning by doing!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type 'contact' for ways to reach me, or 'project all' to see more projects!`
  };

  if (command.startsWith("project")) {
    const projectArgs = command.split(" ");
    if (projectArgs.length === 2) {
      const projectName = projectArgs[1];
      const response = checkProject(projectName);
      appendResponse(response);
      return;
    } else {
      appendResponse("Please provide a project name from the list: zura, chess, wordle, terminal, or all");
      return;
    }
  }

  if (commands[command]) {
    const result = commands[command]();
    if (result) appendResponse(result);
  } else {
    appendResponse(`Command not found: ${command}. Type 'help' for available commands.`);
  }
}