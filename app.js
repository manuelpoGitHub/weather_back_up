const API_KEY = "0f5007b96b9734dc3cc21e8534537be4";

const url = `https://api.openweathermap.org/data/2.5/weather?`;

const $main = $("main");

$main.append($("<div>").html(`<p>Weather for: </p>`));
$main.append($("<div>").html(`<p>Temperature: </p>`));
$main.append($("<div>").html(`<p>Feels like: </p>`));
$main.append($("<div>").html(`<p>Weather: </p>`));

const fromKtoFConversion = (kelvin) => {
  return ~~((kelvin - 273.15) * 9) / 5 + 32;
};

const filteredBySearch = (city) => {
// query parameter
  const query = `q=${city}`;
// token 
  const appId = `&appid=${API_KEY}`;
// request
  const request = $.ajax(`${url}${query}${appId}`);
// response from the API
  const response = request
  // then (when API information is successfully delivered. There is no error)
    .then((weather) => {
    $main.empty();
// 
    $main.append($("<div>").html(`<p>Weather for: ${weather.name}</p>`));
    $main.append(
      $("<div>").html(
        `<p>Temperature: ${fromKtoFConversion(weather.main.temp)}°</p>`
      )
    );
    $main.append(
      $("<div>").html(
        `<p>Feels like: ${fromKtoFConversion(weather.main.feels_like)}°</p>`
      )
    );
    $main.append(
      $("<div>").html(`<p>Weather: ${weather.weather[0].description}</p>`)
    );
  })
  // when error is found by API
  .catch(err=>console.log(err)) // 
};

$("input[type=submit]").on("click", (e) => {
  // prevent the refresh
  e.preventDefault();

  // grab text from input box
  const inputText = $("input[type=text]").val();

  // update the screen
  filteredBySearch(inputText);

  //clean up
  $("input[type=text]").val(null);
});
//filteredBySearch('denver');
$("h1").css("backgroundColor", "rgb(0, 255, 26)");
$("h1").css("color", "rgb(93, 31, 217)");
$("body").append(
  $("<div>").html(
    `<img width='150' height='150' src='Screen Shot 2022-08-26 at 12.55.26 PM.png'></img>`
  )
);
