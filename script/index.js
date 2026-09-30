const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(json => displayLessons(json.data))
}



const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayLevelWord(data.data))
}



// {id: 76, level: 1, word: 'Fast', meaning: 'দ্রুত', pronunciation: 'ফাস্ট'}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";

    words.forEach(word => {

        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `

        <div class="bg-white shadow-sm text-center rounded-xl py-10 px-5 space-y-4">

            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p class="font-semibold">Meaning/Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning}/${word.pronunciation}"</div>
            
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