function initializeDOM(parentElementID) {
    window[parentElementID] = document.querySelector('#'+parentElementID)
    Array.from(window[parentElementID].children).forEach(element => {
        if (element.id) {initializeDOM(element.id)}        
    });
}
initializeDOM('body')

let myLib = []

function Book(title,author,read) {
    this.title = title
    this.author = author
    this.read = read
    this.info = function() {
        let readmsg = "Read id."
        if (read==false) {readmsg = "Haven't read it"}
        return (this.title +' by '+this.author+". "+readmsg)
    }
}

function addBookToLibrary(title,author,read) {
    let newBook = new Book(title,author,read)
    myLib.push(newBook)
    populateList()
}

addBookToLibrary("Последња Књига","Зоран Живковић",false)
addBookToLibrary("Tropic of Cancer","Henry Miller",true)
addBookToLibrary("1984","George Orwell",true)


function populateList() {
    Array.from(libList.children).forEach((item)=>{
        item.remove()
    })
    myLib.forEach( (item,index)=>{
        let row = document.createElement('div')
        row.className = 'row'
        row.textContent = (index+1).toString() +". "+item.info()
        let removeButton = document.createElement('button')
        removeButton.textContent = "Remove"
        removeButton.addEventListener('click', ()=> {
            myLib.splice(index,1)
            populateList()
        })
        row.append(removeButton)
        libList.append(row)
    })
}

populateList()

addButton.addEventListener('click',(event)=>{
    event.preventDefault()
    addBookToLibrary(title.value,author.value,read.value)
    populateList()
})
