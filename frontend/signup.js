const submitbtn=document.querySelector("#submitbtn")
const form=document.querySelector("#signup")
const msgCont=document.querySelector(".messageCont")


form.addEventListener("submit",async(e)=>
{ e.preventDefault();
    const email=document.querySelector("#email").value
    const username=document.querySelector("#username").value
    const password=document.querySelector("#password").value
       if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }
      try{
      const response=await fetch("http://localhost:5000/api/auth/signup",
        {
           method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
        }

      )
      const data=await response.json();
      msgCont.innerHTML=`<p>${data}</p>`;
        }
      catch(err)
      {
         msgCont.innerHTML=`<p>${err}</p>`;
      }

})