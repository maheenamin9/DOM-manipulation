// store form data on local storage
function storeFormData() {
    var email = document.getElementById("txtEmail").value;
    var name = document.getElementById("txtName").value;
    var phoneno = document.getElementById("txtPhone").value;
    var message = document.getElementById("txtArea").value;

    if (email != "" && name != "" && phoneno != "" && message != "") {
        alert("Data stored successfully");
        // creating review object
        var review = {
            email: email,
            name: name,
            phoneno: phoneno,
            message: message
        }

        // creating array of review objects
        array = JSON.parse(localStorage.getItem("form-data") || '[]'); // but let me check if there is already data in local storage
        array.unshift(review);
        localStorage.setItem("form-data", JSON.stringify(array));
    }
}


// fetch data from github users API and store it on local storage
document.getElementById("fetchBtn").addEventListener("click", function () {
    if (localStorage.getItem("users") == null || localStorage.getItem("users") == '[]') {
        let url = "https://api.github.com/users";
        fetch(url).then(reponse => reponse.text())
            .then((data) => {
                localStorage.setItem("users", data);
                showUser();
            });

    }
    showUser();
});


// show the fetched data on html page
function showUser() {
    userLoginArray = JSON.parse(localStorage.getItem("users")); // array of objects
    document.getElementById("showUsersBtn").innerHTML = "";
    if (userLoginArray != null) {
        for (let i = 0; i < userLoginArray.length; i++) {
            document.getElementById("showUsersBtn").innerHTML += '<h6>User ' + userLoginArray[i].id + ' record:<button onclick="' + "removeUser(" + i + ")" + '" style="float:right; background-color: #dc3545; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">Delete</button></h6><ul><li><strong>Login : </strong>' + userLoginArray[i].login + '</li><li><strong>ID : </strong>' + userLoginArray[i].id + '</li><li><strong>URL : </strong>' + userLoginArray[i].url + '</li>';
        }
    }
}

// to prevent dependency
delAllFlag = true;

// show the form data on html page
function showForm() {
    formDataArray = JSON.parse(localStorage.getItem("form-data")); // array of objects
    document.getElementById("showReviews").innerHTML = "";
    if(formDataArray != null) {
        for (let i = 0; i < formDataArray.length; i++) {
            document.getElementById("showReviews").innerHTML += '<h6>' + formDataArray[i].name + '\'s record:</h6><li><strong>Email : </strong>' + formDataArray[i].email + '</li><li><strong>Phone # : </strong>' + formDataArray[i].phoneno + '</li><li><strong>Review : </strong>' + formDataArray[i].message + '</li></ul>';
        }
    }
    else if(delAllFlag){
        alert("Found no records")
    }
}
document.getElementById("reviewBtn").addEventListener("click", showForm);


// delete particular fetched record
function removeUser(index) {
    // console.log(index);
    userLoginArray = JSON.parse(localStorage.getItem("users")); // array of objects
    userLoginArray.splice(index, 1);
    localStorage.removeItem("users");
    localStorage.setItem("users", JSON.stringify(userLoginArray));
    showUser();

}

// delete all fetched records
function showFetchAlert() {
    if (localStorage.getItem("users") != null) {
        let msg = "Are you sure to remove all records??";
        if (confirm(msg) == true) {
            localStorage.removeItem("users");
        }
        showUser();
    }
    else{
        alert("Nothing to delete here");
    }
}

// delete all form records
function showFormAlert() {
    if (localStorage.getItem("form-data") != null) {
        let msg = "Are you sure to remove all records??";
        if (confirm(msg) == true) {
            localStorage.removeItem("form-data");
        }
        delAllFlag = false;
        showForm();
    }
    else{
        alert("Nothing to delete here");
    }
}


document.getElementById("delAllUserBtn").addEventListener("click", showFetchAlert);
document.getElementById("delAllFormBtn").addEventListener("click", showFormAlert);
