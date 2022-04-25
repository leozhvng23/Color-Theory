$(document).ready(function(){
    let container = $("#interactive");
    let c1 = $("<div class='col-6'></div>")
    container.append(c1);
    let c2 = $("<div class='col-6'></div>")
    container.append(c2);
    let painting = $('<div>');
    painting.attr("class", "quiz-image");
    painting.append("<img src='../../../static/images/"+media.url+"'>");
    c1.append(painting);
    let r2 = $("<div class='row'></div>");
    c2.append(r2);
    media.colors.forEach(color => {
        let c3 = $("<div class='col-4'></div>");
        let circle = $("<div class='color_circle'></div>");
        circle.attr("style","background:"+color+";");
        c3.append(circle);
        r2.append(c3);
    });
    let r3 = $("<div class='row'></div>");
    c2.append(r3);
    r3.append("<div class='col-4 mid_drag_circle'>drop three analogus colors here</div>");
})