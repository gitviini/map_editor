titule.onsubmit = (e) => {
    e.preventDefault()
}

save.onclick = () => {
    let name = titule.children[0].value
    if (confirm(`Deseja salvar ${name}`)) {
        let floor = prompt("Qual o nível do piso?")
        insert_room(name, map, [], Number(floor))
    }
}

del.onclick = () => {
    let name = titule.children[0].value
    if (confirm(`Deseja deletar ${name}`)) {
        delete_room(name)
    }
}

container_models.onclick = () =>{
    container_rooms.removeAttribute('open')
}

container_rooms.onclick = () =>{
    container_models.removeAttribute('open')
}