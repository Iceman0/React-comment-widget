import "./scss/style.scss";

import React from "react";
import ReactDOM from "react-dom";

class CommentApp extends React.Component {
    constructor() {
        super();
        if (localStorage.getItem("content") !== null) {
            let myContent = JSON.parse(localStorage.getItem("content"));
            this.state = {
                todos: [],
                textOfComment: "",
                author: "",
                time: ""
            };
            for (let i = 0; i < myContent.length; i++) {
                this.state.todos.push({
                    comment: myContent[i].comment,
                    author: myContent[i].author,
                    time: myContent[i].time
                });
            }
        } else {
            this.state = {
                todos: [],
                textOfComment: "",
                author: "",
                time: ""
            };
        }
    }
    deleteLi(key) {
        let todos = this.state.todos;
        delete todos[key];
        this.setState({ todos });
        localStorage.clear();
        this.state.todos.map((todo, i) => {
            (function() {
                let myContent = [];
                myContent.push({
                    comment: todo.comment,
                    author: todo.author,
                    time: todo.time
                });
                if (localStorage.getItem("content") !== null)
                    localStorage.setItem(
                        "content",
                        JSON.stringify(
                            JSON.parse(localStorage.getItem("content")).concat(myContent)
                        )
                    );
                else localStorage.setItem("content", JSON.stringify(myContent));
            })();
        });
    }

    addComment() {
        let time = new Date().toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
        const todos = this.state.todos;
        if (this.state.textOfComment !== "" &&  this.state.author !== "") {
            todos.push({
                comment: this.state.textOfComment,
                author: this.state.author,
                time: time
            });
            this.setState({
                todos,
                textOfComment: "",
                author: "",
                time
            });
            let content = [];
            (function () {
                content.push({
                    comment: todos[todos.length - 1].comment,
                    author: todos[todos.length - 1].author,
                    time: todos[todos.length - 1].time
                });
                if (localStorage.getItem("content") !== null)
                    localStorage.setItem(
                        "content",
                        JSON.stringify(
                            JSON.parse(localStorage.getItem("content")).concat(content)
                        )
                    );
                else localStorage.setItem("content", JSON.stringify(content));
            })();
        }
        else alert("Введите все данные (комментарий и автор)");
    }

    render() {
        // language=JavaScript
        return (
            <div>
                <ol id="ol">
                    {this.state.todos.map((todo, i) => {
                        return (
                            <div className="li" key={i}>
                                <li>
                                    {todo.comment}, {todo.author}, {todo.time}
                                </li>
                                <input
                                    type="button"
                                    id="delButton"
                                    value="Удалить"
                                    onClick={ev => {
                                        this.deleteLi(i);
                                    }}
                                />
                            </div>
                        );
                    })}
                </ol>
                <input
                    type="text"
                    placeholder="Комментарий"
                    value={this.state.textOfComment}
                    onChange={ev => {
                        this.setState({ textOfComment: ev.target.value });
                    }}
                    onKeyUp={ev => {
                        if (ev.keyCode === 13) {
                            this.addComment();
                        }
                    }}
                />
                <input
                    type="text"
                    placeholder="Автор"
                    value={this.state.author}
                    onChange={ev => {
                        this.setState({ author: ev.target.value });
                    }}
                    onKeyUp={ev => {
                        if (ev.keyCode === 13) {
                            this.addComment();
                        }
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(<CommentApp />, document.querySelector("#app"));
