import request from "../utils/request";
import qs from "qs";

interface CommitData {
  openid: string;
  paper_id: string;
  sign: string;
  content: string;
}

export const createPaper = (openid: string) =>
  request({
    url: "/dangshi/public/index.php/jiangxi/paper/create",
    method: "POST",
    params: {
      openid,
    },
  });

export const fetchQuestions = (code: string) =>
  request({
    url: `/dangshi/public/index.php/api/paper/${code}`,
    method: "GET",
  });

export const commitAnswer = (data: CommitData) =>
  request({
    url: "/dangshi/public/index.php/jiangxi/commit",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    data: qs.stringify(data),
  });

export const fetchQuestionResults = (paper_id: string, sign: string) =>
  request({
    url: `/dangshi/public/index.php/api/commit/paper`,
    method: "GET",
    params: {
      paper_id,
      sign,
    },
  });
