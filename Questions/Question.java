import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.util.Random;
public class Question implements Comparable<Question>, java.io.Serializable {
    private String questionText;
    private String answerText;
    private String[] choices;

    public Question(String questionText, String answerText, String[] choices) {
        if (!isCorrect(choices, answerText) || questionText == null || questionText.isEmpty()) {
            throw new IllegalArgumentException("Answer text must be one of the choices");
        }
        this.questionText = questionText;
        this.answerText = answerText;
        
        this.choices = isCorrect(choices, answerText) ? choices : creatingChoices(choices, answerText);
    }
    private boolean isCorrect(String[] choices, String answerText){
        if (choices == null || answerText == null || answerText.isEmpty()) {
            throw new IllegalArgumentException("Choices and answerText cannot be null or empty");
        }
        if (choices.length != 4){
            return false;
        }
        return find(choices, answerText, 0) != -1;
    }

    private String[] creatingChoices(String[] choices, String answerText){
        if (choices == null || answerText == null) {
            throw new IllegalArgumentException("Choices and answerText cannot be null");
        }
        Random rand = new Random();
        String[] newChoices = new String[4];
        newChoices[0] = answerText;
        for (int i = 1; i < 4; i++) {
            int index = rand.nextInt(choices.length);
            if (index == find(choices, answerText, 0)) {
                i--; // Retry if the choice is the answerText
                continue;
            }
            newChoices[i] = choices[index];
        }
        return newChoices;
    }

    public static Question loadQuestion(File file){
        try {
            BufferedReader reader = new BufferedReader(new java.io.FileReader(file));
            String qText = reader.readLine();
            String aText = reader.readLine();
            String[] choices = new String[4];
            for (int i = 0; i < 4; i++) {
                choices[i] = reader.readLine();
            }
            reader.close();
            return new Question(qText, aText, choices);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return null;
        }
    }

    private int find(String[] choices, String answerText, int idx){
        if (choices == null || answerText == null) {
            throw new IllegalArgumentException("Choices and answerText cannot be null");
        }
        if (idx >= choices.length || idx < 0) {
            return -1; // Not found
        }
        if (choices[idx].equals(answerText)) {
            return idx; // Found at index idx
        }
        return find(choices, answerText, idx + 1); // Recur for next index
    }

    public String getQuestionText() {
        return this.questionText;
    }

    public String getAnswerText() {
        return this.answerText;
    }

    public String getChoice(int index) {
        if (index < 0 || index >= choices.length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }
        return this.choices[index];
    }

    public boolean isCorrectAnswer(String answer) {
        if (answer == null) {   
            throw new IllegalArgumentException("Answer cannot be null");
        }
        return this.answerText.equals(answer);
    }

    public boolean isCorrectAnswer(int index) {
        if (index < 0 || index >= choices.length) {
            throw new IndexOutOfBoundsException("Index out of bounds");
        }
        return this.choices[index].equals(this.answerText);
    }

    @Override
    public int compareTo(Question other) {
        if (other == null) {
            throw new IllegalArgumentException("Other question cannot be null");
        }
        int compareQuestion = Integer.compare(this.questionText.length(), other.questionText.length());
        int compareAnswer = Integer.compare(this.answerText.length(), other.answerText.length());
        return compareQuestion != 0 ? compareQuestion : compareAnswer;
    }

    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || ! (obj instanceof Question)) {
            return false;
        }
        Question other = (Question) obj;
        return this.compareTo(other) == 0;
    }

    @Override
    public int hashCode() {
        return Integer.hashCode(questionText.length()) + Integer.hashCode(answerText.length());
    }
}