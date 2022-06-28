let actoken = localStorage.getItem('access_token') || '';
let rftoken = localStorage.getItem('refresh_token') || '';

if (actoken=true && )

//fetch header default찾아보기(axios는 있음)
fetch('http://localhost:8000/likes/', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ actoken,
  },
    body: JSON.stringify({
    'email': inputId,
    'password': inputPw
    })
})

.then(response => response.json())
.then(response => {
   console.log(response.data);
})