let scriptBusca = document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault() 

let scriptImput = document.querySelector('#searchInput').value
    if (scriptImput !== '') {
        clearInfo ()
        showAlert()

        let siteLink = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(scriptImput)}&appid=1f9896f47d29c2a91d673e593142f7ad&units=metric&leng=pt_br`
        
        let retorno = await fetch(siteLink)
        let retornoJson = await retorno.json()
        
            if(retornoJson.cod === 200) {
                
                showInfo ({
                    Nome: retornoJson.name,
                    País: retornoJson.sys.country,
                    Temperatura: retornoJson.main.temp,
                    VentoVelocid: retornoJson.wind.speed,
                    Icone: retornoJson.weather[0].icon,
                    SentidoVento: retornoJson.wind.deg,

                })

            } else {
                showAlertElse ()
            }

    } else {
        showAlertElse ()
    }
    
})









function showAlert () {
    let avisoScript = document.querySelector('.aviso').innerHTML = 'Carregando...'
    
}

function showAlertElse () {
    let avisoScript = document.querySelector('.aviso').innerHTML = 'Insira o nome da cidade corretamente.'
}

function showAlertVazio() {
    let avisoScript = document.querySelector('.aviso').innerHTML = ''
}


function showInfo (retornoJson) {
    showAlertVazio()
    document.querySelector('.resultado').style.display = 'block'
    
    document.querySelector('.titulo').innerHTML = `${retornoJson.Nome}, ${retornoJson.País}`
    document.querySelector('.tempInfo').innerHTML = `${retornoJson.Temperatura}<sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${retornoJson.VentoVelocid}<span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src' , `http://openweathermap.org/img/wn/${retornoJson.Icone}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${retornoJson.SentidoVento - 90}deg)`

}

function clearInfo () {
    document.querySelector('.resultado').style.display = 'none'
}
