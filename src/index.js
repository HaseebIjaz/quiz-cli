import inquirer from "inquirer";
export var Category;
(function (Category) {
    Category["GeneralKnowledge"] = "General Knowledge";
})(Category || (Category = {}));
export var Difficulty;
(function (Difficulty) {
    Difficulty["Easy"] = "easy";
    Difficulty["Hard"] = "hard";
    Difficulty["Medium"] = "medium";
})(Difficulty || (Difficulty = {}));
export var Type;
(function (Type) {
    Type["Boolean"] = "boolean";
    Type["Multiple"] = "multiple";
})(Type || (Type = {}));
const questionsUrl = new URL("https://opentdb.com/api.php?amount=10&category=9");
const fetchData = async (url) => {
    try {
        const responseObj = await fetch(url);
        const jsonData = await responseObj.json();
        return jsonData.results;
    }
    catch (error) {
        console.error(error);
    }
};
const welcome = () => {
};
const startQuiz = async () => {
    let score = 0;
    const rawQuestions = await fetchData(questionsUrl);
    if (!rawQuestions)
        return;
    const questions = rawQuestions.map((questionData, index) => {
        return {
            type: "list",
            name: index.toString(),
            message: questionData.question,
            choices: [questionData.correct_answer, ...questionData.incorrect_answers],
        };
    });
    await inquirer.prompt(questions)
        .then((answers) => {
        console.log(answers);
        Object.values(answers).forEach((answer, index) => {
            if (answer === rawQuestions[index].correct_answer) {
                score += 1;
            }
        });
    });
    console.log(`Your Score ${score}`);
};
welcome();
startQuiz();
