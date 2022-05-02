
$(document).ready(function(){
    let container = $("#interactive");

    let painting = $('<div>');
    painting.attr("class", "quiz-image");
    painting.append("<img src='../../../static/images/"+media.url+"'>");
    container.append(painting);


    let choice = $('<div>');
    choice.attr("class", "quiz-choice");
    let choice_button_1 = $('<button>').attr("class",'quiz-choice-btn').attr("data-choice","complementary").attr('id',"complementary");
    choice_button_1.html('Complimentary');
    let choice_button_2 = $('<button>').attr("class",'quiz-choice-btn').attr("data-choice","analagous").attr("id","analagous");
    choice_button_2.html('Analagous');
    choice.append(choice_button_1);
    choice.append(choice_button_2);
    container.append(choice)

    // if (user[ans_section].length > 0) {
    //     $("button").prop("disabled",true);
    //     $(".quiz-choice-btn").filter(function(){
    //         return $(this).attr('data-choice') == user[ans_section]
    //     }).addClass('selected');
    // }

    
    $(".quiz-choice-btn").click(function (e) { 
        e.preventDefault();
        let data = {};
        data['section'] = ans_section;
        data['answer'] = e.target.dataset.choice;
        $.ajax({
            type: "POST",
            url: "../../../update_ans",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data),
            success: function(result){
                let user = result.data['user']
                let ans = result.data['ans']
                if(ans.is_correct == 0){
                    $("#"+ans.user_ans).addClass("wrong");
                    $("#"+ans.correct_ans).addClass("correct");
                }else{
                    $("#"+ans.user_ans).addClass("correct");
                }
                $("button").prop("disabled",true);
                console.log(result.data);
                $('span.right_footnote').html("Score: "+user.score+"/10")
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