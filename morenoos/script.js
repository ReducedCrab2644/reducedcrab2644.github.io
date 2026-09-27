/* =========================================
   MORENO OS
========================================= */


const applications = {

    explorer: {
        title: "📁 Explorador de Arquivos",
        width: 720,
        height: 450
    },

    terminal: {
        title: "💻 Terminal",
        width: 650,
        height: 410
    },

    browser: {
        title: "🌐 Moreno Browser",
        width: 760,
        height: 500
    },

    calculator: {
        title: "🧮 Calculadora",
        width: 360,
        height: 430
    },

    notes: {
        title: "📝 Bloco de Notas",
        width: 550,
        height: 420
    },

    settings: {
        title: "⚙️ Configurações",
        width: 550,
        height: 400
    },

    monitor: {
        title: "📊 Monitor do Sistema",
        width: 500,
        height: 360
    },

    trash: {
        title: "🗑️ Lixeira",
        width: 450,
        height: 320
    },

    about: {
        title: "◆ Sobre o Moreno OS",
        width: 450,
        height: 300
    }

};


const openedWindows = {};

let zIndex = 20;

let windowCounter = 0;


/* =========================================
   ABRIR APLICATIVO
========================================= */

function openApp(id) {

    if (!applications[id])
        return;


    if (openedWindows[id]) {

        const win =
            openedWindows[id];

        win.classList.remove(
            "minimized"
        );

        focusWindow(win);

        return;

    }


    const app =
        applications[id];


    const win =
        document.createElement("div");


    win.className =
        "window";


    win.dataset.app =
        id;


    win.style.width =
        app.width + "px";


    win.style.height =
        app.height + "px";


    const offset =
        (windowCounter * 35) % 250;


    win.style.left =
        (120 + offset) + "px";


    win.style.top =
        (60 + offset / 2) + "px";


    win.innerHTML = `

        <div class="titlebar">

            <div class="title">
                ${app.title}
            </div>


            <div class="window-controls">

                <button
                    class="minimize"
                >
                    —
                </button>


                <button
                    class="maximize"
                >
                    □
                </button>


                <button
                    class="close"
                >
                    ×
                </button>

            </div>

        </div>


        <div class="window-content">

            ${getContent(id)}

        </div>

    `;


    document
        .getElementById("windows")
        .appendChild(win);


    openedWindows[id] =
        win;


    windowCounter++;


    setupWindow(win);

    focusWindow(win);

}


/* =========================================
   CONTEÚDO
========================================= */

function getContent(id) {


    if (id === "explorer") {

        return `

            <div class="explorer">

                <div class="sidebar">

                    <div class="sidebar-item">
                        🏠 Início
                    </div>

                    <div class="sidebar-item">
                        📄 Documentos
                    </div>

                    <div class="sidebar-item">
                        ⬇️ Downloads
                    </div>

                    <div class="sidebar-item">
                        🖼️ Imagens
                    </div>

                    <div class="sidebar-item">
                        💾 Disco Local (C:)
                    </div>

                    <div class="sidebar-item">
                        🗑️ Lixeira
                    </div>

                </div>


                <div class="files">

                    ${createFile(
                        "📦",
                        "Sistema.exe",
                        "exe"
                    )}

                    ${createFile(
                        "📦",
                        "Launcher.exe",
                        "exe"
                    )}

                    ${createFile(
                        "📦",
                        "Browser.exe",
                        "exe"
                    )}

                    ${createFile(
                        "📄",
                        "README.txt",
                        "txt"
                    )}

                    ${createFile(
                        "🌐",
                        "index.html",
                        "html"
                    )}

                    ${createFile(
                        "🟨",
                        "script.js",
                        "js"
                    )}

                    ${createFile(
                        "🎨",
                        "style.css",
                        "css"
                    )}

                    ${createFile(
                        "⚙️",
                        "config.json",
                        "json"
                    )}

                    ${createFile(
                        "📁",
                        "Projetos",
                        "folder"
                    )}

                    ${createFile(
                        "📁",
                        "Downloads",
                        "folder"
                    )}

                </div>

            </div>

        `;

    }


    if (id === "terminal") {

        return `

            <div class="terminal">

                <div id="terminalOutput">

                    <div class="terminal-line">
                        Moreno OS Terminal v1.0
                    </div>

                    <div class="terminal-line">
                        Kernel: MorenoCore
                    </div>

                    <div class="terminal-line">
                        Sistema iniciado.
                    </div>

                    <div class="terminal-line">
                        Digite "help".
                    </div>

                    <br>

                </div>


                <div class="terminal-input">

                    <span>
                        user@moreno:~$
                    </span>

                    <input
                        id="terminalInput"
                        autocomplete="off"
                    >

                </div>

            </div>

        `;

    }


    if (id === "browser") {

        return `

            <div class="browser">

                <div class="browser-toolbar">

                    <button
                        onclick="browserHome()"
                    >
                        ←
                    </button>


                    <button
                        onclick="browserHome()"
                    >
                        ⟳
                    </button>


                    <input
                        id="browserAddress"
                        value="https://www.google.com"
                    >


                    <button
                        onclick="openInternet()"
                    >
                        Abrir
                    </button>

                </div>


                <div
                    class="browser-page"
                    id="browserPage"
                >

                    <h1>
                        Moreno Browser
                    </h1>

                    <p>
                        Navegador do Moreno OS.
                    </p>

                    <p>
                        Digite um endereço acima.
                    </p>


                    <hr>


                    <h3>
                        Sites rápidos
                    </h3>


                    <button
                        onclick="quickSite('https://www.google.com')"
                    >
                        Google
                    </button>


                    <button
                        onclick="quickSite('https://www.youtube.com')"
                    >
                        YouTube
                    </button>


                    <button
                        onclick="quickSite('https://github.com')"
                    >
                        GitHub
                    </button>


                    <button
                        onclick="quickSite('https://www.wikipedia.org')"
                    >
                        Wikipedia
                    </button>

                </div>

            </div>

        `;

    }


    if (id === "calculator") {

        const buttons = [

            "7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0",".","C","+",
            "(" ,")","%","="

        ];


        return `

            <div class="calculator">

                <input
                    id="calcDisplay"
                    class="calc-display"
                    readonly
                >


                <div class="calc-grid">

                    ${buttons.map(
                        button => `

                        <button
                            onclick="calcPress('${button}')"
                        >
                            ${button}
                        </button>

                    `).join("")}

                </div>

            </div>

        `;

    }


    if (id === "notes") {

        return `

            <textarea
                id="notesArea"
                class="notes"
                placeholder="Digite suas anotações..."
            ></textarea>

        `;

    }


    if (id === "settings") {

        return `

            <div class="settings">

                <h2>
                    Configurações
                </h2>


                <div class="setting">

                    🌐 Wi-Fi

                    <input
                        type="checkbox"
                        checked
                        onchange="changeNetwork(this)"
                    >

                </div>


                <div class="setting">

                    🔔 Notificações

                    <input
                        type="checkbox"
                        checked
                    >

                </div>


                <div class="setting">

                    🌙 Modo escuro

                    <input
                        type="checkbox"
                        checked
                    >

                </div>


                <div class="setting">

                    🛠️ Desenvolvedor

                    <input
                        type="checkbox"
                    >

                </div>


                <div class="setting">

                    Sistema

                    <span style="float:right">
                        Moreno OS 1.0
                    </span>

                </div>

            </div>

        `;

    }


    if (id === "monitor") {

        return `

            <div class="settings">

                <h2>
                    Monitor do Sistema
                </h2>


                <div class="setting">

                    CPU

                    <span
                        id="monitorCPU"
                        style="float:right"
                    >
                        12%
                    </span>

                </div>


                <div class="setting">

                    RAM

                    <span style="float:right">
                        6.4 GB / 16 GB
                    </span>

                </div>


                <div class="setting">

                    Disco

                    <span style="float:right">
                        128 GB / 512 GB
                    </span>

                </div>


                <div class="setting">

                    Processos

                    <span style="float:right">
                        74
                    </span>

                </div>

            </div>

        `;

    }


    if (id === "trash") {

        return `

            <div class="settings">

                <h2>
                    🗑️ Lixeira
                </h2>

                <p>
                    A lixeira está vazia.
                </p>

                <button
                    onclick="notify('A lixeira está vazia.')"
                >
                    Esvaziar
                </button>

            </div>

        `;

    }


    if (id === "about") {

        return `

            <div class="settings">

                <h2>
                    ◆ Moreno OS
                </h2>

                <p>
                    Sistema operacional fictício.
                </p>

                <p>
                    Desenvolvido em:
                    HTML + CSS + JavaScript
                </p>

                <hr>

                <p>
                    Versão: 1.0
                </p>

                <p>
                    Kernel: MorenoCore
                </p>

            </div>

        `;

    }

}


/* =========================================
   ARQUIVOS
========================================= */

function createFile(
    icon,
    name,
    type
) {

    let event = "";


    if (type === "exe") {

        event =
            `ondblclick="execute('${name}')"`;

    }


    return `

        <div
            class="file"
            ${event}
        >

            <span class="file-icon">
                ${icon}
            </span>

            <span class="file-name">
                ${name}
            </span>

        </div>

    `;

}


/* =========================================
   EXECUTÁVEIS
========================================= */

function execute(name) {

    if (name === "Sistema.exe") {

        openApp("monitor");

        notify(
            "Sistema.exe iniciado."
        );

        return;

    }


    if (name === "Launcher.exe") {

        toggleStart();

        notify(
            "Launcher.exe iniciado."
        );

        return;

    }


    if (name === "Browser.exe") {

        openApp("browser");

        notify(
            "Browser.exe iniciado."
        );

        return;

    }


    notify(
        `${name} executado.`
    );

}


/* =========================================
   JANELAS
========================================= */

function setupWindow(win) {

    const id =
        win.dataset.app;


    win.addEventListener(
        "mousedown",
        () => focusWindow(win)
    );


    win.querySelector(
        ".close"
    ).onclick = () => {

        delete openedWindows[id];

        win.remove();

        updateTasks();

    };


    win.querySelector(
        ".minimize"
    ).onclick = () => {

        win.classList.add(
            "minimized"
        );

    };


    win.querySelector(
        ".maximize"
    ).onclick = () => {

        win.classList.toggle(
            "maximized"
        );

    };


    const titlebar =
        win.querySelector(
            ".titlebar"
        );


    titlebar.addEventListener(
        "mousedown",
        startDrag
    );


    function startDrag(e) {

        if (
            e.target.tagName ===
            "BUTTON"
        )
            return;


        if (
            win.classList.contains(
                "maximized"
            )
        )
            return;


        focusWindow(win);


        const startX =
            e.clientX;

        const startY =
            e.clientY;


        const originalX =
            win.offsetLeft;

        const originalY =
            win.offsetTop;


        function move(ev) {

            win.style.left =
                Math.max(
                    0,
                    originalX +
                    ev.clientX -
                    startX
                ) + "px";


            win.style.top =
                Math.max(
                    35,
                    originalY +
                    ev.clientY -
                    startY
                ) + "px";

        }


        function stop() {

            document.removeEventListener(
                "mousemove",
                move
            );


            document.removeEventListener(
                "mouseup",
                stop
            );

        }


        document.addEventListener(
            "mousemove",
            move
        );


        document.addEventListener(
            "mouseup",
            stop
        );

    }


    updateTasks();


    if (id === "terminal")
        setupTerminal(win);


    if (id === "notes")
        setupNotes(win);

}


/* =========================================
   FOCO
========================================= */

function focusWindow(win) {

    zIndex++;

    win.style.zIndex =
        zIndex;

}


/* =========================================
   TASKBAR
========================================= */

function updateTasks() {

    const area =
        document.getElementById(
            "taskButtons"
        );


    area.innerHTML = "";


    Object.keys(openedWindows)
        .forEach(id => {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                applications[id]
                    .title
                    .split(" ")[0];


            button.title =
                applications[id].title;


            button.onclick = () => {

                const win =
                    openedWindows[id];


                win.classList.remove(
                    "minimized"
                );


                focusWindow(win);

            };


            area.appendChild(
                button
            );

        });

}


/* =========================================
   START
========================================= */

function toggleStart() {

    document
        .getElementById(
            "startMenu"
        )
        .classList.toggle(
            "show"
        );

}


function closeStart() {

    document
        .getElementById(
            "startMenu"
        )
        .classList.remove(
            "show"
        );

}


document
    .getElementById(
        "appSearch"
    )
    .addEventListener(
        "input",
        function () {

            const text =
                this.value
                    .toLowerCase();


            document
                .querySelectorAll(
                    ".app"
                )
                .forEach(app => {

                    const name =
                        app.dataset.name;


                    app.style.display =
                        name.includes(text)
                            ? ""
                            : "none";

                });

        }
    );


/* =========================================
   TERMINAL
========================================= */

function setupTerminal(win) {

    const input =
        win.querySelector(
            "#terminalInput"
        );


    const output =
        win.querySelector(
            "#terminalOutput"
        );


    input.focus();


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Enter"
            )
                return;


            const command =
                input.value.trim();


            const line =
                document.createElement(
                    "div"
                );


            line.className =
                "terminal-line";


            line.textContent =
                "user@moreno:~$ "
                + command;


            output.appendChild(
                line
            );


            const result =
                terminalCommand(
                    command
                );


            if (result) {

                const response =
                    document.createElement(
                        "div"
                    );


                response.className =
                    "terminal-line";


                response.textContent =
                    result;


                output.appendChild(
                    response
                );

            }


            input.value = "";


            win.querySelector(
                ".terminal"
            ).scrollTop =
                999999;

        }
    );

}


/* =========================================
   COMANDOS
========================================= */

function terminalCommand(command) {

    const parts =
        command.split(" ");


    const cmd =
        parts[0]
            .toLowerCase();


    if (!cmd)
        return "";


    if (cmd === "help") {

        return `

help
ls
dir
pwd
whoami
date
time
version
systeminfo
open
calc
echo
clear
reboot
shutdown

`;

    }


    if (
        cmd === "ls" ||
        cmd === "dir"
    ) {

        return `
Desktop
Documents
Downloads
Pictures
Applications
System
Projects
`;

    }


    if (cmd === "pwd")
        return "/home/user";


    if (cmd === "whoami")
        return "user";


    if (cmd === "date")
        return new Date()
            .toLocaleDateString(
                "pt-BR"
            );


    if (cmd === "time")
        return new Date()
            .toLocaleTimeString(
                "pt-BR"
            );


    if (cmd === "version")
        return "Moreno OS 1.0.0";


    if (cmd === "systeminfo") {

        return `
OS: Moreno OS
Kernel: MorenoCore
Architecture: x64
RAM: 16 GB
Browser: Moreno Browser
Runtime: JavaScript
`;

    }


    if (cmd === "echo") {

        return parts
            .slice(1)
            .join(" ");

    }


    if (cmd === "open") {

        const app =
            parts[1];


        if (
            app &&
            applications[app]
        ) {

            openApp(app);

            return "Aplicativo iniciado.";

        }


        return "Aplicativo não encontrado.";

    }


    if (cmd === "calc") {

        try {

            return Function(
                "return " +
                parts
                    .slice(1)
                    .join(" ")
            )();

        } catch {

            return "Expressão inválida.";

        }

    }


    if (cmd === "clear") {

        document
            .getElementById(
                "terminalOutput"
            )
            .innerHTML = "";

        return "";

    }


    if (cmd === "reboot") {

        location.reload();

        return "";

    }


    if (cmd === "shutdown") {

        document
            .getElementById(
                "desktop"
            )
            .style.filter =
                "brightness(0)";


        return "Sistema desligado.";

    }


    return (
        "Comando não encontrado: "
        + cmd
    );

}


/* =========================================
   NOTAS
========================================= */

function setupNotes(win) {

    const area =
        win.querySelector(
            "#notesArea"
        );


    area.value =
        window.morenoNotes || "";


    area.addEventListener(
        "input",
        () => {

            window.morenoNotes =
                area.value;

        }
    );

}


/* =========================================
   NAVEGADOR
========================================= */

function openInternet() {

    const input =
        document.getElementById(
            "browserAddress"
        );


    if (!input)
        return;


    let url =
        input.value.trim();


    if (!url)
        return;


    /*
       Se o usuário digitar apenas:

       google.com

       transformamos em:

       https://google.com
    */

    if (
        !url.startsWith(
            "http://"
        ) &&
        !url.startsWith(
            "https://"
        )
    ) {

        url =
            "https://" + url;

    }


    /*
       Abre no navegador REAL.

       Isso permite acessar sites como:

       Google
       YouTube
       GitHub
       Wikipedia
       etc.
    */

    window.open(
        url,
        "_blank"
    );


    notify(
        "Abrindo site na internet..."
    );

}


/* =========================================
   SITES RÁPIDOS
========================================= */

function quickSite(url) {

    const input =
        document.getElementById(
            "browserAddress"
        );


    if (input)
        input.value = url;


    openInternet();

}


/* =========================================
   HOME DO BROWSER
========================================= */

function browserHome() {

    const page =
        document.getElementById(
            "browserPage"
        );


    const input =
        document.getElementById(
            "browserAddress"
        );


    if (input)
        input.value =
            "https://www.google.com";


    if (page) {

        page.innerHTML = `

            <h1>
                Moreno Browser
            </h1>

            <p>
                Navegador do Moreno OS.
            </p>

            <p>
                Digite qualquer endereço
                da internet na barra acima.
            </p>


            <hr>


            <h3>
                Sites rápidos
            </h3>


            <button
                onclick="
                    quickSite(
                        'https://www.google.com'
                    )
                "
            >
                Google
            </button>


            <button
                onclick="
                    quickSite(
                        'https://www.youtube.com'
                    )
                "
            >
                YouTube
            </button>


            <button
                onclick="
                    quickSite(
                        'https://github.com'
                    )
                "
            >
                GitHub
            </button>


            <button
                onclick="
                    quickSite(
                        'https://www.wikipedia.org'
                    )
                "
            >
                Wikipedia
            </button>

        `;

    }

}


/* =========================================
   CALCULADORA
========================================= */

function calcPress(value) {

    const display =
        document.getElementById(
            "calcDisplay"
        );


    if (!display)
        return;


    if (value === "C") {

        display.value = "";

        return;

    }


    if (value === "=") {

        try {

            display.value =
                Function(
                    "return " +
                    display.value
                )();

        } catch {

            display.value =
                "Erro";

        }

        return;

    }


    display.value += value;

}


/* =========================================
   WI-FI
========================================= */

function changeNetwork(input) {

    const network =
        document.getElementById(
            "network"
        );


    if (input.checked) {

        network.textContent =
            "● Online";

        notify(
            "Wi-Fi conectado."
        );

    } else {

        network.textContent =
            "○ Offline";

        notify(
            "Wi-Fi desconectado."
        );

    }

}


/* =========================================
   NOTIFICAÇÕES
========================================= */

function notify(text) {

    const box =
        document.getElementById(
            "notification"
        );


    box.textContent =
        text;


    box.classList.add(
        "show"
    );


    setTimeout(
        () => {

            box.classList.remove(
                "show"
            );

        },
        2200
    );

}


/* =========================================
   RELÓGIO
========================================= */

function updateClock() {

    const now =
        new Date();


    const full =
        now.toLocaleTimeString(
            "pt-BR"
        );


    const short =
        now.toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    document.getElementById(
        "clock"
    ).textContent =
        full;


    document.getElementById(
        "bottomClock"
    ).textContent =
        short;

}


setInterval(
    updateClock,
    1000
);


updateClock();


/* =========================================
   CPU SIMULADA
========================================= */

setInterval(
    () => {

        const value =
            5 +
            Math.floor(
                Math.random() * 40
            );


        document.getElementById(
            "cpu"
        ).textContent =
            "CPU " + value + "%";


        const monitor =
            document.getElementById(
                "monitorCPU"
            );


        if (monitor) {

            monitor.textContent =
                value + "%";

        }

    },
    1200
);


/* =========================================
   ATALHOS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           CTRL + ALT + T
           abre terminal
        */

        if (
            event.ctrlKey &&
            event.altKey &&
            event.key.toLowerCase() === "t"
        ) {

            event.preventDefault();

            openApp("terminal");

        }


        /*
           ESC fecha menu iniciar
        */

        if (
            event.key === "Escape"
        ) {

            closeStart();

        }

    }
);


/* =========================================
   BOOT
========================================= */

setTimeout(
    () => {

        notify(
            "Moreno OS iniciado com sucesso."
        );

    },
    700
);