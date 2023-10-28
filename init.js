//set sortBy options
Object.getOwnPropertyNames(new Book).forEach((property)=>{
    let opt = document.createElement('option')
    opt.value = property
    opt.textContent = property.charAt(0).toUpperCase() + property.slice(1)
    sortBy.append(opt)
})
    
//load default config and theme
localStorage.clear()
if (localStorage.getItem('theme')) {
    currentConfig.load()
} else {
    currentConfig.save()
}

Object.getOwnPropertyNames(currentConfig).forEach((property)=>{
    switch (property) {
        case 'theme':
            let html = document.querySelector('html')
            html.className = property
            break
        case 'displayedItems':
            let displayedItems = currentConfig.displayedItems.split('%').filter(item=>item)
            let displayedBooks = displayedItems.map((id)=>{return MyLib.getBook(id)})
            console.log(displayedBooks)
            let sortedBooks = sortBooks(displayedBooks,'published',currentConfig.sortOrder)
            console.log(sortedBooks)
            // MyLib.books.forEach((book,i) => {
            //     if (displayedItems.includes(i)) {
            //         let item = document.createElement('div')
            //         item.className = currentConfig.displayType
            //         item.innerHTML = book.info(currentConfig.displayType)
            //     }
            // })
    }
})

//gets books sorted in an array
function sortBooks(books,type,order) {
    let result = []
    switch (type) {
        case 'title':
        case 'author':
        case 'location':
            console.log('sort by title')
            result = books.sort((a,b)=>{return a[type].localeCompare(b[type])})
            break
        case 'published':
            result = books.sort((a,b)=>{
                if (isNaN(a.published)&&isNaN(b.published)) {
                    return 0
                } else if (isNaN(a.published)) {
                        return 1
                    } else if (isNaN(b.published)) {
                        return -1
                    } else {
                        return +a.published-(+b.published)
                    }
            })
            break
        case 'acquired':
            result = books.sort((a,b)=>{
                let c = a.aquired.split('/')[2]
                let d = b.acquired.split('/')[2]
                if (isNaN(c)&&isNaN(d)) {
                    return 0
                } else if (isNaN(c)) {
                        return -1
                    } else if (isNaN(d)) {
                        return 1
                    } else {
                        return +c-(+d)
                    }                

            })
            break
    }
    if (order=='descending') {
        return result.toReversed()
    } else { return result}
}
