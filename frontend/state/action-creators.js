import axios from 'axios'
import {
  MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE_QUESTION, 
  INPUT_CHANGE_TRUE, INPUT_CHANGE_FALSE, RESET_FORM 
  } from './action-types'

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise(nextCog) {
  return {type: MOVE_CLOCKWISE, payload: nextCog}
}

export function moveCounterClockwise(nextCog) { 
  return {type: MOVE_COUNTERCLOCKWISE, payload: nextCog}
}

export function selectAnswer(id) { 
  return {type: SET_SELECTED_ANSWER, payload: id}
}

export function setMessage(message) {
  return {type: SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz(quiz) {
  return {type: SET_QUIZ_INTO_STATE, payload: quiz}
 }

export function inputChangeQuestion(input) {
  return {type: INPUT_CHANGE_QUESTION, payload: input}
 }
export function inputChangeTrue(input) {
  return {type: INPUT_CHANGE_TRUE, payload: input}
 }
export function inputChangeFalse(input) {
  return {type: INPUT_CHANGE_FALSE, payload: input}
 }
export function resetForm() {
  return {type: RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null))
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => dispatch(setQuiz(res.data)))
      .catch(err => console.error(err));
  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    dispatch(selectAnswer(null))
    axios.post('http://localhost:9000/api/quiz/answer', { "quiz_id": quiz_id, "answer_id": answer_id })
    .then(res => dispatch(setMessage(res.data.message)))
    .catch(err => dispatch(setMessage("Sorry, something went wrong")))
    dispatch(fetchQuiz())
  }
}
export function postQuiz(question, trueAnswer, falseAnswer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', { "question_text": question, "true_answer_text": trueAnswer, "false_answer_text": falseAnswer })
    .then(res => dispatch(setMessage(`Congrats: "${question}" is a great question!`)))
    .catch(err => dispatch(setMessage("Sorry, something went wrong")))
    dispatch(resetForm())

  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
