function jspath(obj, path) {
    //console.log(path)
    var rgx0 = /^([^\[|]*)$/g
    var rgx1 = /^([^\[|]*)\|(.+)$/g
    var rgx2 = /^([^\[|]*)\[(.*)\]$/g
    var match
    if( match = rgx0.exec(path) ) {
        //console.log("Match0: " + match[1])
        return {
            name: match[1],
            value: obj[match[1]]
        }
    } else if (match = rgx1.exec(path)) {
        //console.log("Match1: " + match[1] + " " + match[2])
        return jspath(obj[match[1]], match[2])
    } else if (match = rgx2.exec(path)) {
        //console.log("Match2: " + match[1] + " " + match[2])
        obj = jspath(obj[match[1]], match[2])
        obj.name = match[1]
        return obj
    } else {
        console.log("Brrrr")
    }
}

var translations = {};
$.ajax({ 
    url: "data/translation_pl.json", 
    dataType: 'json', 
    async: false, 
    success: function(json){ 
        translations["pl"]=json
    } 
});
$.ajax({ 
    url: "data/translation_en.json", 
    dataType: 'json', 
    async: false, 
    success: function(json){ 
        translations["en"]=json
    } 
});



var current_lang = "pl";

function translate(phrase) {
    return translations[current_lang][phrase];
}

function translate_all(language) {
    current_lang = language
    $("[i18nid]").each(function (){
        $(this).text(translate($(this).attr("i18nid")))
    })
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

$("[translate]").each(function (){
    $(this).click(function(){
        translate_all($(this).attr("translate"))
    })
})

var campaign = {
    "characters": [],
    "commits": []
}

function calc_derived() {
    $("[derived]").each(function (){
        var character_path = $(this).attr("derived")
        var tokens = character_path.split("|")
        var val = campaign.characters[tokens[0]]
        console.log(val)
        for (i = 1; i < tokens.length; i++) {
            val = val[tokens[i]]
        }
        $(this).text(parseInt(val/10))
    })
}

function calc_character(character_data, template) {
    //return character_data;
    var template_sheet = sheets_cache[template]
    for(var k in character_data.skills.basic){
        var skill_val = character_data.skills.basic[k]
        var characteristic = template_sheet.skills.basic[k].characteristic
        if(characteristic == undefined) {
            character_data.skills.basic[k] = {
                "value": "X",
                "tooltip": ""
            }
        } else {
            var characteristic_val = character_data.stats.main[characteristic].current
            var skill_modifier = (skill_val - 1) * 10
            var skill_modifier_str = ""
            if(skill_modifier < 0) {
                skill_modifier_str = "- " + Math.abs(skill_modifier)
            } else {
                skill_modifier_str = "+ " + Math.abs(skill_modifier)
            }

            var tooltip = characteristic_val + ' <span class="badge badge-primary">'+translations[current_lang][characteristic]+'</span>'
            tooltip = tooltip + "</br>" + skill_modifier_str + ' <span class="badge badge-primary">'+translations[current_lang][k]+'</span>'
            tooltip = (characteristic_val + skill_modifier) + ' <span class="badge badge-primary">'+translations[current_lang]["total"]+'</span> =</br>' + tooltip
    
            character_data.skills.basic[k] = {
                "value": skill_val,
                "tooltip": tooltip
            }
        }
    }
    for(var k in character_data.skills.advanced){
        var skill_val = character_data.skills.advanced[k]
        var characteristic = template_sheet.skills.advanced[k].characteristic
        if(characteristic == undefined) {
            character_data.skills.advanced[k] = {
                "value": "X",
                "tooltip": ""
            }
        } else {
            var characteristic_val = character_data.stats.main[characteristic].current
            var skill_modifier = (skill_val - 1) * 10
            var skill_modifier_str = ""
            if(skill_modifier < 0) {
                skill_modifier_str = "- " + Math.abs(skill_modifier)
            } else {
                skill_modifier_str = "+ " + Math.abs(skill_modifier)
            }

            var tooltip = characteristic_val + ' <span class="badge badge-primary">'+translations[current_lang][characteristic]+'</span>'
            tooltip = tooltip + "</br>" + skill_modifier_str + ' <span class="badge badge-primary">'+translations[current_lang][k]+'</span>'
            tooltip = (characteristic_val + skill_modifier) + ' <span class="badge badge-primary">'+translations[current_lang]["total"]+'</span> =</br>' + tooltip
    
            character_data.skills.advanced[k] = {
                "value": skill_val,
                "tooltip": tooltip
            }
        }  
    }
    return character_data;
}

var sheets_cache = {}
var campaign_id = 0;
function addCampaign(repo_address, system) {

    $.ajax({
        url: "systems/" + system + "/template.html",
        cache: true,
        async: true,
        success: function(data) {
            //template_cache[system] = Handlebars.compile(data);
            var html = data.replace(/bgsappid/g, "bgsapp" + campaign_id++)
            html = html.replace(/bgsrepourl/g, repo_address); 
            $("#content").html(html);
        }               
    });

    return 0;
    //if(!(template in sheets_cache)) {
    //    $.ajax({
    //        url: "data/" + template + ".json",
    //        cache: true,
    //        async: false,
    //        dataType: 'json',
    //        success: function(data) {
    //            sheets_cache[template] = data;
    //        }               
    //    });
    //}
    //https://github.com/wchomik/BGS-testcampaing
    //https://github.com/wchomik/BGS-testcampaing/blob/master/campaign.json
    //https://raw.githubusercontent.com/wchomik/BGS-testcampaing/master/campaign.json
    //https://api.github.com/repos/wchomik/BGS-testcampaing/commits
    raw = repo_address.replace("github.com", "raw.githubusercontent.com") + "/develop/"
    api = repo_address.replace("github.com", "api.github.com/repos") + "/commits"
    $.ajax({
        url: raw + "campaign.json",
        cache: false,
        dataType: 'json',
        success: function( data ) {
            campaign = {...campaign, ...data}
            $.each( campaign.character_sheets, function( val ) {
                $.getJSON(raw + "characters/" + campaign.character_sheets[val], function(character_data) {
                    //This needs to be changed so template is generated once everything loaded
                    character_data = calc_character(character_data, template);
                    campaign.characters.push(character_data);
                    var html    = template_cache[template](campaign);
                    $("#content").html(html);
                    calc_derived();
                    translate_all(current_lang);
                });
            });
        }
    });
    $.getJSON(api, function(commits) {
        //This needs to be changed so template is generated once everything loaded
        campaign.commits = commits
        var html    = template_cache[template](campaign);
        $("#content").html(html);
        calc_derived();
        translate_all(current_lang);
    });
}

function addCharacter(repo_address, character_name) {

}
