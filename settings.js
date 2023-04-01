//switching tabs
function goto_tab(id) {
    switch (id) {
        case 0:
            game.tab = id

            document.getElementById("spices_page").style.display = "block"
            goto_subtab(game.subtab)
            document.getElementById("statistics_page").style.display = "none"
            document.getElementById("settings_page").style.display = "none"

            document.getElementById("spices").className = "tab selected"
            document.getElementById("statistics").className = "tab unlocked"
            document.getElementById("settings").className = "tab unlocked"
            break
        case 5:
            game.tab = id

            document.getElementById("statistics_page").style.display = "block"
            document.getElementById("spices_page").style.display = "none"
            document.getElementById("spices_tabs").style.display = "none"
            document.getElementById("settings_page").style.display = "none"

            document.getElementById("statistics").className = "tab selected"
            document.getElementById("spices").className = "tab unlocked"
            document.getElementById("settings").className = "tab unlocked"
            break
        case 6:
            game.tab = id

            document.getElementById("settings_page").style.display = "block"
            document.getElementById("spices_page").style.display = "none"
            document.getElementById("spices_tabs").style.display = "none"
            document.getElementById("statistics_page").style.display = "none"

            document.getElementById("settings").className = "tab selected"
            document.getElementById("spices").className = "tab unlocked"
            document.getElementById("statistics").className = "tab unlocked"
            break
    }
}

//switching subtabs
function goto_subtab(id) {
    game.subtab = id
    for (let i = 0; i < total_spices; i++) {
        document.getElementById("red" + (i + 1) + "_page").style.display =
            "none"
        document.getElementById("red" + (i + 1)).className = "subtab unlocked"
    }

    document.getElementById("red" + (id + 1) + "_page").style.display = "block"
    document.getElementById("red" + (id + 1)).className = "subtab selected"

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
}

//change notation
function notation(not) {
    if (not === undefined) {
        game.notation++
        if (game.notation === 8) game.notation++
        if (game.notation > 13) game.notation = 2
    } else {
        game.notation = not
    }

    switch (game.notation) {
        case 2:
            document.getElementById("notation").innerHTML =
                "Notation<br>SCIENTIFIC"
            break
        case 3:
            document.getElementById("notation").innerHTML =
                "Notation<br>ENGINEERING"
            break
        case 4:
            document.getElementById("notation").innerHTML =
                "Notation<br>STANDARD"
            break
        case 5:
            document.getElementById("notation").innerHTML =
                "Notation<br>LOGARITHM"
            break
        case 6:
            document.getElementById("notation").innerHTML =
                "Notation<br>LETTERS"
            break
        case 7:
            document.getElementById("notation").innerHTML = "Notation<br>CANCER"
            break
        case 9:
            document.getElementById("notation").innerHTML =
                "Notation<br>INFINITY"
            break
        case 10:
            document.getElementById("notation").innerHTML = "Notation<br>ROMAN"
            break
        case 11:
            document.getElementById("notation").innerHTML = "Notation<br>BASE64"
            break
        case 12:
            document.getElementById("notation").innerHTML =
                "Notation<br>MIXED SCIENTIFIC"
            break
        case 13:
            document.getElementById("notation").innerHTML =
                "Notation<br>MIXED ENGINEERING"
            break
    }
}

//toggle hotkeys
function hotkeys() {
    if (game.hotkeys) {
        game.hotkeys = false
        document.getElementById("hotkeys").innerHTML = "Hotkeys<br>DISABLED"
    } else {
        game.hotkeys = true
        document.getElementById("hotkeys").innerHTML = "Hotkeys<br>ENABLED"
    }
}

//toggle condensed generators
function condensed() {
    if (game.condensed) {
        game.condensed = false
        document.getElementById("condensed").innerHTML =
            "Condensed Generators<br>DISABLED"
    } else {
        game.condensed = true
        document.getElementById("condensed").innerHTML =
            "Condensed Generators<br>ENABLED"
    }
}

//change exponent notation
function exponent_notation(not) {
    if (not === undefined) {
        game.exponent_notation++
        if (game.exponent_notation > 3) game.exponent_notation = 0
    } else {
        game.exponent_notation = not
    }

    switch (game.exponent_notation) {
        case 0:
            document.getElementById("exponent_notation").innerHTML =
                "Exponent Notation<br>LONG"
            break
        case 1:
            document.getElementById("exponent_notation").innerHTML =
                "Exponent Notation<br>SCIENTIFIC"
            break
        case 2:
            document.getElementById("exponent_notation").innerHTML =
                "Exponent Notation<br>ENGINEERING"
            break
        case 3:
            document.getElementById("exponent_notation").innerHTML =
                "Exponent Notation<br>STANDARD"
            break
    }
}

//change refresh rate
function refresh_rate(ms) {
    if (ms !== undefined) {
        game.refresh_rate = ms
    } else {
        switch (game.refresh_rate) {
            case 10:
                game.refresh_rate = 20
                break
            case 20:
                game.refresh_rate = 30
                break
            case 30:
                game.refresh_rate = 50
                break
            case 50:
                game.refresh_rate = 100
                break
            case 100:
                game.refresh_rate = 10
                break
        }
    }

    document.getElementById("refresh_rate").innerHTML =
        "Refresh Rate<br>" + game.refresh_rate + " MS"
}
