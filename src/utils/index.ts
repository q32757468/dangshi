import { unionBy } from "lodash-es";

interface OptionItem {
  item: string;
  right?: boolean;
  chosen?: boolean;
}

export interface Question {
  content: OptionItem[];
  id: string;
  title: string;
  type: string;
  answer?: string[];
}

export const getQuestions = () => {
  let questions: Question[] = [];
  if (localStorage.getItem("questions")) {
    questions = JSON.parse(localStorage.getItem("questions")!);
  }

  return questions;
};

export const getAnswer = (title: string) => {
  const questions = getQuestions();

  const question = questions.find((item) => item.title === title);
  return question?.answer || [];
};

export const generateAnswerNumStr = (
  answer: string[],
  contens: OptionItem[]
) => {
  const strArr = [];
  contens.forEach((contentItem, contentIndex) => {
    if (
      answer.findIndex(
        (answerItem) => answerItem.trim() === contentItem.item.trim()
      ) > -1
    ) {
      strArr.push(contentIndex + 1);
    }
  });
  if (strArr.length == 0) {
    strArr.push(1);
  }
  return strArr.join("|");
};

export const generateAnswerStr = (questions: Question[]) => {
  const answerArr: string[] = [];
  questions.forEach((question, index) => {
    const answer = getAnswer(question.title);
    answerArr.push(
      index + 1 + "$" + generateAnswerNumStr(answer, question.content)
    );
    console.log(
      `第${index + 1}题选：${generateAnswerNumStr(answer, question.content)}`
    );
  });

  return answerArr.join("}");
};

export const addQuestions = (questions: Question[]) => {
  let curQuestions = getQuestions();
  curQuestions = unionBy([...curQuestions, ...questions], "id");

  localStorage.setItem("questions", JSON.stringify(curQuestions));
};
