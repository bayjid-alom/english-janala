const createElements = (array) => {
    const htmlElements = array.map(el => `<span class="btn">${el}</span>`);
    console.log(htmlElements.join(" "))
}

const synonyms = ["Hello", "Hi", "Hey"]
createElements(synonyms)

// Array > converted as a string

/** 
<span class="btn">Hello</span> 
<span class="btn">Hi</span> 
<span class="btn">Hey</span>
**/