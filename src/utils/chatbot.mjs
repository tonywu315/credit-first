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

    let result = "";

    result =
        "Here are 3 ways to help you succeed: 1. Increase your income by finding a second job or taking on freelance work. 2. Cut back on entertainment and food expenses and redirect that money towards paying off debt. 3. Create a budget and stick to it to ensure that you are able to pay off your debt and save for your future goals.";

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

    let third =
        "Cut back on unnecessary expenses. Make sure you are only spending on what is absolutely necessary and look for ways to reduce your expenses.";
    let second =
        "Look for ways to increase your income. Consider taking on a second job or finding ways to make extra money on the side.";
    let first =
        "Create a budget and stick to it. Allocate a certain amount of your income each month to go towards your debt and make sure you stay within that budget.";
    try {
        third = result.split("3.")[1].trim();
        second = result.split("3.")[0].split("2.")[1].trim();
        first = result.split("3.")[0].split("2.")[0].split("1.")[1].trim();
    } catch (e) {
        console.log(e);
    }

    return (
        <ol>
            <li><span>{first}</span></li>
            <li><span>{second}</span></li>
            <li><span>{third}</span></li>
        </ol>
    );
};

getTips();

export default getTips;
