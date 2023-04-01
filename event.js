//purchasing spice generators
function buy_gen(number, id) {
    if (
        game.red_spice[number - 1].cmp(game.red_spice_price[number - 1][id]) >=
        0
    ) {
        game.red_spice[number - 1] = game.red_spice[number - 1].sub(
            game.red_spice_price[number - 1][id]
        )
        game.red_spice_price[number - 1][id] = game.red_spice_price[number - 1][
            id
        ].mul(price_scaling[id])
        game.red_spice_gen[number - 1][id] =
            game.red_spice_gen[number - 1][id].add(1)
        game.red_spice_bought[number - 1][id] += 1

        game.red_spice_boost[number - 1][id] = Decimal.pow(
            1.5,
            Math.floor(game.red_spice_bought[number - 1][id] / 5)
        )

        if (game.red_spice_bought[number - 1][id] >= 200) {
            game.red_spice_boost[number - 1][id] = Decimal.pow(1.5, 40).mul(
                Decimal.pow(
                    1.25,
                    Math.floor(
                        (game.red_spice_bought[number - 1][id] - 200) / 5
                    )
                )
            )
        }

        if (game.red_spice[number - 1].cmp(0) < 0)
            game.red_spice[number - 1] = new Decimal(0)
    }
}

function buy_until5(number, id) {
    let price = 0
    let n =
        Math.floor(game.red_spice_bought[number - 1][id] / 5) * 5 +
        5 -
        game.red_spice_bought[number - 1][id]

    price = game.red_spice_price[number - 1][id]
        .mul(1 - price_scaling[id] ** n)
        .div(1 - price_scaling[id])

    if (game.red_spice[number - 1].cmp(price) >= 0) {
        game.red_spice[number - 1] = game.red_spice[number - 1].sub(price)
        game.red_spice_price[number - 1][id] = game.red_spice_price[number - 1][
            id
        ].mul(price_scaling[id] ** n)
        game.red_spice_gen[number - 1][id] =
            game.red_spice_gen[number - 1][id].add(n)
        game.red_spice_bought[number - 1][id] += n

        game.red_spice_boost[number - 1][id] = Decimal.pow(
            1.5,
            Math.floor(game.red_spice_bought[number - 1][id] / 5)
        )

        if (game.red_spice_bought[number - 1][id] >= 200) {
            game.red_spice_boost[number - 1][id] = Decimal.pow(1.5, 40).mul(
                Decimal.pow(
                    1.25,
                    Math.floor(
                        (game.red_spice_bought[number - 1][id] - 200) / 5
                    )
                )
            )
        }

        if (game.red_spice[number - 1].cmp(0) < 0)
            game.red_spice[number - 1] = new Decimal(0)
    }
}

function buy_strengthener(number) {
    if (
        game.red_spice[number - 1].cmp(
            game.red_strengthener_price[number - 1]
        ) >= 0
    ) {
        game.red_spice[number - 1] = game.red_spice[number - 1].sub(
            game.red_strengthener_price[number - 1]
        )

        if (number === 1) {
            game.red_strengthener_price[number - 1] =
                game.red_strengthener_price[number - 1].mul(2500000)
        } else {
            if (game.red_strengthener[number - 1] < 4) {
                game.red_strengthener_price[number - 1] =
                    game.red_strengthener_price[number - 1]
                        .mul(250)
                        .mul(Decimal.pow(10, game.red_strengthener[number - 1]))
            } else {
                game.red_strengthener_price[number - 1] =
                    game.red_strengthener_price[number - 1].mul(2500000)
            }
        }

        game.red_strengthener[number - 1] += 1

        if (game.red_spice[number - 1].cmp(0) < 0)
            game.red_spice[number - 1] = new Decimal(0)
    }
}

function max_all(number) {
    if (number > 1) {
        for (i = 0; i <= 4; i++) {
            if (game.red_strengthener[number - 1] === i) {
                if (
                    game.red_spice[number - 1].cmp(
                        game.red_strengthener_price[number - 1]
                    ) >= 0
                ) {
                    game.red_spice[number - 1] = game.red_spice[number - 1].sub(
                        game.red_strengthener_price[number - 1]
                    )
                    game.red_strengthener_price[number - 1] =
                        game.red_strengthener_price[number - 1]
                            .mul(250)
                            .mul(
                                Decimal.pow(
                                    10,
                                    game.red_strengthener[number - 1]
                                )
                            )
                    game.red_strengthener[number - 1]++
                }
            }
        }
    }
    if (
        number === 1 ||
        (number > 1 && game.red_strengthener[number - 1] >= 4)
    ) {
        let n = Math.floor(
            new Decimal(1)
                .sub(
                    game.red_spice[number - 1]
                        .mul(-2499999)
                        .div(game.red_strengthener_price[number - 1])
                )
                .log(10) / Math.log10(2500000)
        )
        if (n > 0) {
            let price = game.red_strengthener_price[number - 1]
                .mul(new Decimal(1).sub(new Decimal(2500000).pow(n)))
                .div(-2499999)
            game.red_spice[number - 1] = game.red_spice[number - 1].sub(price)
            game.red_strengthener_price[number - 1] =
                game.red_strengthener_price[number - 1].mul(
                    new Decimal(2500000).pow(n)
                )
            game.red_strengthener[number - 1] += n
        }
    }
    for (let i = 5; i >= 0; i--) {
        if (game.red_spice_bought[number - 1][i] === 0) buy_gen(number, i)
        buy_until5(number, i)
        let n = Math.floor(
            new Decimal(1)
                .sub(
                    game.red_spice[number - 1]
                        .mul(1 - price_scaling[i])
                        .div(game.red_spice_price[number - 1][i])
                )
                .log(10) / Math.log10(price_scaling[i])
        )
        if (game.red_spice_bought[number - 1][i] >= 5) n = Math.floor(n / 5) * 5
        if (n > 0) {
            let price = game.red_spice_price[number - 1][i]
                .mul(new Decimal(1).sub(new Decimal(price_scaling[i]).pow(n)))
                .div(1 - price_scaling[i])
            game.red_spice[number - 1] = game.red_spice[number - 1].sub(price)
            game.red_spice_price[number - 1][i] = game.red_spice_price[
                number - 1
            ][i].mul(new Decimal(price_scaling[i]).pow(n))
            game.red_spice_gen[number - 1][i] =
                game.red_spice_gen[number - 1][i].add(n)
            game.red_spice_bought[number - 1][i] += n

            game.red_spice_boost[number - 1][i] = Decimal.pow(
                1.5,
                Math.floor(game.red_spice_bought[number - 1][i] / 5)
            )

            if (game.red_spice_bought[number - 1][i] >= 200) {
                game.red_spice_boost[number - 1][i] = Decimal.pow(1.5, 40).mul(
                    Decimal.pow(
                        1.25,
                        Math.floor(
                            (game.red_spice_bought[number - 1][i] - 200) / 5
                        )
                    )
                )
            }
        }
    }

    if (game.red_spice[number - 1].cmp(0) < 0)
        game.red_spice[number - 1] = new Decimal(0)
}

//purchase red spice upgrades
function buy_upgrade(number, id) {
    switch (id) {
        case 1:
            if (number === 1) {
                if (
                    game.red_spice[number - 1].cmp(unlock_price[number - 1]) >=
                        0 &&
                    game.red_spice_gen[number - 1][5].cmp(new Decimal(5)) >= 0
                ) {
                    game.red_spice[number - 1] = game.red_spice[number - 1].sub(
                        unlock_price[number - 1]
                    )
                    game.red_unlock[number - 1] = true
                    goto_subtab(game.subtab + 1)
                }
            } else {
                if (
                    game.red_spice[number - 1].cmp(unlock_price[number - 1]) >=
                        0 &&
                    game.red_spice_gen[number - 1][0].cmp(new Decimal(5)) >= 0
                ) {
                    game.red_spice[number - 1] = game.red_spice[number - 1].sub(
                        unlock_price[number - 1]
                    )
                    game.red_unlock[number - 1] = true
                    goto_subtab(game.subtab + 1)
                }
            }
            break
        case 2:
            if (number === 1) {
                if (
                    game.red_spice[number - 1].cmp(auto_price[number - 1]) >=
                        0 &&
                    game.red_unlock[number - 1]
                ) {
                    game.red_spice[number - 1] = game.red_spice[number - 1].sub(
                        auto_price[number - 1]
                    )
                    game.red_auto[number - 1] = true
                }
            } else {
                if (
                    game.red_spice[number - 1].cmp(auto_price[number - 1]) >=
                        0 &&
                    game.red_spice_gen[number - 1][0].cmp(new Decimal(5)) >= 0
                ) {
                    game.red_spice[number - 1] = game.red_spice[number - 1].sub(
                        auto_price[number - 1]
                    )
                    game.red_auto[number - 1] = true
                }
            }
            break
        case 3:
            if (number === 1) {
                if (
                    game.red_spice[number - 1].cmp(upgrade_price[number - 1]) >=
                        0 &&
                    game.red_unlock[number - 1]
                ) {
                    game.red_spice[number - 1] = game.red_spice[number - 1].sub(
                        upgrade_price[number - 1]
                    )
                    game.red_upgrade[number - 1] = true
                }
            } else {
                if (
                    game.red_spice[number - 1].cmp(upgrade_price[number - 1]) >=
                        0 &&
                    game.red_spice_gen[number - 1][0].cmp(new Decimal(5)) >= 0
                ) {
                    game.red_spice[number - 1] = game.red_spice[number - 1].sub(
                        upgrade_price[number - 1]
                    )
                    game.red_upgrade[number - 1] = true
                }
            }
            break
        case 4:
            if (
                game.red_spice[0].cmp(bonus_price[0]) >= 0 &&
                game.red_upgrade[0]
            ) {
                game.red_spice[0] = game.red_spice[0].sub(bonus_price[0])
                game.red_bonus[0] = true
                auto_toggle()
                auto_toggle()
            }
            break
        case 5:
            if (
                game.red_spice[0].cmp(bonus_price[1]) >= 0 &&
                game.red_upgrade[0]
            ) {
                game.red_spice[0] = game.red_spice[0].sub(bonus_price[1])
                game.red_bonus[1] = true
            }
            break
        case 6:
            if (
                game.red_spice[0].cmp(bonus_price[2]) >= 0 &&
                game.red_upgrade[0]
            ) {
                game.red_spice[0] = game.red_spice[0].sub(bonus_price[2])
                game.red_bonus[2] = true
            }
            break
        case 7:
            if (
                game.red_spice[0].cmp(bonus_price[3]) >= 0 &&
                game.red_upgrade[0]
            ) {
                game.red_spice[0] = game.red_spice[0].sub(bonus_price[3])
                game.red_bonus[3] = true
            }
            break
    }
}

//toggle automation for spice
function auto_toggle(number) {
    if (!game.red_bonus[0]) {
        if (game.autosp_toggle[number - 1]) {
            game.autosp_toggle[number - 1] = false
            document.getElementById("red" + number + "_auto").innerHTML =
                "Auto: OFF"
            document.getElementById("red" + number + "_auto").className =
                "spice_buy a_disabled"
        } else {
            game.autosp_toggle[number - 1] = true
            document.getElementById("red" + number + "_auto").innerHTML =
                "Auto: ON"
            document.getElementById("red" + number + "_auto").className =
                "spice_buy a_enabled"
        }
    } else {
        if (game.allsp_toggle) {
            game.allsp_toggle = false
            for (let i = 1; i <= total_spices; i++) {
                document.getElementById("red" + i + "_auto").innerHTML =
                    "Auto: OFF"
                document.getElementById("red" + i + "_auto").className =
                    "spice_buy a_disabled"
            }
        } else {
            game.allsp_toggle = true
            for (let i = 1; i <= total_spices; i++) {
                document.getElementById("red" + i + "_auto").innerHTML =
                    "Auto: ON"
                document.getElementById("red" + i + "_auto").className =
                    "spice_buy a_enabled"
            }
        }
    }
}
