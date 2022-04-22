import {mix_hexes} from './mix.js'
let num_dropped = 0
let dropped_color = []
let learn_interactive_data = {
    "secondary" : {
        "color_list":["#FF0000","#0000FF","#FFFF00"],
        "example_list":[{"#ff8001":"Orange"},{"#00ff00":"Green"},{"#800180":"Violet"}]
    },
    "tertiary" : {
        "color_list":["#FF0000","#0000FF","#FFFF00","#ff8100","#099420","#7400b6"],
        "example_list":[{"#ffc101":"Yellow-Orange"},{"#ff4101":"Red-Orange"},
        {"#b3016e":"Red-Purple"},{"#4601db":"Blue-Purple"},
        {"#07657b":"Blue-Green"},{"#6bca16":"Yellow-Green"}]
    }
}
function mixColor() {
    $(".palette-circle-big").empty()
    $(".palette-circle-big").append("<div class = 'learn-color-name'>Drop two</div>")
    $(".palette-circle-big").append("<div class = 'learn-color-name'>colors here</div>")
    let c1 = dropped_color[0].toLowerCase()
    let c2 = dropped_color[1].toLowerCase()
    let target = ".color-example-"
    let result = ""

    result = mix_hexes(c1, c2)
    $.each(learn_interactive_data["tertiary"]["example_list"], function(index, value) {
        if(Object.keys(value)[0].toLowerCase() == String(result).toLowerCase()) {
            target += Object.values(value)[0]
        }
    })
    
    $(target).empty()
    $(target).css({"background":result})
    $(target).removeClass("palette-circle")
    num_dropped = 0
    dropped_color = []
}

$( document ).ready(function(){
    let r1c1 = $('<div class = "col-lg-6 col-md-6 col-sm-12 center-image-left">')
    let r1c2 = $('<div class = "col-lg-3 col-md-3 col-sm-12 center-image-right center-image-right-1">')
    let r1c3 = $('<div class = "col-lg-3 col-md-3 col-sm-12 center-image-right center-image-right-2">')

    let r2 = $("<div class = 'row row-move-down'>")
    let r2c1 = $('<div class = "col-lg-7 col-md-7 col-sm-12 color-examples color-examples-1">')
    let r2c2 = $('<div class = "col-lg-5 col-md-5 col-sm-12">')

    let r3 = $("<div class = 'row row-move-down'>")
    let r3c1 = $('<div class = "col-lg-7 col-md-7 col-sm-12 color-examples color-examples-2">')
    let r3c2 = $('<div class = "col-lg-5 col-md-5 col-sm-12">')

    // palette in row 1 column 1
    let palette = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-big'></div>")
    palette.append("<div class = 'learn-color-name'>Drop two</div>")
    palette.append("<div class = 'learn-color-name'>colors here</div>")
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
    let colors_list = learn_interactive_data["tertiary"]["color_list"]
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
        if (index <= 2) {
            r1c2.append(color_circle)
        }
        else {
            r1c3.append(color_circle)
        }
    })

    // goal colors in row 2 column 1
    let example_list = learn_interactive_data["tertiary"]["example_list"]
    $.each(example_list, function(index, value) {
        let c = Object.values(value)[0]
        // let cp = c.replace(" ","")
        let temp = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-small color-example-"+c+"'></div>")
        temp.append("<div class = 'learn-color-name small-font'>"+c)
        if (index <= 2) {
            r2c1.append(temp)
        }
        else {
            r3c1.append(temp)
        }
    })

    $("#interactive").append(r1c1)
    $("#interactive").append(r1c2)
    $("#interactive").append(r1c3)
    r2.append(r2c1)
    r2.append(r2c2)
    r3.append(r3c1)
    r3.append(r3c2)
    $(".interactive_frame").append(r2)
    $(".interactive_frame").append(r3)
})