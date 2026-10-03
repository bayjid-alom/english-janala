// FAQ Questions
const faqQuestions = [
    {
        question: "How can I start learning English on this website?",
        answer: "You can start by exploring our vocabulary lessons, learning new words, and practicing their meanings, examples, synonyms, and pronunciation."
    },
    {
        question: "Is this website free to use?",
        answer: "Yes, English Janala is free to use. You can explore the available lessons and learn vocabulary without any subscription."
    },
    {
        question: "Do I need to create an account?",
        answer: "No, you do not need to create an account. You can start exploring the lessons and learning vocabulary directly from the website."
    },
    {
        question: "How can I build my English vocabulary?",
        answer: "You can build your vocabulary by exploring different lessons, learning new words regularly, checking their meanings and examples, and practicing their pronunciation."
    },
    {
        question: "Do you offer certificates for completed courses?",
        answer: "No, English Janala currently focuses on vocabulary learning and does not offer certificates for completing lessons."
    }
];



// Load FAQ Questions
const loadQues = () => {
    displayQues(faqQuestions);
};

// Display FAQ Questions
const displayQues = (questions) => {
    const faqContainer = document.getElementById("faq-container");
    faqContainer.innerHTML = "";

    questions.forEach((item) => {
        const div = document.createElement("div");
        div.className = "ques-ans-card p-4 bg-base-200 rounded-xl";

        div.innerHTML = `
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-[#18181B]">
                    ${item.question}
                </h2>

                <button class="plus-icon cursor-pointer">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            <div class="answer hidden text-[#62748E] mt-1.5">
                ${item.answer}
            </div>
        `;

        faqContainer.appendChild(div);

        const button = div.querySelector(".plus-icon");
        const answer = div.querySelector(".answer");
        const icon = button.querySelector("i");

        button.addEventListener("click", () => {
            answer.classList.toggle("hidden");
            icon.classList.toggle("fa-plus");
            icon.classList.toggle("fa-minus");
        });
    });
};

// Load Questions
loadQues();