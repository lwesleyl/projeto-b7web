document.querySelector('.busca').addEventListener('submit' , async (event)=> {
    event.preventDefault()



    let scriptImput = document.querySelector('#searchInput').value
        if (scriptImput !== '') {
            avisoCarregando()
    
            let linkdosite = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(scriptImput)}&appid=1f9896f47d29c2a91d673e593142f7ad&units=metric&leng=pt_br`
            
            let retornar = await fetch(linkdosite)
            let retornarJson = await retornar.json()
            
             
                if (retornarJson.cod === 200) {
                    removerAvisos()
                    infoClima ({
                        Nome: retornarJson.name
                    })

                } else {
                    avisoCampoVazio()
                    removerInfoClima()
                }

            
        } else  {
            avisoCampoVazio()
            removerInfoClima()
            }

} )



function avisoCarregando() {
    document.querySelector('.aviso').innerHTML = 'Carregando...'
}

function removerAvisos() {
    document.querySelector('.aviso').innerHTML = ''
}

function avisoCampoVazio() {
    document.querySelector('.aviso').innerHTML = 'Escreva o nome de uma cidade no campo acima.'
}

function infoClima () {
    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${retornarJson.Nome}`
   
}

function removerInfoClima() {
    document.querySelector('.resultado').style.display = 'none'
}
