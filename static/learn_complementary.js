var OUTER_RADIUS = 220
var INNER_RADIUS = 120
var colors = thecolors["colors"];

function getCoordinate(angleInDegrees, radius, center = OUTER_RADIUS) {
    // degrees to radians;
    let radians = angleInDegrees * (Math.PI / 180);
    let x = center - Math.cos(radians) * radius +10;
    let y = center - Math.sin(radians) * radius;
    return [x, y];
}

function computePie(){
    let radiusOuter = OUTER_RADIUS;
    let radiusInner = INNER_RADIUS;
    let angleStart = 0;
    let angleEndLarge = 27;
    let angleEndSmall = 24.8;
    let [x1, y1] = getCoordinate(angleStart, radiusInner); // starting angle on inner radius
    let [x2, y2] = getCoordinate(angleStart, radiusOuter); // starting angle on outer radius
    let [x3, y3] = getCoordinate(angleEndLarge, radiusOuter); // ending angle on outer radius
    let [x4, y4] = getCoordinate(angleEndSmall, radiusInner); // ending angle on inner radius
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
    /* let filter = $("<filter id='inset-shadow'><feOffset dx='0'dy='1'/><feGaussianBlur stdDeviation='1' result='offset-blur'/><feComposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse'/> <feFlood flood-color='black' flood-opacity='0.4' result='color' /><feComposite operator='in' in='color' in2='inverse' result='shadow'/><feComposite operator='over' in='shadow' in2='SourceGraphic'/></filter>") */
    /* colorwheel.append(filter); */
    console.log(colors);
    let pie_path = computePie();
    // create each color pie
    $.each(colors, function(i, v){
        let degree = 30 * i;
        let id = "pie_" + i; /* id="pie_<id>" */
        let rotate_deg = OUTER_RADIUS - 3
        let new_pie = $("<path id='"+id+"' class='pie' d='"+pie_path+"' fill='"+colors[i]+"' transform='rotate("+degree+" "+rotate_deg+" "+rotate_deg+")'/>");
        console.log("<path id='"+id+"' d='"+pie_path+"' fill='"+colors[i]+"' transform='rotate("+degree+" "+OUTER_RADIUS+" "+OUTER_RADIUS+")'/>")
        colorwheel.append(new_pie);
    })
    $("#interactive").append(colorwheel);
    /* refresh to display svg */
    $("body").html($("body").html());
}

function create_complementary(){
    let complementary = $("<div class='complementary_frame'>");
    let left_circle = $("<span class='complementary_circle left' id='complementary_left'>")
    let right_circle = $("<span class='complementary_circle right' id='complementary_right'>")
    complementary.append(left_circle);
    complementary.append(right_circle);
    $("#interactive").append(complementary);
}


$(document).ready(function(){
    create_colorwheel();
    create_complementary();
    $('.pie').hover(function(){
        let cur_pie = $(this).attr('id');
        let cur_id = parseInt(cur_pie.split('_')[1]);
        let opposite_id = (cur_id + 6)%12;
        let complementary_id = "#pie_" + opposite_id;
        $("#" + cur_pie).toggleClass("pie_hover"); 
        $(complementary_id).toggleClass("pie_hover");
        console.log(colors[opposite_id]);
        console.log(colors[cur_id]);
        $("#complementary_left").css("background-color", colors[cur_id])
        $("#complementary_right").css("background-color", colors[opposite_id])
    })
})
