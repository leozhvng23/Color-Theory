$(document).ready(function(){
    $("#section").html("Section 1:");
    $("#title").html(text.title);
    $("#content").append("<p>").html(text.content);

    let palette = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-bigger'></div>")

    palette.append("<div class = 'learn-color-name'>Drop any</div>")
    palette.append("<div class = 'learn-color-name'>two colors here</div>")

    $(".center-image-left").append(palette)

    let colors_list = ["#FF0000","#0000FF","#FFFF00"]
    $.each(colors_list, function(index, value) {
        let color_circle = "<div class = 'color-circle' style='background: "+value+";'></div>"
        $(".center-image-right").append(color_circle)
    })
})