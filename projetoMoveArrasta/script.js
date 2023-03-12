//feito por ultimo, para entender a ordem das peças
let areas = {
    a: null, b:null, c:null
}


document.querySelector('.neutralArea').addEventListener('click', (e) => {
    console.log('target', e.target); //conferindo onde cliquei
    console.log('current target', e.currentTarget) // seleciona o item que TEM o evento, e não apenas o target
    e.currentTarget.style.border = '1px solid red'
} )

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);

})

document.querySelectorAll('.area').forEach(area => {
    //para criar area que possa soltar coisas, criar 3 eventos diferentes...
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', Drop);
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);




//funções item
function dragStart(e) {
    e.currentTarget.classList.add('dragging');

}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');

}


//funções area 

function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }

    // e.preventDefault(); //faz com que o drop() funcione
    //console.log('passou por cima');
    
    


};

function dragLeave(e) {
    //console.log('saiu de uma area dropável')
    e.currentTarget.classList.remove('hover');
    
};

function Drop(e) {
    console.log('Soltei');
    e.currentTarget.classList.remove('hover');

    // selecionando o item especifico
    let dragItem = document.querySelector('.item.dragging');
    
    //verificando se já tem um item na area de drop
    //console.log(e.currentTarget)

    if (e.currentTarget.querySelector('.item') === null) {
        e.currentTarget.appendChild(dragItem);
        //appendchild ( entre dentro do elemento e adicione mais um item no final)
        // item não pode estar em 2 lugares ao mesmo tempo, então o sistema prioriza o appendChild
        updateArea();
    
    }
};


// functions neutral area

function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');

}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateArea();
}

// funções de lógica do processo ( feitas no final )

function updateArea() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if( area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
})

    console.log(areas);
    //fazer verificação de ordem de itens
    if(areas.a === '1' && areas.b ==='2' && areas.c ==='3') {
        document.querySelector('.areas').classList.add('correct');

    } else {
        document.querySelector('.areas').classList.remove('correct');
    }





}