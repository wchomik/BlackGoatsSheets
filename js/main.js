function addCampaign(campaign_name, template_name) {
    var source   = document.getElementById(template_name).innerHTML;
    var template = Handlebars.compile(source);
    $.getJSON( "campaigns/" + campaign_name + "/campaign.json", function( data ) {
        data.characters = []

        $.each( data.character_sheets, function( val ) {
            $.getJSON("campaigns/" + campaign_name + "/characters/" + data.character_sheets[val], function(character_data) {
                data.characters.push(character_data);
                var html    = template(data);
                $("#content").html(html);
            });
        });
    });
}

function addCharacter(campaign_name, character_name) {

}