const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");


const apiKey = 'f84009647ce2a9db9dcff46b58632a4b';


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// f84009647ce2a9db9dcff46b58632a4b

form.addEventListener("submit", async e => {
    e.preventDefault();
    try {
        const inputVal = input.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=${apiKey}`;
        // debugger;
        
        const resp = await fetch(url);
        const data = await resp.json();
        
        const {main, sys, weather, name} = data;
    
        const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    
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
                
        // debugger;
        const li = document.createElement("li");
        li.classList.add("city");
    
        li.innerHTML = markup;
        list.appendChild(li);

        msg.textContent = "";
        form.reset();
        input.focus();

    } catch {
        msg.textContent = "Please enter a valid city name!";
        form.reset();
        input.focus();
    };



});