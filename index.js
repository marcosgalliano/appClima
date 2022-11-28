const kelvin=277.15;

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
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},AR&appid=${apiKEY}`
    console.log(url);
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado);

    if(resultado.cod=="404"){
        mostrarError("msj-error","NO HAY RESULTADOS");
        return;
    }
    const {name ,main, weather}=resultado;
    if(!name) return null;

    let divResultado=document.getElementById("resultado");

    divResultado.innerHTML=`
                        <div class="div_carta">
                            <h1>${name}</h1>
                            <div>
                                <p class="temperatura">
                                    ${parseFloat(main.temp-kelvin,10).toFixed(2)} <span> &#x2103 </span>
                                </p>
                                <img src="./assets/${weather.icon}.png" alt="clima">
                            </div>
                        </div>
                           `;
}

const mostrarError = (elemento, mensasje) =>{
    divError = document.getElementById(elemento);
    divError.innerHTML=`<p class="btn btn-danger">${mensasje}</p>`;
    setTimeout(()=> { divError.innerHTML='';}, 2500)
}