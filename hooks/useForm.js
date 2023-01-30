const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export default function useForm(form) {
    const data = Object.entries(Object.fromEntries( new FormData(form)))
    const dataTransformed = Object.fromEntries( new FormData(form))
    const password = (Object.fromEntries(new FormData(form))).password
    const wrongData = data.filter(([key, value]) => (typeInputValidations[key](value, password)))
    const formLabels = Array.from(form.querySelectorAll(".form__label"))
    const formComplete = wrongData.length === 0
    
    resetStylesForm(formLabels)
    addStylesForm(form, wrongData)


    return {
        formComplete,
        data: dataTransformed
    }    
    
}

function addStylesForm(form, wrongData){
    for(const [key] of wrongData){
        form[key].parentElement.classList.add("form__label--error")
    }
}

function resetStylesForm(labels){
    for(const label of labels){
        label.classList.remove("form__label--error")
    }
}


const typeInputValidations = {
    email: (value) => !value.match(EMAIL_REGEX),
    password: (value) => value.length === 0,
    repeatPassword: (value, password) => value !== password || value.length === 0
}