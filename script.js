// Selecting HTML elements
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

// API Key
const apiKey = 'f84009647ce2a9db9dcff46b58632a4b';

//Adding Event Listener
form.addEventListener("submit", async e => {
    
    //Prevent Default Behavior
    e.preventDefault();

    //try to ask openweather for data
    try {
        const inputVal = input.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=${apiKey}`;
        
        //wait for response and convert into JSON format
        const resp = await fetch(url);
        const data = await resp.json();
        
        //Destructuring data
        const {main, sys, weather, name} = data;
    
        //setting icon
        const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        
        //Create html markup
        const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
            <figure>
                <img class="city-icon" src="${icon}" alt="${
                weather[0].description}">
                <figcaption>${weather[0].description}</figcaption>
            </figure>`;
                
        //creating li element
        const li = document.createElement("li");
        
        //giving class name to list
        li.classList.add("city");
    
        //adding to the list
        li.innerHTML = markup;
        list.appendChild(li);
        
        //reset to original state
        msg.textContent = "";
        form.reset();
        input.focus();
        
        //error case
    } catch {
        //reset with error message
        msg.textContent = "Please enter a valid city name!";
        form.reset();
        input.focus();
    };
});
