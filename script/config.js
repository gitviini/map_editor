get_models().then(e=>
    e.json().then(
        res=>res['models'].forEach(model => {
            let name = model[0]
            let content = model[1]

            imports(name,content)
        })
    )
)


