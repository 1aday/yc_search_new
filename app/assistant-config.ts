export const assistantId = process.env.ASSISTANT_ID || "asst_fJ4nTbCDTIfG7vk6G69jUWhY";

export const assistantConfig = {
  name: "YC Query",
  description: "Assistant for finding YC company talent",
  model: "gpt-4-turbo",
  instructions: "You are a specialized assistant focused on helping users find the right people from YC companies who have specific skills or knowledge. Help users identify and connect with relevant talent from YC-backed companies.",
  tools: [
    {
      type: "code_interpreter"
    },
    {
      type: "file_search"
    }
  ],
  tool_resources: {
    file_search: {
      vector_store_ids: []
    },
    code_interpreter: {
      file_ids: []
    }
  }
};

if (!process.env.OPENAI_API_KEY) {
  console.warn('Missing OPENAI_API_KEY environment variable');
}

if (!process.env.ASSISTANT_ID) {
  console.warn('Missing ASSISTANT_ID environment variable');
}
