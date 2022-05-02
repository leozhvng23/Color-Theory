import {mix_hexes} from './mix.js'

let num_dropped = 0
let dropped_color = []
let result = ""

function mixColor() {
    let c1 = dropped_color[dropped_color.length - 2].toLowerCase()
    let c2 = dropped_color[dropped_color.length - 1].toLowerCase()
    if (c1 == "#0000ff" && c2 == "#ffff00" || c2 == "#0000ff" && c1 == "#ffff00") {
        result = "#00ff00"
    }
    else {
        result = mix_hexes(c1, c2)
    }

    if (result == "#018080") {
        result = "#07657b"
    }
    else if (result == "#c00160") {
        result = "#b3016e"
    }
    console.log(result)
    dropped_color.push(result)
    $(".palette-result").css({"background":result})
}

$(document).ready(function(){
    $("#section").html("Section 1:");
    $("#title").html(text.title);
    $("#content").append("<p>").html(text.content);

    let palette = $("<div class = 'layer-bottom color-circle main-palette-circle palette-circle palette-circle-bigger'></div>")

    palette.append("<div class = 'learn-color-name layer-under'>Drop any</div>")
    palette.append("<div class = 'learn-color-name layer-under'>color here</div>")

    $(palette).droppable({
        tolerance: "fit",
        accept: ".color-circle",
        drop: function(event, ui) {
            let value = ui.draggable.attr("class").split(" ")[1]
            dropped_color.push(ui.draggable.attr("class").split(" ")[1])
            num_dropped += 1
            let new_object = $("<div class = 'floating palette-result color-circle "+value+" dropped-color-circle' style='background: "+value+";'></div>")
            if (num_dropped == 1) {
                palette.empty()
                palette.append(new_object)
            }
            else {
                mixColor()
            }
        }
    });

    $(".center-image-left").append(palette)

    let colors_list = ["#FF0000","#0000FF","#FFFF00"]
    $.each(colors_list, function(index, value) {
        let color_circle = $("<div class = 'color-circle "+value+"' style='background: "+value+";'></div>")

        $(color_circle).draggable({
            cursor: "move",
            revert: true,
            stack: ".color-circle",
            helper: "clone",
        })
        $(color_circle).mouseover(function() {
            $(this).addClass("circle-on-hover")
        })
        $(color_circle).mouseout(function() {
            $(this).removeClass("circle-on-hover")
        })

        $(".center-image-right").append(color_circle)
    })
})