let degX = 15
let degY = 15

up.onclick = () =>{
    degY += 15
    change_motion(degX,degY)
}

down.onclick = () =>{
    degY += -15
    change_motion(degX,degY)
}

right.onclick = () =>{
    degX += 15
    change_motion(degX,degY)
}

left.onclick = () =>{
    degX += -15
    change_motion(degX,degY)
}

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

    change_motion(degX,degY)
    document.body.classList.toggle('click')
}

function change_motion(degX_=0,degY_){
    display.style.transform = `rotateY(${degX_}deg) rotateX(${degY_ * -1}deg)`
    document.body.classList.toggle('click') 
}