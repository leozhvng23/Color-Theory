import {mix_hexes} from './mix.js'

let questions = {
    "1" : {
        "reference" : "#b3016e",
        "choices" : ["#FF0000","#0000FF","#FFFF00"],
    },
    "2" : {
        "reference" : "#07657b",
        "choices" : ["#FF0000","#0000FF","#FFFF00"],
    },
    "3" : {
        "reference" : "#ffc101",
        "choices" : ["#FF0000","#0000FF","#FFFF00"],
    }
}

let num_dropped = 0
let dropped_color = []
let num_reset = 0
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

    dropped_color.push(result)

    $(".palette-result").css({"background":result})
}

$( document ).ready(function(){
    let c1 = $('<div class="col-5 reference-column">')
    let c1r1 = $('<div class = "reference-container verticalcenter div-inline">')
    let c1r2 = $('<div class = "result-container verticalcenter">')
    c1r1.append("<span class='instruct_text'> Reference color: </span>")
    c1r2.append("<span class='instruct_text'> Your mix result: </span>")

    let c2 = $('<div class="col-7 choose-column-container">')
    let c2c = $('<div class="row choose-column">')
    let c2c1 = $('<div class = "col-lg-9 col-md-6 col-sm-12 center-image-left">')
    let c2c3 = $('<div class = "col-lg-3 col-md-3 col-sm-12 center-image-right color-col">')

    c1.append(c1r1)
    c1.append(c1r2)
    c2c.append(c2c1)
    
    c2c.append(c2c3)
    c2.append(c2c)
    $("#interactive").append(c1)
    $("#interactive").append(c2)

    // second row
    let r2 = $('<div class="row container interact" id="interactive-2">')
    let r2c1 = $('<div class="col-md-5">')
    let r2c2 = $('<div class="button-container col-md-7">')
    r2.append(r2c1)
    r2.append(r2c2)
    r2c2.append('<button class = "reset-button quiz-1-button" title="reset"><i class="fa fa-repeat fa-2xl" aria-hidden="true"></i>')
    r2c2.append('<button class = "confirm-button quiz-1-button" title="submit"><i class="fa fa-check fa-2xl" aria-hidden="true">')
    $(".interactive_frame_large").append(r2)

    let left_ref = $("<div class = 'color-circle palette-circle-med palette-reference div-inline' style='background: "+questions[id]["reference"]+";'></div>")
    c1r1.append(left_ref)
    let left_res = $("<div class = 'color-circle palette-circle palette-circle-med palette-reference div-inline mix-result'></div>")
    c1r2.append(left_res)
    let palette = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-bigger'></div>")

    palette.append("<div class = 'learn-color-name large'>Drop colors here</div>")

    $(palette).droppable({
        tolerance: "fit",
        accept: ".color-circle",
        greedy:true,
        drop: function(event, ui) {
                num_dropped += 1
                let value = ui.draggable.attr("class").split(" ")[1]
                result = value
                if (num_dropped < 2) {
                    let new_object = $("<div class = 'floating palette-result color-circle "+value+"' style='background: "+value+";'></div>")
                    palette.empty()
                    palette.append(new_object)
                }                
                
                dropped_color.push(ui.draggable.attr("class").split(" ")[1])
                if (num_dropped >= 2) {
                    mixColor()
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

    $(".reset-button").click(function() {
        console.log("cliclked")
        num_dropped = 0
        dropped_color = []
        num_reset += 1
        $(".palette-circle-bigger").empty()
        $(".palette-circle-bigger").append("<div class = 'learn-color-name large'>Drop colors here</div>")
        $(".mix-result").css({"background":"#E9E9E9"})
    });

    $(".confirm-button").click(function() {
        if (num_dropped != 0) {
            $(".mix-result").css({"background": result})
            $(".mix-result").removeClass("palette-circle")
            $(".palette-circle-bigger").empty()
            $(".palette-circle-bigger").append("<div class = 'learn-color-name large'>Drop colors here</div>")
            $(".main-palette-circle").droppable('disable')
            $(".reset-button").prop("disabled", true);
            $(this).prop("disabled", true);
            let data = {};
            data['section'] = ans_section;
            data['answer'] = result;
            console.log("and"+data['answer']);
            $.ajax({
                type: "POST",
                url: "../../../update_ans",                
                dataType : "json",
                contentType: "application/json; charset=utf-8",
                data : JSON.stringify(data),
                success: function(result){
                    let user = result.data['user'];
                    let ans = result.data['ans'];
                    console.log(result.data);
                    $('span.right_footnote').html("Score: "+user["score"]+"/10");
                },
                error: function(request, status, error){
                    console.log("Error");
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            })
        }
    });
})