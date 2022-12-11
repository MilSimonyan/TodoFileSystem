const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const filePath = './Storage/list.json';

module.exports = {
    get, create, edit, destroy
}

function get(){
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        return '{}';
    }
}

function create(req, res){
    let todos = get();
    let id = uuidv4();
    let newTodo = req.body;
    todos = JSON.parse(todos);
    newTodo.id = id;
    todos[id] = newTodo;
    todos = JSON.stringify(todos, null, 2);
    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })

    todos = JSON.parse(todos);

    return res
        .status(200)
        .json({
            success: true,
            todo:  todos
        })
}

async function edit(req, res) {
    let todos = get();
    todos = JSON.parse(todos);
    let id = req.params.id;
    if (!todos[id]){
        return res
            .status(403)
            .json({
                success: false,
                message: "invalid Data"
            });
    }

    let name = req.body.name;
    let description = req.body.description;
    let status = req.body.status;
    let oldName = todos[id].name;
    let oldStatus = todos[id].status;
    let oldDescription = todos[id].description;




    if(status !== oldStatus) {
        todos[id].status = status;
    }
    if (oldName !== name) {
        todos[id].name = name;
    }
    if(description !== oldDescription) {
        todos[id].description = description;
    }

    if (name === undefined || name === '') {
        return destroy(req, res);
    }

    todos = JSON.stringify(todos, null, 2);
    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })

    return  res
             .status(200)
             .json({
                 success: true,
                 todo: "updated"
             })
}






function destroy(req, res){
    let todos = get();
    let id = req.params.id;
    todos = JSON.parse(todos);
    if (!todos[id]){
        return res
            .status(403)
            .json({
                success: false,
                message: "invalid Data"
            });
    }
    delete todos[id];
    todos = JSON.stringify(todos, null, 2);
    fs.writeFile(filePath, todos, (err) => {
        if (err)
            return err;
    })
    return res
        .status(200)
        .json({
            success: true,
            message: "delete"
        });
}
