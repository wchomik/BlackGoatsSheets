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
function translate(language) {
    current_lang = language
    $("[i18nid]").each(function (){
        $(this).text(translations[language][$(this).attr("i18nid")])
    })
}

$("[translate]").each(function (){
    $(this).click(function(){
        translate($(this).attr("translate"))
    })
})

Handlebars.registerHelper('bold', function(options) {
    return new Handlebars.SafeString(
        '<div class="mybold">'
        + options.fn(this)
        + '</div>');
});

var source   = document.getElementById("goat-template").innerHTML;
var template = Handlebars.compile(source);
var campaign = {
    "characters": [],
    "commits": []
}

function addCampaign(repo_address) {
    //https://github.com/wchomik/BGS-testcampaing
    //https://github.com/wchomik/BGS-testcampaing/blob/master/campaign.json
    //https://raw.githubusercontent.com/wchomik/BGS-testcampaing/master/campaign.json
    //https://api.github.com/repos/wchomik/BGS-testcampaing/commits
    raw = repo_address.replace("github.com", "raw.githubusercontent.com") + "/master/"
    api = repo_address.replace("github.com", "api.github.com/repos") + "/commits"
    $.getJSON( raw + "campaign.json", function( data ) {
        campaign = {...campaign, ...data}
        $.each( campaign.character_sheets, function( val ) {
            $.getJSON(raw + "characters/" + campaign.character_sheets[val], function(character_data) {
                //This needs to be changed so template is generated once everything loaded
                campaign.characters.push(character_data);
                var html    = template(campaign);
                $("#content").html(html);
                translate(current_lang)
            });
        });
    });
    $.getJSON(api, function(commits) {
        //This needs to be changed so template is generated once everything loaded
        campaign.commits = commits
        var html    = template(campaign);
        $("#content").html(html);
        translate(current_lang)
    });
}

function addCharacter(repo_address, character_name) {

}
