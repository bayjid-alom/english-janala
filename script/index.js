const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(json => displayLessons(json.data))
}



const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            removeActive()

            const clickedBtn = document.getElementById(`lesson-btn-${id}`)
            clickedBtn.classList.add("active")
            // console.log(clickedBtn);

            displayLevelWord(data.data);
        })
}



const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => btn.classList.remove("active"))
}



// {id: 76, level: 1, word: 'Fast', meaning: 'দ্রুত', pronunciation: 'ফাস্ট'}


const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `

        <div class="font-bangla text-center bg-[#F8F8F8] col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto text-gray-500" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-500 ">
               এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান।</h2>
        </div>
        
        `;

        return;
    }



    words.forEach(word => {

        const card = document.createElement("div");
        card.innerHTML = `

        <div class="bg-white shadow-sm text-center rounded-xl py-10 px-5 space-y-4">

            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি!"}</h2>
            <p class="font-semibold">Meaning/Pronounciation</p>

            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি!"}/${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি!"}"</div>
            
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>

        </div>
        `;

        wordContainer.appendChild(card)
    })

}



const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    lessons.forEach(lesson => {

        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        
            <button id="lesson-btn-${lesson.level_no}"
             onclick="loadLevelWord(${lesson.level_no})" 
             class="btn btn-outline btn-primary lesson-btn">
             <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
                        
        `;
        levelContainer.appendChild(btnDiv)

    })
}

loadLessons()