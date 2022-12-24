import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
This is a conversation with Jesus Christ, loving son of God.

Me:
`;

const generateAction = async (req, res) => {
	console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${basePromptPrefix}${req.body.userInput}\n`,
		temperature: 0.6,
		max_tokens: 333,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

	// I build Prompt #2.
	const secondPrompt = `
 Take the converstaion and input God's thoughts with examples of scripture in the Bible. Make it feel like a story with advice. Don't just list the points. Go deep into each one. Explain why so that anyone can understand.

 Me: ${req.body.userInput}

 Jesus Christ: ${basePromptOutput.text}

 God:
 `;

	// I call the OpenAI API a second time with Prompt #2
	const secondPromptCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${secondPrompt}`,
		// I set a higher temperature for this one. Up to you!
		temperature: 0.9,
		// I also increase max_tokens.
		max_tokens: 963,
	});

	// Get the output
	const secondPromptOutput = secondPromptCompletion.data.choices.pop();

	// Send over the Prompt #2's output to our UI instead of Prompt #1's.
	res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;