class Book {
    constructor(title,author,published,acquired,location) {
        this.title = title || 'Unknown'
        this.author = author || 'Unknown'
        this.published = published || 'Unknown'
        this.acquired = acquired || new Date().toLocaleDateString('en-GB')
        this.location = location || 'Home'
    }
    info(type) {
        type = type||'list'
        if (type=='list') {
            return ('<b>'+this.title +'</b> by '+this.author+". Pub:"+this.published+" Acq:"+this.acquired+" Currently at: "+this.location)
        } else {
            return ('<div class="tileTitle>'+this.Title+'</div><br>Author: '+this.author+'<br>Published: '+this.published+'<br>Acquired: '+this.acquired+'<br>Location: '+this.location)
        }
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

MyLib.addBook(new Book("1984","George Orwell",1948,'27/10/2002'))
MyLib.addBook(new Book("1999","Бранислав Пекић",'2000','28/10/2003'))
MyLib.addBook(new Book("Tropic of Cancer","Henry Miller"))
MyLib.addBook(new Book("ABC","Anonymous"))


class Config {
    constructor(theme,sortBy,sortOrder,displayType,displayedItems) {
        this.theme = theme||'theme-a'
        this.sortBy = sortBy||'title'
        this.sortOrder = sortOrder||'ascending'
        this.displayType = displayType||'list'
        this.displayedItems = ''
        for (let i=0;i<MyLib.books.length;i++) {
            this.displayedItems+=i+'%'
        }
    }
    save() {
        Object.getOwnPropertyNames(new Config).forEach((property)=>{
            localStorage.setItem(property,currentConfig[property])
        })
    }
    load() {
        Object.getOwnPropertyNames(new Config).forEach((property)=>{
            currentConfig[property] = localStorage.getItem(property)
        })
    }
}

let currentConfig = new Config