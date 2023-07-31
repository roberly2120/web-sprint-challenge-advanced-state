import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const question = props.form.newQuestion
  const trueAnswer = props.form.newTrueAnswer
  const falseAnswer = props.form.newFalseAnswer
  const disabled = useState(true)


  const onChangeQuestion = evt => {
    props.inputChangeQuestion(evt.target.value)
  }
  const onChangeTrue = evt => {
    props.inputChangeTrue(evt.target.value)
  }
  const onChangeFalse = evt => {
    props.inputChangeFalse(evt.target.value)
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz(question, trueAnswer, falseAnswer)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={props.form.newQuestion} maxLength={50} onChange={onChangeQuestion} id="newQuestion" placeholder="Enter question" />
      <input value={props.form.newTrueAnswer} maxLength={50} onChange={onChangeTrue} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.form.newFalseAnswer} maxLength={50} onChange={onChangeFalse} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={question && trueAnswer && falseAnswer ? false : true}>Submit new quiz</button>
    </form>
  )
}
const mapStateToProps = state => {
  return {
    form: state.form
  }
}
export default connect(st => st, actionCreators)(Form)
