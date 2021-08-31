


export function ColorPalette({ onSetColor }) {
    return (
        <div className="color-palette">
            {/* <button style={{color:'#adb5bd'}} className=" fa fas fa-circle clear-btn" onClick={() => onSetColor('#adb5bd')}></button> */}
            <button style={{color:'#B0E0E6'}} className=" fa fas fa-circle clear-btn" onClick={() => onSetColor('#B0E0E6')}></button>
            <button style={{color:'#c3e7e8'}} className=" fa fas fa-circle clear-btn" onClick={() => onSetColor('#c3e7e8')}></button>
            <button style={{color:'#aec9eb'}} className=" fa fas fa-circle clear-btn" onClick={() => onSetColor('#aec9eb')}></button>
            <button style={{color:'#a1d7c9'}} className=" fa fas fa-circle clear-btn" onClick={() => onSetColor('#a1d7c9')}></button>
            <button style={{color:'#dedbcc'}} className=" fa fas fa-circle clear-btn" onClick={() => onSetColor('#dedbcc')}></button>
            <button style={{color:'#e1d590'}} className=" fa fas fa-circle clear-btn" onClick={() => onSetColor('#e1d590')}></button>
            <button style={{color:'#f0edd6'}} className=" fa fas fa-circle clear-btn" onClick={() => onSetColor('#f0edd6')}></button>
        </div>
    )
}