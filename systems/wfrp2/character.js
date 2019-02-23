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

    var basic_skills = {
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
    };
    var advanced_skills = {
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
    }
    for(var name in character.skills.basic) {
        var skill = jspath(character, basic_skills[name])
        console.log(skill)
        var current = 0;
        if(character.skills.basic[name] == 0) {
            current = Math.ceil(skill.value / 2)
        } else {
            current = skill.value + character.skills.basic[name] * 10
        }
        character.skills.basic[name] = {
            "current": current,
            "taken": character.skills.basic[name]
        }
        console.log(character.skills.basic[name])
    }
    for(var name in character.skills.advanced) {
        var skill = jspath(character, advanced_skills[name])
        console.log(skill)
        var current = 0;
        if(character.skills.advanced[name] == 0) {
            current = Math.ceil(skill.value / 2)
        } else {
            current = skill.value + character.skills.advanced[name] * 10
        }
        character.skills.advanced[name] = {
            "current": current,
            "taken": character.skills.advanced[name]
        }
        console.log(character.skills.advanced[name])
    }
    // for(var k in character.skills.basic){
    //     var skill_val = character.skills.basic[k]
    //     var characteristic = template_sheet.skills.basic[k].characteristic
    //     if(characteristic == undefined) {
    //         character.skills.basic[k] = {
    //             "value": "X",
    //             "tooltip": ""
    //         }
    //     } else {
    //         var characteristic_val = character.stats.main[characteristic].current
    //         var skill_modifier = (skill_val - 1) * 10
    //         var skill_modifier_str = ""
    //         if(skill_modifier < 0) {
    //             skill_modifier_str = "- " + Math.abs(skill_modifier)
    //         } else {
    //             skill_modifier_str = "+ " + Math.abs(skill_modifier)
    //         }

    //         var tooltip = characteristic_val + ' <span class="badge badge-primary">'+translations[current_lang][characteristic]+'</span>'
    //         tooltip = tooltip + "</br>" + skill_modifier_str + ' <span class="badge badge-primary">'+translations[current_lang][k]+'</span>'
    //         tooltip = (characteristic_val + skill_modifier) + ' <span class="badge badge-primary">'+translations[current_lang]["total"]+'</span> =</br>' + tooltip
    
    //         character.skills.basic[k] = {
    //             "value": skill_val,
    //             "tooltip": tooltip
    //         }
    //     }
    // }
    // for(var k in character.skills.advanced){
    //     var skill_val = character.skills.advanced[k]
    //     var characteristic = template_sheet.skills.advanced[k].characteristic
    //     if(characteristic == undefined) {
    //         character.skills.advanced[k] = {
    //             "value": "X",
    //             "tooltip": ""
    //         }
    //     } else {
    //         var characteristic_val = character.stats.main[characteristic].current
    //         var skill_modifier = (skill_val - 1) * 10
    //         var skill_modifier_str = ""
    //         if(skill_modifier < 0) {
    //             skill_modifier_str = "- " + Math.abs(skill_modifier)
    //         } else {
    //             skill_modifier_str = "+ " + Math.abs(skill_modifier)
    //         }

    //         var tooltip = characteristic_val + ' <span class="badge badge-primary">'+translations[current_lang][characteristic]+'</span>'
    //         tooltip = tooltip + "</br>" + skill_modifier_str + ' <span class="badge badge-primary">'+translations[current_lang][k]+'</span>'
    //         tooltip = (characteristic_val + skill_modifier) + ' <span class="badge badge-primary">'+translations[current_lang]["total"]+'</span> =</br>' + tooltip
    
    //         character.skills.advanced[k] = {
    //             "value": skill_val,
    //             "tooltip": tooltip
    //         }
    //     }  
    // }
    return character;
}