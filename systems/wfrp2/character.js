

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
            "influence": ["skills|basic|perception"],
            "value": 20
        },
        "aethyric_attunement": {
            "influence": ["skills|advanced|channelling", "skills|advanced|magical_sense"]
        },
        "alley_cat": {
            "influence": ["skills|basic|concealment", "skills|basic|silent_move"]
        },
        "ambidextrous": {
            "influence": ["stats|main|weapon", "stats|main|ballistic"]
        },
        "arcane_lore": {
            "influence": []
        },
        "armoured_casting": {
            "influence": []
        },
        "artistic": {
            "influence": ["skills|basic|evaluate", "skills|basic|trade"]
        },
        "contortionist": {
            "influence": ["skills|advanced|performer", "stats|main|agility"]
        },
        "coolheaded": {
            "influence": ["stats|main|will"],
            "mod": 5
        },
        "dark_lore": {
            "influence": []
        },
        "dark_magic": {
            "influence": []
        },
        "dealmaker": {
            "influence": ["skills|basic|evaluate", "skills|basic|haggle"]
        },
        "disarm": {
            "influence": []
        },
        "divine_lore": {
            "influence": []
        },
        "dwarfcraft": {
            "influence": ["skills|advanced|trade"]
        },
        "etiquette": {
            "influence": ["skills|basic|charm", "skills|basic|gossip"]
        },
        "excellent_vision": {
            "influence": ["skills|basic|perception", "skills|advanced|lip_reading"]
        },
        "fast_hands": {
            "influence": ["stats|main|weapon"]
        },
        "fearless": {
            "influence": []
        },
        "flee": {
            "influence": ["stats|secondary|movement"]
        },
        "fleet_footed": {
            "influence": ["stats|secondary|movement"],
            "mod": 5
        },
        "flier": {
            "influence": ["stats|secondary|movement"]
        },
        "frenzy": {
            "influence": ["stats|main|weapon", "stats|main|will", "stats|main|strength", "stats|main|intelligence"]
        },
        "frightening": {
            "influence": []
        },
        "grudgeborn_fury": {
            "influence": ["stats|main|weapon"]
        },
        "hardy": {
            "influence": ["stats|secondary|wounds"],
            "mod": 5
        },
        "hedge_magic": {
            "influence": []
        },
        "hoverer": {
            "influence": []
        },
        "keen_senses": {
            "influence": ["skills|basic|perception"]
        },
        "lesser_magic": {
            "influence": []
        },
        "lightning_parry": {
            "influence": ["stats|secondary|attacks"]
        },
        "lightning_reflexes": {
            "influence": ["stats|main|agility"],
            "mod": 5
        },
        "linguistics": {
            "influence": ["skills|advanced|readwrite", "skills|advanced|speak_language.*"]
        },
        "luck": {
            "influence": ["stats|secondary|fate_points"]
        },
        "marksman": {
            "influence": ["stats|main|ballistic"],
            "mod": 5
        },
        "master_gunner": {
            "influence": []
        },
        "master_orator": {
            "influence": ["skills|basic|charm"]
        },
        "meditation": {
            "influence": []
        },
        "menacing": {
            "influence": ["skills|basic|intimidate", "skills|advanced|torture"]
        },
        "mighty_missile": {
            "influence": []
        },
        "mighty_shot": {
            "influence": []
        },
        "mimic": {
            "influence": ["skills|basic|disguise", "skills|advanced|performer", "skills|advanced|speak_language.*"]
        },
        "natural_weapons": {
            "influence": []
        },
        "night_vision": {
            "influence": []
        },
        "orientation": {
            "influence": ["skills|advanced|navigation"]
        },
        "petty_magic": {
            "influence": []
        },
        "public_speaking": {
            "influence": ["skills|basic|charm"]
        },
        "quick_draw": {
            "influence": []
        },
        "rapid_reload": {
            "influence": []
        },
        "resistance_to_chaos": {
            "influence": ["stats|main|will"]
        },
        "resistance_to_disease": {
            "influence": ["stats|main|toughness"]
        },
        "resistance_to_magic": {
            "influence": ["stats|main|will"]
        },
        "resistance_to_poison": {
            "influence": ["stats|main|toughness"]
        },
        "rover": {
            "influence": ["skills|basic|concealment", "skills|basic|silent_move"]
        },
        "savvy": {
            "influence": ["stats|main|intelligence"],
            "mod": 5
        },
        "schemer": {
            "influence": ["skills|basic|charm", "stats|main|will"]
        },
        "seasoned_traveller": {
            "influence": ["skills|advanced|common_knowledge.*", "skills|advanced|speak_language.*"]
        },
        "sharpshooter": {
            "influence": ["stats|main|ballistic"]
        },
        "sixth_sense": {
            "influence": []
        },
        "specialist_weapon_group_various": {
            "influence": []
        },
        "stouthearted": {
            "influence": ["stats|main|will"]
        },
        "street_fighting": {
            "influence": ["stats|main|weapon"]
        },
        "streetwise": {
            "influence": ["skills|basic|charm", "skills|basic|gossip"]
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
            "influence": ["stats|secondary|movement"]
        },
        "suave": {
            "influence": ["stats|main|fellowship"],
            "mod": 5
        },
        "sure_shot": {
            "influence": []
        },
        "surgery": {
            "influence": ["skills|advanced|heal"]
        },
        "super_numerate": {
            "influence": ["skills|basic|perception", "skills|basic|gamble", "skills|advanced|navigation"]
        },
        "swashbuckler": {
            "influence": []
        },
        "terrifying": {
            "influence": []
        },
        "trapfinder": {
            "influence": ["skills|basic|perception", "skills|advanced|pick_lock"]
        },
        "trick_riding": {
            "influence": ["skills|advanced|ride"]
        },
        "tunnel_rat": {
            "influence": ["skills|basic|concealment", "skills|basic|silent_move"]
        },
        "undead": {
            "influence": []
        },
        "unsettling": {
            "influence": []
        },
        "very_resilient": {
            "influence": ["stats|main|toughness"],
            "mod": 5
        },
        "very_strong": {
            "influence": ["stats|main|strength"],
            "mod": 5
        },
        "warrior_born": {
            "influence": ["stats|main|weapon"],
            "mod": 5
        },
        "wrestling": {
            "influence": ["stats|main|weapon", "stats|main|strength"]
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
            talents[talent_name].influence.forEach(function(path){
                let stat = jspath_ref(character, path)
                var talent = {
                    "id": talent_id,
                    "name": talent_name
                }
                "talents" in stat ? stat.talents.push(talent) : stat.talents = [talent]
                stat.starting += "mod" in talents[talent_name] ? talents[talent_name].mod : 0
            });
        }
        
        character.talents[talent_name] = {
            "current": current,
            "id": current >= 1 ? talent_id++ : -1
        }
    }

    for(var stat in character.stats.main) {
        character.stats.main[stat].current = character.stats.main[stat].starting + 5 * Math.min(character.stats.main[stat].taken, character.stats.main[stat].advance)
    }
    for(var stat in character.stats.secondary) {
        if(["strength_bonus", "toughness_bonus", "insanity_points", "fate_points"].includes(stat)) {
            continue
        } else {
            character.stats.secondary[stat].current = character.stats.secondary[stat].starting + Math.min(character.stats.secondary[stat].taken, character.stats.secondary[stat].advance)
        }
    }

    character.stats.secondary.insanity_points.advance = "disabled";
    character.stats.secondary.insanity_points.taken = "disabled";
    character.stats.secondary.fate_points.advance = "disabled";
    character.stats.secondary.fate_points.taken = "disabled";
    character.stats.secondary.strength_bonus = {
        "current": parseInt(character.stats.main.strength.current / 10),
        "starting": "disabled",
        "advance": "disabled",
        "taken": "disabled",
    };
    character.stats.secondary.toughness_bonus = {
        "current": parseInt(character.stats.main.toughness.current / 10),
        "starting": "disabled",
        "advance": "disabled",
        "taken": "disabled",
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