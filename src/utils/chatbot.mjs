import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "./env.mjs";

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const getTips = async (data) => {
    const prompt = `You are a financial manager. You are advising someone who \
                    is ${data.age} and who's financial goals is to pay off \
                    their debt. They have $${data.debt} monthly in debt, spend \
                    $${data.rent} on rent a month, and earn $${data.salary} \
                    monthly. Each month, they spend $${data.entertainment} on \
                    entertainment, $${data.food} on food, $${data.gas} on gas, \
                    and $${data.other} on other expenses. Their main goal is \
                    $${data.goals}. Start the response with and only with: \
                    "Here are 3 ways to help you succeed:". What 3 pieces of \
                    advice would you give? Use the numbers given in this \
                    prompt to inform your decisions.`;

    let result = null;

    const openai = new OpenAIApi(configuration);
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
            n: 1,
        });
        result = completion.data.choices[0].text;
        console.log("hi")
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }

    return result;
};

getTips();

export default getTips;
