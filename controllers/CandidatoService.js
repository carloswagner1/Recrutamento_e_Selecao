export class CandidatoService {

    constructor() {}

    postData(url = CANDIDATOS_PROFILES_ENDPOINT, data) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data), // string or object
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    }
}