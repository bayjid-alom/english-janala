## 📌 English Janala

> An interactive vocabulary learning website built with JavaScript, API integration, and DOM manipulation.


### ⚙️ Working Flow of the Project

After designing the Navbar and Banner section, the project flow is completed step by step.

--- 



### 1. Lesson Load করা

প্রথমে `loadLessons()` function তৈরি করে API থেকে ৭টি lesson-এর data fetch করা হয়। তারপর `response.json()` থেকে data নিয়ে `displayLessons(data)` function-এ পাঠানো হয়।

**Flow:** `Fetch → JSON → Data → displayLessons(data)`

<br>




### 2. Lesson UI তে Show করা

এরপর `displayLessons()` function তৈরি করে lessonগুলো UI তে দেখানো হয়।

প্রথমে lesson container select করা হয়। তারপর প্রতিটি lesson-এর জন্য নতুন element তৈরি করে `innerHTML` দিয়ে content সেট করা হয় এবং শেষে parent container-এ `append` করা হয়।

**Flow:** `Find Container → Create Element → innerHTML → Append`



<br>

### 3. Level অনুযায়ী Word Load করা

কোনো lesson button-এ click করলে `loadLevelWord()` function call হয়। এই function থেকে selected lesson-এর ID ব্যবহার করে API থেকে সেই lesson-এর words fetch করা হয়।

তারপর JSON data নিয়ে `displayLevelWord(data)` function-এ পাঠানো হয়।

**Flow:** `Click Lesson → Fetch Words → JSON → Data → displayLevelWord(data)`


<br>



### 4. Words UI তে Show করা

সব words UI তে দেখানোর জন্য `displayLevelWord()` function তৈরি করা হয়।

প্রথমে word container select করে empty করা হয়। এরপর প্রতিটি word-এর জন্য নতুন element তৈরি করে `innerHTML` সেট করা হয় এবং container-এর মধ্যে append করা হয়।




<br>


### 5. Dynamic Active Lesson

Lesson buttonগুলো dynamically তৈরি হওয়ায় প্রতিটি button-এ click event সেট করা হয়।

একটি lesson click করলে মূলত দুইটি কাজ হয়:

1. Selected lesson-এর words fetch করা
2. Click করা button-এর `id` খুঁজে সেটিকে active করা

এর জন্য সব lesson button থেকে আগে `active` class remove করার জন্য `removeActive()` function তৈরি করা হয়।

    const removeActive = () => {
        const lessonButtons = document.querySelectorAll(".lesson-btn");

        lessonButtons.forEach(btn => {
            btn.classList.remove("active");
        });
    };

`loadLevelWord()` এর ভিতরে এটি call করা হয়:

    .then(data => {
        removeActive();

        const clickedBtn = document.getElementById(`lesson-btn-${id}`);
        clickedBtn.classList.add("active");

        displayLevelWord(data.data);
    });

এখানে প্রথমে `removeActive()` call হলে সব lesson button থেকে `active` class remove হয়ে যায়। এরপর `clickedBtn` দিয়ে clicked button-টি খুঁজে বের করে শুধু সেটির মধ্যে `active` class add করা হয়।


<br>







### 6. Lesson Select না করলে UX Message

শুরুতে user বুঝতে পারে না কোন lesson select করতে হবে। তাই UI তে একটি message দেখানো হয়:

> **Please Select A Lesson**

এতে user সহজেই বুঝতে পারে যে words দেখতে হলে একটি lesson select করতে হবে।


<br>






### 7. Empty Lesson Handle করা

৭টি lesson-এর মধ্যে কিছু lesson-এ কোনো word নেই। তাই words না থাকলে empty message দেখানো হয়।

    if (words.length === 0) {
        // Show empty message dynamically
    }

এতে empty lesson select করলে user একটি clear message দেখতে পারে।




<br>




### 8. Word Details Modal

কোনো word-এর বিস্তারিত information দেখানোর জন্য `loadWordDetail()` function ব্যবহার করা হয়।

Word-এর `id` দিয়ে API call করে details পাওয়া যায় এবং সেই data `displayWordDetails()` function-এ পাঠানো হয়।

    const loadWordDetail = async (id) => {
        const url = `https://openapi.programming-hero.com/api/word/${id}`;

        const res = await fetch(url);
        const details = await res.json();

        displayWordDetails(details.data);
    };

এরপর word details modal-এর মধ্যে show করা হয়।

    document.getElementById("my_modal").showModal();



<br>






### 9. Synonyms Dynamically Show করা

Word-এর synonyms একটি array হিসেবে পাওয়া যায়। তাই একটি reusable `createElements()` function তৈরি করে array-এর প্রতিটি item থেকে HTML element তৈরি করা হয়।

    const createElements = (array) => {
        const htmlElements = array.map(el => `<span class="btn">${el}</span>`);
        return htmlElements.join(" ");
    };

এরপর `word.synonyms` array function-এ পাঠানো হয়:

    ${createElements(word.synonyms)}

এখানে `word.synonyms` array হিসেবে যায় এবং function সেটিকে HTML string হিসেবে return করে।




<br>








### 10. Loading Spinner

API থেকে data load হওয়ার সময় user experience ভালো রাখার জন্য loading spinner ব্যবহার করা হয়েছে।

এর জন্য `manageSpinner()` function তৈরি করা হয়।

    const manageSpinner = (status) => {
        if (status == true) {
            document.getElementById("spinner").classList.remove("hidden");
            document.getElementById("word-container").classList.add("hidden");
        } else {
            document.getElementById("word-container").classList.remove("hidden");
            document.getElementById("spinner").classList.add("hidden");
        }
    };

Word loading শুরু হলে `manageSpinner(true)` দিয়ে spinner show করা হয়। Data display করার পর `manageSpinner(false)` দিয়ে spinner hide করা হয়।

যদি words empty হয়, return করার আগেও spinner hide করতে হয়।

**Flow:** `Loading Start → Spinner Show → Data Load → Display → Spinner Hide`



<br>







### 11. Search Functionality

প্রথমে search UI তৈরি করা হয়। এরপর `loadLessons()` call করার পর search functionality যোগ করা হয়।

Search button click করলে:

1. সব lesson button থেকে `active` class remove হয়
2. Search input থেকে value নেওয়া হয়
3. Search value `trim()` এবং `toLowerCase()` করা হয়
4. All words API থেকে fetch করা হয়
5. `filter()` ব্যবহার করে matching words খুঁজে বের করা হয়
6. Filter করা words UI তে display করা হয়

    document.getElementById("btn-search").addEventListener("click", () => {
        removeActive();

        const input = document.getElementById("input-search");
        const searchValue = input.value.trim().toLowerCase();

        fetch("https://openapi.programming-hero.com/api/words/all")
            .then(response => response.json())
            .then(data => {
                const allWords = data.data;

                const filterWords = allWords.filter(word =>
                    word.word.toLowerCase().includes(searchValue)
                );

                displayLevelWord(filterWords);
            });
    });

**Flow:** `Search → Fetch All Words → Filter → Display`




<br>







### 12. Word Pronunciation

Word-এর pronunciation শোনানোর জন্য browser-এর built-in **Speech Synthesis API** ব্যবহার করা হয়েছে।

    function pronounceWord(word) {
        const utterance = new SpeechSynthesisUtterance(word);

        utterance.lang = "en-EN";

        window.speechSynthesis.speak(utterance);
    }

HTML-এর `onclick` থেকে function call করা হয়:

    onclick="pronounceWord('${word.word}')"

Word-এর মধ্যে special character থাকলে quote ব্যবহার করে string পাঠানো safer।

---


<br>





## 📌 Overall Working Flow

    Navbar + Banner
          ↓
    loadLessons()
          ↓
    Fetch API
          ↓
    response.json()
          ↓
    displayLessons(data)
          ↓
    Lesson Buttons Show
          ↓
    Click Lesson
          ↓
    loadLevelWord(id)
          ↓
    Fetch Words
          ↓
    displayLevelWord(data)
          ↓
    Words Show in UI
          ↓
    Click Word
          ↓
    loadWordDetail(id)
          ↓
    Word Details
          ↓
    Show Modal






<br>



### 🔍 Search Flow

    Search Input
         ↓
    Search Button
         ↓
    Fetch All Words
         ↓
    filter()
         ↓
    Matching Words
         ↓
    displayLevelWord()

### 🔊 Pronunciation Flow

    Click Pronounce Button
            ↓
    pronounceWord()
            ↓
    SpeechSynthesisUtterance
            ↓
    Browser Speaks the Word

### 🧩 Task

> **MealDB — Free API Practice**

Practice API integration using the free **TheMealDB API** and build a small project based on meal/food data.