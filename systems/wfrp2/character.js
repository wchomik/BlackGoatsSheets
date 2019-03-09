function process_character_sheet(character) {
    for(var stat in character.stats.main) {
        character.stats.main[stat].current = character.stats.main[stat].starting + 5 * Math.min(character.stats.main[stat].taken, character.stats.main[stat].advance)
    }
    for(var stat in character.stats.secondary) {
        if(["strength_bonus", "toughness_bonus", "insanity_points", "fate_points"].includes(stat)) {
            continue;
        }
        character.stats.secondary[stat].current = character.stats.secondary[stat].starting + Math.min(character.stats.secondary[stat].taken, character.stats.secondary[stat].advance)
    }

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
    character.stats.secondary.insanity_points.advance = "disabled";
    character.stats.secondary.insanity_points.taken = "disabled";
    character.stats.secondary.fate_points.advance = "disabled";
    character.stats.secondary.fate_points.taken = "disabled";

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
    var skill_types = ["basic", "advanced"];
    for(var skill_type in skill_types) {
        for(var name in character.skills[skill_types[skill_type]]) {
            var skill = jspath_val(character, skills[name])
            var current = 0;
            if(!(name in character.skills[skill_types[skill_type]]) || character.skills[skill_types[skill_type]][name] == 0) {
                explanation = skill
                if(skill_types[skill_type] == "basic") {
                    current = Math.ceil(skill.value / 2)
                } else {
                    current = 0
                }
            } else {
                current = skill.value + (character.skills[skill_types[skill_type]][name] - 1) * 10
            }
            character.skills[skill_types[skill_type]][name] = {
                "current": current,
                "taken": character.skills[skill_types[skill_type]][name]
            }
        }
    }

    var talents = {
        "acute_hearing": {
            "influence": ["skills|basic|perception"],
            "value": 20
        },
        "aethyric_attunement": {
            "influence": ["skills|advanced|channelling", "skills|advanced|magical_sense"],
            "mods": ""
        },
        "alley_cat": {
            "influence": ["skills|basic|concealment", "skills|basic|silent_move"],
            "mods": ""
        },
        "ambidextrous": {
            "influence": ["stats|main|weapon", "stats|main|ballistic"],
            "mods": ""
        },
        "arcane_lore": {
            "influence": [],
            "mods": ""
        },
        "armoured_casting": {
            "influence": [],
            "mods": ""
        },
        "artistic": {
            "influence": ["skills|basic|evaluate", "skills|basic|trade"],
            "mods": ""
        },
        "contortionist": {
            "influence": ["skills|advanced|performer", "stats|main|agility"],
            "mods": ""
        },
        "coolheaded": {
            "influence": ["stats|main|will"],
            "mods": ""
        },
        "dark_lore": {
            "influence": [],
            "mods": ""
        },
        "dark_magic": {
            "influence": [],
            "mods": ""
        },
        "dealmaker": {
            "influence": ["skills|basic|evaluate", "skills|basic|haggle"],
            "mods": ""
        },
        "disarm": {
            "influence": [],
            "mods": ""
        },
        "divine_lore": {
            "influence": [],
            "mods": ""
        },
        "dwarfcraft": {
            "influence": ["skills|advanced|trade"],
            "mods": ""
        },
        "etiquette": {
            "influence": ["skills|basic|charm", "skills|basic|gossip"],
            "mods": ""
        },
        "excellent_vision": {
            "influence": ["skills|basic|perception", "skills|advanced|lip_reading"],
            "mods": ""
        },
        "fast_hands": {
            "influence": ["stats|main|weapon"],
            "mods": ""
        },
        "fearless": {
            "influence": [],
            "mods": ""
        },
        "flee": {
            "influence": ["stats|secondary|movement"],
            "mods": ""
        },
        "fleet_footed": {
            "influence": ["stats|secondary|movement"],
            "mods": ""
        },
        "flier": {
            "influence": ["stats|secondary|movement"],
            "mods": ""
        },
        "frenzy": {
            "influence": ["stats|main|weapon", "stats|main|will", "stats|main|strength", "stats|main|intelligence"],
            "mods": ""
        },
        "frightening": {
            "influence": [],
            "mods": ""
        },
        "grudgeborn_fury": {
            "influence": ["stats|main|weapon"],
            "mods": ""
        },
        "hardy": {
            "influence": ["stats|secondary|wounds"],
            "mods": []
        },
        "hedge_magic": {
            "influence": [],
            "mods": ""
        },
        "hoverer": {
            "influence": [],
            "mods": ""
        },
        "keen_senses": {
            "influence": ["skills|basic|perception"],
            "mods": ""
        },
        "lesser_magic": {
            "influence": [],
            "mods": ""
        },
        "lightning_parry": {
            "influence": ["stats|secondary|attacks"],
            "mods": ""
        },
        "lightning_reflexes": {
            "influence": ["stats|main|agility"],
            "mods": ""
        },
        "linguistics": {
            "influence": ["skills|advanced|readwrite", "skills|advanced|speak_language"],
            "mods": ""
        },
        "luck": {
            "influence": ["stats|secondary|fate_points"],
            "mods": ""
        },
        "marksman": {
            "influence": ["stats|main|ballistic"],
            "mods": ""
        },
        "master_gunner": {
            "influence": [],
            "mods": ""
        },
        "master_orator": {
            "influence": ["skills|basic|charm"],
            "mods": ""
        },
        "meditation": {
            "influence": [],
            "mods": ""
        },
        "menacing": {
            "influence": ["skills|basic|intimidate", "skills|advanced|torture"],
            "mods": ""
        },
        "mighty_missile": {
            "influence": [],
            "mods": ""
        },
        "mighty_shot": {
            "influence": [],
            "mods": ""
        },
        "mimic": {
            "influence": ["skills|basic|disguise", "skills|advanced|performer", "skills|advanced|speak_language"],
            "mods": ""
        },
        "natural_weapons": {
            "influence": [],
            "mods": ""
        },
        "night_vision": {
            "influence": [],
            "mods": ""
        },
        "orientation": {
            "influence": ["skills|advanced|navigation"],
            "mods": ""
        },
        "petty_magic": {
            "influence": [],
            "mods": ""
        },
        "public_speaking": {
            "influence": ["skills|basic|charm"],
            "mods": ""
        },
        "quick_draw": {
            "influence": [],
            "mods": ""
        },
        "rapid_reload": {
            "influence": [],
            "mods": ""
        },
        "resistance_to_chaos": {
            "influence": ["stats|main|will"],
            "mods": ""
        },
        "resistance_to_disease": {
            "influence": ["stats|main|toughness"],
            "mods": ""
        },
        "resistance_to_magic": {
            "influence": ["stats|main|will"],
            "mods": ""
        },
        "resistance_to_poison": {
            "influence": ["stats|main|toughness"],
            "mods": ""
        },
        "rover": {
            "influence": ["skills|basic|concealment", "skills|basic|silent_move"],
            "mods": ""
        },
        "savvy": {
            "influence": ["stats|main|intelligence"],
            "mods": ""
        },
        "schemer": {
            "influence": ["skills|basic|charm", "stats|main|will"],
            "mods": ""
        },
        "seasoned_traveller": {
            "influence": ["skills|advanced|common_knowledge", "skills|advanced|speak_language"],
            "mods": ""
        },
        "sharpshooter": {
            "influence": ["stats|main|ballistic"],
            "mods": ""
        },
        "sixth_sense": {
            "influence": [],
            "mods": ""
        },
        "specialist_weapon_group_various": {
            "influence": [],
            "mods": ""
        },
        "stouthearted": {
            "influence": ["stats|main|will"],
            "mods": ""
        },
        "street_fighting": {
            "influence": ["stats|main|weapon"],
            "mods": ""
        },
        "streetwise": {
            "influence": ["skills|basic|charm", "skills|basic|gossip"],
            "mods": ""
        },
        "strike_mighty_blow": {
            "influence": [],
            "mods": ""
        },
        "strike_to_injure": {
            "influence": [],
            "mods": ""
        },
        "strike_to_stun": {
            "influence": [],
            "mods": ""
        },
        "strongminded": {
            "influence": [],
            "mods": ""
        },
        "sturdy": {
            "influence": ["stats|secondary|movement"],
            "mods": ""
        },
        "suave": {
            "influence": ["stats|main|fellowship"],
            "mods": ""
        },
        "sure_shot": {
            "influence": [],
            "mods": ""
        },
        "surgery": {
            "influence": ["skills|advanced|heal"],
            "mods": ""
        },
        "super_numerate": {
            "influence": ["skills|basic|perception", "skills|basic|gamble", "skills|advanced|navigation"],
            "mods": ""
        },
        "swashbuckler": {
            "influence": [],
            "mods": ""
        },
        "terrifying": {
            "influence": [],
            "mods": ""
        },
        "trapfinder": {
            "influence": ["skills|basic|perception", "skills|advanced|pick_lock"],
            "mods": ""
        },
        "trick_riding": {
            "influence": ["skills|advanced|ride"],
            "mods": ""
        },
        "tunnel_rat": {
            "influence": ["skills|basic|concealment", "skills|basic|silent_move"],
            "mods": ""
        },
        "undead": {
            "influence": [],
            "mods": ""
        },
        "unsettling": {
            "influence": [],
            "mods": ""
        },
        "very_resilient": {
            "influence": ["stats|main|toughness"],
            "mods": ""
        },
        "very_strong": {
            "influence": ["stats|main|strength"],
            "mods": ""
        },
        "warrior_born": {
            "influence": ["stats|main|weapon"],
            "mods": ""
        },
        "wrestling": {
            "influence": ["stats|main|weapon", "stats|main|strength"],
            "mods": ""
        }
    }

    if(!("talents" in character)) {
        character.talents = {}
    }
    for(var talent_name in talents) {
        var current = 0;
        if(talent_name in character.talents) {
            current = 1;
            talents[talent_name].influence.forEach(function(path){
                let stat = jspath_ref(character, path)
                "talents" in stat ? stat.talents.push(talent_name) : stat.talents = [talent_name]
            });
        }
        
        character.talents[talent_name] = {
            "current": current
        }
    }
    
    return character;
}