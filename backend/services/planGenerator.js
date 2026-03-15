const Groq = require("groq-sdk");
const RecoveryPlan = require("../models/RecoveryPlan");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const generatePlan = async (profile) => {

  const prompt = `
You are an addiction recovery expert.

Create a simple recovery plan for the following user:

Addiction: ${profile.addictionType}
Frequency: ${profile.frequency}
Duration: ${profile.duration}
Triggers: ${profile.triggers.join(", ")}
Goal: ${profile.goal}

Return ONLY valid JSON.
Do not include markdown formatting.
Return the response in JSON format:

{
 "planSteps": ["step1","step2","step3"],
 "goodHabit": "habit",
 "motivation": "short motivational line"
}
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an addiction recovery assistant."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.7
  });

  const text = completion.choices[0].message.content;

  let cleanText = text.trim();

    // remove markdown code blocks if present
    if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/```json|```/g, "").trim();
    }

    const parsed = JSON.parse(cleanText);

  return parsed;
};

module.exports = generatePlan;