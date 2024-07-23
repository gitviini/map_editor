const display = document.querySelector('.create')

let degX = 15
let degY = 15

window.onkeydown = (e) => {
    if(e.key == 'ArrowUp'){
        degY += 15
    }
    else if(e.key == 'ArrowDown'){
        degY += -15
    }
    else if(e.key == 'ArrowRight'){
        degX += 15
    }
    else if(e.key == 'ArrowLeft'){
        degX += -15
    }

    display.style.transform = `rotateY(${degX}deg) rotateX(${degY * -1}deg)`
    document.body.classList.toggle('click') 
}