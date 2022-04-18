$( document ).ready(function(){
    let palette = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-big'></div>")
    $(".center-image-left").append(palette)

    let colors_list = ["#FF0000","#0000FF","#FFFF00"]
    $.each(colors_list, function(index, value) {
        let color_circle = "<div class = 'color-circle' style='background: "+value+";'></div>"
        $(".center-image-right").append(color_circle)
    })
})