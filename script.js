class Book {
    constructor(title,author,published,acquired,location) {
        this.title = title || 'Unknown'
        this.author = author || 'Unknown'
        this.published = published || 'Unknown'
        this.acquired = acquired || new Date().getFullYear().toString()
        this.location = location || 'Home'
    }

    info() {
        return (this.title +' by '+this.author+". Pub:"+this.published+" Acq:"+this.acquired+" Currently at "+this.location)
    }
}

let MyLib = {
    num : 0,
    books : {},
    findBook: function(words,searchBy) {
        let results = []
        if (searchBy!=='all') {
            searchBy == searchBy || 'title'
            Object.entries(this.books).forEach((entry)=>{
                if (entry[1][searchBy].includes(words)) {
                    results.push(entry[0])
                }
            })
        } else {
            Object.getOwnPropertyNames(new Book).forEach((property)=>{
                searchBy = property
                Object.entries(this.books).forEach((entry)=>{
                    if (entry[1][searchBy].includes(words)) {
                        results.push(entry[0])
                    }
                })
            })
        }
        return results
    },
    addBook: function(book){
        MyLib.books[this.num]=book
        this.num++
    },
    removeBook: function(id){
        delete MyLib.books[id]
    },
    editBook: function(id){
        return MyLib.books[id]
    }
}

MyLib.addBook(new Book("1984","George Orwell"))