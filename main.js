let tick_time = Date.now()
let delta_time = undefined

document.documentElement.style.setProperty(
    "--red_spice",
    "hsl(" + (5 - Math.floor(game.subtab / 2)) + ",100%,54%)"
)
document.documentElement.style.setProperty(
    "--red_spice2",
    "hsl(" + (5 - Math.floor(game.subtab / 2)) + ",100%,30%)"
)
document.documentElement.style.setProperty(
    "--red_spice3",
    "hsl(" + (5 - Math.floor(game.subtab / 2)) + ",100%,15%)"
)

//game operations run every tick
function tick() {
    game.total_time_played += 1 / delta_time

    for (let i = 0; i < total_spices; i++) {
        if (game.red_bonus[0]) {
            if (i >= 1) {
                if (game.allsp_toggle && game.red_unlock[i - 1]) max_all(i + 1)
            } else {
                if (game.allsp_toggle) max_all(i + 1)
            }
        } else {
            if (game.autosp_toggle[i] && game.red_auto[i]) max_all(i + 1)
        }

        for (let j = 0; j < 6; j++) {
            if (
                game.red_spice_boost[i][j].cmp(Decimal.pow(10, 9 * 10 ** 15)) >=
                0
            )
                game.red_spice_boost[i][j] = Decimal.pow(10, 9 * 10 ** 15)

            game.total_red_spice_boost[i][j] = game.red_spice_boost[i][j]
            for (let k = i; k < total_spices; k++) {
                if (game.red_bonus[1]) {
                    game.total_red_spice_boost[i][j] =
                        game.total_red_spice_boost[i][j].mul(
                            Decimal.pow(2.1, game.red_strengthener[k])
                        )
                } else {
                    game.total_red_spice_boost[i][j] =
                        game.total_red_spice_boost[i][j].mul(
                            Decimal.pow(2, game.red_strengthener[k])
                        )
                }
            }

            if (game.red_upgrade[0]) {
                let unlocked_spices = 1
                for (let k = 0; k < total_spices; k++) {
                    if (game.red_unlock[k]) unlocked_spices++
                }
                if (game.red_bonus[3]) {
                    game.total_red_spice_boost[i][j] =
                        game.total_red_spice_boost[i][j].mul(
                            Decimal.pow(4, unlocked_spices)
                        )
                } else {
                    game.total_red_spice_boost[i][j] =
                        game.total_red_spice_boost[i][j].mul(
                            Decimal.pow(2, unlocked_spices)
                        )
                }
            }

            if (i + 1 < total_spices) {
                if (game.red_upgrade[i + 1]) {
                    if (game.red_bonus[2]) {
                        game.total_red_spice_boost[i][j] =
                            game.total_red_spice_boost[i][j].mul(
                                game.red_spice[i + 1].pow(0.035).pow(1.5).add(1)
                            )
                    } else {
                        game.total_red_spice_boost[i][j] =
                            game.total_red_spice_boost[i][j].mul(
                                game.red_spice[i + 1].pow(0.035).add(1)
                            )
                    }
                }
            }

            if (
                game.total_red_spice_boost[i][j].cmp(
                    Decimal.pow(10, 9 * 10 ** 15)
                ) >= 0
            )
                game.total_red_spice_boost[i][j] = Decimal.pow(10, 9 * 10 ** 15)
        }

        game.red_spice[i] = game.red_spice[i].add(
            game.red_spice_gen[i][0]
                .floor()
                .mul(game.total_red_spice_boost[i][0])
                .div(delta_time)
        )

        if (game.red_spice[i].cmp(Decimal.pow(10, 9 * 10 ** 15)) >= 0)
            game.red_spice[i] = Decimal.pow(10, 9 * 10 ** 15)

        game.total_spice = game.total_spice.add(
            game.red_spice_gen[i][0]
                .floor()
                .mul(game.total_red_spice_boost[i][0])
                .div(delta_time)
        )

        if (game.total_spice.cmp(Decimal.pow(10, 9 * 10 ** 15)) >= 0)
            game.total_spice = Decimal.pow(10, 9 * 10 ** 15)

        for (let j = 0; j < 5; j++) {
            game.red_spice_gen[i][j] = game.red_spice_gen[i][j].add(
                game.red_spice_gen[i][j + 1]
                    .floor()
                    .mul(game.total_red_spice_boost[i][j + 1])
                    .div(delta_time * (j + 2))
            )

            if (
                game.red_spice_gen[i][j].cmp(Decimal.pow(10, 9 * 10 ** 15)) >= 0
            )
                game.red_spice_gen[i][j] = Decimal.pow(10, 9 * 10 ** 15)
        }
    }
}

//handling hotkeys
document.body.addEventListener("keydown", function (event) {
    for (let i = 0; i < 6; i++) {
        if (event.code === "Digit" + (i + 1)) key.digit[i] = true
    }

    if (event.shiftKey) key.shift = true
    else key.shift = false

    if (event.code === "KeyS") key.s = true
    if (event.code === "KeyM") key.m = true
})

document.body.addEventListener("keyup", function (event) {
    for (let i = 0; i < 6; i++) {
        if (event.code === "Digit" + (i + 1)) key.digit[i] = false
    }

    if (event.code === "KeyS") key.s = false
    if (event.code === "KeyM") key.m = false
})

function hotkey_tick() {
    if (game.hotkeys) {
        if (game.tab === 0) {
            for (let i = 0; i < 6; i++) {
                if (key.shift && key.digit[i]) {
                    buy_gen(game.subtab + 1, i)
                } else if (key.digit[i]) {
                    buy_until10(game.subtab + 1, i)
                }
            }

            if (key.s) buy_strengthener(1)
            if (key.m) max_all(game.subtab + 1)
        }
    }
}

//saving the game
function save() {
    game.version = "1.0.0"
    localStorage.setItem("red_spice_idle_save", JSON.stringify(game))
}

//exporting a save file
function export_save() {
    navigator.clipboard.writeText(btoa(JSON.stringify(game)))
}

//importing a save file
function import_save() {
    let save_file = atob(prompt("Paste your exported save code here:"))
    let valid_json = true
    try {
        JSON.parse(save_file)
    } catch {
        valid_json = false
    }

    if (valid_json) {
        if (JSON.parse(save_file) !== null) {
            load(JSON.parse(save_file))
        }
    }
}

//deleting a save
function delete_save() {
    if (
        confirm(
            "Are you sure you want to delete your save?\nThis will reset EVERYTHING!"
        )
    ) {
        game.total_spice = new Decimal(5)
        game.total_time_played = 0

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
        game.red_spice_price[0] = [
            new Decimal(5),
            new Decimal(300),
            new Decimal(100000),
            new Decimal(2 * 10 ** 11),
            new Decimal(4 * 10 ** 18),
            new Decimal(6 * 10 ** 30),
        ]
        game.red_strengthener = new Array(total_spices).fill(0)
        game.red_strengthener_price[0] = new Decimal(10 ** 8)
        for (let i = 1; i < total_spices; i++) {
            game.red_spice_price[i] = [
                new Decimal(5),
                new Decimal(1000),
                new Decimal(2 * 10 ** 8),
                new Decimal(4 * 10 ** 14),
                new Decimal(6 * 10 ** 24),
                new Decimal(8 * 10 ** 40),
            ]
            game.red_strengthener_price[i] = new Decimal(100)
        }

        game.red_unlock = new Array(6).fill(false)
        game.red_auto = new Array(6).fill(false)
        game.red_upgrade = new Array(6).fill(false)

        game.red_bonus = new Array(4).fill(false)

        game.autosp_toggle = new Array(7).fill(false)

        save()

        let temp_game = game
        load(temp_game)
    }
}

goto_tab(0)

//load the game
function load(savegame) {
    if (savegame === null) return

    game = savegame

    const [edition, major, minor] = savegame.version
        .split(".")
        .map(val => parseInt(val))

    game.version = "1.0.0"

    for (let i = 0; i < total_spices; i++) {
        game.red_spice[i] = new Decimal(game.red_spice[i])
        game.red_strengthener_price[i] = new Decimal(
            game.red_strengthener_price[i]
        )
        for (let j = 0; j < 6; j++) {
            game.red_spice_gen[i][j] = new Decimal(game.red_spice_gen[i][j])
            game.red_spice_price[i][j] = new Decimal(game.red_spice_price[i][j])
            game.red_spice_boost[i][j] = new Decimal(game.red_spice_boost[i][j])
            game.total_red_spice_boost[i][j] = new Decimal(
                game.total_red_spice_boost[i][j]
            )
        }
    }

    game.total_spice = new Decimal(game.total_spice)

    goto_tab(game.tab)
    if (game.tab === 0) goto_subtab(game.subtab)

    if (game.red_bonus[0]) {
        auto_toggle()
        auto_toggle()
    } else {
        for (let i = 1; i < 6; i++) {
            auto_toggle(i)
            auto_toggle(i)
        }
    }

    notation(game.notation)
    hotkeys()
    hotkeys()
    condensed()
    condensed()
    exponent_notation(game.exponent_notation)
    refresh_rate(game.refresh_rate)
}

//load the game when opened
load(JSON.parse(localStorage.getItem("red_spice_idle_save")))

//setting up the tick loop
function tick_loop() {
    let delta_ms = undefined
    let delta_ticks = 1
    if (delta_time === undefined) {
        delta_time = game.tickspeed
    } else {
        delta_ms = Date.now() - tick_time
        delta_time = 1000 / delta_ms
        delta_ticks = Math.floor((delta_ms * game.tickspeed) / 1000)
    }

    tick_time = Date.now()

    if (delta_ms >= 100) {
        if (delta_ticks > 60 * game.tickspeed) delta_ticks = 60 * game.tickspeed
        delta_time *= delta_ticks
        while (delta_ticks > 0) {
            tick()
            delta_ticks--
        }
    } else {
        tick()
    }
    hotkey_tick()

    window.setTimeout(tick_loop, 1000 / game.tickspeed)
}

//setting up the graphics loop
function graphics_loop() {
    if (game.tab === 0) spice_update()
    if (game.tab === 5) stats_update()

    if (game.red_spice[0].cmp(Decimal.pow(10, 9 * 10 ** 15)) >= 0) {
        document.getElementById("spices").innerHTML = "AND"
        document.getElementById("tab2").innerHTML = "NOW"
        document.getElementById("tab3").innerHTML = "THERE"
        document.getElementById("tab4").innerHTML = "IS"
        document.getElementById("tab5").innerHTML = "ONLY"
        document.getElementById("statistics").innerHTML = "RED"
        document.getElementById("settings").innerHTML = "SPICE"
    } else {
        document.getElementById("spices").innerHTML = "SPICES"
        document.getElementById("tab2").innerHTML = "REMOVED"
        document.getElementById("tab3").innerHTML = "REMOVED"
        document.getElementById("tab4").innerHTML = "REMOVED"
        document.getElementById("tab5").innerHTML = "REMOVED"
        document.getElementById("statistics").innerHTML = "STATISTICS"
        document.getElementById("settings").innerHTML = "SETTINGS"
    }

    window.setTimeout(graphics_loop, game.refresh_rate)
}

tick_loop()
graphics_loop()

//setting up the autosave loop
let save_loop = window.setInterval(function () {
    save()
}, 60000)
