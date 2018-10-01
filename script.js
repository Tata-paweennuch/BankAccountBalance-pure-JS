// ================= Selected nodes =================
const availableBalance = document.querySelector('.current-balance');
const description = document.querySelector('.description');
const amount = document.querySelector('.amount');
const typeOfTransaction = document.querySelector('#type');
const addBtn = document.querySelector('.add-btn');
const tableBody = document.querySelector('tbody');


// ================= Date and time function =================
const displayDateTime = () => {    
    var now = new Date();
    //document.write(now);
    var year = now.getFullYear();
    var month = now.getMonth()+ 1; //as a zero-based value, 0 corresponds to January, 1 to February, and so on
    var date = now.getDate(); 
    var hours = now.getHours();
    var mins = now.getMinutes();
    var seconds = now.getSeconds();
    return date + '/' + month + '/' + year + ' ' +hours + ':' + mins + ':' + seconds;

    //document.write(hour + ':' + mins + ':' + seconds + '<br>');
    //var day = now.getDay(); // 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on
}

// ================= Putting commas to the amount of transaction =================
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

// ================= Putting data into the array of objects(each transaction) =================
let arrayOfTransaction = [];
const grabingData = () => {
    let dateTime = displayDateTime();
    let descTrans = description.value;
    const incomeAmount = () => {
        if (typeOfTransaction.options[typeOfTransaction.selectedIndex].value == 'income') {
            return parseInt(amount.value);     
        } else {
            return 0;
        }
    } 
    const expenseAmount = () => {
        if (typeOfTransaction.options[typeOfTransaction.selectedIndex].value == 'expense') {
            return  parseInt(amount.value);     
        } else {
            return 0;
        }
    }
    //let typeTrans = typeOfTransaction.options[typeOfTransaction.selectedIndex].value;
    let accumBalance = Object.keys(arrayOfTransaction).reduce(function (previous, key) {
                    previous.net += arrayOfTransaction[key].net;
                        return previous;
                    }, { net: 0 });
            //arrayOfTransaction.reduce((a,b,i) => { return cumulativeBalanceArr[i] = a.net + b.net; },0);
    let balance = accumBalance.net + incomeAmount() - expenseAmount();

    arrayOfTransaction.push({
        date: dateTime,
        description: descTrans,
        income: incomeAmount(),
        expense: expenseAmount(),
        net: incomeAmount() - expenseAmount(),
        balance: balance
    });
    addingData();
    description.value = '';
    amount.value = '';
        //typeOfTransaction.options[0];   ---- Fix!! set the option to the default 
    
    // ** Add the current balance to the top**==================
    let currentBal = arrayOfTransaction[arrayOfTransaction.length-1].balance;
    let currentBalWithCommas = numberWithCommas(currentBal);
    availableBalance.innerHTML = currentBalWithCommas;

    return arrayOfTransaction;
}

// ================= Putting data into the bank book(each transaction) =================
const addingData = () => {
    tableBody.innerHTML = '';
    let arrayOfData = arrayOfTransaction;
    let eachTrans;
    arrayOfData.forEach(transaction => {
        eachTrans = document.createElement('tr');
        const transDetail = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.income}</td>
            <td>${transaction.expense}</td>
            <td>${transaction.balance}</td>
        `;
        eachTrans.innerHTML = transDetail;
        tableBody.appendChild(eachTrans);
    });
}

// =================** Add eventlisteners**==================
addBtn.addEventListener('click', grabingData);


