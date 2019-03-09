import './scss/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';



class CommentApp extends React.Component{
    constructor(){
        super();
        if (localStorage.getItem("content")!== null) {

            let myContent = JSON.parse(localStorage.getItem("content"));
            this.state = {
                todos: [
                ],
                newTodoText: '',
                newAuthor: '',
                time: ''
            };
            for (let i=0; i<myContent.length; i++)
            {
                this.state.todos.push({
                    name: myContent[i].name,
                    author: myContent[i].author,
                    time: myContent[i].time
                })
            }
        }
        else
        {
            this.state = {
                todos: [],
                newTodoText: '',
                newAuthor: '',
                time: ''
            };
        }

    }
    deleteLi(key){
        let todos = this.state.todos;
        delete todos[key];
        this.setState({todos});
        localStorage.clear();
        this.state.todos.map((todo, i) => {
            (function () {
                let myContent = [];
                myContent.push({
                    name: todo.name, author: todo.author, time: todo.time

                });
                if (localStorage.getItem("content")!==null)
                    localStorage.setItem('content', JSON.stringify(JSON.parse(localStorage.getItem("content")).concat(myContent)));
                else
                    localStorage.setItem('content', JSON.stringify(myContent));
            })();
        })
    }

    addTodo() {
        let time = new Date().toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
        });
        console.log(1);
        const todos = this.state.todos;
        todos.push({
            name: this.state.newTodoText,
            author: this.state.newAuthor,
            time: time
        });
        this.setState({
            todos,
            newTodoText: '',
            newAuthor: '',
            time
        });
        let content = [];
        (function () {
            content.push({
                name: todos[todos.length-1].name, author: todos[todos.length-1].author, time: todos[todos.length-1].time

            });
            if (localStorage.getItem("content")!==null)
            localStorage.setItem('content', JSON.stringify(JSON.parse(localStorage.getItem("content")).concat(content)));
            else
                localStorage.setItem('content', JSON.stringify(content));
        })();
    }

    render(){
        // language=JavaScript
        return(
            <div id="content">
            <ol id="ol">
                {
                    this.state.todos.map((todo, i) => {
                        return (
                            <div class="li">
                                <li
                                    key={i}
                                >
                                    {todo.name}, {todo.author}, {todo.time}
                                </li>
                                <input
                                    type="button"
                                    id="delButton"
                                    value="Удалить"
                                    onClick={ev => {
                                        this.deleteLi(i)
                                    }}
                                />
                            </div>

                        )
                    })
                }
            </ol>
            <input
                type = "text"
                placeholder="Комментарий"
                value = {this.state.newTodoText}
                onChange={ev => {
                    this.setState({ newTodoText: ev.target.value});
                }}
                onKeyUp ={ev => {
                    if (ev.keyCode === 13) {
                        this.addTodo();
                    }
                }
                }
            />
                <input
                    type = "text"
                    placeholder="Автор"
                    value = {this.state.newAuthor}
                    onChange={ev => {
                        this.setState({ newAuthor: ev.target.value});
                    }}
                    onKeyUp ={ev => {
                        if (ev.keyCode === 13) {
                            this.addTodo();
                        }
                    }
                    }
                />
            </div>

        );
    }

}


ReactDOM.render(
  <CommentApp />,
  document.querySelector('#app')
);



