

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
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},AR&appid=${apiKEY}&units=metric`
    console.log(url);
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado);

    if(resultado.cod=="404"){
        mostrarError("msj-error","NO HAY RESULTADOS");
        return;
    }
    const {name ,main, weather,dt}=resultado;
    if(!name) return null;

    let divResultado=document.getElementById("resultado");

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

    let icono = weather[0].icon;

    divResultado.innerHTML=`
                        <div class="div_carta">
                            <h1>Argentina, ${name}</h1>
                            <div class="datos">
                                <p class="temperatura">
                                    ${temperaturaRedondeada}&#x2103
                                </p>
                                <img src="./assets/${icono}.png" alt="clima">
                                <p class="sensacion">
                                Sensacion Termica: <br>${sensacionRedondeada}&#x2103
                                </p>
                                <div class="maxima_minima">
                                <p>${maximaRedondeada}-${minimaRedondeada}</p>
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