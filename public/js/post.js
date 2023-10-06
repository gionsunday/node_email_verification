window.addEventListener('load', ()=>{
    const emailBtn = document.querySelector('#emailbtn')
    const name =  document.querySelector ('#name')
    const email = document.querySelector('#email')
    const form = document.querySelector('#form')
      let nameT = ''
      let emailT =''
    emailBtn.addEventListener('click', async (e) =>{
        e.preventDefault()
    nameT =  name.value;
    emailT = email.value;
    document.getElementById('emailbtn').textContent = "Sending Code..."
    
    try {
        const {data} = await axios.post('/user/verification/register', {
            name:nameT, email:emailT
        })
            const code = data.code
            const nameVer=  data.name
            name.value =""
            email.value =""
            console.log(data)
            localStorage.setItem('code', code)
            
            localStorage.setItem('name', nameVer)
           // window.location ='verification.html'
        
    } catch (error) {
        console.log(error)
    }


    })
})
    
