const SAVE_KEY = "ethereumClickerSave";

// ===============================
// TRADUÇÕES
// ===============================

const translations = {
    pt: {
        title: "Ethereum Clicker",
        balance: "Saldo",
        level: "Nível",
        perClick: "ETH por clique",
        autoMine: "ETH por segundo",
        clickUpgrade: "Upgrade de clique",
        autoUpgrade: "Upgrade de mineração",
        upgrade: "Melhorar",
        market: "Mercado Ethereum",
        price: "Preço do ETH",
        change: "24h",
        reset: "Resetar jogo",
        insufficient: "ETH insuficiente!",
        loading: "Carregando...",
        priceError: "Erro ao carregar cotação"
    },

    es: {
        title: "Ethereum Clicker",
        balance: "Saldo",
        level: "Nivel",
        perClick: "ETH por clic",
        autoMine: "ETH por segundo",
        clickUpgrade: "Mejora de clic",
        autoUpgrade: "Mejora de minería",
        upgrade: "Mejorar",
        market: "Mercado Ethereum",
        price: "Precio del ETH",
        change: "24h",
        reset: "Reiniciar juego",
        insufficient: "¡ETH insuficiente!",
        loading: "Cargando...",
        priceError: "Error al cargar cotización"
    },

    en: {
        title: "Ethereum Clicker",
        balance: "Balance",
        level: "Level",
        perClick: "ETH per click",
        autoMine: "ETH per second",
        clickUpgrade: "Click upgrade",
        autoUpgrade: "Mining upgrade",
        upgrade: "Upgrade",
        market: "Ethereum Market",
        price: "ETH Price",
        change: "24h",
        reset: "Reset game",
        insufficient: "Not enough ETH!",
        loading: "Loading...",
        priceError: "Price loading error"
    }
};


// ===============================
// IDIOMA
// ===============================

let language = navigator.language.toLowerCase();

if (language.startsWith("pt")) {
    language = "pt";
} else if (language.startsWith("es")) {
    language = "es";
} else {
    language = "en";
}

const t = translations[language];


// ===============================
// ELEMENTOS
// ===============================

const mineButton = document.getElementById("mineBtn");

const balanceElement = document.getElementById("balance");
const levelElement = document.getElementById("level");
const perClickElement = document.getElementById("perClick");
const autoMineElement = document.getElementById("autoMine");

const xpText = document.getElementById("xpText");
const xpBar = document.getElementById("xpBar");

const clickUpgradeButton =
    document.getElementById("clickUpgrade");

const autoUpgradeButton =
    document.getElementById("autoUpgrade");

const clickUpgradePrice =
    document.getElementById("clickUpgradePrice");

const autoUpgradePrice =
    document.getElementById("autoUpgradePrice");

const ethPriceElement =
    document.getElementById("ethPrice");

const marketChangeElement =
    document.getElementById("marketChange");

const resetButton =
    document.getElementById("resetBtn");


// ===============================
// JOGO
// ===============================

let game = {
    eth: 0,

    level: 1,
    xp: 0,

    perClick: 0.001,
    autoMine: 0,

    clickUpgradeLevel: 0,
    autoUpgradeLevel: 0
};


// ===============================
// CARREGAR
// ===============================

function loadGame() {

    const save = localStorage.getItem(SAVE_KEY);

    if (save) {

        try {

            const savedGame = JSON.parse(save);

            game = {
                ...game,
                ...savedGame
            };

        } catch (error) {

            console.log("Save inválido.");

        }
    }
}


// ===============================
// SALVAR
// ===============================

function saveGame() {

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(game)
    );
}


// ===============================
// FORMATAR ETH
// ===============================

function formatETH(value) {

    if (value >= 1) {
        return value.toFixed(6);
    }

    return value.toFixed(8);
}


// ===============================
// PREÇO DOS UPGRADES
// ===============================

function getClickUpgradePrice() {

    return 0.01 *
        Math.pow(1.75, game.clickUpgradeLevel);
}


function getAutoUpgradePrice() {

    return 0.02 *
        Math.pow(2.75, game.autoUpgradeLevel);
}


// ===============================
// XP
// ===============================

function addXP(amount) {

    game.xp += amount;

    let xpNeeded =
        game.level * 100;

    while (game.xp >= xpNeeded) {

        game.xp -= xpNeeded;

        game.level++;

        xpNeeded =
            game.level * 100;
    }
}


// ===============================
// ATUALIZAR INTERFACE
// ===============================

function updateUI() {

    balanceElement.textContent =
        formatETH(game.eth);

    levelElement.textContent =
        game.level;

    perClickElement.textContent =
        formatETH(game.perClick);

    autoMineElement.textContent =
        formatETH(game.autoMine);


    const xpNeeded =
        game.level * 100;

    xpText.textContent =
        `${game.xp} / ${xpNeeded} XP`;

    const percentage =
        Math.min(
            (game.xp / xpNeeded) * 100,
            100
        );

    xpBar.style.width =
        percentage + "%";


    clickUpgradePrice.textContent =
        formatETH(
            getClickUpgradePrice()
        );

    autoUpgradePrice.textContent =
        formatETH(
            getAutoUpgradePrice()
        );
}


// ===============================
// MINERAR
// ===============================

function mineETH() {

    game.eth += game.perClick;

    addXP(1);

    updateUI();

    saveGame();
}


// ===============================
// UPGRADE DE CLIQUE
// ===============================

function upgradeClick() {

    const price =
        getClickUpgradePrice();

    if (game.eth < price) {

        alert(t.insufficient);

        return;
    }

    game.eth -= price;

    game.perClick *= 1.75;

    game.clickUpgradeLevel++;

    updateUI();

    saveGame();
}


// ===============================
// UPGRADE AUTOMÁTICO
// ===============================

function upgradeAutoMine() {

    const price =
        getAutoUpgradePrice();

    if (game.eth < price) {

        alert(t.insufficient);

        return;
    }

    game.eth -= price;

    game.autoMine += 0.001;

    game.autoUpgradeLevel++;

    updateUI();

    saveGame();
}


// ===============================
// MINERAÇÃO AUTOMÁTICA
// ===============================

setInterval(() => {

    if (game.autoMine > 0) {

        game.eth += game.autoMine;

        addXP(1);

        updateUI();

        saveGame();
    }

}, 1000);


// ===============================
// COTAÇÃO REAL DO ETH
// ===============================

async function updateEthereumPrice() {

    try {

        ethPriceElement.textContent =
            t.loading;

        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=brl&include_24hr_change=true"
        );

        if (!response.ok) {
            throw new Error("Erro na API");
        }

        const data =
            await response.json();

        const price =
            data.ethereum.brl;

        const change =
            data.ethereum.brl_24h_change;


        ethPriceElement.textContent =
            new Intl.NumberFormat(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            ).format(price);


        const signal =
            change >= 0 ? "+" : "";

        marketChangeElement.textContent =
            `${signal}${change.toFixed(2)}%`;

    } catch (error) {

        console.error(
            "Erro ao obter preço:",
            error
        );

        ethPriceElement.textContent =
            t.priceError;

        marketChangeElement.textContent =
            "--";
    }
}


// ===============================
// IDIOMA DA PÁGINA
// ===============================

function applyLanguage() {

    const title =
        document.querySelector("h1");

    const balanceLabel =
        document.getElementById("balanceLabel");

    const levelLabel =
        document.getElementById("levelLabel");

    const perClickLabel =
        document.getElementById("perClickLabel");

    const autoMineLabel =
        document.getElementById("autoMineLabel");

    const clickUpgradeTitle =
        document.getElementById("clickUpgradeTitle");

    const autoUpgradeTitle =
        document.getElementById("autoUpgradeTitle");

    const marketTitle =
        document.getElementById("marketTitle");

    const priceLabel =
        document.getElementById("priceLabel");

    const changeLabel =
        document.getElementById("changeLabel");


    if (title)
        title.textContent = t.title;

    if (balanceLabel)
        balanceLabel.textContent = t.balance;

    if (levelLabel)
        levelLabel.textContent = t.level;

    if (perClickLabel)
        perClickLabel.textContent = t.perClick;

    if (autoMineLabel)
        autoMineLabel.textContent = t.autoMine;

    if (clickUpgradeTitle)
        clickUpgradeTitle.textContent = t.clickUpgrade;

    if (autoUpgradeTitle)
        autoUpgradeTitle.textContent = t.autoUpgrade;

    if (marketTitle)
        marketTitle.textContent = t.market;

    if (priceLabel)
        priceLabel.textContent = t.price;

    if (changeLabel)
        changeLabel.textContent = t.change;


    // NÃO ALTERAMOS O mineButton!
    // Isso mantém as 3 barras originais.


    // Upgrade de clique

    if (clickUpgradeButton) {

        const span =
            clickUpgradeButton.querySelector("span");

        if (span) {
            span.textContent = t.upgrade;
        }
    }


    // Upgrade automático

    if (autoUpgradeButton) {

        const span =
            autoUpgradeButton.querySelector("span");

        if (span) {
            span.textContent = t.upgrade;
        }
    }


    // Reset

    if (resetButton) {

        resetButton.textContent =
            t.reset;
    }
}


// ===============================
// EVENTOS
// ===============================

if (mineButton) {

    mineButton.addEventListener(
        "click",
        mineETH
    );
}


if (clickUpgradeButton) {

    clickUpgradeButton.addEventListener(
        "click",
        upgradeClick
    );
}


if (autoUpgradeButton) {

    autoUpgradeButton.addEventListener(
        "click",
        upgradeAutoMine
    );
}


if (resetButton) {

    resetButton.addEventListener(
        "click",
        resetGame
    );
}


// ===============================
// RESET
// ===============================

function resetGame() {

    const message =
        language === "pt"
            ? "Tem certeza que deseja apagar seu progresso?"
            : language === "es"
                ? "¿Seguro que quieres borrar tu progreso?"
                : "Are you sure you want to delete your progress?";


    if (!confirm(message)) {
        return;
    }

    localStorage.removeItem(SAVE_KEY);

    location.reload();
}


// ===============================
// INICIALIZAÇÃO
// ===============================

loadGame();

applyLanguage();

updateUI();

updateEthereumPrice();


// Atualiza a cotação a cada 60 segundos

setInterval(
    updateEthereumPrice,
    60000
);