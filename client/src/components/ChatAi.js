import React, { useState } from 'react';
import openai from 'openai'; // Assumes you've installed and configured the OpenAI API SDK

function ChatInterface() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);

  const generateResponse = async (input) => {
    const response = await openai.completions.create({
      engine: 'text-davinci-002', // Replace with your preferred engine
      prompt: input,
      max_tokens: 64, // Adjust as needed
      n: 1,
      stop: ['\n'], // Stop generation at the first line break
    });
    return response.choices[0].text.trim();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    const response = await generateResponse(inputValue);
    setMessages([...messages, { text: response, sender: 'bot' }]);
    setInputValue('');
  };

  return (
    <div className="chat-interface">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          placeholder="Type a message"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatInterface;
