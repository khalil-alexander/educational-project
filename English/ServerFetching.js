const BASE_URL = "http://localhost:9095/testbank";


async function loadQuestions(path) {
    try {
        const url = `${BASE_URL}/load?path=${encodeURIComponent(path)}`;
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Load failed:", errorText);
            return false;
        }

        const message = await response.text();
        console.log("Load success:", message);
        return true;

    } catch (err) {
        console.error("Network error while loading questions:", err);
        return false;
    }
}

async function getNextQuestion() {
    try {
        const response = await fetch(`${BASE_URL}/question`);

        if (response.status === 204) {
            console.log("No more questions.");
            return null;
        }

        if (!response.ok) {
            console.error("Error fetching question:", response.status);
            return null;
        }

        const question = await response.json();
        console.log("Next question:", question);
        return question;

    } catch (err) {
        console.error("Network error while fetching question:", err);
        return null;
    }
}

async function checkAnswer(index) {
    try {
        const response = await fetch(`${BASE_URL}/check/${index}`);

        if (!response.ok) {
            console.warn("Invalid answer or bad request.");
            return false;
        }

        const result = await response.json();
        console.log("Answer correct?", result);
        return result;

    } catch (err) {
        console.error("Network error while checking answer:", err);
        return false;
    }
}

export { loadQuestions, getNextQuestion, checkAnswer };