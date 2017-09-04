
const apiKey = "75ba12d6350f4824ac414e0486808405";
const giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey;
// Set limit for number of data objects returned in JSON 
var limit = 10;                                       
// Set rating limit for returns data objects
var rating = "r";
// Set array of recommended search queries 
var recArray = ["Puppies", "Kitten", "Dog", "Huskies", "Cat"];
var recentSearches = [];

$(document).ready(function () {
// Create buttons for recommended search queries, class="gif-btn"
    for (let i = 0; i < recArray.length; i++) {
        var btn = $("<button>");
        let capital = recArray[i].toUpperCase();
        btn.addClass("btn btn-outline-secondary gif-btn");
        btn.attr("data-name", recArray[i]);
        btn.text(capital);
        $(".rec-box").append(btn);
    }

//Set search limit
    //Set on enter:
$("#limit").on("keyup", function(e){
    let input = $(this).val().trim();
    //If "enter" pressed, change limit number
    if(e.which == 13) {
        limit = input
    }
})
    //Set on click:
$("#limit-button").on("click", function(){
    let input = $("#limit").val().trim();
    //On "click", change limit number
    limit = input
})

// On click event for class="gif-btn" buttons in document
    // Giphy api request query= button.data-name
    // Prepends still images to "#gif-box", class="loaded-gif"
    $(document).on("click", ".gif-btn", function () {
        let query = $(this).data("name");
        console.log('query:', query);
        let queryUrl = giphyUrl + "&q=" + query + "&rating=" + rating + "&limit=" + limit;
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done((result)=>{
            $("#gif-box").empty();
            console.log('result:', result);
            for(let i = 0; i < result.data.length; i++) {
                var rating = $("<p>");
                $("#gif-box").append(rating);
                rating.addClass("ratings badge badge-pill badge-secondary");
                rating.text("Rated: " + result.data[i].rating.toUpperCase());
                if (result.data[i].rating == "r") {
                    rating.attr('class', "ratings badge badge-pill badge-danger");
                } else if (result.data[i].rating == "pg-13") {
                    rating.attr('class', "ratings badge badge-pill badge-warning");
                }

                var gif = $("<img>");
                $('#gif-box').append(gif);
                $(gif).addClass("loaded-gif");
                $(gif).attr('src', result.data[i].images.fixed_height_still.url);
                $(gif).attr('data-state', "still");
                $(gif).attr('data-animate', result.data[i].images.fixed_height.url);
                $(gif).attr('data-still', result.data[i].images.fixed_height_still.url);     
            } 
        })
        window.scrollTo(0, 0);
    })
    
// On click event for class="loaded-gif", toggles between animated and still src & data-state
    $(document).on("click", ".loaded-gif", function () {
        var state = $(this).attr("data-state");
        var animateUrl = $(this).attr("data-animate");
        var stillUrl = $(this).attr("data-still");
        if (state == "still") {
            $(this).attr("data-state", "animate");
            $(this).attr("src", animateUrl);
        } else if (state == "animate") {
            $(this).attr("data-state", "still");
            $(this).attr("src", stillUrl);
        }
    })

// On keypress event for input field ("#search")
    $("#search").on("keyup", function(e){
        let input = $(this).val().trim();
        //If "enter" pressed, run api function
        if(e.which == 13) {
            let queryUrl = giphyUrl + "&q=" + input + "&rating=" + rating + "&limit=" + limit;
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).done((result)=>{
                console.log('result:', result);
                $("#gif-box").empty();

                for(let i = 0; i < result.data.length; i++) {
                    var rating = $("<p>");
                    $("#gif-box").append(rating);
                    rating.addClass("ratings badge badge-pill badge-secondary");
                    rating.text("Rated: " + result.data[i].rating.toUpperCase());
                    if (result.data[i].rating == "r") {
                        rating.attr('class', "ratings badge badge-pill badge-danger");
                    } else if (result.data[i].rating == "pg-13") {
                        rating.attr('class', "ratings badge badge-pill badge-warning");
                    }
    
                    var gif = $("<img>");
                    $('#gif-box').append(gif);
                    $(gif).addClass("loaded-gif");
                    $(gif).attr('src', result.data[i].images.fixed_height_still.url);
                    $(gif).attr('data-state', "still");
                    $(gif).attr('data-animate', result.data[i].images.fixed_height.url);
                    $(gif).attr('data-still', result.data[i].images.fixed_height_still.url);   
                }
            })  
            $("#search").val(" ");
        }

        //If input has not been searched recently, add to recentSearches array and make recent searches button

        if(e.which == 13 && recentSearches.indexOf(input)== -1) {
            let capital = input.toUpperCase();
            var recentBtn = $("<button>");
            recentBtn.addClass("btn btn-outline-secondary gif-btn");
            recentBtn.attr("data-name", input);
            recentBtn.text(capital);
            $(".search-box").append(recentBtn);
            recentSearches.push(input);
            console.log('recentSearches:', recentSearches);
        }
    })

//On click event for "Search" button
    $(document).on("click", "#search-button", function () {
        let input = $("#search").val().trim();
        //Run api function
            let queryUrl = giphyUrl + "&q=" + input + "&rating=" + rating + "&limit=" + limit;
            console.log(queryUrl);
            $.ajax({
                url: queryUrl,
                method: "GET"
            }).done((result)=>{
                console.log('result:', result);
                $("#gif-box").empty();

                for(let i = 0; i < result.data.length; i++) {
                    var rating = $("<p>");
                    $("#gif-box").append(rating);
                    rating.addClass("ratings badge badge-pill badge-secondary");
                    rating.text("Rated: " + result.data[i].rating.toUpperCase());
                    if (result.data[i].rating == "r") {
                        rating.attr('class', "ratings badge badge-pill badge-danger");
                    } else if (result.data[i].rating == "pg-13") {
                        rating.attr('class', "ratings badge badge-pill badge-warning");
                    }
    
                    var gif = $("<img>");
                    $('#gif-box').append(gif);
                    $(gif).addClass("loaded-gif");
                    $(gif).attr('src', result.data[i].images.fixed_height_still.url);
                    $(gif).attr('data-state', "still");
                    $(gif).attr('data-animate', result.data[i].images.fixed_height.url);
                    $(gif).attr('data-still', result.data[i].images.fixed_height_still.url);   
                }
            })  
            $("#search").val(" ");
            window.scrollTo(0, 0);            

        //If input has not been searched recently, add to recentSearches array and make recent searches button

        if(recentSearches.indexOf(input)== -1) {
            let capital = input.toUpperCase();
            var recentBtn = $("<button>");
            recentBtn.addClass("btn btn-outline-secondary gif-btn");
            recentBtn.attr("data-name", input);
            recentBtn.text(capital);
            $(".search-box").append(recentBtn);
            recentSearches.push(input);
            console.log('recentSearches:', recentSearches);
        }
    })
})
