var OUTER_RADIUS = 220
var INNER_RADIUS = 120
var colors = thecolors["colors"];

function getCoordinate(angleInDegrees, radius, center = OUTER_RADIUS) {
    // degrees to radians;
    let radians = angleInDegrees * (Math.PI / 180);
    let x = center - Math.cos(radians) * radius
    let y = center - Math.sin(radians) * radius;
    return [x, y];
}

function computePie(){
    let radiusOuter = OUTER_RADIUS;
    let radiusInner = INNER_RADIUS;
    let angleStart = 0;
    let angleEnd = 30;
    let [x1, y1] = getCoordinate(angleStart, radiusInner); // starting angle on inner radius
    let [x2, y2] = getCoordinate(angleStart, radiusOuter); // starting angle on outer radius
    let [x3, y3] = getCoordinate(angleEnd, radiusOuter); // ending angle on outer radius
    let [x4, y4] = getCoordinate(angleEnd, radiusInner); // ending angle on inner radius
    let largeArc = 0; // percent > 0.5 ? 1 : 0;
    let sweepOuter = 1;
    let sweepInner = 0;
    let commands = 
        // move to start angle coordinate, inner radius (1)
        `M ${x1} ${y1} `+
        // line to start angle coordinate, outer radius (2)
        `L ${x2} ${y2} `+
        // arc to end angle coordinate, outer radius (3)
        `A ${radiusOuter} ${radiusOuter} 0 ${largeArc} ${sweepOuter} ${x3} ${y3} `+
        // line to end angle coordinate, inner radius (4)
        `L ${x4} ${y4} `+
        // arc back to start angle coordinate, inner radius (1)
        `A ${radiusInner} ${radiusInner} 0 ${largeArc} ${sweepInner} ${x1} ${y1} `;
    console.log(commands)
    return commands
}

function create_colorwheel(){
    let view_dim = OUTER_RADIUS * 2
    let colorwheel = $("<svg viewBox='0 0 "+view_dim+" "+view_dim+"' class='colorwheel' xmlns='http://www.w3.org/2000/svg'>");
    console.log(colors);
    let pie_path = computePie();
    // create each color pie
    $.each(colors, function(i, v){
        let degree = 30 * i;
        let id = "pie_" + i; /* id="pie_<id>" */
        let new_pie = $("<path id='"+id+"' class='pie' d='"+pie_path+"' fill='"+colors[i]+"' transform='rotate("+degree+" "+OUTER_RADIUS+" "+OUTER_RADIUS+")'/>");
        console.log("<path id='"+id+"' d='"+pie_path+"' fill='"+colors[i]+"' transform='rotate("+degree+" "+OUTER_RADIUS+" "+OUTER_RADIUS+")'/>")
        colorwheel.append(new_pie);
    })
    $("#interactive").append(colorwheel);
    /* refresh to display svg */
    $("body").html($("body").html());
}

function create_analogous(){
    let analogous = $("<div class='analogous_frame'>");
    let left_circle = $("<span class='analogous_circle' id='analogous_left'>")
    let mid_circle = $("<span class='analogous_circle' id='analogous_mid'>")
    let right_circle = $("<span class='analogous_circle' id='analogous_right'>")
    analogous.append(left_circle);
    analogous.append(mid_circle);
    analogous.append(right_circle);
    $("#interactive").append(analogous);
}


$(document).ready(function(){
    create_colorwheel();
    create_analogous();
    $('.pie').hover(function(){
        let cur_pie = $(this).attr('id');
        let cur_id = parseInt(cur_pie.split('_')[1]);
        let left_id = (cur_id + 11) % 12;
        let right_id = (cur_id + 1) % 12;
        let comp_left = "#pie_" + left_id;
        let comp_right = "#pie_" + right_id;
        $("#" + cur_pie).toggleClass("pie_hover");
        $(comp_left).toggleClass("pie_hover");
        $(comp_right).toggleClass("pie_hover");
        console.log(left_id);
        console.log(right_id);
        console.log(cur_id);
        $("#analogous_left").css("background-color", colors[left_id])
        $("#analogous_mid").css("background-color", colors[cur_id])
        $("#analogous_right").css("background-color", colors[right_id])
    })
})
