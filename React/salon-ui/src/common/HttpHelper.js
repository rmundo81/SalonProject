async function getErrorText(response) {

    let result = null;
    try {
        result = await response.json()
    } catch (e) {

    }

    if (result && result["message"])
        return result["message"]
    return JSON.stringify(result);
    ;
}

export function handleHttpErrors(response) {
    return new Promise((resolve, reject) => {

        if (!response.ok) {
            getErrorText(response).then(res => {
                reject(res);
            })
        } else {
            resolve(response);
        }

    });
}