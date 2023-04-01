let total_spices = 32

//initializing game variables
let game = {
    version: "1.0.0",

    tickspeed: 100,

    notation: 2,
    hotkeys: true,
    condensed: false,
    exponent_notation: 0,
    refresh_rate: 20,

    red_spice: new Array(total_spices),
    red_spice_gen: new Array(total_spices),
    red_spice_price: new Array(total_spices),
    red_spice_bought: new Array(total_spices),
    red_spice_boost: new Array(total_spices),
    total_red_spice_boost: new Array(total_spices),

    red_strengthener: new Array(total_spices).fill(0),
    red_strengthener_price: new Array(total_spices),

    red_unlock: new Array(total_spices).fill(false),
    red_auto: new Array(total_spices).fill(false),
    red_upgrade: new Array(total_spices).fill(false),

    red_bonus: new Array(4).fill(false),

    total_spice: new Decimal(5),
    total_time_played: 0,

    tab: 0,
    subtab: 0,
    autosp_toggle: new Array(6).fill(false),
    allsp_toggle: false,
}

for (let i = 0; i < total_spices; i++) {
    game.red_spice[i] = new Decimal(5)
    game.red_spice_gen[i] = [
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
    ]
    game.red_spice_bought[i] = [0, 0, 0, 0, 0, 0]
    game.red_spice_boost[i] = [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ]
    game.total_red_spice_boost[i] = [
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
        new Decimal(1),
    ]
}

game.red_strengthener_price[0] = new Decimal(10 ** 8)
for (let i = 1; i < total_spices; i++) {
    game.red_strengthener_price[i] = new Decimal(100)
}

game.red_spice_price[0] = [
    new Decimal(5),
    new Decimal(300),
    new Decimal(100000),
    new Decimal(2 * 10 ** 11),
    new Decimal(4 * 10 ** 18),
    new Decimal(6 * 10 ** 30),
]
for (let i = 1; i < total_spices; i++) {
    game.red_spice_price[i] = [
        new Decimal(5),
        new Decimal(1000),
        new Decimal(2 * 10 ** 8),
        new Decimal(4 * 10 ** 14),
        new Decimal(6 * 10 ** 24),
        new Decimal(8 * 10 ** 40),
    ]
}

let price_scaling = [1.5, 1.75, 2, 2.25, 2.5, 3]
let unlock_exponent = [
    45, 60, 70, 80, 90, 100, 110, 120, 130, 180, 195, 210, 220, 230, 240, 255,
    270, 285, 300, 315, 330, 345, 360, 370, 380, 390, 400, 410, 420, 430, 440,
    450,
]
let auto_exponent = [
    80, 100, 110, 120, 130, 140, 150, 150, 150, 150, 150, 150, 150, 150, 150,
    150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
    150, 150,
]
let upgrade_exponent = [
    120, 150, 160, 170, 180, 190, 200, 225, 250, 350, 385, 420, 445, 470, 495,
    520, 555, 580, 605, 630, 655, 680, 700, 720, 740, 760, 780, 800, 820, 840,
    860, 450,
]
let unlock_price = new Array(total_spices)
for (let i = 0; i < total_spices; i++) {
    unlock_price[i] = Decimal.pow(10, unlock_exponent[i])
}
let auto_price = new Array(total_spices)
for (let i = 0; i < total_spices; i++) {
    auto_price[i] = Decimal.pow(10, auto_exponent[i])
}
let upgrade_price = new Array(total_spices)
for (let i = 0; i < total_spices; i++) {
    upgrade_price[i] = Decimal.pow(10, upgrade_exponent[i])
}
let bonus_price = [
    Decimal.pow(10, 10000),
    Decimal.pow(10, 1.5 * 10 ** 7),
    Decimal.pow(10, 2 * 10 ** 10),
    Decimal.pow(10, 120000),
]

let key = {
    digit: [false, false, false, false, false, false],
    shift: false,

    s: false,
    m: false,
}

function format_small(num) {
    if (game.notation === 10) {
        return format_num(num, 10)
    } else if (game.notation === 11) {
        return format_num(num, 11)
    } else {
        return format_num(num, 0)
    }
}

function format_inum(num, not) {
    switch (game.exponent_notation) {
        case 0:
            return format_inf(num, not, 0)
        case 1:
            return format_inf(num, not, 2)
        case 2:
            return format_inf(num, not, 3)
        case 3:
            return format_inf(num, not, 4)
    }
}

function format_idec(num, not) {
    switch (game.exponent_notation) {
        case 0:
            return format_infdec(num, not, 0)
        case 1:
            return format_infdec(num, not, 2)
        case 2:
            return format_infdec(num, not, 3)
        case 3:
            return format_infdec(num, not, 4)
    }
}

//initialize map
const spice_map = new Map()

//spice page creation function
function create_spice(number) {
    let tab = document.createElement("BUTTON")
    tab.id = "red" + number
    tab.className = "subtab unlocked"
    tab.innerHTML = "RED&nbsp;" + format_num(number, 10)
    tab.addEventListener("click", () => {
        goto_subtab(number - 1)
    })
    document.getElementById("spices_tabs").appendChild(tab)

    let page = document.createElement("DIV")
    page.id = "red" + number + "_page"
    page.className = "spice_page"
    document.getElementById("spices_page").appendChild(page)

    let amount = document.createElement("P")
    amount.id = "red" + number + "_spice_num"
    amount.className = "spice_num red_spice"
    amount.innerHTML = "5.00 g"
    page.appendChild(amount)

    let spice_name = document.createElement("P")
    spice_name.className = "spice_text red_spice"
    spice_name.innerHTML = "red spice " + format_num(number, 10)
    page.appendChild(spice_name)

    let spice_up = document.createElement("P")
    spice_up.id = "red" + number + "_spice_up"
    spice_up.className = "spice_up"
    spice_up.innerHTML = "+0.000 g red spice " + format_num(number, 10) + "/sec"
    page.appendChild(spice_up)

    let max_button = document.createElement("BUTTON")
    max_button.className = "spice_buy max_all"
    max_button.innerHTML = "Max All"
    max_button.addEventListener("click", () => {
        max_all(number)
    })
    page.appendChild(max_button)

    let auto_button = document.createElement("BUTTON")
    auto_button.id = "red" + number + "_auto"
    auto_button.className = "spice_buy a_disabled"
    auto_button.innerHTML = "Auto: OFF"
    auto_button.addEventListener("click", () => {
        auto_toggle(number)
    })
    page.appendChild(auto_button)

    let gen_page = document.createElement("DIV")
    gen_page.className = "spice_gen_page"
    page.appendChild(gen_page)

    let gen_left = document.createElement("DIV")
    gen_left.id = "red" + number + "_panel_left"
    gen_left.className = "spice_gen_panel"
    gen_page.appendChild(gen_left)
    let gen_right = document.createElement("DIV")
    gen_right.id = "red" + number + "_panel_right"
    gen_right.className = "spice_gen_panel"
    gen_page.appendChild(gen_right)

    let upgrades_panel = document.createElement("DIV")
    upgrades_panel.id = "red" + number + "_upgrades"
    upgrades_panel.className = "spice_upgrades"
    page.appendChild(upgrades_panel)

    let strengthener = document.createElement("BUTTON")
    strengthener.id = "red" + number + "_strengthener"
    strengthener.className = "red_upgrade red_locked"
    strengthener.innerHTML =
        '<span id="red' +
        number +
        '_desc1">Gain a 2x boost to all red spice production up to red spice ' +
        format_num(number, 10) +
        '<br>(Currently: 1x)</span><br><span id="red' +
        number +
        '_pcost1" class="bold">-100 g red spice ' +
        format_num(number, 10) +
        "</span>"
    strengthener.addEventListener("click", () => {
        buy_strengthener(number)
    })
    upgrades_panel.appendChild(strengthener)

    if (number <= total_spices - 1) {
        let unlock = document.createElement("BUTTON")
        unlock.id = "red" + number + "_unlock"
        unlock.className = "red_upgrade red_locked"
        unlock.innerHTML =
            '<span id="red' +
            number +
            '_desc2">Unlock a new red spice</span><br><span id="red' +
            number +
            '_pcost2" class="bold">-1.000e60 g red spice ' +
            format_num(number, 10) +
            "</span>"
        unlock.addEventListener("click", () => {
            buy_upgrade(number, 1)
        })
        upgrades_panel.appendChild(unlock)
    }

    if (number <= 6) {
        let auto = document.createElement("BUTTON")
        auto.id = "red" + number + "_autoup"
        auto.className = "red_upgrade red_locked"
        auto.innerHTML =
            '<span id="red' +
            number +
            '_desc3">Unlock automation for red spice ' +
            format_num(number, 10) +
            '</span><br><span id="red' +
            number +
            '_pcost3" class="bold">-1.000e100 g red spice ' +
            format_num(number, 10) +
            "</span>"
        auto.addEventListener("click", () => {
            buy_upgrade(number, 2)
        })
        upgrades_panel.appendChild(auto)
    }

    let upgrade = document.createElement("BUTTON")
    upgrade.id = "red" + number + "_upgrade"
    upgrade.className = "red_upgrade red_locked"
    if (number === 2)
        upgrade.innerHTML =
            '<span id="red' +
            number +
            '_desc4">Red spice ' +
            format_num(number, 10) +
            ' boosts red spice production by its amount</span><br><span id="red' +
            number +
            '_pcost4" class="bold">-1.000e150 g red spice ' +
            format_num(number, 10) +
            "</span>"
    else
        upgrade.innerHTML =
            '<span id="red' +
            number +
            '_desc4">Red spice ' +
            format_num(number, 10) +
            " boosts red spice " +
            format_num(number - 1, 10) +
            ' production by its amount</span><br><span id="red' +
            number +
            '_pcost4" class="bold">-1.000e150 g red spice ' +
            format_num(number, 10) +
            "</span>"
    upgrade.addEventListener("click", () => {
        buy_upgrade(number, 3)
    })
    upgrades_panel.appendChild(upgrade)
}

//spice generator class
class spice_gen {
    static generators = []

    number
    id
    base_price
    scaling
    name
    plural

    //generator constructor
    constructor(number, id, base_price, name, plural) {
        this.number = number
        this.id = id
        this.rid = spice_gen.generators.length
        this.base_price = base_price
        this.name = name
        this.plural = plural

        spice_gen.generators.push(this)

        //generator name
        let gen_name = document.createElement("P")
        if (this.number === 1) {
            gen_name.innerHTML =
                "Red Spice " + this.name.replace(/^\w/, c => c.toUpperCase())
        } else {
            gen_name.innerHTML =
                "Red Spice " +
                format_num(this.number, 10) +
                " " +
                this.name.replace(/^\w/, c => c.toUpperCase())
        }
        gen_name.className = "spice_gen_name red_spice"

        //generator info
        let gen_info = document.createElement("P")
        gen_info.innerHTML = "---"
        gen_info.className = "spice_gen_info"

        //generator boost
        let gen_boost = document.createElement("P")
        gen_boost.innerHTML = "---"
        gen_boost.className = "spice_gen_boost"

        //buy one generator
        let gen_buy = document.createElement("BUTTON")
        gen_buy.innerHTML =
            'Buy one: <span id="red' +
            this.number +
            "_cost" +
            this.id +
            '" class="red_cost">---</span>'
        gen_buy.className = "spice_buy"
        gen_buy.addEventListener("click", () => {
            buy_gen(this.number, this.id)
        })

        //buy until 5 generator
        let gen_until = document.createElement("BUTTON")
        gen_until.innerHTML =
            'Buy until 5: <span id="red' +
            this.number +
            "_ucost" +
            this.id +
            '" class="red_cost">---</span>'
        gen_until.className = "spice_buy"
        gen_until.addEventListener("click", () => {
            buy_until5(this.number, this.id)
        })

        //buttons div
        let gen_buttons = document.createElement("DIV")
        gen_buttons.className = "spice_buttons"
        gen_buttons.appendChild(gen_buy)
        gen_buttons.appendChild(gen_until)

        //entire generator div
        let gen_block = document.createElement("DIV")
        gen_block.className = "spice_gen"
        gen_block.appendChild(gen_name)
        gen_block.appendChild(gen_info)
        gen_block.appendChild(gen_boost)
        gen_block.appendChild(gen_buttons)

        //attaching generator to spice page
        spice_map.set(this, gen_block)
        if (this.id < 3) {
            document
                .getElementById("red" + this.number + "_panel_left")
                .appendChild(gen_block)
        } else {
            document
                .getElementById("red" + this.number + "_panel_right")
                .appendChild(gen_block)
        }
    }
}

//initializing spice generators
//red
new spice_gen(1, 0, new Decimal(5), "harvester", "harvesters")
new spice_gen(1, 1, new Decimal(300), "machine", "machines")
new spice_gen(1, 2, new Decimal(100000), "factory", "factories")
new spice_gen(1, 3, new Decimal(2 * 10 ** 11), "agency", "agencies")
new spice_gen(1, 4, new Decimal(4 * 10 ** 18), "planet", "planets")
new spice_gen(1, 5, new Decimal(6 * 10 ** 30), "galaxy", "galaxies")
//red II+
for (let i = 2; i <= total_spices; i++) {
    create_spice(i)
    new spice_gen(i, 0, new Decimal(5), "harvester", "harvesters")
    new spice_gen(i, 1, new Decimal(1000), "machine", "machines")
    new spice_gen(i, 2, new Decimal(2 * 10 ** 8), "factory", "factories")
    new spice_gen(i, 3, new Decimal(4 * 10 ** 14), "agency", "agencies")
    new spice_gen(i, 4, new Decimal(6 * 10 ** 24), "planet", "planets")
    new spice_gen(i, 5, new Decimal(8 * 10 ** 40), "galaxy", "galaxies")
}
