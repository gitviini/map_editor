get_models().then(e=>
    e.json().then(
        res=>res['models'].forEach(model => {
            let name = model[0]
            let content = model[1]

            imports(name,content)
        })
    )
)

get_rooms().then(e=>
    e.json().then(
        res=>res['rooms'].forEach(room=>{
            let name = room[0]
            let map = room[1]
            let commands = room[2]
            let floor = room[3]
        })
    )
)