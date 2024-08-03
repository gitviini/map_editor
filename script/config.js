get_models().then(e=>
    e.json().then(
        res=>res['models'].forEach(model => {
            let name = model[0]
            let content = model[1]

            models_list[name] = content
            imports_model(name,content)
        })
    )
)

get_rooms().then(e=>
    e.json().then(
        res=>res['rooms'].forEach(room=>{
            let name = room[0]
            let map_room = room[1]
            let commands = room[2]
            let floor = room[3]
            
            map_room = string_to_map(map_room)
            
            imports_room(name,map_room)
        })
    )
)