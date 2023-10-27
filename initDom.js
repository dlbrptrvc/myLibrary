let sels = Array.from(document.querySelectorAll('select'))
sels.forEach(sel=>{
    sel.addEventListener('input',()=>{
        console.log('opting')
    })
})