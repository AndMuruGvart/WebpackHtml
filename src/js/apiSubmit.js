export const apiSubmit = async() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const response = await fetch('https://worldtimeapi.org/api/timezone/' + tz);
    const data = response.status;

    return data;
};
