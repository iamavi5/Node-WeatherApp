console.log('Client site java scriopt loaded..')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#messageOne')
const msgTwo = document.querySelector('#messageTwo')

//msgOne.textContent = 'text val'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc = search.value
    
    msgOne.textContent = 'Loading...'
    msgTwo.textContent =''

    const url = 'http://localhost:3000/weather?address='+loc

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msgOne.textContent = 'Error'
                msgTwo.textContent = data.error
                return
            }
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        })
    })
    
    
})