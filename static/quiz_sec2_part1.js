$(document).ready(function(){
    let container = $("#interactive");

    let painting = $('<div>');
    painting.attr("class", "quiz-image");
    painting.append("<img src='../../../static/images/"+media.url+"'>");
    container.append(painting);


    let choice = $('<div>');
    choice.attr("class", "quiz-choice");
    let choice_button_1 = $('<button>').attr("class",'quiz-choice-btn').attr("data-choice","complimentary").attr("id","0");
    choice_button_1.html('Complimentary');
    let choice_button_2 = $('<button>').attr("class",'quiz-choice-btn').attr("data-choice","analagous").attr("id","1");
    choice_button_2.html('Analagous');
    choice.append(choice_button_1);
    choice.append(choice_button_2);
    container.append(choice)

    
    $(".quiz-choice-btn").click(function (e) { 
        e.preventDefault();
        let data = {};
        data['section'] = ans_section;
        data['answer'] = e.target.dataset.choice;
        console.log(e);
        $.ajax({
            type: "POST",
            url: "../../../update_ans",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data),
            success: function(result){
                $(".selected").removeClass('selected');
                $("#"+e.target.id).addClass('selected');
                console.log(result)
                $('span.right_footnote').html("Score: "+result.data["score"]+"/10")
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    });
})