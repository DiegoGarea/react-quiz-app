import {forwardRef} from 'react';
import QuestionBlock from './QuestionBlock';

const QuestionsBlock = (
  {
    quizItem,
    setChosenAnswerItems,
    chosenAnswerItems,
    unansweredQuestionsIds,
    setUnansweredQuestionsIds,
  },
  ref
) => {
  return (
    <>
      <h2 ref={ref} id={quizItem.id} className="question-title">
        {quizItem.text}
      </h2>
      <div className="questions-container">
        {quizItem.questions.map((question, _index) => (
          <QuestionBlock
            key={_index}
            quizItemId={quizItem.id}
            question={question}
            setChosenAnswerItems={setChosenAnswerItems}
            chosenAnswerItems={chosenAnswerItems}
            unansweredQuestionsIds={unansweredQuestionsIds}
            setUnansweredQuestionsIds={setUnansweredQuestionsIds}
          />
        ))}
      </div>
    </>
  );
};

export default forwardRef(QuestionsBlock);
