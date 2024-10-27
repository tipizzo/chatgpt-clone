import axios from "axios";

export async function sendMsgToOpenAI(message) {
    try {
        const response = await axios.post('http://localhost:5000/api/completion', {
            message: message, // Send the message directly as JSON payload
        });
        return response.data.result;
    } catch (error) {
        console.error("Error from sendMsgToOpenAI:", error);
        throw error; // Let the error bubble up
    }
}