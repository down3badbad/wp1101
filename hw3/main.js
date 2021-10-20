//Global variables
var todo_list = [];
var list_done = [];
var add_footer = 0;

//Update task left
function update_count(){
    let update = document.getElementById("update_amount");
    let total = 0;
    for (let i = 0; i < list_done.length; i++) {
        if(list_done[i] != 1) total++;
    }
    update.innerHTML = total + "left";
}


//Get user input
var user = document.getElementById("input");
user.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        let input = document.getElementById("input").value;
        todo_list.push(input);
        list_done.push(0);
        add_input(todo_list.length - 1);

        //Update task left
        update_count();
    }
}
);

function add_event(x){
    let id = x.toString();
    var task = document.getElementById(id);
    let text = "h" + id;
    task.addEventListener("click", function(){
        if(!list_done[x-1]){
            document.getElementById(text).style.textDecoration = "line-through";
            document.getElementById(text).style.opacity = 0.5;
            list_done[x-1] = 1;
            update_count();
        }
        else{
            document.getElementById(text).style.textDecoration = "none";
            document.getElementById(text).style.opacity = 1;
            list_done[x-1] = 0;
            update_count();
        }
    }
    );
}

function add_input(x){
    let text = todo_list[x];
    var ul = document.getElementById("todo-list");

    //Add li
    var li = document.createElement("li");
    li.setAttribute("class", "todo-app__item");

    //Add div
    var div = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");
    div.setAttribute("class", "todo-app__checkbox");
    input.setAttribute("class", "input");
    input.setAttribute("type", "checkbox");
    label.setAttribute("class", "label");
    input.setAttribute("id", x+1);
    label.setAttribute("for", x+1);
    
    //Add text line
    var h1 = document.createElement("h1");
    var text_id = "h" + (x + 1);
    h1.setAttribute("class", "todo-app__item-detail");
    h1.setAttribute("id", text_id);
    h1.appendChild(document.createTextNode(text));

    //Add delete
    var cancel = document.createElement("img");
    cancel.setAttribute("src", "./img/x.png");
    cancel.setAttribute("class", "todo-app__item-x");

    //Append to parent
    div.appendChild(input);
    div.appendChild(label);
    li.appendChild(div);
    li.appendChild(h1);
    li.appendChild(cancel);
    ul.appendChild(li);

    add_event(x+1);
    check_footer(x+1);
}

function check_footer(){
    if(add_footer == 0)
    {
        add_footer++;
        var root = document.getElementById("root");

        //Create a footer class
        var footer = document.createElement("footer");
        footer.setAttribute("class", "todo-app__footer");
        footer.setAttribute("id", "todo-footer");

        //Left
        var left = document.createElement("div");
        left.setAttribute("class", "todo-app__total");
        var p = document.createElement("p");
        p.setAttribute("id", "update_amount");
        text = todo_list.length + " left";
        p.appendChild(document.createTextNode(text));
        left.appendChild(p);

        //Middle
        var ul = document.createElement("ul");
        ul.setAttribute("class", "todo-app__view-buttons");
        var butt1 = document.createElement("button");
        butt1.textContent = "All";
        var butt2 = document.createElement("button");
        butt2.textContent = "Active";
        var butt3 = document.createElement("button");
        butt3.textContent = "Completed";
        ul.appendChild(butt1);
        ul.appendChild(butt2);
        ul.appendChild(butt3);

        //Right
        var right = document.createElement("div");
        right.setAttribute("class", "todo-app__clean");
        var butt = document.createElement("button");
        butt.setAttribute("type", "button");
        butt.textContent = "Clear completed";
        right.appendChild(butt);

        //Append to parent
        footer.appendChild(left);
        footer.appendChild(ul);
        footer.appendChild(right);
        root.appendChild(footer);
    }
}