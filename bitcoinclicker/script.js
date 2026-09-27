const SAVE_KEY = "bitcoinClickerSave";


// ======================================================
// IDIOMA DO NAVEGADOR
// ======================================================

const browserLanguage = navigator.language.toLowerCase();

const languages = {

    pt: {
        title: "₿ Bitcoin Clicker",
        description: "Mine satoshis e fique cada vez mais rico.",
        reset: "Resetar",

        balance: "💰 Saldo",
        level: "⭐ Nível",
        perClick: "⚡ Por clique",
        autoMine: "⛏️ Auto-mineração",

        xp: "XP",
        mine: "MINERAR",
        mineDescription: "Clique no Bitcoin para ganhar satoshis",

        upgrades: "⚡ Upgrades",

        miningPower: "💪 Poder de mineração",
        miningPowerDescription: "Aumenta os satoshis por clique.",

        autoMiner: "⛏️ Minerador automático",
        autoMinerDescription: "Gera satoshis automaticamente.",

        buy: "Comprar",

        market: "📈 Mercado",
        bitcoinPrice: "Preço real do Bitcoin",
        change: "Variação 24h",

        saving: "Salvamento automático ativado",

        resetConfirm:
            "Tem certeza que deseja apagar todo o progresso?",

        loading: "Carregando..."
    },

    es: {
        title: "₿ Bitcoin Clicker",
        description: "Mina satoshis y hazte cada vez más rico.",
        reset: "Reiniciar",

        balance: "💰 Saldo",
        level: "⭐ Nivel",
        perClick: "⚡ Por clic",
        autoMine: "⛏️ Minería automática",

        xp: "XP",
        mine: "MINAR",
        mineDescription: "Haz clic en Bitcoin para ganar satoshis",

        upgrades: "⚡ Mejoras",

        miningPower: "💪 Poder de minería",
        miningPowerDescription: "Aumenta los satoshis por clic.",

        autoMiner: "⛏️ Minero automático",
        autoMinerDescription: "Genera satoshis automáticamente.",

        buy: "Comprar",

        market: "📈 Mercado",
        bitcoinPrice: "Precio real de Bitcoin",
        change: "Variación 24h",

        saving: "Guardado automático activado",

        resetConfirm:
            "¿Estás seguro de que quieres borrar todo el progreso?",

        loading: "Cargando..."
    },

    en: {
        title: "₿ Bitcoin Clicker",
        description: "Mine satoshis and become richer and richer.",
        reset: "Reset",

        balance: "💰 Balance",
        level: "⭐ Level",
        perClick: "⚡ Per click",
        autoMine: "⛏️ Auto-mining",

        xp: "XP",
        mine: "MINE",
        mineDescription: "Click Bitcoin to earn satoshis",

        upgrades: "⚡ Upgrades",

        miningPower: "💪 Mining power",
        miningPowerDescription: "Increases satoshis per click.",

        autoMiner: "⛏️ Automatic miner",
        autoMinerDescription: "Generates satoshis automatically.",

        buy: "Buy",

        market: "📈 Market",
        bitcoinPrice: "Real Bitcoin price",
        change: "24h Change",

        saving: "Automatic saving enabled",

        resetConfirm:
            "Are you sure you want to delete all progress?",

        loading: "Loading..."
    }
};


let lang;

if (browserLanguage.startsWith("pt")) {
    lang = languages.pt;
}
else if (browserLanguage.startsWith("es")) {
    lang = languages.es;
}
else {
    lang = languages.en;
}


// ======================================================
// JOGO
// ======================================================

let game = {

    sats: 0,

    level: 1,
    xp: 0,

    perClick: 1,
    autoMine: 0,

    clickUpgradeLevel: 0,
    autoUpgradeLevel: 0,

    btcPrice: 0,
    marketChange: 0
};


// ======================================================
// SALVAR
// ======================================================

function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(game)
    );
}


// ======================================================
// CARREGAR
// ======================================================

function loadGame() {

    const save =
        localStorage.getItem(SAVE_KEY);

    if (save) {

        try {

            game = {
                ...game,
                ...JSON.parse(save)
            };

        } catch {

            console.log("Save inválido.");

        }
    }

    updateUI();
}


// ======================================================
// FORMATAÇÃO
// ======================================================

function formatNumber(number) {

    return Math.floor(number)
        .toLocaleString("pt-BR");
}


// ======================================================
// XP
// ======================================================

function xpNeeded() {

    return game.level * 100;
}


function addXP(amount) {

    game.xp += amount;

    while (game.xp >= xpNeeded()) {

        game.xp -= xpNeeded();

        game.level++;

        game.perClick++;
    }
}


// ======================================================
// MINERAÇÃO
// ======================================================

function mine() {

    game.sats += game.perClick;

    addXP(game.perClick);

    saveGame();

    updateUI();
}


document
    .getElementById("mineBtn")
    .addEventListener("click", mine);


// ======================================================
// PREÇO DOS UPGRADES
// ======================================================

function clickUpgradePrice() {

    return Math.floor(
        50 *
        Math.pow(
            1.8,
            game.clickUpgradeLevel
        )
    );
}


function autoUpgradePrice() {

    return Math.floor(
        100 *
        Math.pow(
            2,
            game.autoUpgradeLevel
        )
    );
}


// ======================================================
// UPGRADE DE CLIQUE
// ======================================================

document
    .getElementById("clickUpgrade")
    .addEventListener("click", () => {

        const price =
            clickUpgradePrice();

        if (game.sats < price) {
            return;
        }

        game.sats -= price;

        game.clickUpgradeLevel++;

        game.perClick += 2;

        saveGame();

        updateUI();
    });


// ======================================================
// UPGRADE AUTOMÁTICO
// ======================================================

document
    .getElementById("autoUpgrade")
    .addEventListener("click", () => {

        const price =
            autoUpgradePrice();

        if (game.sats < price) {
            return;
        }

        game.sats -= price;

        game.autoUpgradeLevel++;

        game.autoMine++;

        saveGame();

        updateUI();
    });


// ======================================================
// AUTO-MINERAÇÃO
// ======================================================

setInterval(() => {

    if (game.autoMine <= 0) {
        return;
    }

    game.sats += game.autoMine;

    addXP(game.autoMine);

    saveGame();

    updateUI();

}, 1000);


// ======================================================
// COTAÇÃO REAL DO BITCOIN
// ======================================================

async function updateBitcoinPrice() {

    try {

        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl&include_24hr_change=true"
        );

        if (!response.ok) {
            throw new Error("Erro na API");
        }

        const data =
            await response.json();

        game.btcPrice =
            data.bitcoin.brl;

        game.marketChange =
            data.bitcoin.brl_24h_change;

        updateMarketUI();

        saveGame();

    } catch (error) {

        console.error(
            "Erro ao buscar Bitcoin:",
            error
        );

        document.getElementById(
            "btcPrice"
        ).textContent =
            lang.loading;
    }
}


// Atualizar imediatamente

updateBitcoinPrice();


// Atualizar a cada 60 segundos

setInterval(
    updateBitcoinPrice,
    60000
);


// ======================================================
// INTERFACE DO MERCADO
// ======================================================

function updateMarketUI() {

    if (!game.btcPrice) {
        return;
    }

    document.getElementById(
        "btcPrice"
    ).textContent =

        "R$ " +

        game.btcPrice.toLocaleString(
            "pt-BR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );


    const change =
        document.getElementById(
            "marketChange"
        );

    const signal =
        game.marketChange >= 0
            ? "+"
            : "";

    change.textContent =
        signal +
        game.marketChange.toFixed(2) +
        "%";
}


// ======================================================
// ATUALIZAR INTERFACE
// ======================================================

function updateUI() {

    document.getElementById(
        "balance"
    ).textContent =

        formatNumber(game.sats) +
        " sats";


    document.getElementById(
        "level"
    ).textContent =
        game.level;


    document.getElementById(
        "perClick"
    ).textContent =

        formatNumber(game.perClick) +
        " sat";


    document.getElementById(
        "autoMine"
    ).textContent =

        formatNumber(game.autoMine) +
        "/s";


    // XP

    const needed =
        xpNeeded();

    const percentage =
        Math.min(
            (game.xp / needed) * 100,
            100
        );

    document.getElementById(
        "xpBar"
    ).style.width =
        percentage + "%";


    document.getElementById(
        "xpText"
    ).textContent =

        `${formatNumber(game.xp)} / ${formatNumber(needed)}`;


    // Upgrades

    const clickPrice =
        clickUpgradePrice();

    const autoPrice =
        autoUpgradePrice();


    document.getElementById(
        "clickUpgradePrice"
    ).textContent =

        formatNumber(clickPrice) +
        " sats";


    document.getElementById(
        "autoUpgradePrice"
    ).textContent =

        formatNumber(autoPrice) +
        " sats";


    document.getElementById(
        "clickUpgrade"
    ).disabled =
        game.sats < clickPrice;


    document.getElementById(
        "autoUpgrade"
    ).disabled =
        game.sats < autoPrice;


    updateMarketUI();
}


// ======================================================
// IDIOMA
// ======================================================

function applyLanguage() {

    document.title =
        lang.title;


    document.querySelector(
        "header h1"
    ).textContent =
        lang.title;


    document.querySelector(
        "header p"
    ).textContent =
        lang.description;


    document.getElementById(
        "resetBtn"
    ).textContent =
        lang.reset;


    // Stats

    const stats =
        document.querySelectorAll(
            ".stat span"
        );

    stats[0].textContent =
        lang.balance;

    stats[1].textContent =
        lang.level;

    stats[2].textContent =
        lang.perClick;

    stats[3].textContent =
        lang.autoMine;


    // XP

    document.querySelector(
        ".level-info span:first-child"
    ).textContent =
        lang.xp;


    // Minerador

    document.querySelector(
        ".bitcoin-button small"
    ).textContent =
        lang.mine;


    document.querySelector(
        ".miner > p"
    ).textContent =
        lang.mineDescription;


    // Upgrades

    document.querySelector(
        ".panel h2"
    ).textContent =
        lang.upgrades;


    const upgrades =
        document.querySelectorAll(
            ".upgrade"
        );


    upgrades[0]
        .querySelector("h3")
        .textContent =
        lang.miningPower;


    upgrades[0]
        .querySelector("p")
        .textContent =
        lang.miningPowerDescription;


    upgrades[1]
        .querySelector("h3")
        .textContent =
        lang.autoMiner;


    upgrades[1]
        .querySelector("p")
        .textContent =
        lang.autoMinerDescription;


    upgrades.forEach(upgrade => {

        const button =
            upgrade.querySelector("button");

        button.lastChild.textContent =
            " " + lang.buy;
    });


    // Mercado

    document.querySelectorAll(
        ".panel h2"
    )[1].textContent =
        lang.market;


    document.querySelector(
        ".market-price span"
    ).textContent =
        lang.bitcoinPrice;


    document.querySelector(
        ".market-change span"
    ).textContent =
        lang.change;


    // Footer

    document.querySelector(
        "footer span:last-child"
    ).textContent =
        lang.saving;
}


// ======================================================
// RESET
// ======================================================

document
    .getElementById("resetBtn")
    .addEventListener("click", () => {

        if (
            !confirm(
                lang.resetConfirm
            )
        ) {
            return;
        }

        localStorage.removeItem(
            SAVE_KEY
        );

        location.reload();
    });


// ======================================================
// INICIAR
// ======================================================

applyLanguage();

loadGame();