
// console.log('Hello');
const apiKey = "75ba12d6350f4824ac414e0486808405";
const giphyUrl = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=" + apiKey;
var limit = 10;

var recArray = ["Puppies", "Kitten", "Birds", "Huskies"];
$(document).ready(function () {
    for (let i = 0; i < recArray.length; i++) {
        var btn = $("<button>");
        btn.addClass("btn btn-outline-secondary gif-btn rec-btn");
        btn.attr("data-name", recArray[i]);
        btn.text(recArray[i]);
        $(".rec-box").append(btn);
        // console.log("data-name:", btn.data("name"))
    }

    $(document).on("click", ".gif-btn", function () {
        // console.log(this);
        let query = $(this).data("name");
        // console.log('query:', query);
        let queryUrl = giphyUrl + "&q=" + query +"&limit=" + limit;
        // console.log('queryUrl:', queryUrl)
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done((result)=>{
            $("#gif-box").empty();
            console.log('result:', result);
            for(let i = 0; i < result.data.length; i++) {
                var gif = $("<img>");
                $(gif).addClass("loaded-gif");
                $(gif).attr('src', result.data[i].images.fixed_height_still.url);
                $(gif).attr('data-state', "still");
                $(gif).attr('data-animate', result.data[i].images.fixed_height.url);
                $(gif).attr('data-still', result.data[i].images.fixed_height_still.url);     
                $('#gif-box').prepend(gif);
            }
        })
    })

    $(document).on("click", ".loaded-gif", function () {
        // console.log("gif clicked");
        var state = $(this).attr("data-state");
        var animateUrl = $(this).attr("data-animate");
        var stillUrl = $(this).attr("data-still");
        // console.log(state);
        if (state == "still") {
            console.log("still to animate");
            $(this).attr("data-state", "animate");
            $(this).attr("src", animateUrl);
        } else if (state == "animate") {
            console.log("animate to still");
            $(this).attr("data-state", "still");
            $(this).attr("src", stillUrl);
        }
    })

})