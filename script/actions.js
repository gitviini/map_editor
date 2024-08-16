const titule = document.querySelector('#titule')
const save = document.querySelector('#save')
const del = document.querySelector('#delete')

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
