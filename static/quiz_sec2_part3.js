let num_dropped = 0
let dropped_color = []
$(document).ready(function(){
    let container = $("#interactive");
    let c1 = $("<div class='col-7'></div>")
    container.append(c1);
    let c2 = $("<div class='col-4'></div>")
    container.append(c2);
    let painting = $('<div>');
    painting.attr("class", "quiz-image-left");
    painting.append("<img src='../../../static/images/"+media.url+"'>");
    c1.append(painting);
    let r3 = $("<div class='row'></div>");
    c2.append(r3);
    r3.append("<div class='txt_instruct'><span class='txt_md'>Select a set of three analogous colors from this painting's palette:</span></div>")
    let r2 = $("<div class='row'></div>");
    c2.append(r2);
    media.colors.forEach(color => {
        let c3 = $("<div class='col-4'></div>");
        let circle = $("<div class='color_circle palette-circle-xs'></div>");
        circle.attr("style","background:"+color+";");
        circle.attr("data-color",color);
        circle.attr("id",color.substring(1));
        // $(circle).draggable({
        //     cursor: "move",
        //     revert: true,
        //     stack: ".color_circle",
        //     helper: "clone",
        // })
        $(circle).mouseover(function() {
            $(this).addClass("circle-on-hover")
        })
        $(circle).mouseout(function() {
            $(this).removeClass("circle-on-hover")
        })

        c3.append(circle);
        r2.append(c3);
    });
  
    $(".color_circle").click(function (e) { 
        e.preventDefault();
        num_dropped+=1
        if(num_dropped <=3){
            $(this).addClass("circle-on-selected");
            dropped_color.push(e.target.dataset.color);
        }
        if(num_dropped == 3){
            let data = {};
            data['section'] = ans_section;
            data['answer'] = dropped_color;
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
                    $('span.right_footnote').html("Score: "+user.score+"/10");
                    ans.correct_ans.forEach(element => {
                        $("#"+element.substring(1)).addClass("correct-color-circle");
                    });
                    ans.user_ans.forEach(element =>{
                        if( !(element in ans.correct_ans)){
                            $("#"+element.substring(1)).addClass("wrong-color-circle");
                        }

                    })
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
    // let r3 = $("<div class='row'></div>");
    // c2.append(r3);
    // r3.append("<div class='col-4 mid_drag_circle'>drop three analogus colors here</div>");
    // $(".mid_drag_circle").droppable({
    //     tolerance: "fit",
    //     accept: ".color_circle",
    //     drop: function(event, ui) {
    //             let temp = $(ui.helper).clone();
    //             $(this).append(temp);
    //             num_dropped += 1
    //             dropped_color.push(ui.helper[0].dataset.color);
    //             if (num_dropped == 3) {
    //                 $(this).droppable('disable');
    //                 let data = {};
    //                 data['section'] = ans_section;
    //                 data['answer'] = dropped_color
    //                 console.log(data['answer']);
    //                 $.ajax({
    //                     type: "POST",
    //                     url: "../../../update_ans",                
    //                     dataType : "json",
    //                     contentType: "application/json; charset=utf-8",
    //                     data : JSON.stringify(data),
    //                     success: function(result){
    //                         $('span.right_footnote').html("Score: "+result.data["score"]+"/10");
    //                     },
    //                     error: function(request, status, error){
    //                         console.log("Error");
    //                         console.log(request)
    //                         console.log(status)
    //                         console.log(error)
    //                     }
    //                 })
    //         }
    //     }
    // });
})