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

var campaign_id = 0;
var vue_apps = {};
function addCampaign(repo_address, system) {
    $.ajax({
        url: "systems/" + system + "/template.html",
        cache: true,
        async: true,
        success: function(data) {
            //template_cache[system] = Handlebars.compile(data);
            var html = data.replace(/bgsappid/g, "bgsapp" + campaign_id)
            html = html.replace(/bgsrepourl/g, repo_address); 
            $("#content").html('<div class="tab-pane fade ' + (campaign_id == 0 ? " show active": "") + '" id="campaign' + campaign_id + '" role="tabpanel" aria-labelledby="campaign' + campaign_id + '-tab">' + html + '</div>');
            campaign_id++;
        }               
    });
    return 0;
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
