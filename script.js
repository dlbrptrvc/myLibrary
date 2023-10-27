class Book {
    constructor(title,author,published,acquired,location) {
        this.title = title || 'Unknown'
        this.author = author || 'Unknown'
        this.published = published || 'Unknown'
        this.acquired = acquired || new Date().toLocaleDateString('en-GB')
        this.location = location || 'Home'
    }

    info() {
        return (this.title +' by '+this.author+". Pub:"+this.published+" Acq:"+this.acquired+" Currently at "+this.location)
    }
}

let MyLib = {
    selected : null,
    books : [],
    findBook: function(words,searchBy) {
        let results = []
        if (searchBy!=='all') {
            searchBy == searchBy || 'title'
            this.books.forEach((book,i)=>{
                if (book[searchBy].includes(words)) {
                    results.push(i)
                }
            })
        } else {
            Object.getOwnPropertyNames(new Book).forEach((property)=>{
                searchBy = property
                this.books.forEach((book,i)=>{
                    if (book[searchBy].includes(words)) {
                        results.push(i)
                    }
                })
            })
        }
        return results
    },
    addBook: function(book){
        this.books.push(book)
    },
    removeBook: function(id){
        this.books.splice(id,1)
    },
    getBook: function(id){
        this.selected = id
        return this.books[id]
    },
    save: function(){
        localStorage.clear()
        this.books.forEach((book,i)=>{
            localStorage.setItem(i,book.title+'%'+book.author+'%'+book.published+'%'+book.acquired+'%'+book.location)
        })
    },
    load: function(){
        let i = 0
        while (localStorage.getItem(i)) {
            let fullInfo = localStorage.getItem(i).split('%')
            this.addBook(new Book(...fullInfo))
            i++
        }
    }
}

MyLib.addBook(new Book("1984","George Orwell"))