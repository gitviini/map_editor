change_models.onclick = () => {
    change_models.classList.add('change')
    get_models().then(e =>{
        change_models.classList.remove('change')
        e.json().then(
            res =>res['models'].forEach(model => {
                let name = model[0]
                let content = model[1]

                models_list[name] = content
                imports_model(name, content)
            })
        )
        .catch(err => {
            error_imports('Erro ao importar modelos (ative o PHP)', models)
        })
        }
        )
}

change_rooms.onclick = () => get_rooms().then(e =>
    e.json().then(
        res => res['rooms'].forEach(room => {
            let name = room[0]
            let map_room = room[1]
            let commands = room[2]
            let floor = room[3]

            map_room = string_to_map(map_room)

            imports_room(name, map_room)
        })
    ))
    .catch(err => {
        error_imports('Erro ao importar Salas (ative o PHP)', rooms)
    })