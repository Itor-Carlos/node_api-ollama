import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/ollama', async (request, response) => {
    const { message } = request.body;

    try {
        const responseOllama = await axios.post("http://localhost:11434/api/generate", {
            prompt: message,
            model: "llama3.1",
            stream: false
        });

        let responseText = responseOllama.data.response;
        console.log(responseText)
        let formattedText = responseText.replace(/(?:\r\n|\r|\n)/g, '\\n');
        response.send(formattedText);
    } catch (error) {
        console.error("Erro ao chamar API Ollama:", error);
        response.status(500).send("Erro ao processar a solicitação.");
    }
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is successfully running, and App is listening on port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
