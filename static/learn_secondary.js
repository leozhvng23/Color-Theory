import {mix_hexes} from './mix.js'
let learn_interactive_data = {
    "secondary" : {
        "color_list":["#FF0000","#0000FF","#FFFF00"],
        // "example_list":[{"#ff8001":"Orange"},{"#00ff00":"Green"},{"#800180":"Violet"}],
        "example_list":[{"#ff8001":"Red-Yellow"},{"#00ff00":"Blue-Yellow"},{"#800180":"Red-Blue"}],
        "color_names":{"#ff8001":"Orange","#00ff00":"Green","#800180":"Purple"}
    },
    "tertiary" : {
        "color_list":["#FF0000","#0000FF","#FFFF00","#ff8100","#099420","#7400b6"],
        "example_list":["Yellow Orange", "Red Orange", "Red Purple", "Blue Purple", "Blue Green", "Yellow Green"],
    }
}
let num_dropped = 0
let dropped_color = []

function mixColor() {
    $(".palette-circle-big").empty()
    $(".palette-circle-big").append("<div class = 'learn-color-name large'>Drop two</div>")
    $(".palette-circle-big").append("<div class = 'learn-color-name large'>colors here</div>")
    let c1 = dropped_color[0].toLowerCase()
    let c2 = dropped_color[1].toLowerCase()
    let target = ".color-example-"
    let result = ""
    if (c1 == "#0000ff" && c2 == "#ffff00" || c2 == "#0000ff" && c1 == "#ffff00") {
        result = "#00ff00"
        target += "Blue-Yellow"
    }
    else {
        result = mix_hexes(c1, c2)
        $.each(learn_interactive_data["secondary"]["example_list"], function(index, value) {
            if(Object.keys(value)[0].toLowerCase() == String(result).toLowerCase()) {
                target += Object.values(value)[0]
            }
        })
    }
    $(target).empty()
    $(target).css({"background":result})
    $(target).removeClass("palette-circle")
    $(target).append('<div class = "display-color-name">'+learn_interactive_data["secondary"]["color_names"][result])
    num_dropped = 0
    dropped_color = []
}

$( document ).ready(function(){
    let r1c1 = $('<div class = "col-lg-7 col-md-6 col-sm-12">')
    let r1c2 = $('<div class = "col-lg-2 col-md-3 col-sm-12 center-image-right center-image-right-1">')
    let r1c3 = $('<div class = "col-lg-3 col-md-3 col-sm-12 center-image-right center-image-right-2">')

    let r2 = $("<div class = 'row row-move-down'>")
    let r2c1 = $('<div class = "col-lg-8 col-md-6 col-sm-12 color-examples color-examples-1">')
    let r2c2 = $('<div class = "col-lg-4 col-md-6 col-sm-12">')

    // palette in row 1 column 1
    let palette = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-big'></div>")
    palette.append("<div class = 'learn-color-name large'>Drop two</div>")
    palette.append("<div class = 'learn-color-name large'>colors here</div>")
    $(palette).droppable({
        tolerance: "fit",
        accept: ".color-circle",
        drop: function(event, ui) {
                let temp = $(ui.helper).clone();
                $(this).append(temp);
                num_dropped += 1
                dropped_color.push(ui.draggable.attr("class").split(" ")[1])
                if (num_dropped == 2) {
                    mixColor()
                }
            }
    });
    r1c1.append(palette)

    // colored circles in row 1 column 2
    let colors_list = learn_interactive_data["secondary"]["color_list"]
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

        r1c2.append(color_circle)
    })

    // goal colors in row 2 column 1
    let example_list = learn_interactive_data["secondary"]["example_list"]
    $.each(example_list, function(index, value) {
        let c = Object.values(value)[0]
        if (index <= 2) {
            let temp = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-small color-example-"+c+"'></div>")
            temp.append("<div class = 'learn-color-name'>"+c)
            r2c1.append(temp)
        }
    })

    $("#interactive").append(r1c1)
    $("#interactive").append(r1c2)
    $("#interactive").append(r1c3)
    r2.append(r2c1)
    r2.append(r2c2)
    $(".interactive_frame").append(r2)
})