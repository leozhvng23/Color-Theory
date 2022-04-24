$(document).ready(function(){
    let container = $("#interactive");

    let painting = $('<div>');
    painting.attr("class", "quiz-image");
    painting.append("<img src='../../../static/images/"+media.url+"'>");
    container.append(painting);


    let choice = $('<div>');
    choice.attr("class", "quiz-choice");
    let choice_button_1 = $('<button>').attr("class",'quiz-choice-btn');
    choice_button_1.html('Comlementary');
    let choice_button_2 = $('<button>').attr("class",'quiz-choice-btn');
    choice_button_2.html('Analogus');
    choice.append(choice_button_1);
    choice.append(choice_button_2);
    container.append(choice)
})