## Working Flow of the project  - steps
> **English Janala **

After designing Navbar and banner section;---


1. create   - loadLessons() fucntion  -- find 7 levels btn
here- fetching --> response --> json -->  send to as a params of displayLevel(data)


2. level show in ui  - displayLessons function create
to show these in ui
find levevl container first - crelete element , write innerHTML and append into the parent


if clicked a level to load word
3. level button e onclick="loadLevelWord() 
fetching -> make a json -> data --> send to as a params of displayLevelWord(data)



4. load hole to ui dekhano zabe, tai displayLevelWord create
find word container and empty first
create new elemlent and write innerHTML



5. set onclick on button dynamically --- and when click a level then it done two works
no1. fetch load word 
no2. click btn and find this buttons id


when found id, that means we can fouund word by each levels click ...



<!-- ux -->
now,, ui te asole user bujhte parche na ki korte hobe ,thats why ekta ui dekhate hobe ze "lesson selct korun"

// another errors
of 7 levels ... thre are two level empty(no words) here , that why we have to show a empty message

if(words.length === 0){
    <!-- wordContainer = ` empty message dynamically` -->
}



<!-- another problem -->
all button e active add hoye zacceh
for that-> add class -> lesson-btn

-- create a function named "removeActive"  er kaj holo sokol level btn hote active class tule dewa
-- all level button ke dhore niye ese sobgulo theke remove kore dibo 
-- clicked button e active set


```
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => btn.classList.remove("active"))
}
```
whre call it?
loadLevelWord er vitore--

```
 loadLevelWord --:
.then(data => {
            removeActive()

            const clickedBtn = document.getElementById(`lesson-btn-${id}`)
            clickedBtn.classList.add("active")
            // console.log(clickedBtn);

            displayLevelWord(data.data);
        })

```
ekhane asole ekhon ki hocceh? zokhon code ta removeActive() call hove tokhon sob level btn theke 
active class ta remove hoye zabe......
then.....clickedBtn e ese only clicked button  e active class set kore dibe


```
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()

    displayWordDetails(details.data)
}
```


display into modal
```
// words - received as an array
const displayWordDetails = (words) => {
    console.log(words);
}
```

```
showModal()
document.getElementById("my_modal").showModal()
```


to synonyms :
create a function on top
```
const createElements = (array) => {
    const htmlElements = array.map(el => `<span class="btn">${el}</span>`);
    return (htmlElements.join(" "));
}
```

and 
```
 <div class="">
    <h2 class="font-bold font-bangal mb-1">সমার্থক শব্দগুলো</h2>
    <div class="">${createElements(word.synonyms)}</div>
</div>
```
ekhane : ekta array (word.synonyms)  send kortechi and seta string return korche








// now Modal use - when displayed word card 
zokhon kew info button e click korbe ....tokhon ekta specific word details load korte hobe

















<!-- 
working flow:

loadLessons
displayLessons


loadLevelWord()
displayLevelWord 




 -->