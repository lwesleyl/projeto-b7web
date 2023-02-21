let scriptBusca = document.querySelector('.busca').addEventListener('submit', async(event)=> {
    event.preventDefault();


    let scriptImput = document.querySelector('#searchInput').value;
    
    if (scriptImput !== '') {

        limparInfo ()
        mostrarAviso('Carregando...')

        let linkSite = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(scriptImput)}&appid=1f9896f47d29c2a91d673e593142f7ad&units=metric&leng=pt_br`

        
        let resultado = await fetch(linkSite)
        let resultadoJson = await resultado.json()

        if (resultadoJson.cod === 200) {
            mostrarInfo({
                Nome:resultadoJson.name,
                País:resultadoJson.sys.country,
                Temperatura: resultadoJson.main.temp,
                iconeTempo: resultadoJson.weather[0].icon,
                velocidadeVento: resultadoJson.wind.speed,
                anguloVento: resultadoJson.wind.deg                
            })


        } else {
            limparInfo()
            mostrarAviso('Não encontramos a localização.')
        }

    } 

})

function mostrarInfo(resultadoJson) {
    mostrarAviso('');
    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${resultadoJson.Nome} , ${resultadoJson.País}`
    document.querySelector('.tempInfo').innerHTML = `${resultadoJson.Temperatura} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${resultadoJson.velocidadeVento} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src' , `http://openweathermap.org/img/wn/${resultadoJson.iconeTempo}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${resultadoJson.anguloVento-90}deg)`



}


function mostrarAviso(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function limparInfo () {
    mostrarAviso('');
    document.querySelector('.resultado').style.display = 'none'

}