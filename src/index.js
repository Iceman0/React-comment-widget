import "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom";

class CommentApp extends React.Component {
    constructor(props) {
        super(props);
        const setState = () => {
            this.state = {
                allComments: [],
                textOfComment: "",
                author: ""
            };
        };
        let savedContent = JSON.parse(localStorage.getItem("content"));
        setState();
        this.state.allComments = [...savedContent];
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onEnterKeyUp = this.onEnterKeyUp.bind(this);
    }
    deleteLi(key) {
        const filteredComments = this.state.allComments.filter((comment) => (key !== comment.id) ? comment : null);
        this.setState({allComments: filteredComments});
        localStorage.setItem('content', JSON.stringify(filteredComments));
    }

    pushComment(allComments, id, time){
        allComments.push({
            text: this.state.textOfComment,
            author: this.state.author,
            time,
            id
        })
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
            allComments.length !== 0 ?
                this.pushComment(allComments, allComments[allComments.length - 1].id + 1, time)
            :
                this.pushComment(allComments, 0, time);
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

    onEnterKeyUp(ev){
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
                            <div className="classLi" key={comment.id}>
                                <li>
                                    {comment.text}, {comment.author}, {comment.time}
                                </li>
                                <button onClick={this.onClick.bind(this, comment.id)}>
                                    Удалить
                                </button>
                            </div>
                        );
                    })}
                </ol>
                <input
                    type="text"
                    placeholder="Комментарий"
                    value={textOfComment}
                    onChange={this.onChangeText}
                    onKeyUp={this.onEnterKeyUp}
                />
                <input
                    type="text"
                    placeholder="Автор"
                    value={author}
                    onChange={this.onChangeAuthor}
                    onKeyUp={this.onEnterKeyUp}
                />
            </div>
        );
    }
}

ReactDOM.render(<CommentApp />, document.querySelector("#app"));
