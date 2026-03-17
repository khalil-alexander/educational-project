import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;

public class TestBank implements Iterable<Question> {
    private ArrayList<Question> questions;
    private int questionCount = 0;
    private int score;

    public TestBank(){
        this.questions = new ArrayList<>();
        this.score = 0;
    }

    public int getScore() {
        return score;
    }
    
    public void incrementScore() {
        this.score += 10;
    }

    public boolean loadQuestions(ArrayList<Question> questions){
        if (questions == null || questions.size() == 0) {
            return false;
        }
        this.questions.addAll(questions);
        return true;
    }

    public boolean loadQuestions(File folder){
        if (folder == null || !folder.isDirectory()) {
            return false;
        }
        File[] files = folder.listFiles();
        if (files == null || files.length == 0) {
            return false;
        }
        for (File file : files) {
            Question question = Question.loadQuestion(file);
            if (question != null) {
                this.questions.add(question);
            }
        }
        shuffleQuestions();
        return true;
    }

    public boolean addQuestion(Question question){
        if (question == null) {
            return false;
        }
        this.questions.add(question);
        return true;
    }

    public boolean addQuestion(File file){
        if (file == null || !file.isFile()) {
            return false;
        }
        Question question = Question.loadQuestion(file);
        if (question == null) {
            return false;
        }
        this.questions.add(question);
        return true;
    }

    public boolean playing(Question question, String userAnswer){
        if (question == null || userAnswer == null) {
            return false;
        }
        if (question.getAnswerText().equals(userAnswer)) {
            incrementScore();
            return true;
        }
        return false;
    }

    public Question getNextQuestion(){
        if (questionCount >= questions.size()) {
            return null; // No more questions
        }
        Question nextQuestion = questions.get(questionCount);
        questionCount++;
        return nextQuestion;
    }

    public void shuffleQuestions(){
        java.util.Collections.shuffle(questions);
    }

    @Override
    public Iterator<Question> iterator() {
        return questions.iterator();
    }

    public static void main(String[] args){
        TestBank testBank = new TestBank();
        File folder = new File("c:/Users/willi/Downloads/English Questions");
        if (testBank.loadQuestions(folder)) {
            for (Question question : testBank) {
                System.out.println("Question: " + question.getQuestionText());
                System.out.println("Answer: " + question.getAnswerText());
            }
        } else {
            System.out.println("Failed to load questions from folder.");
        }
    }

}
