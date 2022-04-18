$(document).ready(function(){
    $("#section").html("Section 2:");
    $("#title").html(content.title);
    $("#content").append("<p>").html(content.content);
    img = $("<img>");
    img.attr("src","https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F10%2F19%2Fcolor-wheel-db62df1a.jpg");
    $("#img").append(img)
})
    