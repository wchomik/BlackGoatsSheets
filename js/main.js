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

function translate(language) {
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

function addCampaign(campaign_name) {
    $.getJSON( "campaigns/" + campaign_name + "/campaign.json", function( data ) {
        data.characters = []

        $.each( data.character_sheets, function( val ) {
            $.getJSON("campaigns/" + campaign_name + "/characters/" + data.character_sheets[val], function(character_data) {
                //This needs to be changed so template is generated once everything loaded
                data.characters.push(character_data);
                var html    = template(data);
                $("#content").html(html);
                translate("pl")
            });
        });
    });
}

function addCharacter(campaign_name, character_name) {

}