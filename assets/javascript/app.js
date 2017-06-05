$(document).ready(function() {

      var animate = 0;
      //array of topics
      var topics = ["BMW", "Ferrari", "Lamborghini", "Bugatti", "Mercedes"];
      createButton();

      //user input and stuff
        $("#submitButton").on("click", function(event){
            event.preventDefault();
            console.log(this)

            var vehicles = $("#searchGif").val().trim()
              //no empty buttons
              if (vehicles !== "") {
                topics.push(vehicles)
                createButton();
                showGif();
              }
            })

          //creates button for topics array 
            function createButton(){
              $("#addButton").empty();

          for (var i = 0; i < topics.length; i++) {
              var a = $("<button>");
              a.attr("data-cars", topics[i]);
              a.addClass("searchButton");
              a.text(topics[i]);
              $("#addButton").append(a)
            }

          }
          //function that'll show the gifs
          function showGif(){
            var randomStuff = $(this).attr("data-cars");
            console.log(randomStuff)
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            randomStuff + "&api_key=dc6zaTOxFJmzC&limit=10";
          

             $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
             console.log(response)
            var results = response.data;

            //loops around to create additional div and attributes for the results
            for (var i = 0; i < results.length; i++) {
              var carsDiv = $("<div>");
              var rating = results[i].rating;
              var cRating = $("<p class = rating>").text("Rating: " + rating);
              carsDiv.prepend(cRating);
              var carStill = $("<img class = carImage>").attr("src", results[i].images.fixed_width_still.url).val(i)
              carsDiv.prepend(carStill)
              $("#gifs-appear-here").prepend(carsDiv)
            }

            //function that allows image to be turned on or off by clicking
            $(".carImage").on("click", function(){

              if(animate === 0){
                $(this).attr("src", results[this.value].images.fixed_width.url)
                animate++;
                  } else {
                    $(this).attr("src", results[this.value].images.fixed_width_still.url);
                    animate--;

                  }

              })

            })

          }

      $(document).on("click", ".searchButton", showGif)

    })