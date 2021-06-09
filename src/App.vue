<template>
  <div>
    <input type="text" v-model="openid" @input="handleInput" />
    <button @click="start">提交</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import {
  commitAnswer,
  createPaper,
  fetchQuestions,
  fetchQuestionResults,
} from "./api";
import { addQuestions, generateAnswerStr, Question } from "./utils";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },

  setup() {
    const openid = ref(localStorage.getItem("openid") || "");

    const handleInput = (e: any) => {
      // console.log(e);
      localStorage.setItem("openid", e.target.value);
    };

    const start = async () => {
      const { data: PaperData } = await createPaper(openid.value);
      const code = PaperData.data.code;

      const { data: QuestionsData } = await fetchQuestions(code);
      const questions: Question[] = QuestionsData.data.questions;
      const { id: paper_id } = QuestionsData.data;
      const { commit_sign: sign } = QuestionsData.data;

      const { data: commitData } = await commitAnswer({
        paper_id,
        sign,
        openid: openid.value,
        content: generateAnswerStr(questions),
      });

      const { data: resultsData } = await fetchQuestionResults(paper_id, sign);
      const resultQuestions: Question[] = resultsData.data.questions;
      const questionsSaved = [...questions];
      questionsSaved.forEach((question, index) => {
        question.answer = resultQuestions[index].content
          .filter((contentItem) => contentItem.right == true)
          .map((contentItem) => contentItem.item.substr(3).trim());
      });

      addQuestions(questionsSaved);
      // localStorage.setItem("questions", JSON.stringify(questionsSaved));
    };

    return { openid, handleInput, start };
  },
});
</script>

<style></style>

function generateAnswerStr(): string { throw new Error("Function not
implemented."); } function generateAnswerStr(): string { throw new
Error("Function not implemented."); }
