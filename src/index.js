import "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom";

class CommentApp extends React.Component {
    constructor() {
        super();
        const setState  = () => { this.state = {
            allComments: [],
            textOfComment: "",
            author: "",
            id: 0,
        };};
        if (localStorage.getItem("content") !== null) {
            let savedContent = JSON.parse(localStorage.getItem("content"));
            setState();
            this.state.allComments = [...savedContent];
        } else {
            setState();
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    deleteLi(key) {
        const filteredComments = this.state.allComments.filter((comment) => (key !== comment.id) ? comment : null);
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
            if (allComments.length !== 0)
                allComments.push({
                    text: this.state.textOfComment,
                    author: this.state.author,
                    time,
                    id: allComments[allComments.length - 1].id + 1
                });
            else
                allComments.push({
                    text: this.state.textOfComment,
                    author: this.state.author,
                    time,
                    id: 0
                });
            this.setState({
                allComments,
                textOfComment: "",
                author: "",
                id: 0
            });
            localStorage.setItem('content', JSON.stringify(allComments));
        }
        else alert("Введите все данные (комментарий и автор)");
    }

    onChangeText(ev) {
        this.setState({textOfComment: ev.target.value});
    }

    onChangeAuthor(ev) {
        this.setState({author: ev.target.value});
    }

    onKeyUp(ev){
        if (ev.keyCode === 13) {
            this.addComment();
        }
    }

    onClick(id) {
        this.deleteLi(id);
    }

    render() {
        let {allComments, textOfComment, author} = this.state;
        return (
            <div>
                <ol id="ol">
                    {allComments.map((comment) => {
                        return (
                            <div className="li" key={comment.id}>
                                <li>
                                    {comment.text}, {comment.author}, {comment.time}
                                </li>
                                <input
                                    type="button"
                                    id="delButton"
                                    value="Удалить"
                                    onClick={this.onClick.bind(this, comment.id)}
                                />
                            </div>
                        );
                    })}
                </ol>
                <input
                    type="text"
                    placeholder="Комментарий"
                    value={textOfComment}
                    onChange={this.onChangeText}
                    onKeyUp={this.onKeyUp}
                />
                <input
                    type="text"
                    placeholder="Автор"
                    value={author}
                    onChange={this.onChangeAuthor}
                    onKeyUp={this.onKeyUp}
                />
            </div>
        );
    }
}

ReactDOM.render(<CommentApp />, document.querySelector("#app"));
