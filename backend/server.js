const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(cors())
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/api/completion', async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Received message:", message); // Log input

        const response = await openai.createChatCompletion({
            model: 'gpt-4', // Use 'gpt-4' here
            messages: [{ role: 'user', content: message }], // Format message for chat model
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log("OpenAI Response:", response.data); // Log response
        res.json({ result: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error in /api/completion:", error.response?.data || error.message);
        res.status(500).json({ error: 'An error occurred' });
    }
});

PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
