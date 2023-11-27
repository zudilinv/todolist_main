import React, {ChangeEvent, useState} from "react";
import TextField from '@mui/material/TextField';

export type EditableSpanType = {
    title: string
    onChangeTitle: (title: string) => void
}
export const EditableSpan: React.FC<EditableSpanType> = ({title, onChangeTitle}) => {
    const [inputTitle, setInputTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState(false)

    const editModeHandler = () => {
        setEditMode(!editMode)
        if (editMode) {
            onChangeTitle(inputTitle)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    return (
        editMode
            ?
            // <input
            //     value={inputTitle}
            //     autoFocus
            //     onBlur={editModeHandler}
            //     onChange={onChangeHandler}
            // />
            <TextField id="outlined-basic"
                       label="Outlined"
                       variant="outlined"
                       size="small"
                       value={inputTitle}
                       autoFocus
                       onBlur={editModeHandler}
                       onChange={onChangeHandler}
            />
            :
            <span onDoubleClick={editModeHandler}>{title}</span>
    )
};
//-------------------------------------------------------------->
//  const [inputTitle, setInputTitle] = useState<string>("")
//
// const onEditModeHandler = () => {
//     setEditMode(true)
//     setInputTitle(title)
// }
// const offEditModeHandler = () => {
//     setEditMode(false)
//     onChangeTitle(inputTitle)
// }