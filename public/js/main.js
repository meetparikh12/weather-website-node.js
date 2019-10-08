const submitForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

submitForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    msgOne.textContent = "Loading.."
    msgTwo.textContent = " "
    fetch('/weather?address=' +search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msgOne.textContent = data.error
        }else{
           msgOne.textContent = data.location
           msgTwo.textContent = data.forecast
        }
    })
})
    
})