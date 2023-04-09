import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const getTips = async () => {
    const age = 43;
    const debt = 2000;
    const rent = 400;
    const salary = 2400;

    const prompt = `You are a financial manager. You are advising someone who \
                    is ${age} and who's financial goals is to pay off their \
                    debt. They have $${debt} in debt, spend $${rent} on rent a \
                    month, and earn $${salary} monthly. This person has never \
                    had a credit card. Start the response with and only with: \
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
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }

    console.log(result);
};

export default getTips;
