import { keepService } from "../services/keepService.js"
import { NoteSetup } from "./note-setup.jsx"

export class NoteTodo extends React.Component {

    state = {
        todos: [],
        isHover: false
    }
    onHover = (ev) => {
        this.setState({ isHover: true })
    }
    onExitHover = (ev) => {
        this.setState({ isHover: false })
    }

    componentDidMount() {
        const { todos } = this.props.note.info
        this.setState({ todos })
    }

    onHover = (ev) => {
        this.setState({ isHover: true })
    }
    onExitHover = (ev) => {
        this.setState({ isHover: false })
    }

    toggleTodo = (todo) => {
        // keepService.updateDoneTodo()
        // console.log('loadNotes', loadNotes);
        if (!todo.txt) return
        const { note, loadNote } = this.props
        const { todos } = this.state
        keepService.updateDoneTodo(note, todo)
            .then(newTodos => {
                this.setState({ todos: newTodos })
            })


    }
    render() {
        const { todos, isHover } = this.state
        const { note, loadNotes } = this.props
        const { title } = this.props.note.info
        const color = this.props.note.style.backgroundColor

        if (!todos) return <div>loding..</div>

        return (
            <section className={`todos-container ${note.isPinned ? 'pinned' : ''} `}
                style={{ backgroundColor: color }}>
                {note.isPinned && <img src="./././img/pinned.png" />}
                <h1>{title}</h1>
                <ul className="clean-list ">
                    {todos.map(todo => {
                        if (todo.isDone) {
                            return (
                                <li key={todo.id}>
                                    <textarea name="example" className="done-todo" spellCheck="false" value={todo.txt} readOnly></textarea>
                                    <button onClick={() => this.toggleTodo(todo)} className="fa fas fa-check-circle"></button>
                                </li>
                            )
                        }
                        else {
                            return (
                                <li key={todo.id}>
                                    <textarea spellCheck="false" value={todo.txt} readOnly></textarea>
                                    <button onClick={() => this.toggleTodo(todo)} className="fa fas fa-circle"></button>
                                </li>
                            )
                        }
                    })}
                </ul>
                <div className="note-hover" style={{ opacity: isHover ? '1' : '0' }} onMouseEnter={this.onHover} onMouseLeave={this.onExitHover} >
                    {<NoteSetup note={note} onExitHover={this.onExitHover} loadNotes={loadNotes} />}
                </div>

            </section>
        )
    }

}