//Dados Iniciais
let corSelecionada = 'black'
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');
let canDraw = false;
let mouseX = 0;
let mouseY = 0;


//Eventos

document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click' , colorClickEvent)

screen.addEventListener('mousedown' , mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent );
screen.addEventListener ('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click' , apagartela)
})

//Funções
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    
    corSelecionada = color;

    document.querySelector('.colorArea .color.active').classList.remove('active')
    e.target.classList.add('active')
}

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;


};

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY)
    }
};

function mouseUpEvent() {
    canDraw = false;
};

function draw ( x , y) {
    //pego a posição
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //iniciei desenho
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = corSelecionada;
    ctx.stroke();

    //salvei a posição do mouse anterior
    mouseX = pointX;
    mouseY = pointY;



};  

function apagartela() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}