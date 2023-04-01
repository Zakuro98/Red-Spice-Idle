//graphics updates for spice generators
function spice_update() {
    document.getElementById(
        "red" + (game.subtab + 1) + "_spice_num"
    ).innerHTML = format_idec(game.red_spice[game.subtab], game.notation) + " g"
    if (game.subtab === 0) {
        document.getElementById(
            "red" + (game.subtab + 1) + "_spice_up"
        ).innerHTML =
            "+" +
            format_idec(
                game.red_spice_gen[game.subtab][0]
                    .floor()
                    .mul(game.total_red_spice_boost[game.subtab][0]),
                game.notation
            ) +
            " g red spice/sec"
    } else {
        document.getElementById(
            "red" + (game.subtab + 1) + "_spice_up"
        ).innerHTML =
            "+" +
            format_idec(
                game.red_spice_gen[game.subtab][0]
                    .floor()
                    .mul(game.total_red_spice_boost[game.subtab][0]),
                game.notation
            ) +
            " g red spice " +
            format_num(game.subtab + 1, 10) +
            "/sec"

        if (game.red_upgrade[game.subtab]) {
            if (game.subtab === 1) {
                if (game.red_bonus[2]) {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_spice_up"
                    ).innerHTML =
                        "+" +
                        format_idec(
                            game.red_spice_gen[game.subtab][0]
                                .floor()
                                .mul(
                                    game.total_red_spice_boost[game.subtab][0]
                                ),
                            game.notation
                        ) +
                        " g red spice " +
                        format_num(game.subtab + 1, 10) +
                        "/sec<br><br>Your red spice " +
                        format_num(game.subtab + 1, 10) +
                        " is boosting red spice production " +
                        format_idec(
                            game.red_spice[game.subtab]
                                .pow(0.035)
                                .pow(1.5)
                                .add(1),
                            game.notation
                        ) +
                        "x"
                } else {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_spice_up"
                    ).innerHTML =
                        "+" +
                        format_idec(
                            game.red_spice_gen[game.subtab][0]
                                .floor()
                                .mul(
                                    game.total_red_spice_boost[game.subtab][0]
                                ),
                            game.notation
                        ) +
                        " g red spice " +
                        format_num(game.subtab + 1, 10) +
                        "/sec<br><br>Your red spice " +
                        format_num(game.subtab + 1, 10) +
                        " is boosting red spice production " +
                        format_idec(
                            game.red_spice[game.subtab].pow(0.035).add(1),
                            game.notation
                        ) +
                        "x"
                }
            } else {
                if (game.red_bonus[2]) {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_spice_up"
                    ).innerHTML =
                        "+" +
                        format_idec(
                            game.red_spice_gen[game.subtab][0]
                                .floor()
                                .mul(
                                    game.total_red_spice_boost[game.subtab][0]
                                ),
                            game.notation
                        ) +
                        " g red spice " +
                        format_num(game.subtab + 1, 10) +
                        "/sec<br><br>Your red spice " +
                        format_num(game.subtab + 1, 10) +
                        " is boosting red spice " +
                        format_num(game.subtab, 10) +
                        " production " +
                        format_idec(
                            game.red_spice[game.subtab]
                                .pow(0.035)
                                .pow(1.5)
                                .add(1),
                            game.notation
                        ) +
                        "x"
                } else {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_spice_up"
                    ).innerHTML =
                        "+" +
                        format_idec(
                            game.red_spice_gen[game.subtab][0]
                                .floor()
                                .mul(
                                    game.total_red_spice_boost[game.subtab][0]
                                ),
                            game.notation
                        ) +
                        " g red spice " +
                        format_num(game.subtab + 1, 10) +
                        "/sec<br><br>Your red spice " +
                        format_num(game.subtab + 1, 10) +
                        " is boosting red spice " +
                        format_num(game.subtab, 10) +
                        " production " +
                        format_idec(
                            game.red_spice[game.subtab].pow(0.035).add(1),
                            game.notation
                        ) +
                        "x"
                }
            }
        }
    }

    for (const gen of spice_gen.generators) {
        let element = spice_map.get(gen)
        let info = element.querySelector(".spice_gen_info")
        let boost = element.querySelector(".spice_gen_boost")

        let info_str = ""
        let n = 0
        let price = 0

        if (gen.number === game.subtab + 1) {
            if (gen.number === 1)
                info_str =
                    "You have " +
                    format_inum(
                        game.red_spice_gen[gen.number - 1][gen.id].floor(),
                        game.notation
                    ) +
                    " red spice " +
                    gen.plural
            else
                info_str =
                    "You have " +
                    format_inum(
                        game.red_spice_gen[gen.number - 1][gen.id].floor(),
                        game.notation
                    ) +
                    " red spice " +
                    format_num(gen.number, 10) +
                    " " +
                    gen.plural
            if (
                game.red_spice_gen[gen.number - 1][gen.id].cmp(
                    new Decimal(game.red_spice_bought[gen.number - 1][gen.id])
                ) === 0
            ) {
                info_str += ",<br>producing "
            } else {
                info_str +=
                    " (" +
                    format_small(
                        game.red_spice_bought[gen.number - 1][gen.id]
                    ) +
                    " bought),<br>producing "
            }
            info_str += format_idec(
                game.red_spice_gen[gen.number - 1][gen.id]
                    .floor()
                    .mul(game.total_red_spice_boost[gen.number - 1][gen.id])
                    .div(gen.id + 1),
                game.notation
            )
            if (gen.id === 0) {
                if (gen.number === 1) info_str += " g red spice/sec"
                else
                    info_str +=
                        " g red spice " + format_num(gen.number, 10) + "/sec"
            } else {
                if (gen.number === 1)
                    info_str +=
                        " red spice " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
                else
                    info_str +=
                        " red spice " +
                        format_num(gen.number, 10) +
                        " " +
                        spice_gen.generators[gen.rid - 1].plural +
                        "/sec"
            }
            if (game.condensed)
                info_str =
                    format_inum(
                        game.red_spice_gen[gen.number - 1][gen.id].floor(),
                        game.notation
                    ) +
                    " " +
                    gen.plural +
                    " <span class='bold'>" +
                    format_idec(
                        game.total_red_spice_boost[gen.number - 1][gen.id],
                        game.notation
                    ) +
                    "x</span>"
            info.innerHTML = info_str

            if (gen.number === 1)
                boost.innerHTML =
                    "Your red spice " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_red_spice_boost[gen.number - 1][gen.id],
                        game.notation
                    ) +
                    "x"
            else
                boost.innerHTML =
                    "Your red spice " +
                    format_num(gen.number, 10) +
                    " " +
                    gen.plural +
                    " are currently being boosted " +
                    format_idec(
                        game.total_red_spice_boost[gen.number - 1][gen.id],
                        game.notation
                    ) +
                    "x"

            if (game.condensed) boost.style.display = "none"
            else boost.style.display = "block"

            if (gen.number === 1)
                document.getElementById(
                    "red" + gen.number + "_cost" + gen.id
                ).innerHTML =
                    "-" +
                    format_idec(
                        game.red_spice_price[gen.number - 1][gen.id],
                        game.notation
                    ) +
                    " g red spice"
            else
                document.getElementById(
                    "red" + gen.number + "_cost" + gen.id
                ).innerHTML =
                    "-" +
                    format_idec(
                        game.red_spice_price[gen.number - 1][gen.id],
                        game.notation
                    ) +
                    " g red spice " +
                    format_num(gen.number, 10)
            if (
                game.red_spice[gen.number - 1].cmp(
                    game.red_spice_price[gen.number - 1][gen.id]
                ) >= 0
            ) {
                document.getElementById(
                    "red" + gen.number + "_cost" + gen.id
                ).className = "red_cost"
            } else {
                document.getElementById(
                    "red" + gen.number + "_cost" + gen.id
                ).className = "empty_cost"
            }

            n =
                Math.floor(game.red_spice_bought[gen.number - 1][gen.id] / 5) *
                    5 +
                5 -
                game.red_spice_bought[gen.number - 1][gen.id]
            price = game.red_spice_price[gen.number - 1][gen.id]
                .mul(1 - price_scaling[gen.id] ** n)
                .div(1 - price_scaling[gen.id])
            if (gen.number === 1)
                document.getElementById(
                    "red" + gen.number + "_ucost" + gen.id
                ).innerHTML =
                    "-" + format_idec(price, game.notation) + " g red spice"
            else
                document.getElementById(
                    "red" + gen.number + "_ucost" + gen.id
                ).innerHTML =
                    "-" +
                    format_idec(price, game.notation) +
                    " g red spice " +
                    format_num(gen.number, 10)
            if (game.red_spice[gen.number - 1].cmp(price) >= 0) {
                document.getElementById(
                    "red" + gen.number + "_ucost" + gen.id
                ).className = "red_cost"
            } else {
                document.getElementById(
                    "red" + gen.number + "_ucost" + gen.id
                ).className = "empty_cost"
            }

            if (gen.id === 0) {
                element.style.display = "block"
            } else {
                if (
                    game.red_spice_gen[gen.number - 1][gen.id - 1].cmp(5) >= 0
                ) {
                    element.style.display = "block"
                } else {
                    element.style.display = "none"
                }
            }
        }
    }

    if (game.subtab === 0) {
        if (game.red_spice_gen[0][2].cmp(5) >= 0) {
            document.getElementById("red1_upgrades").style.display = "flex"

            if (game.red_bonus[1]) {
                document.getElementById("red1_desc1").innerHTML =
                    "Gain a " +
                    format_dec(2.1, game.notation) +
                    "x boost to all red spice production<br>(Currently: " +
                    format_inum(
                        Decimal.pow(2.1, game.red_strengthener[0]),
                        game.notation
                    ) +
                    "x)"
            } else {
                document.getElementById("red1_desc1").innerHTML =
                    "Gain a 2x boost to all red spice production<br>(Currently: " +
                    format_inum(
                        Decimal.pow(2, game.red_strengthener[0]),
                        game.notation
                    ) +
                    "x)"
            }
            document.getElementById("red1_pcost1").innerHTML =
                "-" +
                format_idec(game.red_strengthener_price[0], game.notation) +
                " g red spice"
            if (game.red_spice[0].cmp(game.red_strengthener_price[0]) >= 0) {
                document.getElementById("red1_strengthener").className =
                    "red_upgrade red_unlocked"
            } else {
                document.getElementById("red1_strengthener").className =
                    "red_upgrade red_locked"
            }

            document.getElementById("red1_pcost2").innerHTML =
                "-" +
                format_idec(unlock_price[0], game.notation) +
                " g red spice"
            document.getElementById("red1_pcost3").innerHTML =
                "-" + format_idec(auto_price[0], game.notation) + " g red spice"
            document.getElementById("red1_pcost4").innerHTML =
                "-" +
                format_idec(upgrade_price[0], game.notation) +
                " g red spice"
            document.getElementById("red1_pcost5").innerHTML =
                "-" +
                format_idec(bonus_price[0], game.notation) +
                " g red spice"
            document.getElementById("red1_pcost6").innerHTML =
                "-" +
                format_idec(bonus_price[1], game.notation) +
                " g red spice"
            document.getElementById("red1_pcost7").innerHTML =
                "-" +
                format_idec(bonus_price[2], game.notation) +
                " g red spice"
            document.getElementById("red1_pcost8").innerHTML =
                "-" +
                format_idec(bonus_price[3], game.notation) +
                " g red spice"

            if (game.red_spice_gen[0][5].cmp(5) >= 0) {
                document.getElementById("red1_desc2").innerHTML =
                    "Unlock a new red spice"

                if (game.red_unlock[0]) {
                    document.getElementById("red1_unlock").className =
                        "red_upgrade red_bought"

                    document.getElementById("red1_desc3").innerHTML =
                        "Unlock automation for red spice"

                    if (game.red_auto[0]) {
                        document.getElementById("red1_autoup").className =
                            "red_upgrade red_bought"
                        document.getElementById("red1_auto").style.display =
                            "inline"
                    } else {
                        if (game.red_spice[0].cmp(auto_price[0]) >= 0) {
                            document.getElementById("red1_autoup").className =
                                "red_upgrade red_unlocked"
                        } else {
                            document.getElementById("red1_autoup").className =
                                "red_upgrade red_locked"
                        }

                        document.getElementById("red1_auto").style.display =
                            "none"
                    }

                    let unlocked_spices = 1
                    for (let i = 0; i < total_spices; i++) {
                        if (game.red_unlock[i]) unlocked_spices++
                    }
                    if (game.red_bonus[3]) {
                        document.getElementById("red1_desc4").innerHTML =
                            "Boost ALL red spice production 4x for every red spice unlocked<br>(Currently: " +
                            format_inum(
                                Decimal.pow(4, unlocked_spices),
                                game.notation
                            ) +
                            "x)"
                    } else {
                        document.getElementById("red1_desc4").innerHTML =
                            "Boost ALL red spice production 2x for every red spice unlocked<br>(Currently: " +
                            format_inum(
                                Decimal.pow(2, unlocked_spices),
                                game.notation
                            ) +
                            "x)"
                    }

                    if (game.red_upgrade[0]) {
                        document.getElementById("red1_upgrade").className =
                            "red_upgrade red_bought"

                        document.getElementById("red1_upgrade2").style.display =
                            "block"
                        document.getElementById("red1_upgrade3").style.display =
                            "block"
                        document.getElementById("red1_upgrade4").style.display =
                            "block"
                        document.getElementById("red1_upgrade5").style.display =
                            "block"

                        document.getElementById("red1_desc5").innerHTML =
                            "Unlock automation for ALL red spices, permanently"

                        if (game.red_bonus[0]) {
                            document.getElementById("red1_upgrade2").className =
                                "red_upgrade red_bought"
                        } else {
                            if (game.red_spice[0].cmp(bonus_price[0]) >= 0) {
                                document.getElementById(
                                    "red1_upgrade2"
                                ).className = "red_upgrade red_unlocked"
                            } else {
                                document.getElementById(
                                    "red1_upgrade2"
                                ).className = "red_upgrade red_locked"
                            }
                        }

                        document.getElementById("red1_desc6").innerHTML =
                            "Repeatable spice production boost upgrades<br>" +
                            format_dec(2, game.notation) +
                            "x -> " +
                            format_dec(2.1, game.notation) +
                            "x"

                        if (game.red_bonus[1]) {
                            document.getElementById("red1_upgrade3").className =
                                "red_upgrade red_bought"
                        } else {
                            if (game.red_spice[0].cmp(bonus_price[1]) >= 0) {
                                document.getElementById(
                                    "red1_upgrade3"
                                ).className = "red_upgrade red_unlocked"
                            } else {
                                document.getElementById(
                                    "red1_upgrade3"
                                ).className = "red_upgrade red_locked"
                            }
                        }

                        document.getElementById("red1_desc7").innerHTML =
                            "Improve synergy between red spices by " +
                            format_num(50) +
                            "%"

                        if (game.red_bonus[2]) {
                            document.getElementById("red1_upgrade4").className =
                                "red_upgrade red_bought"
                        } else {
                            if (game.red_spice[0].cmp(bonus_price[2]) >= 0) {
                                document.getElementById(
                                    "red1_upgrade4"
                                ).className = "red_upgrade red_unlocked"
                            } else {
                                document.getElementById(
                                    "red1_upgrade4"
                                ).className = "red_upgrade red_locked"
                            }
                        }

                        document.getElementById("red1_desc8").innerHTML =
                            "Make the above upgrade " +
                            format_num(2) +
                            "x stronger"

                        if (game.red_bonus[3]) {
                            document.getElementById("red1_upgrade5").className =
                                "red_upgrade red_bought"
                        } else {
                            if (game.red_spice[0].cmp(bonus_price[3]) >= 0) {
                                document.getElementById(
                                    "red1_upgrade5"
                                ).className = "red_upgrade red_unlocked"
                            } else {
                                document.getElementById(
                                    "red1_upgrade5"
                                ).className = "red_upgrade red_locked"
                            }
                        }
                    } else {
                        if (game.red_spice[0].cmp(upgrade_price[0]) >= 0) {
                            document.getElementById("red1_upgrade").className =
                                "red_upgrade red_unlocked"
                        } else {
                            document.getElementById("red1_upgrade").className =
                                "red_upgrade red_locked"
                        }

                        document.getElementById("red1_upgrade2").style.display =
                            "none"
                        document.getElementById("red1_upgrade3").style.display =
                            "none"
                        document.getElementById("red1_upgrade4").style.display =
                            "none"
                        document.getElementById("red1_upgrade5").style.display =
                            "none"
                    }
                } else {
                    if (game.red_spice[0].cmp(unlock_price[0]) >= 0) {
                        document.getElementById("red1_unlock").className =
                            "red_upgrade red_unlocked"
                    } else {
                        document.getElementById("red1_unlock").className =
                            "red_upgrade red_locked"
                    }

                    document.getElementById("red1_desc3").innerHTML = "?????"
                    document.getElementById("red1_desc4").innerHTML = "?????"
                    document.getElementById("red1_upgrade2").style.display =
                        "none"
                    document.getElementById("red1_upgrade3").style.display =
                        "none"
                    document.getElementById("red1_upgrade4").style.display =
                        "none"
                    document.getElementById("red1_upgrade5").style.display =
                        "none"
                    document.getElementById("red1_auto").style.display = "none"
                }
            } else {
                document.getElementById("red1_desc2").innerHTML = "?????"
                document.getElementById("red1_desc3").innerHTML = "?????"
                document.getElementById("red1_desc4").innerHTML = "?????"
                document.getElementById("red1_upgrade2").style.display = "none"
                document.getElementById("red1_upgrade3").style.display = "none"
                document.getElementById("red1_upgrade4").style.display = "none"
                document.getElementById("red1_upgrade5").style.display = "none"
                document.getElementById("red1_auto").style.display = "none"
            }
        } else {
            document.getElementById("red1_upgrades").style.display = "none"
            document.getElementById("red1_auto").style.display = "none"
        }
    } else {
        if (game.red_spice_gen[game.subtab][0].cmp(5) >= 0) {
            document.getElementById(
                "red" + (game.subtab + 1) + "_upgrades"
            ).style.display = "flex"

            if (game.red_bonus[1]) {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_desc1"
                ).innerHTML =
                    "Gain a " +
                    format_dec(2.1, game.notation) +
                    "x boost to all red spice production up to red spice " +
                    format_num(game.subtab + 1, 10) +
                    "<br>(Currently: " +
                    format_inum(
                        Decimal.pow(2.1, game.red_strengthener[game.subtab]),
                        game.notation
                    ) +
                    "x)"
            } else {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_desc1"
                ).innerHTML =
                    "Gain a 2x boost to all red spice production up to red spice " +
                    format_num(game.subtab + 1, 10) +
                    "<br>(Currently: " +
                    format_inum(
                        Decimal.pow(2, game.red_strengthener[game.subtab]),
                        game.notation
                    ) +
                    "x)"
            }
            document.getElementById(
                "red" + (game.subtab + 1) + "_pcost1"
            ).innerHTML =
                "-" +
                format_idec(
                    game.red_strengthener_price[game.subtab],
                    game.notation
                ) +
                " g red spice " +
                format_num(game.subtab + 1, 10)
            if (
                game.red_spice[game.subtab].cmp(
                    game.red_strengthener_price[game.subtab]
                ) >= 0
            ) {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_strengthener"
                ).className = "red_upgrade red_unlocked"
            } else {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_strengthener"
                ).className = "red_upgrade red_locked"
            }

            if (game.subtab < total_spices - 1) {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_desc2"
                ).innerHTML = "Unlock a new red spice"
                if (game.red_unlock[game.subtab]) {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_unlock"
                    ).className = "red_upgrade red_bought"
                } else {
                    if (
                        game.red_spice[game.subtab].cmp(
                            unlock_price[game.subtab]
                        ) >= 0
                    ) {
                        document.getElementById(
                            "red" + (game.subtab + 1) + "_unlock"
                        ).className = "red_upgrade red_unlocked"
                    } else {
                        document.getElementById(
                            "red" + (game.subtab + 1) + "_unlock"
                        ).className = "red_upgrade red_locked"
                    }
                }
            }

            if (game.subtab < 6) {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_desc3"
                ).innerHTML =
                    "Unlock automation for red spice " +
                    format_num(game.subtab + 1, 10)
                if (game.red_auto[game.subtab]) {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_autoup"
                    ).className = "red_upgrade red_bought"
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_auto"
                    ).style.display = "inline"
                } else {
                    if (
                        game.red_spice[game.subtab].cmp(
                            auto_price[game.subtab]
                        ) >= 0
                    ) {
                        document.getElementById(
                            "red" + (game.subtab + 1) + "_autoup"
                        ).className = "red_upgrade red_unlocked"
                    } else {
                        document.getElementById(
                            "red" + (game.subtab + 1) + "_autoup"
                        ).className = "red_upgrade red_locked"
                    }

                    document.getElementById(
                        "red" + (game.subtab + 1) + "_auto"
                    ).style.display = "none"
                }
            } else {
                if (game.red_bonus[0]) {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_auto"
                    ).style.display = "inline"
                } else {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_auto"
                    ).style.display = "none"
                }
            }

            if (game.subtab === 1)
                document.getElementById(
                    "red" + (game.subtab + 1) + "_desc4"
                ).innerHTML =
                    "Red spice " +
                    format_num(game.subtab + 1, 10) +
                    " boosts red spice production by its amount"
            else
                document.getElementById(
                    "red" + (game.subtab + 1) + "_desc4"
                ).innerHTML =
                    "Red spice " +
                    format_num(game.subtab + 1, 10) +
                    " boosts red spice " +
                    format_num(game.subtab, 10) +
                    " production by its amount"
            if (game.red_upgrade[game.subtab]) {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_upgrade"
                ).className = "red_upgrade red_bought"
            } else {
                if (
                    game.red_spice[game.subtab].cmp(
                        upgrade_price[game.subtab]
                    ) >= 0
                ) {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_upgrade"
                    ).className = "red_upgrade red_unlocked"
                } else {
                    document.getElementById(
                        "red" + (game.subtab + 1) + "_upgrade"
                    ).className = "red_upgrade red_locked"
                }
            }

            if (game.subtab < total_spices - 1) {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_pcost2"
                ).innerHTML =
                    "-" +
                    format_idec(unlock_price[game.subtab], game.notation) +
                    " g red spice " +
                    format_num(game.subtab + 1, 10)
            }
            if (game.subtab < 6) {
                document.getElementById(
                    "red" + (game.subtab + 1) + "_pcost3"
                ).innerHTML =
                    "-" +
                    format_idec(auto_price[game.subtab], game.notation) +
                    " g red spice " +
                    format_num(game.subtab + 1, 10)
            }
            document.getElementById(
                "red" + (game.subtab + 1) + "_pcost4"
            ).innerHTML =
                "-" +
                format_idec(upgrade_price[game.subtab], game.notation) +
                " g red spice " +
                format_num(game.subtab + 1, 10)
        } else {
            document.getElementById(
                "red" + (game.subtab + 1) + "_upgrades"
            ).style.display = "none"
            document.getElementById(
                "red" + (game.subtab + 1) + "_auto"
            ).style.display = "none"
        }
    }

    if (game.red_unlock[0]) {
        document.getElementById("spices_tabs").style.display = "flex"

        for (let i = 2; i < total_spices; i++) {
            if (game.red_unlock[i - 1]) {
                document.getElementById("red" + (i + 1)).style.display = "block"
            } else {
                document.getElementById("red" + (i + 1)).style.display = "none"
            }
        }
    } else {
        document.getElementById("spices_tabs").style.display = "none"
    }
}

//graphics updates for statistics page
function stats_update() {
    let stats_str =
        "You have " +
        format_idec(game.red_spice[0], game.notation) +
        " g red spice."

    for (let i = 1; i < total_spices; i++) {
        if (game.red_unlock[i - 1]) {
            stats_str +=
                "<br>You have " +
                format_idec(game.red_spice[i], game.notation) +
                " g red spice " +
                format_num(i + 1, 10) +
                "."
        }
    }

    if (game.red_unlock[0]) {
        let unlocked_spices = 1
        for (let i = 0; i < total_spices; i++) {
            if (game.red_unlock[i]) unlocked_spices++
        }
        stats_str +=
            "<br><br>You have unlocked " +
            format_small(unlocked_spices) +
            " red spices."
    }

    stats_str +=
        "<br><br>You have accumulated a total of " +
        format_idec(game.total_spice, game.notation) +
        " g red spice."

    stats_str +=
        "<br><br><br>You have played for a total of " +
        format_time_long(game.total_time_played, game.notation) +
        "."

    if (game.red_spice[0].cmp(Decimal.pow(10, 9 * 10 ** 15)) >= 0) {
        stats_str +=
            "<br><br><br>You have now filled the entirety of existence with red spice.<br>Congratulations! You have beaten Red Spice Idle. There is nothing left"
    }

    document.getElementById("statistics_text").innerHTML = stats_str
}
