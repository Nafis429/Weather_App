let weather={
    "apikey":"779b5eeb058fd86c8eeffad704e5d2b1",
    fetchWeather:function(city,latitude,longitude){
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+this.apikey
        ).then((Response)=>Response.json())
        .then((data)=>this.displayWeather(data))
    },
    
    
    displayWeather:function(data){
            const{name}=data;
            const{icon,description}=data.weather[0];
            const{temp,humidity}=data.main;
            const{speed}=data.wind;
            const tempp=temp-273.15;
            document.querySelector(".city").innerText="Weather in "+name;
            document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+".png";
            document.querySelector(".description").innerText=description;
            document.querySelector(".temp").innerText=tempp.toFixed(2)+ "°C";
            document.querySelector(".humidity").innerText="Humidity: "+ humidity+"%";
            document.querySelector(".wind").innerText="Wind Speed: "+ speed+"km/h";
            document.body.style.backgroundImage = `url('https://source.unsplash.com/random?${name}')`;
            document.querySelector(".weather").classList.remove("loading ");

    },search:function(){
       this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup",function(event){
if(event.key=="Enter"){
    weather.search();
}
});
weather.fetchWeather("London")

  