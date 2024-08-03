const create = document.querySelector('.create')
const options = document.querySelector('.options')
const models = document.querySelector('.models')
const rooms = document.querySelector('.rooms')
const model_faces = '<div class="face front"></div><div class="face right"></div><div class="face left"></div><div class="face bottom"></div><div class="face back"></div><div class="face top"></div>'
const transparent = '<div class="container-cube transparent"><div class="face front"></div><div class="face right"></div><div class="face left"></div><div class="face bottom"></div><div class="face back"></div><div class="face top"></div></div>'
const models_list = {}
models_list['transparent'] = transparent

let input_size = document.querySelector('.size')
let form = document.querySelector('form')
let width = 50
let map = []
let cube_model = imports_model('transparent', transparent, 'transparent')

form.onsubmit = (e) => e.preventDefault()

function imports_model(name = '', model = '', class_model = '') {
    let container_cube = document.createElement('div')
    container_cube.innerHTML = model
    container_cube.setAttribute('name', name)
    container_cube.setAttribute('class', `model ${class_model}`)
    container_cube.onclick = () => {
        cube_model = container_cube
    }
    models.appendChild(container_cube)
    return container_cube
}

function imports_room(name = '', map_room = []) {
    let room = document.createElement('p')
    room.setAttribute('class', 'room')
    room.innerHTML = name
    room.onclick = () => {
        console.log(map_room)
        change_preview(map_room)
        change_room()
        save.children[0].value = name
    }

    rooms.appendChild(room)
}

//coloca o mapa no preview
function change_preview(map_room = []) {
    map = map_room
    change_map()
}

//modelo da grid
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

//gera uma grid com o tamanho do mapa para o preview de criação
function change_map() {
    let length = map.length

    if (length != 0) {
        let [x, y] = template(width, length, length)

        create.style.minWidth = `${map[0][0].length * width}px`
        create.style.minHeight = `${length * width}px`

        create.style.gridTemplateColumns = '1fr'
        create.style.gridTemplateRows = x
    }
    else {
        create.style.minWidth = `0`
        create.style.minHeight = `0`

        create.style.gridTemplateColumns = '1fr'
        create.style.gridTemplateRows = '1fr'
    }
}

//cria novas camadas
function change() {
    //criando layer
    let display = document.createElement('div')
    display.setAttribute('class', 'layer')
    display.style.opacity = '1'
    let value = Number(input_size.value)
    input_size.style.display = 'none'
    //tamanho da grid/matriz_quadrada
    let [x, y] = template(width, value, value)

    //definindo columns e rows como x
    display.style.gridTemplateColumns = x
    display.style.gridTemplateRows = x

    //criando uma nova linha na nossa matriz
    map.push([])
    //atribuindo o índice da nova linha
    let index = map.length - 1
    for (let n = 0; n < value; n++) {
        //criando os "lugares" de cada elemento
        map[index].push([])
        for (let i = 0; i < value; i++) {
            //incluindo o elemento "padrão"
            map[index][n].push(cube_model.getAttribute('name'))
        }
    }

    //pegando informações da nova linha
    let layer = map[map.length - 1]
    //atribuindo índice a div layer
    display.setAttribute('index', index)
    for (let l = 0; l < layer.length; l++) {
        for (let c = 0; c < layer[l].length; c++) {
            //criando novo cubo
            let cube = document.createElement('div')
            let index = map.length - 1
            //atribuindo html do modelo "padrão" ao cubo
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

    gadgets(display, index)

    //adicionando layer ao display de criação
    create.appendChild(display)
}

function change_room() {
    create.innerHTML = ''
    options.innerHTML = ''
    let matriz = map
    for (let l = 0; l < matriz.length; l++) {
        let linha = matriz[l]

        //criando layer
        let display = document.createElement('div')
        display.setAttribute('class', 'layer')
        display.style.opacity = '1'
        input_size.value = linha.length
        let value = Number(input_size.value)
        input_size.style.display = 'none'
        //tamanho da grid/matriz_quadrada
        let [x, y] = template(width, value, value)
        console.log(value)

        //definindo columns e rows como x
        display.style.gridTemplateColumns = x
        display.style.gridTemplateRows = x

        display.setAttribute('index', l)

        for (let c = 0; c < linha.length; c++) {
            let coluna = linha[c]
            for (let i = 0; i < coluna.length; i++) {
                let item = coluna[i]

                //criando novo cubo
                let cube = document.createElement('div')
                //atribuindo html do modelo "padrão" ao cubo a partir do nome
                cube.innerHTML = models_list[item]
                cube.style.opacity = '1'
                cube.style.cursor = 'pointer'
                cube.setAttribute('class', 'container-cube cube')
                cube.setAttribute('data-index', l)
                cube.addEventListener('click', () => {
                    let name = cube_model.getAttribute('name')
                    let n = Number(display.getAttribute('index'))
                    cube.innerHTML = cube_model.innerHTML
                    map[l][c][i] = cube_model.getAttribute('name')
                    console.log(`${name}:${l}|${c}|${i}`)
                })
                display.appendChild(cube)
            }
        }
        gadgets(display, l)
        create.appendChild(display)
    }
}

function gadgets(display = Element, index = 0) {
    //criando opções que manipulam o novo layer
    let option = document.createElement('div')
    option.setAttribute('class', 'option')
    option.innerHTML = `<p>${index + 1}</p><hr width="100%">`
    //adicionando lixo as opções
    let trash = document.createElement('i')
    trash.setAttribute('class', 'bi bi-trash')
    //quando onclick vai deletar a layer e a option
    trash.onclick = () => {
        let pos = (Number(option.children[0].innerHTML) - 1)
        map.splice(pos, 1)
        options.removeChild(option)
        create.removeChild(display)
        options_change()
        change_map()
    }

    //adicionando eye as opções
    let eye = document.createElement('i')
    eye.setAttribute('class', 'bi bi-eye')
    //quando onclick vai ocultar o layer
    eye.onclick = () => {
        eye.classList.toggle('click')
        display.style.opacity == 0 ? display.style.opacity = '1' : display.style.opacity = '0'
        display.classList.toggle('click')
        //display.style.pointerEvents != 'none' ? display.style.pointerEvents = 'none' : display.style.pointerEvents = 'all'
    }

    option.appendChild(trash)
    option.appendChild(eye)
    options.appendChild(option)
}

function options_change() {
    let options = document.querySelectorAll('.option')
    let displays = document.querySelectorAll('.layer')

    console.log(options)
    for (let n = 0; n < options.length; n++) {
        let option_ = options[n]
        option_.children[0].innerHTML = n + 1
    }
    console.log(displays)
    for (let n = 0; n < displays.length; n++) {
        let display = displays[n]
        display.setAttribute('index', n)
    }
}