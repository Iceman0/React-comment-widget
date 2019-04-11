import "./scss/style.scss";
import React from "react";
import ReactDOM from "react-dom";

class CommentApp extends React.Component {
    constructor(props) {
        super(props);
        let savedContent = JSON.parse(localStorage.getItem("content")) || [];
        this.state = {
            allComments: [...savedContent],
            textOfComment: "",
            author: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onEnterKeyUp = this.onEnterKeyUp.bind(this);
        this.deleteLi = this.deleteLi.bind(this);
    }

    deleteLi(event) {
        const filteredComments = this.state.allComments.filter(comment => event.currentTarget.value !== comment.id);
        this.setState({allComments: filteredComments});
        localStorage.setItem('content', JSON.stringify(filteredComments));
    }

    pushComment(id, time){
        let localAllComments = this.state.allComments; //присваивается состояние
        localAllComments.push({
            text: this.state.textOfComment,
            author: this.state.author,
            time,
            id
        });
        this.setState({
            allComments : localAllComments,
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

    onChange(ev) {
        if (ev.currentTarget.name === "Комментарий")
            this.setState({textOfComment: ev.target.value});
        else
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
                                    <button onClick={this.deleteLi} value={comment.id}>
                                        Удалить
                                    </button>
                                </ul>
                            </li>
                        );
                    })}
                </ol>
                <InputField field={this.onChange} value={textOfComment} name={"Комментарий"}  placeholder={"Комментарий"} onEnterKeyUp={this.onEnterKeyUp}/>
                <InputField field={this.onChange} value={author} name={"Автор"} placeholder={"Автор"} onEnterKeyUp={this.onEnterKeyUp}/>
            </div>
        );
    }
}

const InputField = (props) => {
    return (
        <input
            type="text"
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.field}
            onKeyUp={props.onEnterKeyUp}
        />
    )
};


ReactDOM.render(<CommentApp />, document.querySelector("#app"));
