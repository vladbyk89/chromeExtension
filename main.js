let userInput;
let myLeads = [];
let savedLeads = [];

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

const inputBtn = document.getElementById("input-btn");
const resetBtn = document.getElementById("reset-btn");
const tabBtn = document.getElementById("tab-save-btn");
const loadBtn = document.getElementById("load-btn");
const clearSavedBtn = document.getElementById("clear-saved-btn");



var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
var regex = new RegExp(expression);

const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}



tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        savedLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        localStorage.setItem("savedLeads", JSON.stringify(savedLeads));
        console.log(myLeads)
        console.log(savedLeads)
        render(myLeads);
    })
})

inputBtn.addEventListener("click", function(){
    var inputValue = inputEl.value;
    
    if (!inputValue.match(regex))
    {
        return alert('not a valid website');
    }

    myLeads.push(inputValue);
    savedLeads.push(inputValue);
    
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    localStorage.setItem("savedLeads", JSON.stringify(myLeads));
    

    render(myLeads)
    
    inputEl.value = " ";
})

resetBtn.addEventListener("dblclick", function(){
    localStorage.removeItem('myLeads')
    myLeads = []
    render(myLeads)
})

clearSavedBtn.addEventListener("dblclick", function(){
    localStorage.removeItem('savedLeads')
    savedLeads = []
    render(savedLeads)
})



loadBtn.addEventListener("dblclick", function(){
    const savedLeadsFromLocalStorage = JSON.parse(localStorage.getItem('savedLeads'))
    if (savedLeadsFromLocalStorage)
    {
        savedLeads = savedLeadsFromLocalStorage;
        render(savedLeads)
    }else{
        ulEl.textContent = "Empty storage"
    }
})

function render(leads){
    let listItems = '';

    for (let i = 0; i < leads.length; i++)
    {
        listItems += `
        <li>
            <a target="_blank" href="${leads[i]}">
            ${leads[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems;
}










// const li = document.createElement('li');
// const a = document.createElement('a');
// const att = document.createAttribute('href')

// function render(leads){
//     for (let i = 0; i < leads.length; i++)
//     {
//         att.value = "leads[i]"
//         a.setAttributeNode(att)
//         a.textContent = leads[i]
//         li.insertAdjacentElement('afterbegin', a)
//         ulEl.insertAdjacentElement('afterbegin', li);
//     }
// }

















// function wrapURL(text) { 
 
// 	// Create your regex pattern for urls 
// 	let urlPattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\z`!()\[\]{};:'".,<>?«»“”‘’]))/ig; 
 
//   // Check string for any url patterns and wrap them in anchor tags 
//   let result = text.replace(urlPattern, function(url){ 
//       return `<a target="_blank" href="https://${url.trim()}">${url.trim()}</a>`; 
//   }); 
   
//   return result; 
// } 