const db = require("../pgpool");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

const askPrompt = async (req, res) => {
    // getting prompt question from request
    const prompt = req.body.prompt;

    try {
      if (prompt == null) {
        throw new Error("Uh oh, no prompt was provided");
      }
  
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 64,
      });
      const completion = response.data.choices[0].text;
  
      return res.status(200).json({
        success: true,
        message: completion,
      });
    } catch (error) {
      throw error;
    }
};

module.exports = {
    askPrompt,
}