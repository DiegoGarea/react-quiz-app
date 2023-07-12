import {useState, useEffect, createRef} from 'react';
import Title from './components/Title';
import QuestionsBlock from './components/QuestionsBlock';
import AnswerBlock from './components/AnswerBlock';

const App = () => {
  const [quiz, setQuiz] = useState(null);
  const [chosenAnswerItems, setChosenAnswerItems] = useState([]);
  const [unansweredQuestionsIds, setUnansweredQuestionsIds] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const refs = unansweredQuestionsIds?.reduce((acc, id) => {
    acc[id] = createRef();
    return acc;
  }, {});

  const answerRef = createRef();

  console.log(refs);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/quiz');
      const json = await response.json();
      setQuiz(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unansweredIds = quiz?.content?.map(({id}) => id);
    setUnansweredQuestionsIds(unansweredIds);
  }, [quiz]);

  useEffect(() => {
    if (chosenAnswerItems.length > 0) {
      if (showAnswer) {
        answerRef.current.scrollIntoView({behavior: 'smooth'});
      }

      if (unansweredQuestionsIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true);
      } else {
        // scroll to highest unansweredQuestionsIds
        const highestId = Math.min(...unansweredQuestionsIds);
        refs[highestId].current.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [unansweredQuestionsIds, showAnswer, chosenAnswerItems, answerRef, refs]);

  console.log(chosenAnswerItems);
  console.log(unansweredQuestionsIds);

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {refs &&
        quiz?.content?.map((contentItem) => (
          <QuestionsBlock
            key={contentItem.id}
            quizItem={contentItem}
            setChosenAnswerItems={setChosenAnswerItems}
            chosenAnswerItems={chosenAnswerItems}
            unansweredQuestionsIds={unansweredQuestionsIds}
            setUnansweredQuestionsIds={setUnansweredQuestionsIds}
            ref={refs[contentItem.id]}
          />
        ))}
      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          chosenAnswers={chosenAnswerItems}
          ref={answerRef}
        />
      )}
    </div>
  );
};

export default App;
