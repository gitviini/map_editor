models_list['transparent'] = transparent

let width = 50
let map = []
let cube_model = imports_model('transparent', transparent, 'transparent')
let unshift = -1

form.onsubmit = (e) => e.preventDefault()

// Cria e adiciona mensagem de erro em elementos especificados
function error_imports(msg = '', container = Element) {
    let err_msg = document.createElement('p')
    err_msg.innerHTML = msg
    err_msg.setAttribute('class', 'alert danger')
    container.appendChild(err_msg)
}

// Importar modelos para a div models
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

// Importar salas para a div rooms
function imports_room(name = '', map_room = []) {
    let room = document.createElement('p')
    room.setAttribute('class', 'button')
    room.innerHTML = name
    room.onclick = () => {
        console.log(map_room)
        change_preview(map_room)
        change_room()
        titule.children[0].value = name
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
function change(mode = 1) {

    //criando layer
    let display_ = document.createElement('div')
    display_.setAttribute('class', 'layer')
    display_.style.opacity = '1'
    let value = Number(input_size.value)
    input_size.style.display = 'none'
    //tamanho da grid/matriz_quadrada
    let [x, y] = template(width, value, value)

    //definindo columns e rows como x
    display_.style.gridTemplateColumns = x
    display_.style.gridTemplateRows = x

    //criando uma nova linha na nossa matriz temporária
    let map_temp = []
    for (let n = 0; n < value; n++) {
        //criando os "lugares" de cada elemento
        map_temp.push([])
        for (let i = 0; i < value; i++) {
            //incluindo o elemento "padrão"
            map_temp[n].push(cube_model.getAttribute('name'))
        }
    }

    mode == 1 ? map.push(map_temp) : map.unshift(map_temp)

    //pegando informações da nova linha
    let layer = map_temp
    //definindo índice da nova linha
    let index = 0
    mode == 1 ? index = map.length : index = 0
    //atribuindo índice a div layer
    display_.setAttribute('data-index', index)
    for (let l = 0; l < layer.length; l++) {
        for (let c = 0; c < layer[l].length; c++) {
            //criando novo cubo
            let cube = document.createElement('div')
            //atribuindo html do modelo "padrão" ao cubo
            cube.innerHTML = cube_model.innerHTML
            cube.style.opacity = '1'
            cube.style.cursor = 'pointer'
            cube.setAttribute('class', 'container-cube cube')
            cube.addEventListener('click', () => {
                let name = cube_model.getAttribute('name')
                let n = Number(display_.getAttribute('data-index'))
                cube.innerHTML = cube_model.innerHTML
                map[n][l][c] = cube_model.getAttribute('name')
                console.log(`${name}:${n}|${l}|${c}`)
            })
            display_.appendChild(cube)
        }
    }
    change_map()

    
    //adicionando layer ao display de criação
    mode == 0 ? create.children[0].before(display_) : create.appendChild(display_)
    gadgets(display_, index, mode)
}


// Cria o primeiro preview do mapa, a partir de uma matriz
function change_room() {
    create.innerHTML = ''
    options.innerHTML = ''
    let matriz = map
    for (let l = 0; l < matriz.length; l++) {
        let linha = matriz[l]

        //criando layer
        let display_ = document.createElement('div')
        display_.setAttribute('class', 'layer')
        display_.style.opacity = '1'
        input_size.value = linha.length
        let value = Number(input_size.value)
        input_size.style.display = 'none'
        //tamanho da grid/matriz_quadrada
        let [x, y] = template(width, value, value)
        console.log(value)

        //definindo columns e rows como x
        display_.style.gridTemplateColumns = x
        display_.style.gridTemplateRows = x

        display_.setAttribute('data-index', l)

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
                cube.addEventListener('click', () => {
                    let name = cube_model.getAttribute('name')
                    let l = Number(display_.getAttribute('data-index'))
                    cube.innerHTML = cube_model.innerHTML
                    map[l][c][i] = cube_model.getAttribute('name')
                    console.log(`${name}:${l}|${c}|${i}`)
                })
                display_.appendChild(cube)
            }
        }
        create.appendChild(display_)
        gadgets(display_, l)
    }
}

// Cria as opções a respeito das camadas
function gadgets(display_ = Element, index = 0, mode = 1) {
    //criando opções que manipulam o novo layer
    let option = document.createElement('div')
    option.setAttribute('class', 'option')
    option.innerHTML = `<p>${index + 1}</p>`
    //adicionando lixo as opções
    let trash = document.createElement('i')
    trash.setAttribute('class', 'bi bi-trash button')
    //quando onclick vai deletar a layer e a option
    trash.onclick = () => {
        let pos = (Number(option.children[0].innerHTML) - 1)
        map.splice(pos, 1)
        options.removeChild(option)
        create.removeChild(display_)
        options_change()
        change_map()
    }

    //adicionando eye as opções
    let eye = document.createElement('i')
    eye.setAttribute('class', 'bi bi-eye button')
    //quando onclick vai ocultar o layer
    eye.onclick = () => {
        eye.classList.toggle('click')
        display_.classList.toggle('click')
        //display.style.pointerEvents != 'none' ? display.style.pointerEvents = 'none' : display.style.pointerEvents = 'all'
    }

    option.appendChild(trash)
    option.appendChild(eye)
    mode == 1 ? options.appendChild(option) : options.children[0].before(option)
    options_change()
}

//Atualiza as informações nas camadas e seus respectivos gadgets
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
        let display_ = displays[n]
        display_.setAttribute('data-index', n)
    }
}