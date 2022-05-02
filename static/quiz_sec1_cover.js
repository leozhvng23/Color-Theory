$(document).ready(function(){
    $("#section").html("Section 1:");
    $("#title").html(text.title);
    $("#content").append("<p>").html(text.content);

    let palette = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-bigger'></div>")

    palette.append("<div class = 'learn-color-name'>Drop any</div>")
    palette.append("<div class = 'learn-color-name'>color here</div>")

    $(palette).droppable({
        tolerance: "fit",
        accept: ".color-circle",
        drop: function(event, ui) {
            palette.empty()
            palette.append("<div class = 'learn-color-name'>Drop any</div>")
            palette.append("<div class = 'learn-color-name'>color here</div>")
            let value = ui.draggable.attr("class").split(" ")[1]
            let new_object = $("<div class = 'color-circle "+value+"' style='background: "+value+";'></div>")
            new_object.draggable({
                cursor: "move",
                // revert: true,
                stack: ".color-circle",
                // helper: "clone",
            })
            palette.append(new_object)
            // num_dropped += 1
            // dropped_color.push(ui.draggable.attr("class").split(" ")[1])
            // console.log(num_dropped)
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