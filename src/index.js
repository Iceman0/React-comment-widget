import "./scss/style.scss";

import React from "react";
import ReactDOM from "react-dom";

class CommentApp extends React.Component {
    constructor() {
        super();
        const setState  = () => { this.state = {
            allComments: [],
            textOfComment: "",
            author: ""
        };};
        if (localStorage.getItem("content") !== null) {
            let savedContent = JSON.parse(localStorage.getItem("content"));
            setState();
            this.state.allComments = [...savedContent];
        } else {
            setState();
        }
    }
    deleteLi(key) {
        const filteredComments = this.state.allComments.filter((comment, i) => (key !== i) ? comment : null);
        this.setState({allComments: filteredComments});
        localStorage.setItem('content', JSON.stringify(filteredComments));
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
        let allComments = this.state.allComments;
        if (this.state.textOfComment !== "" &&  this.state.author !== "") {
            allComments.push({
                text: this.state.textOfComment,
                author: this.state.author,
                time: time
            });
            this.setState({
                allComments,
                textOfComment: "",
                author: ""
            });
            localStorage.setItem('content', JSON.stringify(allComments));
        }
        else alert("Введите все данные (комментарий и автор)");
    }

    render() {
        let {allComments, textOfComment, author} = this.state;
        return (
            <div>
                <ol id="ol">
                    {allComments.map((comment, i) => {
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
                    value={textOfComment}
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
                    value={author}
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
