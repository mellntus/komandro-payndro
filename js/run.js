window.onload=function(){

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

    submitAmount.addEventListener('click', function(){
        console.log(inputTopUp.value);
        if(isNaN(inputTopUp.value) || inputTopUp.value.length === 0){
            alert("Please Input Number...");
            return 0;  
        }else{
            alert("Selamat, kamu berhasil topup");
            balance += parseInt(inputTopUp.value);
            balanceDiv.innerHTML = "Rp. " + balance;
            addLogTopUp("Top Up", parseInt(inputTopUp.value));
        }
    });

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
    }
