const create = document.querySelector('.create')
const options = document.querySelector('.options')
const models = document.querySelector('.models')
const model_faces = '<div class="face front"></div><div class="face right"></div><div class="face left"></div><div class="face bottom"></div><div class="face back"></div><div class="face top"></div>'
const transparent = '<div class="container-cube transparent"><div class="face front"></div><div class="face right"></div><div class="face left"></div><div class="face bottom"></div><div class="face back"></div><div class="face top"></div></div>'

let input_size = document.querySelector('.size')
let form = document.querySelector('form')
let width = 50
let map = []
let cube_model = imports('transparent',transparent,'transparent')

form.onsubmit = (e) => e.preventDefault()

function imports(name='', model='',class_model='') {
    let container_cube = document.createElement('div')
    container_cube.innerHTML = model
    container_cube.setAttribute('name',name)
    container_cube.setAttribute('class',`model ${class_model}`)
    container_cube.onclick = () =>{
        cube_model = container_cube
    }
    models.appendChild(container_cube)
    return container_cube
}

function color(layer = 0, line = 0, column = 0) {
    map[layer][line][column] == 0 ? map[layer][line][column] = 1 : map[layer][line][column] = 0
}

function template(size = 0, x = 0, y = 0) {
    let x_template = ''
    let y_template = ''

    for (let n = 0; n < x; n++) {
        x_template += `${size}px `
    }

    for (let n = 0; n < y; n++) {
        y_template += `${size}px `
    }

    return [x_template, y_template]
}

function change_map(){
    let length = map.length

    if(length != 0){
        let [x, y] = template(width, length, length)
        
        create.style.minWidth = `${map[0][0].length*width}px`
        create.style.minHeight = `${length*width}px`
        
        create.style.gridTemplateColumns = '1fr'
        create.style.gridTemplateRows = x
    }
    else{
        create.style.minWidth = `0`
        create.style.minHeight = `0`
        
        create.style.gridTemplateColumns = '1fr'
        create.style.gridTemplateRows = '1fr'
    }
}

function change() {
    let display = document.createElement('div')
    display.setAttribute('class', 'layer')
    display.style.opacity = '1'
    let value = Number(input_size.value)
    input_size.style.display = 'none'
    let [x, y] = template(width, value, value)

    display.style.gridTemplateColumns = x
    display.style.gridTemplateRows = x

    map.push([])
    let index = map.length - 1
    for (let n = 0; n < value; n++) {
        map[index].push([])
        for (let i = 0; i < value; i++) {
            map[index][n].push(cube_model.getAttribute('name'))
        }
    }

    display.innerHTML = ''
    let layer = map[map.length - 1]
    display.setAttribute('index',index)
    for (let l = 0; l < layer.length; l++) {
        for (let c = 0; c < layer[l].length; c++) {
            let cube = document.createElement('div')
            let index = map.length - 1
            cube.innerHTML = cube_model.innerHTML
            cube.style.opacity = '1'
            cube.style.cursor = 'pointer'
            cube.setAttribute('class', 'container-cube cube')
            cube.setAttribute('data-index', map.length)
            cube.addEventListener('click', () => {
                let name = cube_model.getAttribute('name')
                let n = Number(display.getAttribute('index'))
                cube.innerHTML = cube_model.innerHTML
                map[n][l][c] = cube_model.getAttribute('name')
                console.log(`${name}:${n}|${l}|${c}`)
            })
            display.appendChild(cube)
        }
    }
    change_map()
    create.appendChild(display)

    let option = document.createElement('div')
    option.setAttribute('class','option')
    option.innerHTML = `<p>${index+1}</p><hr width="100%">`
    let trash = document.createElement('i')
    trash.setAttribute('class','bi bi-trash')

    trash.onclick = () =>{
        let pos = Number(option.children[0].innerHTML)
        map.splice(pos,1)
        options.removeChild(option)
        create.removeChild(display)
        options_change()
        change_map()
    }

    let eye = document.createElement('i')
    eye.setAttribute('class','bi bi-eye')

    eye.onclick = () =>{
        eye.classList.toggle('click')
        display.style.opacity == 0 ? display.style.opacity = '1' : display.style.opacity = '0'
        display.classList.toggle('click')
        //display.style.pointerEvents != 'none' ? display.style.pointerEvents = 'none' : display.style.pointerEvents = 'all'
    }

    option.appendChild(trash)
    option.appendChild(eye)
    options.appendChild(option)
}

function options_change(){
    let options = document.querySelectorAll('.option')
    let displays = document.querySelectorAll('.layer')

    console.log(options)
    for(let n = 0; n < options.length; n++){
        let option_ = options[n]
        option_.children[0].innerHTML = n+1
    }
    console.log(displays)
    for(let n = 0; n < displays.length; n++){
        let display = displays[n]
        display.setAttribute('index',n)
    }
}