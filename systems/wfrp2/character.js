

function expand_skills(character) {
    var skill_types = ["basic", "advanced"];

    for(var skill_type in skill_types) {
        for(var name in character.skills[skill_types[skill_type]]) {
            character.skills[skill_types[skill_type]][name] = {
                "taken": name in character.skills[skill_types[skill_type]] ? character.skills[skill_types[skill_type]][name] : 0
            }
        }
    }
}

function process_character_sheet(character) {
    var skill_types = ["basic", "advanced"];

    expand_skills(character);
    
    var talents = {
        "acute_hearing": {
            "influence": [
                {
                    "path": "skills|basic|perception",
                    "potential": 20
                }
            ]
        },
        "aethyric_attunement": {
            "influence": [
                {
                    "path": "skills|advanced|channelling",
                    "mod": 10
                },{
                    "path": "skills|advanced|magical_sense",
                    "mod": 10
                }
            ]
        },
        "alley_cat": {
            "influence": [
                {
                    "path": "skills|basic|concealment",
                    "potential": 10
                },{
                    "path": "skills|basic|silent_move",
                    "potential": 10
                }
            ]
        },
        "ambidextrous": {
            "influence": [
                {
                    "path": "stats|main|weapon"
                },{
                    "path": "stats|main|ballistic"
                }
            ]
        },
        "arcane_lore": {
            "influence": []
        },
        "armoured_casting": {
            "influence": []
        },
        "artistic": {
            "influence": [
                {
                    "path": "skills|basic|evaluate",
                    "potential": 10
                },{
                    "path": "skills|basic|trade_artist",
                    "mod": 20
                }
            ]
        },
        "contortionist": {
            "influence": [
                {
                    "path": "skills|advanced|performer",
                    "potential": 10
                },{
                    "path": "stats|main|agility",
                    "potential": 20
                }
            ]
        },
        "coolheaded": {
            "influence": [
                {
                    "path": "stats|main|will",
                    "mod": 5
                }
            ],
        },
        "dark_lore": {
            "influence": []
        },
        "dark_magic": {
            "influence": []
        },
        "dealmaker": {
            "influence": [
                {
                    "path": "skills|basic|evaluate",
                    "mod": 10
                },{
                    "path": "skills|basic|haggle",
                    "mod": 10
                }
            ]
        },
        "disarm": {
            "influence": []
        },
        "divine_lore": {
            "influence": []
        },
        "dwarfcraft": {
            "influence": [
                {
                    "path": "skills|advanced|trade_armourer",
                    "mod": 10
                },{
                    "path": "skills|advanced|trade_brewer",
                    "mod": 10
                },{
                    "path": "skills|advanced|trade_gem_cutter",
                    "mod": 10
                },{
                    "path": "skills|advanced|trade_gunsmith",
                    "mod": 10
                },{
                    "path": "skills|advanced|trade_miner",
                    "mod": 10
                },{
                    "path": "skills|advanced|trade_smith",
                    "mod": 10
                },{
                    "path": "skills|advanced|trade_stoneworker",
                    "mod": 10
                },{
                    "path": "skills|advanced|trade_weaponsmith",
                    "mod": 10
                }
            ]
        },
        "etiquette": {
            "influence": [
                {
                    "path": "skills|basic|charm",
                    "potential": 10
                },{
                    "path": "skills|basic|gossip",
                    "potential": 10
                }
            ]
        },
        "excellent_vision": {
            "influence": [
                {
                    "path": "skills|basic|perception",
                    "potential": 10
                },{
                    "path": "skills|advanced|lip_reading",
                    "potential": 10
                }
            ]
        },
        "fast_hands": {
            "influence": [
                {
                    "path": "stats|main|weapon",
                    "potential": 20
                }
            ]
        },
        "fearless": {
            "influence": []
        },
        "flee": {
            "influence": [
                {
                    "path": "stats|secondary|movement",
                    "potential": 1
                }
            ]
        },
        "fleet_footed": {
            "influence": [
                {
                    "path": "stats|secondary|movement",
                    "mod": 5
                }
            ],
        },
        "flier": {
            "influence": [
                {
                    "path": "stats|secondary|movement"
                }
            ]
        },
        "frenzy": {
            "influence": [
                {
                    "path": "stats|main|weapon"
                },{
                    "path": "stats|main|will"
                },{
                    "path": "stats|main|strength"
                },{
                    "path": "stats|main|intelligence"
                }
            ]
        },
        "frightening": {
            "influence": []
        },
        "grudgeborn_fury": {
            "influence": [
                {
                    "path": "stats|main|weapon",
                    "potential": 5
                }
            ]
        },
        "hardy": {
            "influence": [
                {
                    "path": "stats|secondary|wounds",
                    "mod": 5
                }
            ],
        },
        "hedge_magic": {
            "influence": []
        },
        "hoverer": {
            "influence": []
        },
        "keen_senses": {
            "influence": [
                {
                    "path": "skills|basic|perception",
                    "mod": 20
                }
            ]
        },
        "lesser_magic": {
            "influence": []
        },
        "lightning_parry": {
            "influence": [
                {
                    "path": "stats|secondary|attacks"
                }
            ]
        },
        "lightning_reflexes": {
            "influence": [
                {
                    "path": "stats|main|agility",
                    "mod": 5
                }
            ],
        },
        "linguistics": {
            "influence": [
                {
                    "path": "skills|advanced|readwrite",
                    "mod": 10
                },{
                    "path": "skills|advanced|speak_language.*",
                    "mod": 10
                }
            ]
        },
        "luck": {
            "influence": [
                {
                    "path": "stats|secondary|fate_points"
                }
            ]
        },
        "marksman": {
            "influence": [
                {
                    "path": "stats|main|ballistic",
                    "mod": 5
                }
            ],
        },
        "master_gunner": {
            "influence": []
        },
        "master_orator": {
            "influence": [
                {
                    "path": "skills|basic|charm"
                }
            ]
        },
        "meditation": {
            "influence": []
        },
        "menacing": {
            "influence": [
                {
                    "path": "skills|basic|intimidate",
                    "mod": 10
                },{
                    "path": "skills|advanced|torture",
                    "mod": 10
                }
            ]
        },
        "mighty_missile": {
            "influence": []
        },
        "mighty_shot": {
            "influence": [
                {
                    "path": "stats|main|ballistic"
                }
            ]
        },
        "mimic": {
            "influence": [
                {
                    "path": "skills|basic|disguise",
                    "potential": 10
                },{
                    "path": "skills|advanced|speak_language.*",
                    "potential": 10
                },{
                    "path": "skills|advanced|performer_actor",
                    "mod": 10
                },{
                    "path": "skills|advanced|performer_clown",
                    "mod": 10
                },{
                    "path": "skills|advanced|performer_comedian",
                    "mod": 10
                },{
                    "path": "skills|advanced|performer_jester",
                    "mod": 10
                },{
                    "path": "skills|advanced|performer_storyteller",
                    "mod": 10
                }
            ]
        },
        "natural_weapons": {
            "influence": []
        },
        "night_vision": {
            "influence": []
        },
        "orientation": {
            "influence": [
                {
                    "path": "skills|advanced|navigation",
                    "mod": 10
                }
            ]
        },
        "petty_magic": {
            "influence": []
        },
        "public_speaking": {
            "influence": [
                {
                    "path": "skills|basic|charm"
                }
            ]
        },
        "quick_draw": {
            "influence": []
        },
        "rapid_reload": {
            "influence": []
        },
        "resistance_to_chaos": {
            "influence": [
                {
                    "path": "stats|main|will",
                    "potential": 10
                }
            ]
        },
        "resistance_to_disease": {
            "influence": [
                {
                    "path": "stats|main|toughness",
                    "potential": 10
                }
            ]
        },
        "resistance_to_magic": {
            "influence": [
                {
                    "path": "stats|main|will",
                    "potential": 10
                }
            ]
        },
        "resistance_to_poison": {
            "influence": [
                {
                    "path": "stats|main|toughness",
                    "potential": 10
                }
            ]
        },
        "rover": {
            "influence": [
                {
                    "path": "skills|basic|concealment",
                    "potential": 10
                },{
                    "path": "skills|basic|silent_move",
                    "potential": 10
                }
            ]
        },
        "savvy": {
            "influence": [
                {
                    "path": "stats|main|intelligence",
                    "mod": 5
                }
            ],
        },
        "schemer": {
            "influence": [
                {
                    "path": "skills|basic|charm",
                    "potential": 10
                },{
                    "path": "stats|main|will",
                    "potential": 10
                }
            ]
        },
        "seasoned_traveller": {
            "influence": [
                {
                    "path": "skills|advanced|common_knowledge.*",
                    "mod": 10
                },{
                    "path": "skills|advanced|speak_language.*",
                    "mod": 10
                }
            ]
        },
        "sharpshooter": {
            "influence": [
                {
                    "path": "stats|main|ballistic"
                }
            ]
        },
        "sixth_sense": {
            "influence": []
        },
        "specialist_weapon_group_various": {
            "influence": [] 
        },
        "specialist_weapon_group_gunpowder": {
            "influence": []
        },
        "specialist_weapon_group_fencing": {
            "influence": []
        },
        "specialist_weapon_group_two_handed": {
            "influence": []
        },
        "specialist_weapon_group_flail": {
            "influence": []
        },
        "specialist_weapon_group_parrying": {
            "influence": []
        },
        "specialist_weapon_group_cavalry": {
            "influence": []
        },
        "specialist_weapon_group_entangling": {
            "influence": []
        },
        "specialist_weapon_group_crossbow": {
            "influence": []
        },
        "specialist_weapon_group_longbow": {
            "influence": []
        },
        "specialist_weapon_group_engineer": {
            "influence": []
        },
        "specialist_weapon_group_sling": {
            "influence": []
        },
        "specialist_weapon_group_throwing": {
            "influence": []
        },
        "stouthearted": {
            "influence": [
                {
                    "path": "stats|main|will",
                    "potential": 10
                }
            ]
        },
        "street_fighting": {
            "influence": [
                {
                    "path": "stats|main|weapon",
                    "potential": 10
                }
            ]
        },
        "streetwise": {
            "influence": [
                {
                    "path": "skills|basic|charm",
                    "potential": 10
                },{
                    "path": "skills|basic|gossip",
                    "potential": 10
                }
            ]
        },
        "strike_mighty_blow": {
            "influence": []
        },
        "strike_to_injure": {
            "influence": []
        },
        "strike_to_stun": {
            "influence": []
        },
        "strongminded": {
            "influence": []
        },
        "sturdy": {
            "influence": [
                {
                    "path": "stats|secondary|movement"
                }
            ]
        },
        "suave": {
            "influence": [
                {
                    "path": "stats|main|fellowship",
                    "mod": 5
                }
            ],
        },
        "sure_shot": {
            "influence": []
        },
        "surgery": {
            "influence": [
                {
                    "path": "skills|advanced|heal",
                    "mod": 10
                }
            ]
        },
        "super_numerate": {
            "influence": [
                {
                    "path": "skills|basic|perception",
                    "potential": 20
                },{
                    "path": "skills|basic|gamble",
                    "mod": 10
                },{
                    "path": "skills|advanced|navigation",
                    "mod": 10
                }
            ]
        },
        "swashbuckler": {
            "influence": []
        },
        "terrifying": {
            "influence": []
        },
        "trapfinder": {
            "influence": [
                {
                    "path": "skills|basic|perception",
                    "potential": 10
                },{
                    "path": "skills|advanced|pick_lock",
                    "potential": 10
                }
            ]
        },
        "trick_riding": {
            "influence": [
                {
                    "path": "skills|advanced|ride",
                    "mod": 10
                }
            ]
        },
        "tunnel_rat": {
            "influence": [
                {
                    "path": "skills|basic|concealment",
                    "potential": 10
                },{
                    "path": "skills|basic|silent_move",
                    "potential": 10
                }
            ]
        },
        "undead": {
            "influence": []
        },
        "unsettling": {
            "influence": []
        },
        "very_resilient": {
            "influence": [
                {
                    "path": "stats|main|toughness",
                    "mod": 5
                }
            ],
        },
        "very_strong": {
            "influence": [
                {
                    "path": "stats|main|strength",
                    "mod": 5
                }
            ],
        },
        "warrior_born": {
            "influence": [
                {
                    "path": "stats|main|weapon",
                    "mod": 5
                }
            ],
        },
        "wrestling": {
            "influence": [
                {
                    "path": "stats|main|weapon",
                    "potential": 10
                },{
                    "path": "stats|main|strength",
                    "potential": 10
                }
            ]
        }
    }

    if(!("talents" in character)) {
        character.talents = {}
    }
    var talent_id = 1;
    for(var talent_name in talents) {
        var current = 0;
        if(talent_name in character.talents) {
            current = 1;
            talents[talent_name].influence.forEach(function(influence){
                var mod = "mod" in influence ? influence.mod : 0
                var potential = "potential" in influence ? influence.potential : 0

                let stats = jspath_ref(character, influence.path)
                for(var stat in stats) {
                    var talent = {
                        "id": talent_id,
                        "name": talent_name
                    }
                    "talents" in stats[stat] ? stats[stat].talents.push(talent) : stats[stat].talents = [talent]
                    stats[stat].starting = "starting" in stats[stat] ? stats[stat].starting + mod : mod
                    stats[stat].potential = "potential" in stats[stat] ? Math.max(stats[stat].potential, potential) : potential
                }
            });
        }
        
        character.talents[talent_name] = {
            "current": current,
            "id": current >= 1 ? talent_id++ : -1
        }
    }

    for(var stat in character.stats.main) {
        character.stats.main[stat].current = character.stats.main[stat].starting + 5 * Math.min(character.stats.main[stat].taken, character.stats.main[stat].advance)
        character.stats.main[stat].no_advance = false
    }
    for(var stat in character.stats.secondary) {
        if(["strength_bonus", "toughness_bonus", "insanity_points", "fate_points"].includes(stat)) {
            continue
        } else {
            character.stats.secondary[stat].current = character.stats.secondary[stat].starting + Math.min(character.stats.secondary[stat].taken, character.stats.secondary[stat].advance)
            character.stats.secondary[stat].no_advance = false
        }
    }

    character.stats.secondary.insanity_points.advance = 0;
    character.stats.secondary.insanity_points.taken = 0;
    character.stats.secondary.insanity_points.no_advance = true;
    character.stats.secondary.fate_points.advance = 0;
    character.stats.secondary.fate_points.taken = 0;
    character.stats.secondary.fate_points.no_advance = true;
    character.stats.secondary.strength_bonus = {
        "current": parseInt(character.stats.main.strength.current / 10),
        "starting": "disabled",
        "advance": 0,
        "taken": 0,
        "no_advance": true
    };
    character.stats.secondary.toughness_bonus = {
        "current": parseInt(character.stats.main.toughness.current / 10),
        "starting": "disabled",
        "advance": 0,
        "taken": 0,
        "no_advance": true
    };

    var skills = {
        "animal_care": "stats|main|intelligence[current]",
        "charm": "stats|main|fellowship[current]",
        "command": "stats|main|fellowship[current]",
        "concealment": "stats|main|agility[current]",
        "consume_alcohol": "stats|main|toughness[current]",
        "disguise": "stats|main|fellowship[current]",
        "drive": "stats|main|strength[current]",
        "evaluate": "stats|main|intelligence[current]",
        "gamble": "stats|main|intelligence[current]",
        "gossip": "stats|main|fellowship[current]",
        "haggle": "stats|main|fellowship[current]",
        "intimidate": "stats|main|strength[current]",
        "outdoor_survival": "stats|main|intelligence[current]",
        "perception": "stats|main|intelligence[current]",
        "ride": "stats|main|agility[current]",
        "row": "stats|main|strength[current]",
        "scale_sheer_surface": "stats|main|strength[current]",
        "search": "stats|main|intelligence[current]",
        "silent_move": "stats|main|agility[current]",
        "swim": "stats|main|strength[current]",
        "academic_knowledge": "stats|main|intelligence[current]",
        "academic_knowledge_arts": "stats|main|intelligence[current]",
        "academic_knowledge_astronomy": "stats|main|intelligence[current]",
        "academic_knowledge_daemonology": "stats|main|intelligence[current]",
        "academic_knowledge_engineering": "stats|main|intelligence[current]",
        "academic_knowledge_genealogyheraldry": "stats|main|intelligence[current]",
        "academic_knowledge_history": "stats|main|intelligence[current]",
        "academic_knowledge_law": "stats|main|intelligence[current]",
        "academic_knowledge_magic": "stats|main|intelligence[current]",
        "academic_knowledge_necromancy": "stats|main|intelligence[current]",
        "academic_knowledge_philosophy": "stats|main|intelligence[current]",
        "academic_knowledge_runes": "stats|main|intelligence[current]",
        "academic_knowledge_science": "stats|main|intelligence[current]",
        "academic_knowledge_strategytactics": "stats|main|intelligence[current]",
        "academic_knowledge_theology": "stats|main|intelligence[current]",
        "animal_training": "stats|main|fellowship[current]",
        "blather": "stats|main|fellowship[current]",
        "channelling": "stats|main|will[current]",
        "charm_animal": "stats|main|fellowship[current]",
        "common_knowledge": "stats|main|intelligence[current]",
        "common_knowledge_border_princes": "stats|main|intelligence[current]",
        "common_knowledge_bretonnia": "stats|main|intelligence[current]",
        "common_knowledge_dwarfs": "stats|main|intelligence[current]",
        "common_knowledge_elves": "stats|main|intelligence[current]",
        "common_knowledge_the_empire": "stats|main|intelligence[current]",
        "common_knowledge_estalia": "stats|main|intelligence[current]",
        "common_knowledge_halflings": "stats|main|intelligence[current]",
        "common_knowledge_kislev": "stats|main|intelligence[current]",
        "common_knowledge_norsca": "stats|main|intelligence[current]",
        "common_knowledge_ogres": "stats|main|intelligence[current]",
        "common_knowledge_tilea": "stats|main|intelligence[current]",
        "common_knowledge_the_wasteland": "stats|main|intelligence[current]",
        "dodge_blow": "stats|main|agility[current]",
        "follow_trail": "stats|main|intelligence[current]",
        "heal": "stats|main|intelligence[current]",
        "hypnotism": "stats|main|will[current]",
        "lip_reading": "stats|main|intelligence[current]",
        "magical_sense": "stats|main|will[current]",
        "navigation": "stats|main|intelligence[current]",
        "performer": "stats|main|fellowship[current]",
        "performer_acrobat": "stats|main|fellowship[current]",
        "performer_actor": "stats|main|fellowship[current]",
        "performer_clown": "stats|main|fellowship[current]",
        "performer_comedian": "stats|main|fellowship[current]",
        "performer_dancer": "stats|main|fellowship[current]",
        "performer_fire_eater": "stats|main|fellowship[current]",
        "performer_jester": "stats|main|fellowship[current]",
        "performer_juggler": "stats|main|fellowship[current]",
        "performer_mime": "stats|main|fellowship[current]",
        "performer_musician": "stats|main|fellowship[current]",
        "performer_palm_reader": "stats|main|fellowship[current]",
        "performer_singer": "stats|main|fellowship[current]",
        "performer_storyteller": "stats|main|fellowship[current]",
        "pick_lock": "stats|main|agility[current]",
        "prepare_poison": "stats|main|intelligence[current]",
        "readwrite": "stats|main|intelligence[current]",
        "sail": "stats|main|agility[current]",
        "secret_language": "stats|main|intelligence[current]",
        "secret_language_battle_tongue": "stats|main|intelligence[current]",
        "secret_language_guild_tongue": "stats|main|intelligence[current]",
        "secret_language_thieves_tongue": "stats|main|intelligence[current]",
        "secret_language_ranger_tongue": "stats|main|intelligence[current]",
        "secret_signs": "stats|main|intelligence[current]",
        "secret_signs_scout": "stats|main|intelligence[current]",
        "secret_signs_templar": "stats|main|intelligence[current]",
        "secret_signs_thief": "stats|main|intelligence[current]",
        "secret_signs_ranger": "stats|main|intelligence[current]",
        "set_trap": "stats|main|agility[current]",
        "shadowing": "stats|main|agility[current]",
        "sleight_of_hand": "stats|main|agility[current]",
        "speak_arcane_language": "stats|main|intelligence[current]",
        "speak_arcane_language_magick": "stats|main|intelligence[current]",
        "speak_arcane_language_daemonic": "stats|main|intelligence[current]",
        "speak_arcane_language_arcane_elf": "stats|main|intelligence[current]",
        "speak_language": "stats|main|intelligence[current]",
        "speak_language_breton": "stats|main|intelligence[current]",
        "speak_language_eltharin": "stats|main|intelligence[current]",
        "speak_language_estalian": "stats|main|intelligence[current]",
        "speak_language_halfling": "stats|main|intelligence[current]",
        "speak_language_khazalid": "stats|main|intelligence[current]",
        "speak_language_kislevian": "stats|main|intelligence[current]",
        "speak_language_norse": "stats|main|intelligence[current]",
        "speak_language_reikspiel": "stats|main|intelligence[current]",
        "speak_language_tilean": "stats|main|intelligence[current]",
        "speak_language_classical": "stats|main|intelligence[current]",
        "speak_language_dark_tongue": "stats|main|intelligence[current]",
        "speak_language_goblin_tongue": "stats|main|intelligence[current]",
        "speak_language_grumbarth": "stats|main|intelligence[current]",
        "torture": "stats|main|fellowship[current]",
        "trade": "stats|main|intelligence[current]",
        "trade_apothecary": "stats|main|intelligence[current]",
        "trade_armourer": "stats|main|strength[current]",
        "trade_artist": "stats|main|agility[current]",
        "trade_bowyer": "stats|main|agility[current]",
        "trade_brewer": "stats|main|intelligence[current]",
        "trade_calligrapher": "stats|main|agility[current]",
        "trade_candlemaker": "stats|main|agility[current]",
        "trade_carpenter": "stats|main|agility[current]",
        "trade_cartographer": "stats|main|agility[current]",
        "trade_cook": "stats|main|intelligence[current]",
        "trade_cooper": "stats|main|strength[current]",
        "trade_embalmer": "stats|main|intelligence[current]",
        "trade_farmer": "stats|main|strength[current]",
        "trade_gem cutter": "stats|main|agility[current]",
        "trade_goldsmith": "stats|main|agility[current]",
        "trade_gunsmith": "stats|main|agility[current]",
        "trade_herbalist": "stats|main|intelligence[current]",
        "trade_merchant": "stats|main|fellowship[current]",
        "trade_miller": "stats|main|strength[current]",
        "trade_miner": "stats|main|strength[current]",
        "trade_prospector": "stats|main|strength[current]",
        "trade_shipwright": "stats|main|intelligence[current]",
        "trade_shoemaker": "stats|main|agility[current]",
        "trade_smith": "stats|main|strength[current]",
        "trade_stoneworker": "stats|main|agility[current]",
        "trade_tailor": "stats|main|agility[current]",
        "trade_tanner": "stats|main|strength[current]",
        "trade_weaponsmith": "stats|main|strength[current]",
        "ventriloquism": "stats|main|fellowship[current]",
    };
    
    for(var skill_type in skill_types) {
        for(var name in character.skills[skill_types[skill_type]]) {
            var skill = jspath_val(character, skills[name])
            var current = 0;
            if(!(name in character.skills[skill_types[skill_type]]) || character.skills[skill_types[skill_type]][name].taken == 0) {
                explanation = skill
                if(skill_types[skill_type] == "basic") {
                    current = Math.ceil(skill.value / 2)
                } else {
                    current = 0
                }
            } else {
                current = skill.value + (character.skills[skill_types[skill_type]][name].taken - 1) * 10
            }

            character.skills[skill_types[skill_type]][name].current = current
        }
    }
    
    return character;
}