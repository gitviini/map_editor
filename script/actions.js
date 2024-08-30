add_layer.onclick = (e) =>{
    if(create.children.length != 0){
        add_layer.classList.add('show')
        add_button.classList.add('click')
        
        add_button.children[0].onclick = () =>{
            change(0)
            add_layer.classList.remove('show')
            add_button.classList.remove('click')
        }
        
        add_button.children[1].onclick = () =>{
            change(1)
            add_layer.classList.remove('show')
            add_button.classList.remove('click')
        }
    }  
    else{
        change(1)
    }
}

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