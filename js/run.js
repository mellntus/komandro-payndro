let walletId =0;
let userId = '';
let tokenId = '';


window.onload=function(){

    //Get Data from API var
    var btn = document.getElementById("btn-get-data");

    //Top Up var
    var topup = document.getElementById("btn-topup");
    var formtopup = document.getElementById("form-topup");
    var imgIcon = document.getElementById("img-logo");
    var inputTopUp = document.getElementById("topup-input");
    var submitAmount = document.getElementById("submit-amount");
    var balance = 0;
    var balanceDiv = document.getElementById("money-balance");

    //Transfer var
    var transfer = document.getElementById("btn-transfer");
    var inputTransfer = document.getElementById("transfer-input");
    var cardInput = document.getElementById("card-input");
    var cardInfo = document.getElementById("card-number-info");


    getHomeData();
    if(topup){
    //TopUp Event
    topup.addEventListener('click', function(){
        if(formtopup.style.display === 'none'){
            formtopup.style.display = 'block';
            imgIcon.style.display = 'none';
            
        }else{
            formtopup.style.display = 'none';
            imgIcon.style.display = 'block';
        }
    });

    }if(submitAmount){
    submitAmount.addEventListener('click', function(){
        console.log(inputTopUp.value);
        if(isNaN(inputTopUp.value) || inputTopUp.value.length === 0){
            alert("Please Input Number...");
            return 0;  
        }else{
            console.log('Woi lah yang bener' +document.getElementById('topup-input').value)   
            postBalance(document.getElementById('topup-input').value);
            addLogTopUp("Top Up", parseInt(inputTopUp.value));
        }
    });

    }if(transfer){
    //Transfer Event
    transfer.addEventListener('click', function(){
        if(isNaN(inputTransfer.value)|| cardInput.value.length === 0 || cardInput.value !== cardInfo.value){
            alert("Please Input Correct Information...");
            return 0;
        }if(balance < inputTransfer.value){
            alert("Maaf, Saldo Kamu Kurang. Silahkan TopUp Terlebih Dahulu...");
            return 0;
        }else{
            alert("Selamat, kamu berhasil transfer");
            balance -= parseInt(inputTransfer.value);
            balanceDiv.innerHTML = "Rp. " + balance;
            addLogTransfer("Transfer", parseInt(inputTransfer.value));
        }
    });
    }if(btn){
        //Get Data event
        btn.addEventListener('click',()=>{
            getData();
        });
    }
    
};

    function getHomeData(){
        userId = window.localStorage.getItem('USER_ID');
        tokenId = window.localStorage.getItem('TOKEN');
        let balanceDiv = document.getElementById('money-balance');


        console.log(userId);
        console.log(tokenId);
        fetch('https://fikrihkl.xyz/api/komandro/home?user_id='+userId, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization' : 'Bearer '+tokenId
            }
                }).then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    
                    balanceDiv.innerHTML = "Rp. " + data.result.wallet_balance;
        })
    };

    function postBalance(e){
        
        tokenId = window.localStorage.getItem('TOKEN');
        walletId = window.localStorage.getItem('WALLET_ID');

        var details = {
            'amount': parseInt(e),
            'id': walletId
        };
      
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('https://fikrihkl.xyz/api/komandro/topup', {
          body:formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization' : 'Bearer ' +tokenId
            },
            method:'POST'
        }).then(response => response.json())
        .then(data => {
          console.log('Success:', data);
            data.result.wallet_balance += 
            alert('Selamat, Kamu berhasil Topup');
            getHomeData();
        })

    }

    function getData(){
    //textview var
    var tv = document.getElementById("textview");
    fetch('https://api.themoviedb.org/3/movie/550?api_key=fbd32a0ab6f240cffb3efd89851df002')
        .then(response => response.json())
        .then(json => {
            tv.innerHTML = JSON.stringify(json.homepage);
        })
    };

    function addLogTopUp(name, total){
    //Add Div
    var newDiv = document.createElement("div");
    newDiv.className = "log-content px-3";
    newDiv.style = "padding-top: 4px; margin-bottom: 10px ;border-radius: 20px;border-width: 1px;border-style: solid;"

    //Create Element dalam div
    var newH = document.createElement("h7");
    newH.innerHTML = name;
    newH.style = "font-weight: bold;";

    var newDivOutput = document.createElement("div");
    newDivOutput.className= "outputNum";
    newDivOutput.innerHTML = "+ Rp " + total;
    newDivOutput.style= "color: green;";
    
    var newP = document.createElement("p");
    newP.className = "text-muted";
    newP.style = "text-align: end; font-size: small;";

    var dt = new Date();
    newP.innerHTML = dt.toLocaleString();

    newDiv.appendChild(newH);
    newDiv.appendChild(newDivOutput);
    newDiv.appendChild(newP);
    
    var listLog = document.getElementById("right-small-content");

    listLog.appendChild(newDiv);
    };

    function addLogTransfer(name, total){
    //Add Div
    var newDiv = document.createElement("div");
    newDiv.className = "log-content px-3";
    newDiv.style = "padding-top: 4px; margin-bottom: 10px ;border-radius: 20px;border-width: 1px;border-style: solid;"

    //Create Element dalam div
    var newH = document.createElement("h7");
    newH.innerHTML = name;
    newH.style = "font-weight: bold;";

    var newDivOutput = document.createElement("div");
    newDivOutput.className= "outputNum";
    newDivOutput.innerHTML = "- Rp " + total;
    newDivOutput.style= "color: red;";
    
    var newP = document.createElement("p");
    newP.className = "text-muted";
    newP.style = "text-align: end; font-size: small;";

    var dt = new Date();
    newP.innerHTML = dt.toLocaleString();

    newDiv.appendChild(newH);
    newDiv.appendChild(newDivOutput);
    newDiv.appendChild(newP);
    
    var listLog = document.getElementById("right-small-content");

    listLog.appendChild(newDiv);
    };
    
