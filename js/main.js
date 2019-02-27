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

var campaign_id_seq = 0;
var vue_apps = {};
var campaings = {};
function addCampaign(repo_address) {
    var campaign_id = campaign_id_seq++;
    var bgsappid = "bgsapp" + campaign_id

    raw = repo_address.replace("github.com", "raw.githubusercontent.com") + "/master/"
    $.ajax({
        url: raw + "campaign.json",
        cache: false,
        dataType: 'json',
        success: function( campaign_data ) {
            var tab_id = "campaign" + campaign_id + "-tab";
            var panel_id = "campaign" + campaign_id + "-panel";

            $("#campaign_selector_div").append('<a id="' + tab_id + '" class="dropdown-item' + (campaign_id == 0 ? " active": "") + '" data-toggle="tab" role="tab" href="#' + panel_id + '" aria-controls="' + panel_id + '" aria-selected="' + (campaign_id == 0 ? "true": "false") + '">' + campaign_data.name + '</a>');
            campaings[bgsappid] = campaign_data
            $.ajax({
                url: "systems/" + campaign_data.system + "/template.html",
                cache: true,
                success: function(template_data) {
                    //template_cache[system] = Handlebars.compile(data);
                    var html = template_data.replace(/bgsappid/g, bgsappid)
                    html = html.replace(/bgsrepourl/g, repo_address); 
                    $("#content").append('<div class="tab-pane fade' + (campaign_id == 0 ? " show active": "") + '" id="' + panel_id + '" role="tabpanel" aria-labelledby="' + tab_id + '">' + html + '</div>');
                }               
            });
        }
    });
    return bgsappid;
}

var translations = {};
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
    for(vapp in vue_apps) {
        vue_apps[vapp].lang = current_lang
    }
}

$("[translate]").each(function (){
    $(this).click(function(){
        translate_all($(this).attr("translate"))
    })
})

$.ajax({ 
    url: "data/translation_pl.json", 
    dataType: 'json', 
    async: false, 
    success: function(json){ 
        translations["pl"]=json
        translate_all("pl");
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
