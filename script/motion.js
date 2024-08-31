// nº de graus (X e Y) em relação a face da frente
let degX = 0
let degY = 0

// lista de faces que podem ser observadas
let faces = ['front']

// Define que faces estão visíveis ou invisíveis a partir de X e Y
function degree(degX_ = 0, degY_ = 0) {

    let x = degX_ / 90
    let y = degY_ / 90
    console.log(`${x} : ${y}`)

    

    if (x < 1 && x > -1 && y < 1 && y > -1) {
        document.body.style.setProperty('--front','flex')
    }
    else {
        document.body.style.setProperty('--front','none')
    }
    if ((x < -1 || x > 1) || (y < -1 || y > 1)) {
        document.body.style.setProperty('--back','flex')
    }
    else {
        document.body.style.setProperty('--back','none')
    }
    if ((x > 0 && x < 2)) {
        document.body.style.setProperty('--left','flex')
    }
    else {
        document.body.style.setProperty('--left','none')
    }
    if ((x < 0 && x > -2)) {
        document.body.style.setProperty('--right','flex')
    }
    else {
        document.body.style.setProperty('--right','none')
    }
    if ((x < 1 && x > -1) && (y < 0 && y > -2) || (x < -1 && x >= -2 || x > 1 && x <= 2) && (y > 0 && y <= 2)) {
        document.body.style.setProperty('--top','flex')
    }
    else {
        document.body.style.setProperty('--top','none')
    }
    if ((x < 1 && x > -1) && (y > 0 && y < 2) || (x < -1 && x >= -2 || x > 1 && x <= 2) && (y < 0 && y >= -2)) {
        document.body.style.setProperty('--bottom','flex')
    }
    else {
        document.body.style.setProperty('--bottom','none')
    }
}


// (modo mobile) D-pad/controles para movimentar o preview create
up.onclick = () => {
    degY += 15
    change_motion(degX, degY)
}
down.onclick = () => {
    degY += -15
    change_motion(degX, degY)
}
right.onclick = () => {
    degX += 15
    change_motion(degX, degY)
}
left.onclick = () => {
    degX += -15
    change_motion(degX, degY)
}

// (modo desktop) movimentação do preview create a partir das setas
window.onkeydown = (e) => {
    if (e.key == 'ArrowUp') {
        degY += 15
    }
    else if (e.key == 'ArrowDown') {
        degY += -15
    }
    else if (e.key == 'ArrowRight') {
        degX += 15
    }
    else if (e.key == 'ArrowLeft') {
        degX += -15
    }

    change_motion(degX, degY)
}

// Função que atualiza a rotação (X e Y) do preview create
function change_motion(degX_ = 0, degY_) {

    if (degX_ / 90 > 2 || degX_ / 90 < -2) {
        degX = 0
        degX_ = 0
    }

    if (degY_ / 90 > 2 || degY_ / 90 < -2) {
        degY = 0
        degY_ = 0
    }

    orientation_cube.style.transform = `rotateY(${degX_}deg) rotateX(${degY_}deg)`
    display.style.transform = `rotateY(${degX_}deg) rotateX(${degY_}deg)`
    degree(degX,degY)
}