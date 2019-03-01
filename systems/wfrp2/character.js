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
        "current": character.stats.main.strength.current,
        "starting": "disabled",
        "advance": "disabled",
        "taken": "disabled",
    };
    character.stats.secondary.toughness_bonus = {
        "current": character.stats.main.toughness.current,
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
        "animal_training": "stats|main|fellowship[current]",
        "blather": "stats|main|fellowship[current]",
        "channelling": "stats|main|will[current]",
        "charm_animal": "stats|main|fellowship[current]",
        "common_knowledge": "stats|main|intelligence[current]",
        "dodge_blow": "stats|main|agility[current]",
        "follow_trail": "stats|main|intelligence[current]",
        "heal": "stats|main|intelligence[current]",
        "hypnotism": "stats|main|will[current]",
        "lip_reading": "stats|main|intelligence[current]",
        "magical_sense": "stats|main|will[current]",
        "navigation": "stats|main|intelligence[current]",
        "performer": "stats|main|fellowship[current]",
        "pick_lock": "stats|main|agility[current]",
        "prepare_poison": "stats|main|intelligence[current]",
        "readwrite": "stats|main|intelligence[current]",
        "sail": "stats|main|agility[current]",
        "secret_language": "stats|main|intelligence[current]",
        "secret_signs": "stats|main|intelligence[current]",
        "set_trap": "stats|main|agility[current]",
        "shadowing": "stats|main|agility[current]",
        "sleight_of_hand": "stats|main|agility[current]",
        "speak_language": "stats|main|intelligence[current]",
        "torture": "stats|main|fellowship[current]",
        "trade": "stats|main|intelligence[current]",
        "ventriloquism": "stats|main|fellowship[current]",
    };
    var skill_types = ["basic", "advanced"];
    for(var skill_type in skill_types) {
        for(var name in character.skills[skill_types[skill_type]]) {
            var skill = jspath(character, skills[name])
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
            "influence": "",
            "mods": "skills|basic|perception",
            "value": 20
        },
        "aethyric_attunement": {
            "influence": "",
            "mods": ""
        },
        "alley_cat": {
            "influence": "",
            "mods": ""
        },
        "ambidextrous": {
            "influence": "",
            "mods": ""
        },
        "arcane_lore": {
            "influence": "",
            "mods": ""
        },
        "armoured_casting": {
            "influence": "",
            "mods": ""
        },
        "artistic": {
            "influence": "",
            "mods": ""
        },
        "contortionist": {
            "influence": "",
            "mods": ""
        },
        "coolheaded_dark_lore": {
            "influence": "",
            "mods": ""
        },
        "dark_magic": {
            "influence": "",
            "mods": ""
        },
        "dealmaker": {
            "influence": "",
            "mods": ""
        },
        "disarm": {
            "influence": "",
            "mods": ""
        },
        "divine_lore": {
            "influence": "",
            "mods": ""
        },
        "dwarfcraft": {
            "influence": "",
            "mods": ""
        },
        "etiquette": {
            "influence": "",
            "mods": ""
        },
        "excellent_vision": {
            "influence": "",
            "mods": ""
        },
        "fast_hands": {
            "influence": "",
            "mods": ""
        },
        "fearless": {
            "influence": "",
            "mods": ""
        },
        "flee": {
            "influence": "",
            "mods": ""
        },
        "fleet_footed": {
            "influence": "",
            "mods": ""
        },
        "flier": {
            "influence": "",
            "mods": ""
        },
        "frenzy": {
            "influence": "",
            "mods": ""
        },
        "frightening": {
            "influence": "",
            "mods": ""
        },
        "grudgeborn_fury": {
            "influence": "",
            "mods": ""
        },
        "hardy": {
            "influence": "",
            "mods": ""
        },
        "hedge_magic": {
            "influence": "",
            "mods": ""
        },
        "hoverer": {
            "influence": "",
            "mods": ""
        },
        "keen_senses": {
            "influence": "",
            "mods": ""
        },
        "lesser_magic": {
            "influence": "",
            "mods": ""
        },
        "lightning_parry": {
            "influence": "",
            "mods": ""
        },
        "lightning_reflexes": {
            "influence": "",
            "mods": ""
        },
        "linguistics": {
            "influence": "",
            "mods": ""
        },
        "luck": {
            "influence": "",
            "mods": ""
        },
        "marksman": {
            "influence": "",
            "mods": ""
        },
        "master_gunner": {
            "influence": "",
            "mods": ""
        },
        "master_orator": {
            "influence": "",
            "mods": ""
        },
        "meditation": {
            "influence": "",
            "mods": ""
        },
        "menacing": {
            "influence": "",
            "mods": ""
        },
        "mighty_missile": {
            "influence": "",
            "mods": ""
        },
        "mighty_shot": {
            "influence": "",
            "mods": ""
        },
        "mimic": {
            "influence": "",
            "mods": ""
        },
        "natural_weapons": {
            "influence": "",
            "mods": ""
        },
        "night_vision": {
            "influence": "",
            "mods": ""
        },
        "orientation": {
            "influence": "",
            "mods": ""
        },
        "petty_magic": {
            "influence": "",
            "mods": ""
        },
        "public_speaking": {
            "influence": "",
            "mods": ""
        },
        "quick_draw": {
            "influence": "",
            "mods": ""
        },
        "rapid_reload": {
            "influence": "",
            "mods": ""
        },
        "resistance_to_chaos": {
            "influence": "",
            "mods": ""
        },
        "resistance_to_disease": {
            "influence": "",
            "mods": ""
        },
        "resistance_to_magic": {
            "influence": "",
            "mods": ""
        },
        "resistance_to_poison": {
            "influence": "",
            "mods": ""
        },
        "rover": {
            "influence": "",
            "mods": ""
        },
        "savvy": {
            "influence": "",
            "mods": ""
        },
        "schemer": {
            "influence": "",
            "mods": ""
        },
        "seasoned_traveller": {
            "influence": "",
            "mods": ""
        },
        "sharpshooter": {
            "influence": "",
            "mods": ""
        },
        "sixth_sense": {
            "influence": "",
            "mods": ""
        },
        "specialist_weapon_group_various": {
            "influence": "",
            "mods": ""
        },
        "stouthearted": {
            "influence": "",
            "mods": ""
        },
        "street_fighting": {
            "influence": "",
            "mods": ""
        },
        "streetwise": {
            "influence": "",
            "mods": ""
        },
        "strike_mighty_blow": {
            "influence": "",
            "mods": ""
        },
        "strike_to_injure": {
            "influence": "",
            "mods": ""
        },
        "strike_to_stun": {
            "influence": "",
            "mods": ""
        },
        "strongminded": {
            "influence": "",
            "mods": ""
        },
        "sturdy": {
            "influence": "",
            "mods": ""
        },
        "suave": {
            "influence": "",
            "mods": ""
        },
        "sure_shot": {
            "influence": "",
            "mods": ""
        },
        "surgery": {
            "influence": "",
            "mods": ""
        },
        "super_numerate": {
            "influence": "",
            "mods": ""
        },
        "swashbuckler": {
            "influence": "",
            "mods": ""
        },
        "terrifying": {
            "influence": "",
            "mods": ""
        },
        "trapfinder": {
            "influence": "",
            "mods": ""
        },
        "trick_riding": {
            "influence": "",
            "mods": ""
        },
        "tunnel_rat": {
            "influence": "",
            "mods": ""
        },
        "undead": {
            "influence": "",
            "mods": ""
        },
        "unsettling": {
            "influence": "",
            "mods": ""
        },
        "very_resilient": {
            "influence": "",
            "mods": ""
        },
        "very_strong": {
            "influence": "",
            "mods": ""
        },
        "warrior_born": {
            "influence": "",
            "mods": ""
        },
        "wrestling": {
            "influence": "",
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
        }
        
        character.talents[talent_name] = {
            "current": current
        }
    }
    console.log(character.talents['wrestling'].current)
    
    return character;
}