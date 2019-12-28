
//client side data script   fetch data from url and do something with that
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data )
//     })
// })



const weatherForm=document.querySelector('form')   //like css to style or do changes
const search= document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')

//messageOne.textContent = ' js'


weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    messageOne.textContent= 'Loading....'
    messageTwo.textContent=''

    const location= search.value
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent= data.error
        }
        else {
            messageOne.textContent= data.location
            messageTwo.textContent=data.forecast
        }
    })
})
    
})

