function view_page() {
    $(".learn-text-title").append(text[section]["title"])
    $(".learn-text-content").append(text[section]["content"])

    let colors_list = colors[section]
    // primary section has three colors
    if (section == "primary_colors") {
        $.each(colors_list, function(index, value) {
            let color_circle = "<div class = 'color-circle' style='background: "+value+";'></div>"
            $(".learn-colors").append(color_circle)
        })
        let btn = "<button class = 'btn next-button'>next</button>"
        $(".next-button-container").append(btn)
    }
    // other two sections has palette and colors
    else {
        let palette = '<div class = "col-md-8 palette"></div>'
        // let color_choices = '<div class = "col-md-4 border color-choices"></div>'
        let row1 = $('<div class = "row learn-colors-row">')
        row1.append(palette)
        // row1.append(color_choices)
        $(".learn-colors").append(row1)
        let palette_object = $("<div class = 'color-circle main-palette-circle palette-circle palette-circle-big'></div>")
        $(".palette").append(palette_object)
        

        if (section == "secondary_colors") {
            palette_object.append("<div class = 'learn-color-name'>Drop primary</div>")
            palette_object.append("<div class = 'learn-color-name'>colors here</div>")
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

            let row2 = $('<div class = "row">')
            let row2c1 = $('<div class = "col-md-8 color-examples">')
            row2c1.append("<div class = 'color-circle palette-circle palette-circle-med color-example-orange'></div>")
            row2c1.append("<div class = 'color-circle palette-circle palette-circle-med color-example-green'></div>")
            row2c1.append("<div class = 'color-circle palette-circle palette-circle-med color-example-violet'></div>")
            row2.append(row2c1)
            $(".learn-colors").append(row2)

            let row3 = $('<div class = "row learn-colors-row">')
            let row3c1 = $('<div class = "col-md-8 color-examples">')
            row3c1.append("<span class = 'learn-color-name'>Orange</span>")
            row3c1.append("<span class = 'learn-color-name'>Green</span>")
            row3c1.append("<span class = 'learn-color-name'>Violet</span>")
            row3.append(row3c1)
            $(".learn-colors").append(row3)
        }
        else {
            palette_object.append("<div class = 'learn-color-name'>Drop one primary and</div>")
            palette_object.append("<div class = 'learn-color-name'>one secondary colors here</div>")
            // let color_choices1 = '<div class = "col-md-2 border color-choices"></div>'
            // let color_choices2 = '<div class = "col-md-2 border color-choices"></div>'
            // row1.append(color_choices1)
            // row1.append(color_choices2)

            // let color_choices_r = $('<div class = "row"></div>')
            // let color_choices_r1c1 = $('<div class = "col-md-6 color-choices"></div>')
            // let color_choices_r1c2 = $('<div class = "col-md-6 color-choices"></div>')
            // $(".color_choices_r").append("hi")
            // $(".color_choices_r").append("there")

            // $.each(colors_list, function(index, value) {
            //     let color_circle = "<div class = 'color-circle palette-circle-small' style='background: "+value+";'></div>"
            //     $(".color-choices2").append(color_circle)
            // })

            let color_choices = '<div class = "col-md-2 color-choices"></div>'
            row1.append(color_choices)
            $.each(colors_list, function(index, value) {
                let color_circle = "<div class = 'color-circle palette-circle-small' style='background: "+value+";'></div>"
                $(".color-choices").append(color_circle)
            })

            let btn1 = "<button class = 'btn previous-button'>previous</button>"
            $(".previous-button-container").append(btn1)
            let btn2 = "<button class = 'btn next-button'>next</button>"
            $(".next-button-container").append(btn2)

            let row2 = $('<div class = "row">')
            let row2c1 = $('<div class = "col-md-8 color-examples">')
            row2c1.append("<div class = 'color-circle palette-circle palette-circle-small color-example-yelloworange'></div>")
            row2c1.append("<div class = 'color-circle palette-circle palette-circle-small color-example-redorange'></div>")
            row2c1.append("<div class = 'color-circle palette-circle palette-circle-small color-example-redpurple'></div>")
            row2.append(row2c1)

            let row3 = $('<div class = "row learn-colors-row">')
            let row3c1 = $('<div class = "col-md-8 color-examples">')
            row3c1.append("<span class = 'learn-color-name'>Yellow Orange</span>")
            row3c1.append("<span class = 'learn-color-name'>Red Orange</span>")
            row3c1.append("<span class = 'learn-color-name'>Red Purple</span>")
            row3.append(row3c1)
            $(".learn-colors").append(row3)

            let row4 = $('<div class = "row">')
            let row4c1 = $('<div class = "col-md-8 color-examples">')
            row4c1.append("<div class = 'color-circle palette-circle palette-circle-small color-example-bluepurple'></div>")
            row4c1.append("<div class = 'color-circle palette-circle palette-circle-small color-example-bluegreen'></div>")
            row4c1.append("<div class = 'color-circle palette-circle palette-circle-small color-example-yellowgreen'></div>")
            row4.append(row4c1)

            let row5 = $('<div class = "row learn-colors-row">')
            let row5c1 = $('<div class = "col-md-8 color-examples">')
            row5c1.append("<span class = 'learn-color-name'>Blue Purple</span>")
            row5c1.append("<span class = 'learn-color-name'>Blue Green</span>")
            row5c1.append("<span class = 'learn-color-name'>Yellow Green</span>")
            row5.append(row5c1)
            $(".learn-colors").append(row5)

            $(".learn-colors").append(row2)
            $(".learn-colors").append(row3)
            $(".learn-colors").append(row4)
            $(".learn-colors").append(row5)
        }
    }
}


$( document ).ready(function(){
    view_page()
})