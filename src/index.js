import inquirer from "inquirer";
import chalk from 'chalk';
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
    console.log(`Your Score ${chalk.blue.bold(score)}`);
};
welcome();
startQuiz();
