async function send_model(name='',content=''){
    let form = new FormData()

    form.append('mode','insert_model')
    form.append('name',name)
    form.append('content',content)

    fetch('/script.php',{
        method:'POST',
        body:form,
    }).then(e=>{
        e.json().then(
            res=>{
                console.log(res)
                res['res'] == true ? alert(`Modelo ${name} salvo com sucesso`) : alert(`Erro ao salvar modelo ${name}`)
            }
        )
    })
}

async function get_models(){
    let form = new FormData()

    form.append('mode','get_models')

    return fetch('/script.php',{
        method:'POST',
        body:form,
    })
}

async function get_rooms(){
    let form = new FormData()

    form.append('mode','get_rooms')

    return fetch('/script.php',{
        method:'POST',
        body:form,
    })
}

async function insert_room(name='',map=[],commands=[],floor=0){
    let form = new FormData()

    form.append('mode','insert_room')
    form.append('name',name)
    form.append('map',map_to_string(map))
    form.append('commands',commands)
    form.append('floor',floor)

    return fetch('/script.php',{
        method:'POST',
        body:form,
    })
}

function map_to_string(map=[]){
    let map_string = ''
    for(let n = 0; n < map.length; n++){
        for(let l = 0; l < map[n].length; l++){
            map_string += map[n][l].toString()
            if(l != (map[n][l].length - 1)){
                map_string += ';'
            }
        }
        if(n != (map.length - 1)){
            map_string += ']'
        }
    }

    return map_string
}