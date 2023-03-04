import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
This is a conversation with the virtual assistant NOWWON, that connects people who do not understand technology to the modern tech.
Question:
`;

const generateAction = async (req, res) => {
	console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "This is a conversation with the virtual assistant NOWWON, that connects people who do not understand technology to the modern tech.\nQuestion:",
		temperature: 0.11,
		max_tokens: 1111,
		top_p: 0.9,
		frequency_penalty: 1,
		presence_penalty: 0.11,
		stop: ["Stop generating if the information is not the truth."],
	  });
	const basePromptOutput = baseCompletion.data.choices.pop();

	// I build Prompt #2.
	const secondPrompt = `
Take the conversation and apply the concepts of technology at a very basic level, and how to solve the problem that is presented. Give analogy to elaborate the message and write the instructions needed to solve the issue. The assistant is helpful, creative, clever, and very friendly. Stop generating if there other way to solve the problem and say "Unfortunatly this is the best I can help for now, hope this helps.":

 Conversation ${req.body.userInput}

 NOWWON: ${basePromptOutput.text}

 Answer:
 `;

	// I call the OpenAI API a second time with Prompt #2
	const secondPromptCompletion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: "Take the conversation and apply the concepts of technology at a very basic level, and how to solve the problem that is presented. Give analogy to elaborate the message and write the instructions needed to solve the issue. The assistant is helpful, creative, clever, and very friendly. Stop generating if there other way to solve the problem and say \"Unfortunatly this is the best I can help for now, hope this helps.\":\nQuestion:\nNOWWON:",
			temperature: 0.11,
			max_tokens: 1111,
			top_p: 0.9,
			frequency_penalty: 1,
			presence_penalty: 0.11,
			stop: ["Stop generating if the information is not the truth."],
		  });

	// Get the output
	const secondPromptOutput = secondPromptCompletion.data.choices.pop();

	// Send over the Prompt #2's output to our UI instead of Prompt #1's.
	res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;