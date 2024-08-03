const save = document.querySelector('#save')

save.onsubmit = (e) =>{
    e.preventDefault()

    let name = save.children[0].value

    insert_room(name,map,[],1)
}