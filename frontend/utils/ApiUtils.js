export async function sendRequest(method, url, body) {

    const BASE_URL = "http://localhost:8080";

    // Setando headers da chamada
    let headers = new Headers({
        "Content-Type": "application/json",
        "Content-Length": body.toString().length.toString()
    });

    // Logando para debugar
    console.log(url);
    console.log(body);
    console.log(headers.get("Content-Length"));

    try {
        let response;

        if (method === 'GET') {
            response = await fetch(BASE_URL + url, {
                method: method,
                mode: 'cors',
                headers: headers
            })
        }
        else if (method === 'POST') {
            response = await fetch(BASE_URL + url, {
                method: method,
                mode: 'cors',
                body: JSON.stringify(body), // string or object
                headers: headers
            })
        }
        else if (method === 'PUT') {
            response = await fetch(BASE_URL + url, {
                method: method,
                mode: 'cors',
                body: JSON.stringify(body), // string or object
                headers: headers
            })
        }
        else if (method === 'DELETE') {
            response = await fetch(BASE_URL + url, {
                method: method,
                mode: 'cors',
                headers: headers
            })
        }

        console.log(body);

        const data = response.json().then(body => ({
            body: body,
            status: response.status
        }));

        return data;

    } catch (error) {
        return await error;
    }  

}
