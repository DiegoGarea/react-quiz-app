const QuestionBlock = ({
  question,
  quizItemId,
  setChosenAnswerItems,
  chosenAnswerItems,
  unansweredQuestionsIds,
  setUnansweredQuestionsIds,
}) => {
  const handleClick = () => {
    setChosenAnswerItems((prevState) => [...prevState, question.text]);
    setUnansweredQuestionsIds(
      unansweredQuestionsIds.filter((id) => id !== quizItemId)
    );
  };

  const validPick =
    !chosenAnswerItems?.includes(question.text) &&
    !unansweredQuestionsIds?.includes(quizItemId);

  return (
    <button
      className="question-block"
      onClick={handleClick}
      disabled={validPick}
    >
      <img src={question.image} alt={question.alt} />
      <h3>{question.text}</h3>
      <p>
        <a href={question.image} Target="_blank">
          {question.credit}
        </a>
        <a href="https://unsplash.com/es">Unsplash</a>
      </p>
    </button>
  );
};

export default QuestionBlock;
