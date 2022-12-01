

const obtenerClima = () => {
    let ciudad = document.getElementById("ciudad").value;

    if(ciudad.trim()===''){
       mostrarError("msj-error","Falta Completar Campos") 
       return;
    }
    consultarAPI(ciudad);
}

const consultarAPI= async(ciudad) =>{
    const apiKEY="bf591ca3aa502b2a1c70a03ecc1713ce";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},AR&appid=${apiKEY}&units=metric&lang=es`
    console.log(url);
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado);

    if(resultado.cod=="404"){
        mostrarError("msj-error","NO HAY RESULTADOS");
        return;
    }
    const {name ,main, weather,sys}=resultado;
    if(!name) return null;

    let divResultado=document.getElementById("resultado");

    //SUNRISE SUNSET
    let sunset = sys.sunset;
    let sunrise = sys.sunrise;

    let unix_sunrise = sunrise;
    let unix_sunset = sunset;

    let date = new Date (unix_sunrise * 1000);             //1=sunrise 2=sunset
    let date2 = new Date (unix_sunset * 1000);

    let hours = date.getHours();
    let hours2 = date2.getHours();

    let minutes = "0" + date.getMinutes();
    let minutes2 = "0" + date2.getMinutes();

    let conversion =  hours + ':' + minutes.substr(-2);
    let conversion2 =  hours2 + ':' + minutes2.substr(-2);

    //DATOS WEATHER
    //TEMPERATURA
    let temperatura = parseFloat(main.temp,10);
    const temperaturaRedondeada = Math.round(temperatura);

    //SENSACION
    let sensacion = parseFloat(main.feels_like,10);
    let sensacionRedondeada = Math.round(sensacion);

    //MAXIMA-MINIMA
    let maxima = parseFloat(main.temp_max,10);
    let maximaRedondeada = Math.round(maxima);

    let minima = parseFloat(main.temp_min-9,10);
    let minimaRedondeada = Math.round(minima);

    //DESCRIPCION
    let descripcion = weather[0].description;
    let descripcionMay = descripcion.toUpperCase();
    
    //ICONO
    let icono = weather[0].icon;

    divResultado.innerHTML=`
                        <div class="div_carta">
                            <h1>Argentina, ${name}</h1>
                            <div class="datos">
                                <div class="temperatura">
                                    <p>
                                        ${temperaturaRedondeada}&#x2103
                                    </p>
                                    <h3>${descripcionMay}</h3>
                                    <div class="max_min">
                                        <h4>Max: ${maximaRedondeada}&#x2103</h4> 
                                        <h4>Min: ${minimaRedondeada}&#x2103</h4>
                                    </div>
                                </div>    
                                <img src="./assets/${icono}.png" alt="clima">
                                <p class="sensacion">
                                Sensacion Termica: <br>${sensacionRedondeada}&#x2103
                                </p>
                                <div class="sunset_sunrise">
                                    <h3>Salida y Puesta del Sol</h3>
                                    <div class="sunset_sunrise_Result">
                                        <h4>Salida del Sol:<br>${conversion} Am</h4>
                                        <h4>Puesta del Sol:<br>${conversion2} Pm</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                           `;
}

const mostrarError = (elemento, mensasje) =>{
    divError = document.getElementById(elemento);
    divError.innerHTML=`<p class="btn btn-danger">${mensasje}</p>`;
    setTimeout(()=> { divError.innerHTML='';}, 2500)
}

//RELOJ !!!!!!!!!
const time = document.getElementById("time");
const date = document.getElementById("date");

const meses = ["enero", "febrero", "marzo",
               "abril", "mayo", "junio", "julio",
               "agosto", "septiembre", "octubre",
               "noviembre", "diciembre"];

const interval = setInterval(() => {
    
    const local = new Date();

    let day = local.getDate(),
      month = local.getMonth(),
      year = local.getFullYear();

    time.innerHTML = local.toLocaleTimeString();
    date.innerHTML =`${day} ${meses[month]} ${year}`;

}, 1000);