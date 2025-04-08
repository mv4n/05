 export const INITIAL_STATE = {
    isValid: {
        title: true,
        date: true,
        tags: true,
        text: true,
    },
    values: {
        title: '',
        date: '',
        tags: '',
        text: '',
    },
    isFormReadyToSubmit: false,
}

export function formReducer(oldFormState, action) {
    switch (action.type) {

        case 'SUBMIT': {
            const titleValidity = !!action.payload.title.trim().length
            const dateValidity = !!action.payload.date;
            const tagsValidity = !!action.payload.tags.trim().length;
            const textValidity = !!action.payload.text.trim().length;
            return {
                isValid: {
                    title: titleValidity,
                    date: dateValidity,
                    tags: tagsValidity,
                    text: textValidity,
                },
                values: action.payload,
                isFormReadyToSubmit: titleValidity && dateValidity && tagsValidity && textValidity
            }
        }
        case 'RESET_STATE': {
            return INITIAL_STATE
        }

        case 'UPDATE_STATE': {
            return {
                ...oldFormState,
                values: {
                    ...oldFormState.values,
                    ...action.payload,
                },
            }
        }

        default:
            return oldFormState;
    }
}