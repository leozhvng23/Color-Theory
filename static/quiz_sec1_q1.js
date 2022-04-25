import {mix_hexes} from './mix.js'

let questions = {
    "1" : {
        "reference" : "#ff8001",
        "choices" : ["#FF0000","#0000FF","#FFFF00"],
    },
    "2" : {
        "reference" : "#00ff00",
        "choices" : ["#FF0000","#0000FF","#FFFF00"],
    }
}

let num_dropped = 0
let dropped_color = []

function mixColor() {
    $(".palette-circle-bigger").empty()
    $(".palette-circle-bigger").append("<div class = 'learn-color-name'>Drop two</div>")
    $(".palette-circle-bigger").append("<div class = 'learn-color-name'>colors here</div>")

    let c1 = dropped_color[0].toLowerCase()
    let c2 = dropped_color[1].toLowerCase()
    let result = ""
    if (c1 == "#0000ff" && c2 == "#ffff00" || c2 == "#0000ff" && c1 == "#ffff00") {
        result = "#00ff00"
    }
    else {
        result = mix_hexes(c1, c2)
    }

    $(".mix-result").css({"background":result})
    $(".mix-result").removeClass("palette-circle")

    num_dropped = 0
    dropped_color = []
}

$( document ).ready(function(){
    let c1 = $('<div class="col-5 reference-column">')
    let c1r1 = $('<div class = "reference-container verticalcenter div-inline">')
    let c1r2 = $('<div class = "result-container verticalcenter">')
    c1r1.append("Reference color: ")
    c1r2.append("Your mix result: ")

    let c2 = $('<div class="col-7 choose-column-container">')
    let c2c = $('<div class="row choose-column">')
    let c2c1 = $('<div class = "col-lg-6 col-md-6 col-sm-12 center-image-left">')
    let c2c2 = $('<div class = "col-lg-3 col-md-3 col-sm-12">')
    let c2c3 = $('<div class = "col-lg-3 col-md-3 col-sm-12 center-image-right">')

    c1.append(c1r1)
    c1.append(c1r2)
    c2c.append(c2c1)
    c2c.append(c2c2)
    c2c.append(c2c3)
    c2.append(c2c)
    $("#interactive").append(c1)
    $("#interactive").append(c2)

    let left_ref = $("<div class = 'color-circle palette-circle-med palette-reference div-inline' style='background: "+questions[id]["reference"]+";'></div>")
    c1r1.append(left_ref)
    let left_res = $("<div class = 'color-circle palette-circle palette-circle-med palette-reference div-inline mix-result'></div>")
    c1r2.append(left_res)
    let palette = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-bigger'></div>")

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
                    $(this).droppable('disable')
                    let data = {};
                    data['section'] = ans_section;
                    data['answer'] = dropped_color;
                    console.log(data['answer']);
                    $.ajax({
                        type: "POST",
                        url: "../../../update_ans",                
                        dataType : "json",
                        contentType: "application/json; charset=utf-8",
                        data : JSON.stringify(data),
                        success: function(result){
                            mixColor()
                            $('span.right_footnote').html("Score: "+result.data["score"]+"/10");
                        },
                        error: function(request, status, error){
                            console.log("Error");
                            console.log(request)
                            console.log(status)
                            console.log(error)
                        }
                    })
            }
        }
    });

    c2c1.append(palette)

    let colors_list = questions[id]["choices"]
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

        c2c3.append(color_circle)
    })
})