function addCampaign(campaign_name, template_name) {
    var source   = document.getElementById(template_name).innerHTML;
    var template = Handlebars.compile(source);
    $.getJSON( "campaigns/" + campaign_name + "/campaign.json", function( data ) {
            data.characters = []
        $.when(
            $.each( data.character_sheets, function( val ) {
                console.log("dupa:" + val)
                $.getJSON("campaigns/" + campaign_name + "/characters/" + data.character_sheets[val], function(character_data) {
                    data.characters.push(character_data);
                })
            })
        ).then(function() {
            console.log(data);
            var html    = template(data);
            $("#debug").html(html)
        })
    });
}

function addCharacter(campaign_name, character_name) {

}