import "./scss/style.scss";

import React from "react";
import ReactDOM from "react-dom";

class CommentApp extends React.Component {
    constructor() {
        super();
        if (localStorage.getItem("content") !== null) {
            let savedContent = JSON.parse(localStorage.getItem("content"));
            this.state = {
                allComments: [],
                textOfComment: "",
                author: "",
                time: ""
            };
            this.state.allComments = [...savedContent];
        } else {
            this.state = {
                allComments: [],
                textOfComment: "",
                author: "",
                time: ""
            };
        }
    }
    deleteLi(key) {
        const allComments = this.state.allComments.filter((comment, i) => (key !== i) ? comment : null);
        this.setState({allComments: allComments});
        localStorage.setItem('content', JSON.stringify(allComments));
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
        const allComments = this.state.allComments;
        if (this.state.textOfComment !== "" &&  this.state.author !== "") {
            allComments.push({
                text: this.state.textOfComment,
                author: this.state.author,
                time: time
            });
            this.setState({
                allComments: allComments,
                textOfComment: "",
                author: "",
                time
            });
            localStorage.setItem('content', JSON.stringify(allComments));
        }
        else alert("Введите все данные (комментарий и автор)");
    }

    render() {
        // language=JavaScript
        return (
            <div>
                <ol id="ol">
                    {this.state.allComments.map((comment, i) => {
                        return (
                            <div className="li" key={i}>
                                <li>
                                    {comment.text}, {comment.author}, {comment.time}
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
