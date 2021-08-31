
import { storageService } from '../../../services/storageService.js'
import { utilService } from '../../../services/util.service.js'


const KEY = 'notesDB'
const notes = createNotes()
// const books = require()
export const keepService = {
    query,
    updateNote,
    removeNote,
    addNote,
    updateDoneTodo,
    updateNoteColor,
    setPinnedNote,
    copyNote,
    getNoteById
}

function query(filterBy) {
    if (filterBy) {
        let { noteType, txt } = filterBy
        if (!noteType || noteType == 'all') {
            const noteToShow = notes.filter(currNote => currNote.info.title.toLowerCase().includes(txt.toLowerCase()))
            return Promise.resolve(noteToShow)
        }
        const noteToShow = notes.filter(currNote => {
            return currNote.info.title.toLowerCase().includes(txt.toLowerCase()) && currNote.type === noteType
        })
        return Promise.resolve(noteToShow)
    }

    return Promise.resolve(notes)
}

function updateNote(note) {
    const noteIdx = getNoteId(note)
    notes[noteIdx] = note
    _saveToStorage()
    return Promise.resolve()
}

function copyNote(note) {
    const noteIdx = getNoteId(note)
    const newNote = { ...note }
    newNote.id = utilService.makeId()
    notes.splice(noteIdx, 0, newNote)
    _saveToStorage()
    return Promise.resolve()
}

function removeNote(note) {
    const noteIdx = getNoteId(note)
    notes.splice(noteIdx, 1)
    _saveToStorage()
    return Promise.resolve()
}

function addNote(note) {
    note.id = utilService.makeId()
    notes.push(note)
    _saveToStorage()
    return Promise.resolve()

}

function setPinnedNote(pinnedNote) {
    const noteIdx = getNoteId(pinnedNote)
    pinnedNote.isPinned = !pinnedNote.isPinned
    if (pinnedNote.isPinned) {
        notes.splice(noteIdx, 1)
        notes.unshift(pinnedNote)
    }
    else {
        notes.splice(noteIdx, 1)
        notes.push(pinnedNote)
    }
    _saveToStorage()
    return Promise.resolve()

}

function getNoteId(note) {
    return notes.findIndex((currNote) => currNote.id === note.id)
}
function getNoteById(noteId) {
    var note = notes.find((note) => {
        return noteId === note.id
    })
    return Promise.resolve(note)
}
function updateNoteColor(currNote, color) {
    const noteIdx = getNoteId(currNote)
    notes[noteIdx].style.backgroundColor = color
    _saveToStorage()
    return Promise.resolve()

}

function updateDoneTodo(note, newTodo) {
    const { todos } = note.info
    var todoIdx = todos.findIndex(todo => todo.id === newTodo.id)
    todos[todoIdx].isDone = !todos[todoIdx].isDone
    // doneAt = !todos[todoIdx].doneAt ? new Date() : null
    note.info.todos = todos
    _saveToStorage()
    return Promise.resolve(todos)
}
function createNotes() {
    var notes = _loadFromStorage()
    if (notes) return notes;
    notes = [
        {
            "type": "note-todo",
            "isPinned": true,
            "info": {
                "title": "todo",
                "todos": [
                    {
                        "id": "XPNDr3",
                        "isDone": false,
                        "txt": "Develop New Logo"
                    },
                    {
                        "id": "or4ial",
                        "isDone": true,
                        "txt": "Set New Image"
                    }
                ]
            },
            "style": {
                "backgroundColor": "#f0edd6"
            },
            "id": "iV3REq"
        },
        {
            "type": "note-img",
            "isPinned": true,
            "info": {
                "title": " Amazing Tree",
                "url": "https://i.pinimg.com/originals/31/38/11/313811274a28746379ebf4d4fcf7842b.jpg"
            },
            "style": {
                "backgroundColor": "lightblue"
            },
            "id": "XLsJuR"
        },
        {
            "id": "n106",
            "type": "note-video",
            "isPinned": true,
            "info": {
                "title": "Amazing Sea",
                "youtubeId": "qcSSpoTrbXk"
            },
            "style": {
                "backgroundColor": "#aec9eb"
            }
        },
        {
            "id": "RdAH2d",
            "type": "note-txt",
            "isPinned": true,
            "info": {
                "title": "Lets Go",
                "txt": "Fullstack Me Baby!"
            },
            "style": {
                "backgroundColor": "#c3e7e8"
            }
        },
        {
            "id": "n102",
            "type": "note-img",
            "isPinned": true,
            "info": {
                "title": "Bobi and Me",
                "url": "https://www.iucn.org/sites/dev/files/styles/850x500_no_menu_article/public/blue-morpho-350x150-matthiasfr-pixabay-crop.jpg?itok=Y8DXROpH"
            },
            "style": {
                "backgroundColor": "#f0edd6"
            }
        },
        {
            "id": "gnj4Lz",
            "type": "note-txt",
            "isPinned": false,
            "info": {
                "title": "Lets Go",
                "txt": "Fullstack Me Baby!"
            },
            "style": {
                "backgroundColor": "#c3e7e8"
            }
        },
        {
            "id": "n103",
            "type": "note-todo",
            "isPinned": false,
            "info": {
                "title": "Get my stuff together",
                "todos": [
                    {
                        "id": "cZNIHM",
                        "txt": "Driving liscence",
                        "isDone": true
                    },
                    {
                        "id": "hR9IBw",
                        "txt": "Coding power",
                        "isDone": false
                    }
                ]
            },
            "style": {
                "backgroundColor": "#cce6ff"
            }
        },
        {
            "id": "n104",
            "type": "note-txt",
            "isPinned": false,
            "info": {
                "title": "My Favorites",
                "txt": "Common Lets Read!"
            },
            "style": {
                "backgroundColor": "#e1d590"
            }
        },
        {
            "id": "n105",
            "type": "note-img",
            "isPinned": false,
            "info": {
                "title": "Bobi and Me",
                "url": "https://img.etimg.com/photo/msid-68721421,quality-100/nature.jpg"
            },
            "style": {
                "backgroundColor": "#cce6ff"
            }
        },
        {
            "id": "aCIdcC",
            "type": "note-video",
            "isPinned": false,
            "info": {
                "title": "Amazing Sea",
                "youtubeId": "qcSSpoTrbXk"
            },
            "style": {
                "backgroundColor": "#a1d7c9"
            }
        },
        {
            "id": "n107",
            "type": "note-todo",
            "isPinned": false,
            "info": {
                "title": "Home Tasks",
                "todos": [
                    {
                        "id": "XLLESK",
                        "txt": "Do Homework",
                        "isDone": true
                    },
                    {
                        "id": "6LmJgy",
                        "txt": "Need Make Something",
                        "isDone": false
                    },
                    {
                        "id": "EQSEzd",
                        "txt": "Need Finish css",
                        "isDone": true
                    },
                    {
                        "id": "EL8oXN",
                        "txt": "Finish Play",
                        "isDone": true
                    }
                ]
            },
            "style": {
                "backgroundColor": "#f0edd6"
            }
        },
        {
            "type": "note-video",
            "isPinned": false,
            "info": {
                "title": "video",
                "youtubeId": "svn-JH8WXDY"
            },
            "style": {
                "backgroundColor": "lightblue"
            },
            "id": "VL4nye"
        },
        {
            "type": "note-video",
            "isPinned": false,
            "info": {
                "title": "video",
                "youtubeId": "Zv11L-ZfrSg"
            },
            "style": {
                "backgroundColor": "lightblue"
            },
            "id": "kwkHmV"
        },
        {
            "type": "note-todo",
            "isPinned": false,
            "info": {
                "title": "todo",
                "todos": [
                    {
                        "id": "DLarN6",
                        "isDone": true,
                        "txt": "Work "
                    },
                    {
                        "id": "jsObYV",
                        "isDone": false,
                        "txt": " Shopping "
                    },
                    {
                        "id": "fNqDwH",
                        "isDone": false,
                        "txt": " HomeWork"
                    }
                ]
            },
            "style": {
                "backgroundColor": "lightblue"
            },
            "id": "QqG5FR"
        },
        {
            "type": "note-txt",
            "isPinned": false,
            "info": {
                "title": "My- Note!",
                "txt": "Lets Eat Sushi!"
            },
            "style": {
                "backgroundColor": "lightblue"
            },
            "id": "qbdLhH"
        },
        {
            "type": "note-todo",
            "isPinned": false,
            "info": {
                "title": "todo",
                "todos": [
                    {
                        "id": "jAtDx1",
                        "isDone": false,
                        "txt": "Home"
                    },
                    {
                        "id": "w7erbG",
                        "isDone": true,
                        "txt": "LO asd"
                    },
                    {
                        "id": "D0VMfe",
                        "isDone": false,
                        "txt": "ddd"
                    }
                ]
            },
            "style": {
                "backgroundColor": "lightblue"
            },
            "id": "I3w7XF"
        }
    ]
    storageService.saveToStorage(KEY, notes)
    return notes
}




function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
function _saveToStorage() {
    storageService.saveToStorage(KEY, notes)
}