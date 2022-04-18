function view_page() {
    $(".learn-text-title").append(text["quiz_sec_1"]["title"])
    $(".learn-text-content").append(text["quiz_sec_1"]["content"])
    // quiz_sec_1

    let colors_list = colors["primary_colors"]

    let palette = '<div class = "col-md-8 palette"></div>'
    // let color_choices = '<div class = "col-md-4 border color-choices"></div>'
    let row1 = $('<div class = "row learn-colors-row">')
    row1.append(palette)
    // row1.append(color_choices)
    $(".learn-colors").append(row1)
    let palette_object = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-big'></div>")
    $(".palette").append(palette_object)

    palette_object.append("<div class = 'learn-color-name'>Drop any</div>")
    palette_object.append("<div class = 'learn-color-name'>two colors here</div>")
    let color_choices = '<div class = "col-md-4 color-choices"></div>'
    row1.append(color_choices)
    $.each(colors_list, function(index, value) {
        let color_circle = "<div class = 'color-circle' style='background: "+value+";'></div>"
        $(".color-choices").append(color_circle)
    })

    let btn1 = "<button class = 'btn previous-button'>previous</button>"
    $(".previous-button-container").append(btn1)
    let btn2 = "<button class = 'btn next-button'>next</button>"
    $(".next-button-container").append(btn2)
}


$( document ).ready(function(){
    view_page()
})