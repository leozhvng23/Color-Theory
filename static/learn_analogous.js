var OUTER_RADIUS = 250
var INNER_RADIUS = 120

function create_colorwheel(){
    let colorwheel = $("<svg width='500' height='500' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg'>");
    let colors = thecolors["colors"];
    console.log(colors);
    let pie_path = computePie();

    $.each(colors, function(i, v){
        let degree = 30 * i;
        let id = "pie_" + i; /* id="pie_<id>" */
        let new_pie = $("<path id='"+id+"' class='pie' d='"+pie_path+"' fill='"+colors[i]+"' transform='rotate("+degree+" "+OUTER_RADIUS+" "+OUTER_RADIUS+")'/>");
        console.log("<path id='"+id+"' d='"+pie_path+"' fill='"+colors[i]+"' transform='rotate("+degree+" "+OUTER_RADIUS+" "+OUTER_RADIUS+")'/>")
        colorwheel.append(new_pie);
    })
    $("#interactive").append(colorwheel);
    /* refresh page to display svg */
    $("body").html($("body").html());
}

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

$(document).ready(function(){
    create_colorwheel();
})
