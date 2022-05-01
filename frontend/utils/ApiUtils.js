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
    console.log(headers.get("Content-Type"));
    console.log(headers.get("Content-Length"));
    
    try {
        const response = await fetch(BASE_URL + url, {
            method: method,
            mode: 'cors',
            body: JSON.stringify(body), // string or object
            headers: headers
        })

        const data = await response.json()

        return await JSON.parse(data);

    } catch (error) {

        const data = await error.json()

        return await JSON.parse(data);
    }  

}
