window.onload = function(){
//Login var
var emailInput = document.getElementById("login-input");
var passInput = document.getElementById("password-input");
var btnLogin = document.getElementById("btn-login");

//Button Event
if(btnLogin){
    btnLogin.addEventListener('click', function(){
        if(emailInput.value === '' || passInput.value === ''){
            alert("Silahkan Masukkan Email dan Password yang benar");
            return 0;
        }else{
            var details = {
                'email': 'erlangga@komandro.ui.ac.id',
                'pass': 'erlangga123'
            };
            
            var formBody = [];
            for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

           
            fetch('http://fikrihkl.xyz/api/komandro/login/', {
                body: formBody,
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                method: 'POST'
            }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if(data.status === 'success'){
                    console.log(data.token);
                    window.localStorage.setItem('TOKEN', data.token);
                    window.localStorage.setItem('USER_ID', data.user_id);
                    alert('Selamat Login');
                    window.location.href='home.html';
                }             
        });
               
        }
    });
    }
}