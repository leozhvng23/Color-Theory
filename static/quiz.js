function view_page() {
    // $(".learn-text-title").append(section)
    // $(".learn-text-content").append(learn_texts[section])
    let current_question = questions["0"]

    let colors_list = current_question["choices"]


    let palette = '<div class = "col-md-8 palette"></div>'
    let row1_right = $('<div class = "row learn-colors-row">')
    row1_right.append(palette)
    // row1.append(color_choices)
    $(".learn-colors").append(row1_right)
    let palette_object = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-big'></div>")
    $(".palette").append(palette_object)
    
    palette_object.append("<div class = 'learn-color-name'>Drop any two</div>")
    palette_object.append("<div class = 'learn-color-name'>colors here</div>")

    let color_choices = '<div class = "col-md-4 color-choices"></div>'
    row1_right.append(color_choices)
    $.each(colors_list, function(index, value) {
        let color_circle = "<div class = 'color-circle' style='background: "+value+";'></div>"
        $(".color-choices").append(color_circle)
    })

    let btn1 = "<button class = 'btn previous-button'>previous</button>"
    $(".previous-button-container").append(btn1)
    let btn2 = "<button class = 'btn next-button'>next</button>"
    $(".next-button-container").append(btn2)

    let row1_left = $('<div class = "row">')
    let row2_left = $('<div class = "row learn-colors-row">')
    let row3_left = $('<div class = "row">')
    let row4_left = $('<div class = "row learn-colors-row">')
    $(".quiz-text").append(row1_left)
    $(".quiz-text").append(row2_left)
    $(".quiz-text").append(row3_left)
    $(".quiz-text").append(row4_left)
    let palette_ref = $("<div class = 'color-circle palette-circle-med palette-reference' style='background: "+current_question["reference"]+";'></div>")
    row1_left.append(palette_ref)
    row2_left.append("<div class = 'learn-color-name' style = 'color: #717171;'>Reference color")

    let palette_res = $("<div class = 'color-circle palette-circle palette-circle-med'></div>")
    row3_left.append(palette_res)
    row4_left.append("<div class = 'learn-color-name' style = 'color: #717171;'>Your color")
}


$( document ).ready(function(){
    // let current_section = "primary"
    
    view_page()
})