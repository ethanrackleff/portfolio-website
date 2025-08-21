            //To-do: implement gui, experience
            const COMMANDS = ["help", "about", "experience", "projects", "skills", "clear", "theme"];
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
                print(["I am a current Math major with minors in Computer Science and Economics at Colgate University expected to graduate in December 2025.", 
                    "<strong>Experience:</strong>", 
                    "<ul><li>Teaching Assistant at <i>Colgate University</i></li><li>Research Assistant at <i>Colgate University</i></li><li>Software Engineering Intern at <i>Ohana</i></li><li>Audio Engineer Intern at <i>Moonlight Mile Recording</i></li></ul>",
                    "<strong>Projects:</strong>",
               "<ul><li>Classifying Mathematical Information with LLM's</li><li>E-Ink Monitor Compatible Linux Interface</li></ul>"]);
            }
            function experience() {
                //header
                let output = "<strong>Experience:</strong>";
                //Start of experience list
                output += "<ul>";
                //experience 1
                output += "<li>Teaching Assistant at Colgate University";
                //bullets about experience 1 
                output += "<ul><li> stuff I did </li><li> more stuff I did </li></ul>";
                //experience 2
                output += "</li><li>Research Assistant at Colgate University";
                //bullets about experience 2
                output += "<ul><li>stuff I did</li><li>more stuff I did</li></ul>";
                //experience 3
                output += "</li><li>Software Engineering Intern at Ohana";
                //bullets about experience 3
                output += "<ul><li>stuff I did</li><li>more stuff I did</li></ul>";
                //experience 4
                output += "</li><li>Audio Engineering Intern at Moonlight Mile Recording";
                //bullets about experience 4
                output += "<ul><li>stuff I did</li><li>more stuff I did</li></ul>";
                //end of experience list
                output += "</ul>";
                print([output]);
               }

            function projects() {
                //header
                let output = "<strong>Projects:</strong>";
                //Start of projects list
                output += "<ul>";
                //project 1
                output += "<li>Classifying Mathematical Information with LLM's";
                //bullets about project 1
                output += "<ul><li> stuff I did </li><li> more stuff I did </li></ul>";
                //project 2
                output += "</li><li>E-Ink Monitor Compatible Linux Interface";
                //bullets about project 2
                output += "<ul><li>stuff I did</li><li>more stuff I did</li></ul>";
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
                    output += "<ul><li> Python </li><li> JavaScript </li><li>HTML/CSS</li> <li>C/C++</li></ul>";
                //Tools
                output += "</li><li>Tools";
                //List of tools
                    output += "<ul><li>Git</li><li>Linux</li><li>Vim</li><li>Bash</li><li>Jupyter Notebook</li></ul>";
                //end of skills list
                output += "</ul>"
                print([output]);
               }



            function clear() {
                for (let i = 1; i <= id; i++) {
                    let elem = document.getElementById(`${i}`);
                    elem.remove();
                }
                id = 0;
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
                else {
                    print(errorMsg);
                }
                
                newInput(cmd);
            }

            
            boot(bootMessage);
