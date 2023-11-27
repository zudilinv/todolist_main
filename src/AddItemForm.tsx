import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

export type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {
    const [inputTitle, setInputTitle] = useState<string>("")
    const [error, setError] = useState<boolean  | string>(false)

    const addTaskHandler = () => {
        const trimmedTask = inputTitle.trim()
        if (trimmedTask) {
            addItem(inputTitle.trim())
            setInputTitle("")
        } else {
            setError("Field is required")
        }
    }
    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setInputTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.ctrlKey && addTaskHandler()
        }
    }

    const maxInputLength = 15
    const isBTNDisabled = !inputTitle || inputTitle.length >= maxInputLength
    // const userMessage = error
    //     ? <span className={"error-message"}>Field is required</span>
    //     : inputTitle.length < maxInputLength
    //         ? <span className={"message"}>Enter new title</span>
    //         : <span className={"error-message"}>Your title is too long</span>

    const styleButton =
        {maxWidth: "40px", maxHeight: "40px",
        minWidth: "40px", minHeight: "40px"}

    return (
        <div>
            {/*<input*/}
            {/*    className={error ? "error" : ""}*/}
            {/*    value={inputTitle}*/}
            {/*    onChange={onChangeAddTaskHandler}*/}
            {/*    onKeyDown={onKeyDownAddTaskHandler}*/}
            {/*/>*/}
            <TextField id="outlined-basic"
                       label={error ? error : "Title"}
                       variant="outlined"
                       size="small"
                       error={!!error}
                       className={error ? "error" : ""}
                       value={inputTitle}
                       onChange={onChangeAddTaskHandler}
                       onKeyDown={onKeyDownAddTaskHandler}
            />
            {/*<button*/}
            {/*    disabled={isBTNDisabled}*/}
            {/*    onClick={addTaskHandler}>*/}
            {/*    {"+"}*/}
            {/*</button>*/}
            <Button variant="contained"
                    style={styleButton}
                    disabled={isBTNDisabled}
                    onClick={addTaskHandler}
            >
                {"+"}</Button>
            <div>
                {/*{userMessage}*/}
            </div>
        </div>
    );
};

