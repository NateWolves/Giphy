
var numberOfGifs = 5;
var card;
var header;
var cardBody;
var favoriteIsClicked = false;
var removeIsClicked = false;
var imgURL;
// Enter was refreshing my page after form submit. This blocks the use of enter.
$('form').keypress(function(event) { 
    return event.keyCode != 13;
}); 

$("#favoriteButton").on("click",function(){

    if (favoriteIsClicked !== true){
    favoriteIsClicked = true;
    $(".notFavorite").attr("id","selectable");}
    else{
    favoriteIsClicked = false;
    $(".notFavorite").removeAttr("id");
    }
})
$("#removeButton").on("click", function(){

    if (removeIsClicked !== true){ 
        removeIsClicked = true;
        $(".gif").attr("id","removable")
        let x = $("<div>");
        x.text("x")
        x.attr("class", "delete rounded");
        $(".imgHolder").prepend(x);}
        else{
        removeIsClicked = false;
        $(".gif").removeAttr("id", "removable");
        $(".delete").remove();
        };
})

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
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=cnXrAkFmWysKGEIn94PothosRcb7XWYW&limit="+ numberOfGifs;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            
            let card = $("<div class ='card'>");
            let header = $("<div class='card-header'>");
            let cardBody = $("<div class='card-body'>")
            for (var i = 0; i < numberOfGifs; i++){
            imgURL = response.data[i].images.fixed_width_still.url;   
            header.text(numberOfGifs + " " + x + " Gifs");
            let image = $("<img>").attr("src", imgURL);
            image.attr("class", "gif rounded notFavorite");
            image.attr("data-state", "pause");
            image.attr("data-pause", imgURL);
            image.attr("data-play", response.data[i].images.fixed_width.url);
            cardBody.append(image);

        };
        header.append(cardBody);
        card.append(header);
        $("#gifArea").append(card);
        
        })};
// creates a method insert in order to insert _s into the src url making it a still image
String.prototype.insert = function (index, string) {
    if (index > 0){
    return this.substring(0, index) + string + this.substring(index, this.length)};
};
function renderGifs(list){
        $(".favoriteCard").remove();
        let card = $("<div class ='card favoriteCard'>");
        let header = $("<div class='card-header'>");
        let cardBody = $("<div class='card-body'>");
        header.text("Favorites");
        for (let i = 0; i < list.length; i++){
            let still = list[i].insert(49, "_s");
            let image = $("<img>").attr("src", still);
            image.attr("class", "gif rounded favorite");
            image.attr("data-state", "pause");
           
            image.attr("data-play", list[i]);
            image.attr("data-pause", still);
            let div = $("<div class= 'imgHolder'>")
            div.append(image);
            cardBody.append(div);
        }
        
        header.append(cardBody);
        card.append(header);
        $("#gifArea").prepend(card);
    }

function animateGif() {
    var state = $(this).attr("data-state");
    if (state === "pause") {
        $(this).attr("src", $(this).attr("data-play"));
        $(this).attr("data-state", "play");
        }
    else {
        $(this).attr("src", $(this).attr("data-pause"));
        $(this).attr("data-state", "pause");
        }
    };

function saveFavorites(){
    let img = $(this).attr("data-play");
    favoriteGifs.push(img);
    localStorage.setItem("savedGifs", JSON.stringify(img));

    localStorage.setItem("savedGifs", JSON.stringify(favoriteGifs))
    renderGifs(favoriteGifs);
    }

function removeFavorites(){
    let favURL = $(this).siblings('.favorite').attr("data-play");
    let index = favoriteGifs.indexOf(favURL);
    console.log(favURL);
    console.log(index);
    favoriteGifs.splice(index, 1);
    localStorage.setItem("savedGifs",JSON.stringify(favoriteGifs));
    $(this).closest('.imgHolder').remove();
  
}
        // Load the gifs from localstorage
        // Using JSON.parse to turn the string retrieved from an array into a string
    var favoriteGifs = JSON.parse(localStorage.getItem("savedGifs"));

    //     // Checks to see if the gifs exists in localStorage and is an array currently
    //     // If not, set a local list variable to an empty array

    if (!Array.isArray(favoriteGifs)){
        favoriteGifs = [];
    }
    

    
    $(document).on("click", "#search", displayGifs);
    $(document).on("click", ".gif", animateGif);
    $(document).on("click", "#selectable", saveFavorites);
    $(document).on("click", ".delete", removeFavorites);
    console.log(favoriteGifs);
    renderGifs(favoriteGifs);