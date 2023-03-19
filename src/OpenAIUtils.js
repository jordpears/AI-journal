export const transcribeAudio = async (fileUri) => {

    const apiUrl = 'https://api.openai.com/v1/audio/transcriptions';
    const API_KEY = "";

    const formData = new FormData();
    formData.append('file', {
        uri: fileUri,
        name: fileUri.substring(fileUri.lastIndexOf('/') + 1),
        type: 'audio/m4a',
    });
    formData.append('model', 'whisper-1');
    formData.append('prompt', 'So, talking about my day');
    formData.append('response_format', 'json');
    formData.append('language', 'en');

    const requestData = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    };

    const response = await fetch(apiUrl, requestData)
        .catch(error => {
            console.log(error);
        });

    console.log(response);
}