import './scss/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';



class TodoApp extends React.Component{
    constructor(){
        super();
        if (localStorage.getItem("comment")!== null) {
            let comment = localStorage.getItem("comment").split(';; ');
            let author = localStorage.getItem("author").split(';; ');
            let myTime = localStorage.getItem("time").split(';; ');
            let checked = localStorage.getItem("checked").split(';; ');
            this.state = {
                todos: [
                ],
                newTodoText: '',
                newAuthor: '',
                time: '',
                localStorage: ''
            };
            for (let i=1; i<comment.length; i++)
            {
                this.state.todos.push({
                    name: comment[i],
                    author: author[i],
                    time: myTime[i],
                    checked: ! checked[i]
                })
            }
        }
        else
        {
            this.state = {
                todos: [],
                newTodoText: '',
                newAuthor: '',
                time: '',
                localStorage: ''
            };
        }

    }
    deleteLi(key){
        let todos = this.state.todos;
        delete todos[key];
        this.setState({todos});
        localStorage.clear();
        this.state.todos.map((todo, i) => {
            localStorage.setItem('comment', localStorage.getItem("comment") + ";; " + todo.name);
            localStorage.setItem('author', localStorage.getItem("author") + ";; " +  todo.author);
            localStorage.setItem('time', localStorage.getItem("time") + ";; " + todo.time);
            localStorage.setItem('checked', localStorage.getItem("checked") + ";; " +  todo.checked);
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
            time: time,
            checked: false
        });
        this.setState({
            todos,
            newTodoText: '',
            newAuthor: '',
            time
        });
        (function () {
            localStorage.setItem('comment', localStorage.getItem("comment") + ";; " + todos[todos.length-1].name);
            localStorage.setItem('author', localStorage.getItem("author") + ";; " +  todos[todos.length-1].author);
            localStorage.setItem('time', localStorage.getItem("time") + ";; " + time);
            localStorage.setItem('checked', localStorage.getItem("checked") + ";; " +  todos[todos.length-1].checked);
        })();
    }

    render(){
        // language=JavaScript
        return(
            <div id="content">
            <ol id="ol">
                {
                    this.state.todos.map((todo, i) => {
                        const className = todo.checked ? 'checked' : '';
                        return (
                            <div class="li">
                                <li
                                    key={i}
                                    className={className}
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
  <TodoApp />,
  document.querySelector('#app')
);



