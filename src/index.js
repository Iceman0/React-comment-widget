import "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom";

const MyComponents = {
    Button: function Button(props) {
        return <button className={props.color} value={props.text} onClick={props.onClick}/>;
    }
}

class CommentApp extends React.Component {
    constructor(props) {
        super(props);
        let savedContent = JSON.parse(localStorage.getItem("content"));
        this.state = {
            allComments: [],
            textOfComment: "",
            author: ""
        };
        this.state.allComments = [...savedContent];
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onEnterKeyUp = this.onEnterKeyUp.bind(this);
    }

    deleteLi(key) {
        const filteredComments = this.state.allComments.filter(comment => key !== comment.id);
        this.setState({allComments: filteredComments});
        localStorage.setItem('content', JSON.stringify(filteredComments));
    }

    pushComment(id, time){
        let allComments = this.state.allComments;
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
            this.pushComment('_' + Math.random().toString(36).substr(2, 9) , time);
            this.setState({
                allComments,
                textOfComment: "",
                author: ""
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

    deleteButton(field, value) {
        return (
            <input
                type="text"
                placeholder="Комментарий"
                value={value}
                onChange={field}
                onKeyUp={this.onEnterKeyUp}
            />
        );
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
                                <button onClick={this.deleteLi.bind(this, comment.id)}>
                                    Удалить
                                </button>
                            </div>
                        );
                    })}
                </ol>
                {this.deleteButton(this.onChangeText, textOfComment)}
                {this.deleteButton(this.onChangeAuthor, author)}
            </div>
        );
    }
}

ReactDOM.render(<CommentApp />, document.querySelector("#app"));
