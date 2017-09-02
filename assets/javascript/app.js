
const apiKey = "75ba12d6350f4824ac414e0486808405";
const giphyUrl = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=" + apiKey;
// Set limit for number of data objects returned in JSON 
var limit = 10;
// Set rating limit for returns data objects
var rating = "pg";
// Set array of recommended search queries 
var recArray = ["Puppies", "Kitten", "Birds", "Huskies"];

$(document).ready(function () {
// Create buttons for recommended search queries, class="gif-btn rec-btn"
    for (let i = 0; i < recArray.length; i++) {
        var btn = $("<button>");
        btn.addClass("btn btn-outline-secondary gif-btn rec-btn");
        btn.attr("data-name", recArray[i]);
        btn.text(recArray[i]);
        $(".rec-box").append(btn);
        // console.log("data-name:", btn.data("name"))
    }

// On click event for class="gif-btn" buttons in document
    // Giphy api request query= button.data-name
    // Prepends still images to "#gif-box", class="loaded-gif"
    $(document).on("click", ".gif-btn", function () {
        let query = "funny+"+$(this).data("name");
        console.log('query:', query);
        let queryUrl = giphyUrl + "&q=" + query + "&rating=" + rating + "&limit=" + limit;
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

// On click event for class="loaded-gif", toggles between animated and still src & data-state
    $(document).on("click", ".loaded-gif", function () {
        var state = $(this).attr("data-state");
        var animateUrl = $(this).attr("data-animate");
        var stillUrl = $(this).attr("data-still");
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