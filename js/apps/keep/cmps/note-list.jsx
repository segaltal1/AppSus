import { NotePreview } from "./note-preview.jsx";

export function NotesList({ notes, loadNotes }) {
    return (
        <div className="notes-list">
            {notes.map(note => <NotePreview note={note} key={note.id} loadNotes={loadNotes} />)}
        </div>
    )
}