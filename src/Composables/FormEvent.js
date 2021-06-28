const HandleFocus = (e) => {
    const inputElement = e.target;
    inputElement.classList.remove('errorInput');
    
    const icon = inputElement.previousElementSibling;
    if(icon)
    {
        icon.classList.remove('displayIcon');
    }

    inputElement.parentElement.classList.add('focused')
}

const HandleBlur = (e) => {
    const inputElement = e.target;
    if(inputElement.value == "")
    {
        inputElement.classList.remove('filled');
        inputElement.parentElement.classList.remove('focused')
    }
    else
    {
        inputElement.classList.add('filled');
    }
}

const ValidateInputField = (id) => {
    const titleInput = document.querySelector(id);
    titleInput.classList.add('errorInput')

    const icon = titleInput.previousElementSibling;
    if(icon)
    {
        icon.setAttribute('title', 'Field is required');
        icon.classList.add('displayIcon')
    }
}

const FormEvent = () => {
    return { HandleFocus, HandleBlur, ValidateInputField}
}

export default FormEvent