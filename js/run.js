let walletId =0;
let userId = '';
let tokenId = '';


window.onload=function(){

    //Get Data from API let
    let btn = document.getElementById("btn-get-data");

    //Top Up let
    let topup = document.getElementById("btn-topup");
    let formtopup = document.getElementById("form-topup");
    let imgIcon = document.getElementById("img-logo");
    let inputTopUp = document.getElementById("topup-input");
    let submitAmount = document.getElementById("submit-amount");
    let balance = 0;
    let balanceDiv = document.getElementById("money-balance");

    //Transfer let
    let transfer = document.getElementById("btn-transfer");
    let inputTransfer = document.getElementById("transfer-input");
    let cardInput = document.getElementById("card-input");
    let cardInfo = document.getElementById("card-number-info");


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

    }
    
    //TOP UP
    if(submitAmount){
        submitAmount.addEventListener('click', function(){
            console.log(inputTopUp.value);
            if(isNaN(inputTopUp.value) || inputTopUp.value.length === 0){
                alert("Please Input Number...");
                return 0;  
            }else{
                console.log('Woi lah yang bener' +document.getElementById('topup-input').value)   
                postTopUp(document.getElementById('topup-input').value);
                addLogTopUp("Top Up", parseInt(inputTopUp.value));
            }
        });

    }
    
    if(transfer){
    //Transfer Event
    transfer.addEventListener('click', function(){
        console.log(inputTransfer.value+" ] "+cardInput.value+" ] "+cardInfo.value)
        if(isNaN(inputTransfer.value)|| cardInput.value.length === 0 || cardInput.value !== cardInfo.value){
            alert("Please Input Correct Information...");
            return 0;
        }if(balance < inputTransfer.value){
            alert("Maaf, Saldo Kamu Kurang. Silahkan TopUp Terlebih Dahulu...");
            return 0;
        }else{
            postTransfer(parseInt(inputTransfer.value),document.getElementById("card-input").value);
        }
    });
    }
    
    if(btn){
        //Get Data event
        btn.addEventListener('click',()=>{
            getData();
        });
    }
    
};


function getLogsData(){

}

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
                walletId = data.result.wallet_id;

                document.getElementById("field_name").value = data.result.name;
                document.getElementById("field_card_type").value = data.result.wallet_type;
                document.getElementById("field_card_id").value = data.result.wallet_id;

                getLogsData();
    });
};

function getLogsData(){
    fetch('https://fikrihkl.xyz/api/komandro/logs?wallet_id='+walletId, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization' : 'Bearer '+tokenId
        }
            }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                
                for(let i in data.result){
                    console.log(i.toString())
                    if(data.result[i].type === 'OUT'){
                        addLogTransfer('Transfer',data.result[i].amount,data.result[i].date);
                    }else{
                        addLogTopUp('Top Up', data.result[i].amount,data.result[i].date);
                    }
                }
    });
}

function postTransfer(e, toId){        
    tokenId = window.localStorage.getItem('TOKEN');

    let details = {
        amount: parseInt(e),
        from_id: walletId,
        to_id: toId
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('https://fikrihkl.xyz/api/komandro/transfer', {
        body:formBody,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization' : 'Bearer ' +tokenId
        },
        method:'POST'
    }).then(response => response.json())
    .then(data => {
        console.log('Success:', data);

        alert('Saldo sudah di transfer');
        getHomeData();
    })

}

function postTopUp(e){        
    tokenId = window.localStorage.getItem('TOKEN');

    console.log("CEK "+e+"\n WID"+walletId);

    let details = {
        amount: parseInt(e),
        id: walletId
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
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

        alert('Selamat, Kamu berhasil Topup');
        getHomeData();
    })

}

function getData(){
    //textview let
    let tv = document.getElementById("textview");
    fetch('https://api.themoviedb.org/3/movie/550?api_key=fbd32a0ab6f240cffb3efd89851df002')
        .then(response => response.json())
        .then(json => {
            tv.innerHTML = JSON.stringify(json.homepage);
        })
}

function addLogTopUp(name, total,date){
    //Add Div
    let newDiv = document.createElement("div");
    newDiv.className = "log-content px-3";
    newDiv.style = "padding-top: 4px; margin-bottom: 10px ;border-radius: 20px;border-width: 1px;border-style: solid;"

    //Create Element dalam div
    let newH = document.createElement("h7");
    newH.innerHTML = name;
    newH.style = "font-weight: bold;";

    let newDivOutput = document.createElement("div");
    newDivOutput.className= "outputNum";
    newDivOutput.innerHTML = "+ Rp " + total;
    newDivOutput.style= "color: green;";
    
    let newP = document.createElement("p");
    newP.className = "text-muted";
    newP.style = "text-align: end; font-size: small;";

    let dt = new Date();
    newP.innerHTML = date;

    newDiv.appendChild(newH);
    newDiv.appendChild(newDivOutput);
    newDiv.appendChild(newP);
    
    let listLog = document.getElementById("right-small-content");

    listLog.appendChild(newDiv);
}

function addLogTransfer(name, total, date){
    //Add Div
    let newDiv = document.createElement("div");
    newDiv.className = "log-content px-3";
    newDiv.style = "padding-top: 4px; margin-bottom: 10px ;border-radius: 20px;border-width: 1px;border-style: solid;"

    //Create Element dalam div
    let newH = document.createElement("h7");
    newH.innerHTML = name;
    newH.style = "font-weight: bold;";

    let newDivOutput = document.createElement("div");
    newDivOutput.className= "outputNum";
    newDivOutput.innerHTML = "- Rp " + total;
    newDivOutput.style= "color: red;";
    
    let newP = document.createElement("p");
    newP.className = "text-muted";
    newP.style = "text-align: end; font-size: small;";

    let dt = new Date();
    newP.innerHTML = date;

    newDiv.appendChild(newH);
    newDiv.appendChild(newDivOutput);
    newDiv.appendChild(newP);
    
    let listLog = document.getElementById("right-small-content");

    listLog.appendChild(newDiv);
}
    
