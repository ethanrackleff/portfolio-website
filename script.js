            //To-do: implement gui, experience
            const COMMANDS = ["help", "about", "experience", "projects", "skills", "clear", "theme", "activites", "interests"];
            const themes = new Map();
            themes.set("matrix", ["#000", "#b7ffb7", "#7ccc7c","22ff88", "#00ff99", "#b7ffb7"]);
            themes.set("eink", ["#fff", "#000", "#ccc", "#000", "#000", "#000"]);
            themes.set("softWhite", ["#f9f6f1", "#211e1c", "211e1c", "#f9f6f1", "#f9f6f1", "#f9f6f1"]);
            const term = document.getElementById("term");

            const bootMessage = ["Welcome to my portfolio", 
                "My name is Ethan Rackleff", 
                "type help"]

            let id = 0

            //Prints to terminal. 
            //Takes a string of arrays
            //if end=true, string is printed at the bottom of the terminal
            //if end=false, string is printed at the top
            function print(arr, end=true) {
                for (const l of arr) {
                    id++; 
                    const cmdPrompt = document.createElement("div");
                    cmdPrompt.className = "cmdPrompt";
                    cmdPrompt.innerHTML = "$";
                    const text = document.createElement("div");
                    text.className = "text";
                    text.innerHTML = l;
                    const line = document.createElement("div");
                    line.className = "line";
                    line.appendChild(cmdPrompt);
                    line.appendChild(text); 
                    line.id = `${id}`;
                    if (end) {
                        term.appendChild(line);
                    }
                    else {
                        term.insertBefore(line, firstCmd);
                    }
                }
            }
            //Prints Introduction Message
            function boot(arr) { 
               print(arr);
               newInput(); 
            }
            
            function newInput(prev) {
                if (prev) {
                    prev.blur();
                    prev.disabled = true;
                    prev.removeEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        runCommand(input.value);
                        }
                    }); 
                }
                id++; 
                const cmdPrompt = document.createElement("div");
                cmdPrompt.className = "cmdPrompt";
                cmdPrompt.textContent = "$";
                const cmd = document.createElement("input");
                cmd.className = "cmd";
                const line = document.createElement("div");
                line.className = "line";
                line.appendChild(cmdPrompt);
                line.appendChild(cmd); 
                line.id = `${id}`;
                term.appendChild(line);
                cmd.focus();
                cmd.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        runCommand(cmd);
                    }
                });

            }

            function setTheme(cmd) {
                //After theme, a space must follow
                //e.g. theme set matrix
                if (!(cmd[0] === " ")) {
                    print(["theme: no operation specified (type theme help for help)"]);
                    return;
                }
                //Remove space from front
                cmd = cmd.slice(1);
                //
                if (cmd.startsWith("set")) {
                    if (cmd.length <= 3) {
                        print([`theme set: no given theme (type theme list to see available themes)`]);
                    }
                    else {
                        let theme = cmd.slice(4);
                        if (themes.has(theme)) {
                        document.documentElement.style.setProperty("--bg", themes.get(theme)[0]);
                        document.documentElement.style.setProperty("--text", themes.get(theme)[1]);
                        document.documentElement.style.setProperty("--accent", themes.get(theme)[2]);
                        document.documentElement.style.setProperty("--prompt", themes.get(theme)[3]);
                        document.documentElement.style.setProperty("--cursor", themes.get(theme)[4]);
                        document.documentElement.style.setProperty("--shadow", themes.get(theme)[5]);
                        }
                        else {
                            print([`theme set: ${theme} not a valid theme (type theme list to see available themese`]);                  
                        }
                    }
                }
                else if (cmd === "list") {
                    let list = "These are the available themes:";
                    list = list + `<ul>`;
                    for (const [key] of themes) {
                        list = list + `<li>${key}</li>`;
                    }
                    list = list + `</ul>`;
                    print([list]);
                }
                else if (cmd === "help") {
                    print(["usage: theme <operation> [...] <br> operations: <ul><li>theme help</li> <li>theme set [options]</li> <li>theme list</li> </ul>"]); 
                }
                else {
                    print([`theme: ${cmd} not valid (type theme help for help)`]);
                }
            }

            function help() {
                let output = `My portfolio is meant to emulate a terminal, a way in which many people interact with their computer. Instead of clicking icons to make stuff happen, you type text to make stuff happen. Here are some of the commands you can try typing:`;
                output = output + `<ul>`;
                    for (const c of COMMANDS){
                        output = output + `<li>${c}</li>`
                    }
                output = output + `</ul>`;
                print([output]);
            }

            function about() {
                print(["I am a current Computer Science major with minors in Mathematics and Economics at Colgate University expected to graduate in December 2025.", 
                    "<strong>Experience:</strong>", 
                    "<ul><li>Research and Teaching Assistant at <i>Colgate University</i></li><li>Research Assistant at <i>Colgate University</i></li><li>Software Engineering Intern at <i>Ohana</i></li><li>Audio Engineer Intern at <i>Moonlight Mile Recording</i></li><li>Digital Music Production Instructor at <i>Blair Academy</i></li></ul>",
                    "<strong>Personal Projects:</strong>",
               "<ul><li>Classifying Mathematical Information with LLM's</li><li>E-Ink Monitor Compatible Linux Interface</li><li>Sway Screen Time Application</li><li>Breadboard guitar distortion effect</li></ul>"]);
            }
            function experience() {
                //header
                let output = "<strong>Experience:</strong>";
                //Start of experience list
                output += "<ul>";
                //experience 1
                output += "<li><strong>Research and Teaching Assistant</strong> at <i>Colgate University, Office of Undergraduate Scholars</i>";
                //bullets about experience 1 
                output += "<ul><li>Led study sessions for 12 freshmen in the Undergraduate Scholars Program for The History of Mathematics</li><li>Improved the accessibility of complex concepts for students with various technical backgrounds</li><li>Researched and assisted in writing the rough draft for the course textbook using LaTeX</li></ul>";
                //experience 2
                output += "</li><li><strong>Research Assistant</strong> at <i>Colgate University</i>";
                //bullets about experience 2
                output += "<ul><li>Collaborated with a research team to solve complex problems in Computational Algebraic Geometry</li><li>Programmed pattern identifying algorithms for bipartite graphs using Python and Macaulay2</li><li>Presented findings at NASC Fall poster session and Colgate's summer research poster symposium</li></ul>";
                //experience 3
                output += "</li><li><strong>Software Engineering Intern</strong> at <i>Ohana</i>";
                //bullets about experience 3
                output += "<ul><li>Led front end development and worked alongside the co-founders for Ohana, an online marketplace</li><li>Developed full-feature web pages, being used by over 15,000 monthly users, with JavaScript, HTML, and CSS</li>Implemented identity verification to mitigate the risk of scams and fraudulent listings via Stripe’s API<li>Contributed to fundraising strategy that secured $625k in pre-seed funding from Neo}}</li></ul>";
                //experience 4
                output += "</li><li><strong>Audio Engineer Intern</strong> at <i>Moonlight Mile Recording</i>";
                //bullets about experience 4
                output += "<ul><li>Worked alongside 8 diverse teams to mix and master new music whilst streamlining the recording process</li><li>Managed and programmed software and hardware synthesizers incorporated into released recordings</li></ul>";
                //experience 5
                output += "</li><li><strong>Digital Music Production Instructor</strong> at <i>Blair Academy</i>";
                //bullets about experience 5
                output += "<ul><li>Taught 22 students music theory and how to use Logic Pro X to make professional-quality electronic music</li><li>Designed a curriculum that ran 8 hours a week, inspiring 3 students to pursue digital music in university</li></ul>";
                //end of experience list
                output += "</ul>";
                print([output]);
               }


            function involvementAndActivities() {
                let output = "<strong>Involvement and Activities</strong>";
                output += "<ul>";
                output += "<li><strong>Unlauncher</strong> - <i>Open Source Contributor</i>";
                output += "<ul><li>Contributing accessibility features to open-source Android launcher based on user  feedback</li><li>Implementing dynamic font-size adjustment in Kotlin to improve accessibility for users with visual impairments</li><li>Active daily user and contributor focused on enhancing the user experience</li></ul></li>";
                /*output += "<li><strong>Hamilton Central School Coding Club</strong> - <i>Volunteer Instructor</i>";
                output += "<ul><li>Teach coding fundamentals to third and fourth grade students using Scratch and Edison robots</li><li>Develop age-appropriate curriculum introducing computational thinking and robotics</li></ul></li>";*/
                output += "</ul>";
                print([output]);
            }

            function projects() {
                //header
                let output = "<strong>Personal Projects:</strong>";
                //Start of projects list
                output += "<ul>";
                //project 1
                output += "<li><strong>Screen Time Application for Sway Window Manager</strong>";
                //bullets about project 1
                output += "<ul><li>Engineered a Terminal User Interface application using ncurses for the Wayland window manager, Sway, that tracks and manages application usage to minimize digital distraction</li><li>Tracks app usage with SQLite and visualizes weekly/daily data with configurable time limits and blocking features</li><li>Utilized multithreading to asynchronously monitor app focus changes via swaymsg IPC while maintaining responsive UI and automatically closing blocked applications when limits exceeded</li></ul>";
                //project 2
                output += "<li><strong>E-ink Accessibility Configuration for Arch Linux</strong>";
                //bullets about project 2
                output += "<ul><li> Developed comprehensive configuration optimizing laptop experience on black-and-white E-ink displays for minimal eye-strain and focus</li><li>Automated color scheme switching with bash commands and shell scripting to transform IDE and desktop</li></ul>";
                //project 3
                output += "<li><strong>Classifying Mathematical Information with LLMs</strong>";
                //bullets about project 3
                output += "<ul><li>Analyzed the classification accuracy of LLMs on mathematical content using Python and Jupyter Notebook</li><li>Findings presented at a Colgate University NLP conference in a research poster and paper</li></ul>";
                //project 4
                output += "</li><li><strong>Guitar Distortion/Saturation Circuit</strong>";
                //bullets about project 4
                output += "<ul><li>Designed and built custom guitar effect on a  breadboard using op-amps and high/low pass filters</li><li>Applied understanding of DC/AC current and signal processing principles to create functional distortion effect</li></ul>";
                //end of projects list
                output += "</ul>"
                print([output]);
               }

                function skills() {
                //header
                let output = "<strong>Skills:</strong>";
                //Start of skills list
                output += "<ul>";
                //Languages
                output += "<li>Languages";
                //List of languages
                    output += "<ul><li> Python (Intermediate) </li><li> JavaScript (Intermediate) </li><li>HTML/CSS (Intermediate)</li> <li>C/C++ (Advanced) </li> <li>Java (Intermediate)</li> <li>Lua (Beginner) </li> <li>Kotlin (Beginner)</li></ul>";
                //Tools
                output += "</li><li>Tools";
                //List of tools
                    output += "<ul><li>Git</li><li>Linux</li><li>Vim</li><li>SQL</li><li>postgreSQL</li><li>SQLite</li><li>Figma</li><li>Jupyter Notebook</li><li>Agile development</li></ul>";
                //end of skills list
                output += "</ul>"
                print([output]);
               }

                function interests() {
                    let output = "When I'm not coding, you can find me hiking, long-distance running, biking, or exploring philosophy and meditation.";
                    print([output]);
                }

            function clear() {
                for (let i = 1; i <= id; i++) {
                    let elem = document.getElementById(`${i}`);
                    elem.remove();
                }
                id = 0;
            }
            
            
            function gui() {
                const screen = document.getElementById("screen");
                screen.remove();
                const desktop = document.createElement("div");
                const folders = ["projects", "experience"];
                desktop.className = "desktop";
                desktop.id = "desktop";
                document.body.appendChild(desktop);
                for (const f of folders){
                    const folder = document.createElement("button");
                    folder.id = f;
                    folder.className = "folder";
                    const svg = document.createElement("svg");
                    const img = document.createElement("img");
                    img.href = "folder-alt-svgrepo-com.svg";
                    svg.appendChild(img);
                    const name = document.createElement("h3");
                    name.innerHTML = `${f}`; 
                    name.className = "folderTitle";
                    
                    desktop.appendChild(folder);
                    folder.appendChild(img);
                    folder.appendChild(name);


                }
            }

            function runCommand(cmd) {
                errorMsg = [`${cmd.value}: command not found`];
                //Allow white space at end and begin'ning of command
                let cmdText = cmd.value.trim();

                if (cmdText == "help") {
                    help();    
                }
                else if (cmdText.startsWith("theme")) {
                    //Call setTheme with the argument being the text after "theme"
                    setTheme(cmdText.slice(5))
                }
                else if (cmdText == "about") {
                   about(); 
                }
                else if (cmdText == "clear") {
                   clear(); 
                }
                else if (cmdText == "projects") {
                    projects();
                }
                else if (cmdText == "experience"){
                    experience();
                }
                else if (cmdText == "skills") {
                    skills();
                }
                else if (cmdText == "activities") {
                    involvementAndActivities();
                }
                else if (cmdText == "interests") {
                    interests();
                }
                /*else if (cmdText == "gui") {
                    gui();
                }*/
                else {
                    print(errorMsg);
                }
                
                newInput(cmd);
            }

            
            boot(bootMessage);
