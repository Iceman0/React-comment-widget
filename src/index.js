import "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom";

class CommentApp extends React.Component {
    constructor(props) {
        super(props);
        let savedContent = JSON.parse(localStorage.getItem("content"));
        this.state = {
            allComments: [...savedContent],
            textOfComment: "",
            author: ""
        };
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
        let allComments = this.state.allComments; //присваивается состояние
        allComments.push({
            text: this.state.textOfComment,
            author: this.state.author,
            time,
            id
        });
        this.setState({
            allComments,
            textOfComment: "",
            author: ""
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
        let allComments = this.state.allComments;
        if (this.state.textOfComment !== "" &&  this.state.author !== "") {
            this.pushComment('_' + Math.random().toString(36).substr(2, 9) , time);
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

    render() {
        let {allComments, textOfComment, author} = this.state;
        return (
            <div>
                <ol id="ol">
                    {allComments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <ul>
                                    <li className="classLi">
                                        {comment.text}, {comment.author}, {comment.time}
                                    </li>
                                    <button onClick={() => this.deleteLi(comment.id)}>
                                        Удалить
                                    </button>
                                </ul>
                            </li>
                        );
                    })}
                </ol>
                <InputField field={this.onChangeText} value={textOfComment} name={"Комментарий"} onEnterKeyUp={this.onEnterKeyUp}/>
                <InputField field={this.onChangeAuthor} value={author} name={"Автор"} onEnterKeyUp={this.onEnterKeyUp}/>
            </div>
        );
    }
}

class InputField extends React.Component {
    render() {
        return (
            <input
                type="text"
                placeholder={this.props.name}
                value={this.props.value}
                onChange={this.props.field}
                onKeyUp={this.props.onEnterKeyUp}
            />
        )
    }
}

ReactDOM.render(<CommentApp />, document.querySelector("#app"));
