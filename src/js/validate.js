const validateField = (field) => {
    const reg = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

    if (field.value.trim() === '') {
        return 'The field should not be empty';
    }
    if (field.id === 'your_email' && !reg.test(field.value)) {
        return 'Please fill in a correct email address';
    }
};

export const checkFrom = () => {
    const formObj = {};
    formObj.name = document.getElementById('your_name');
    formObj.email = document.getElementById('your_email');
    formObj.message = document.getElementById('your_message');
    const result = [];
    for (const key in formObj) {
        const span = document.getElementById(formObj[key].id + '--span');
        span.textContent = validateField(formObj[key]);
        if (span.textContent.length !== 0) result.push(span.textContent);
    }

    if (!result.length) {
        return true;
    }
};
