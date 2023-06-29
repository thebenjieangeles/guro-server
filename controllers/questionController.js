import Question from "../models/questionModel.js";

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving questions." });
  }
};

// Add a new question
const addQuestion = async (req, res) => {
  try {
    const { questionText } = req.body;
    const newQuestion = new Question({ questionText });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the question." });
  }
};

export { getAllQuestions, addQuestion };
