



// app.js

const apiurl  ="	https://api.openai.com/v1/chat/completions"
const apikey = "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"


// Example function to make an API request
async function makeAPIRequest() {
    try {
        const response = await fetch(apiurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apikey}`,
            },
            body: JSON.stringify({
                model : "gpt-3.5-turbo-0301",
                prompt: ''
            }),
        });

        const data = await response.json();
        console.log(data); // Handle the API response data here

    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function when the page loads or based on user interaction
makeAPIRequest();
