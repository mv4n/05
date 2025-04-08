import styles from './JournalForm.module.css'
import Button from "../Button/Button.jsx";
import {useEffect, useReducer, useRef, useState} from "react";

import { INITIAL_STATE, formReducer } from "./JournalForm.state.jsx";

import cn from 'classnames';

function JournalForm( { addItem }) {

    const titleRef = useRef();
    const dateRef = useRef();
    const tagsRef = useRef();
    const textRef = useRef();

    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        dispatchForm({ type: 'SUBMIT', payload: formData })
    }

    function handleChange(e) {
        const changedInput = e.target;

        dispatchForm({type: 'UPDATE_STATE',
            payload: {
                [changedInput.name]: changedInput.value,
            }
        })
    }

    function focusToErrorInput() {
        switch(true) {
            case !formState.isValid.title:
                titleRef.current.focus();
                break;
            case !formState.isValid.date:
                dateRef.current.focus();
                break;
            case !formState.isValid.tags:
                tagsRef.current.focus();
                break;
            case !formState.isValid.text:
                textRef.current.focus();
                break;
        }
    }

    useEffect(() => {
        focusToErrorInput()
    }, [formState.isValid]);

    useEffect(() => {
        if (formState.isFormReadyToSubmit) {
            addItem(formState.values)
            dispatchForm({type: 'RESET_STATE'})
        }
    }, [formState.isFormReadyToSubmit])

    return (
        <form
            className={cn(styles['journal-form'], {[styles['invalid']]: false })}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Title"
                name="title"
                ref={titleRef}
                className={cn(styles["form-input"], { [styles['invalid']]: !formState.isValid.title })}
                value={formState.values.title}
                onChange={handleChange}
            />

            <input
                type="date"
                placeholder="Date"
                name="date"
                ref={dateRef}
                className={cn(styles["form-input"], { [styles['invalid']]: !formState.isValid.date })}
                value={formState.values.date}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Tags"
                name="tags"
                ref={tagsRef}
                className={cn(styles["form-input"], { [styles['invalid']]: !formState.isValid.tags })}
                value={formState.values.tags}
                onChange={handleChange}
            />
            <textarea
                name="text" cols="30" rows="10"
                placeholder="Post text"
                ref={textRef}
                className={cn(styles["form-input"], { [styles['invalid']]: !formState.isValid.text })}
                value={formState.values.text}
                onChange={handleChange}
            />

            <Button text="Save" addClass="accent"/>
        </form>
    )
}



export default JournalForm;