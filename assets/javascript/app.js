
var numberOfGifs = 5;
var card;
var header;
var cardBody;

$('form').keypress(function(event) { 
    return event.keyCode != 13;
}); 

$("#addButton").on("click",function() {
    var input = $("#searchTerm").val();
    if (input === "" | input ===" "){
        alert("Please input a search term.")
        return;
    }

    numberOfGifs = $("#numberOfGifs").val();
    let newButton = $("<button class= 'btn btn-primary'>")
    newButton.attr("id", "search");
    newButton.attr("data-type", input);
    newButton.attr("data-number", numberOfGifs);
    newButton.attr("type", "button");
    newButton.text(input);
    $(".buttonArea").append(newButton);
    $("#searchTerm").val("");
})


function displayGifs(){
    var x = $(this).attr("data-type");
    numberOfGifs = $(this).attr("data-number");
    console.log(numberOfGifs)
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=cnXrAkFmWysKGEIn94PothosRcb7XWYW&limit="+ numberOfGifs;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            
            let card = $("<div class ='card'>");
            let header = $("<div class='card-header'>");
            let cardBody = $("<div class='card-body'>")
            for (var i = 0; i < numberOfGifs; i++){
            var imgURL = response.data[i].images.fixed_width_still.url;
            console.log(imgURL); 

            header.text(numberOfGifs + " " + x + " Gifs");
            let image = $("<img>").attr("src", imgURL);
            image.attr("class", "gif rounded");
            image.attr("data-state", "pause");
            image.attr("data-pause", imgURL);
            image.attr("data-play", response.data[i].images.fixed_width.url);
            cardBody.append(image);

        };
        header.append(cardBody);
        card.append(header);
        $("#gifArea").append(card);
        
        })};
       function animateGif() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "pause") {
              $(this).attr("src", $(this).attr("data-play"));
              $(this).attr("data-state", "play");
            } else {
              $(this).attr("src", $(this).attr("data-pause"));
              $(this).attr("data-state", "pause");
            }
          };
        $(document).on("click", "#search", displayGifs);
        $(document).on("click", ".gif", animateGif);
