var tableData = document.getElementById('tableData');
const userData = [];
const userID = new Array();
var userKey = [];
var keyText = "";
var urlb = '';
var data = new Object;
var event = 0;



const homeContainer = document.getElementById("home");
const userList = document.getElementById("userList");
// const userListTableContainer = document.getElementById("userListTable");
// const userListTable = document.getElementsByTagName("table")[0];
const message = document.getElementById("message");
const loginMessage = document.getElementById("loginMessage");

userList.style.display = "none";
// Check for page refresh for session management
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    if(JSON.parse(localStorage.getItem("admin")) !== null) {
        const {username, email, status} = JSON.parse(localStorage.getItem("admin"))[0];
        if(status === "true") {
            homeContainer.style.display = "none";
            document.getElementById("userName").innerText = username;
        } else {
            userList.style.display = "none";
            homeContainer.style.display = "flex";
        }
    }
}

window.addEventListener("load", () => {
    if(JSON.parse(localStorage.getItem("admin")) !== null) {
        const {username, email, status} = JSON.parse(localStorage.getItem("admin"))[0];
        if(status === "true") {
            userList.style.display = "block";
            homeContainer.style.display = "none";
            document.getElementById("userName").innerText = username;
            getUsers();
        } else {
            userList.style.display = "none";
            homeContainer.style.display = "flex";
        }
    }
})
// END - Check for page refresh for session management

// Sign Up
const signupContainer = document.getElementById("signupContainer");
const signupForm = document.getElementById("signup");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");

function openSignup() {
    signupContainer.style.display = "block";
    homeContainer.style.display = "none";
}

function closeSignup() {
    signupContainer.style.display = "none";
    homeContainer.style.display = "flex";
    username.nextElementSibling.style.visibility = "hidden";
    email.nextElementSibling.style.visibility = "hidden";
    password.nextElementSibling.style.visibility = "hidden";
    phone.nextElementSibling.style.visibility = "hidden";
    username.style.borderColor = "#40189d";
    email.style.borderColor = "#40189d";
    password.style.borderColor = "#40189d";
    phone.style.borderColor = "#40189d";
}

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(username.value === "" && email.value === "" && password.value === "" && phone.value === "") {
        username.nextElementSibling.style.visibility = "visible";
        email.nextElementSibling.style.visibility = "visible";
        password.nextElementSibling.style.visibility = "visible";
        phone.nextElementSibling.style.visibility = "visible";
    }

    if(username.value === "") {
        username.style.borderColor = "red";
        username.nextElementSibling.style.visibility = "visible";
    } else {
        username.style.borderColor = "#40189d";
        username.nextElementSibling.style.visibility = "hidden";
    }

    if(email.value === "") {
        email.style.borderColor = "red";
        email.nextElementSibling.style.visibility = "visible";
    } else {
        email.style.borderColor = "#40189d"
        email.nextElementSibling.style.visibility = "hidden";
    }

    if(password.value === "") {
        password.style.borderColor = "red";
        password.nextElementSibling.style.visibility = "visible";
    } else {
        password.style.borderColor = "#40189d"
        password.nextElementSibling.style.visibility = "hidden";
    }

    if(phone.value === "") {
        phone.style.borderColor = "red";
        phone.nextElementSibling.style.visibility = "visible";
    } else {
        phone.style.borderColor = "#40189d"
        phone.nextElementSibling.style.visibility = "hidden";
    }

    if(username.value !== "" && email.value !== "" && password.value !== "" && phone.value !== "") {
        const admin = JSON.parse(localStorage.getItem("admin"));
        if(admin === null) {
            localStorage.setItem("admin", JSON.stringify([{
                username: username.value, 
                email: email.value,
                password: password.value,
                phone: phone.value,
                status: "true"
            }]));
        } else {
            admin.push({
                username: username.value, 
                email: email.value,
                password: password.value,
                phone: phone.value,
                status: "true"
            });
            localStorage.setItem("admin", JSON.stringify(admin));
        }
    
        getUsers();
    
        document.getElementById("userName").innerText = username.value;
    
        username.value = "";
        email.value = "";
        password.value = "";
        phone.value = "";    
        userList.style.display = "block";
        signupContainer.style.display = "none"
    }
});
// END - Sign Up

// Login
const loginContainer = document.getElementById("loginContainer");
const loginForm = document.getElementById("login");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const addUserContainer = document.getElementById("addUserContainer");

function openLogin() {
    loginContainer.style.display = "block";
    homeContainer.style.display = "none";
}

function closeLogin() {
    loginContainer.style.display = "none";
    homeContainer.style.display = "flex";
    loginEmail.value = "";
    loginPassword.value = "";
    loginEmail.nextElementSibling.style.visibility = "hidden";
    loginPassword.nextElementSibling.style.visibility = "hidden";
    loginEmail.style.borderColor = "#40189d";
    loginPassword.style.borderColor = "#40189d";
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(loginEmail.value === "" && loginPassword.value === "") {
        loginEmail.nextElementSibling.style.visibility = "visible";
        loginPassword.nextElementSibling.style.visibility = "visible";
    }

    if(loginEmail.value === "") {
        loginEmail.style.borderColor = "red";
        loginEmail.nextElementSibling.style.visibility = "visible";
    } else {
        loginEmail.style.borderColor = "#40189d";
        loginEmail.nextElementSibling.style.visibility = "hidden";
    }

    if(loginPassword.value === "") {
        loginPassword.style.borderColor = "red";
        loginPassword.nextElementSibling.style.visibility = "visible";
    } else {
        loginPassword.style.borderColor = "#40189d";
        loginPassword.nextElementSibling.style.visibility = "hidden";
    }

    if(loginEmail.value !== "" && loginPassword.value !== "") {
        const adminList = JSON.parse(localStorage.getItem("admin"));
        if(adminList === null) {
            loginMessage.style.visibility = "visible";
            loginMessage.innerText = "Please signup first.";
            setTimeout(() => loginMessage.style.visibility = "hidden", 2000);
        } else {
            const adminEmail = adminList.map(current => current["email"]);
            const adminPassword = adminList.map(current => current["password"]);
            if(adminEmail.includes(loginEmail.value) && adminPassword.includes(loginPassword.value)) {
                loginContainer.style.display = "none";
                userList.style.display = "block";
                adminList[0].status = "true";
                localStorage.setItem("admin", JSON.stringify([adminList[0]]));
                document.getElementById("userName").innerText = adminList[0].username;
                getUsers();
            } else {
                loginMessage.style.visibility = "visible";
                loginMessage.innerText = "Invalid login credentials. Try again";
                setTimeout(() => loginMessage.style.visibility = "hidden", 2000);
            }
        }
    }
});
// END - Login


// Redirect when logout
function home() {
//     userListTable.innerHTML = `<table>
//     <tr>
//         <th onclick="removeSortID()">#&nbsp; <i class="fas fa-arrow-down" ></i></th>
//         <th>Profile Image</th>
//         <th onclick="sortDown('Name')">Name&nbsp; <i class="fas fa-arrow-down" ></i></th>
//         <th onclick="sortDown('Email')">Email&nbsp; <i class="fas fa-arrow-down" ></i></th>
//         <th onclick="sortDown('Phone')">Phone&nbsp; <i class="fas fa-arrow-down" ></i></th>
//         <th onclick="sortDown('Address')">City&nbsp; <i class="fas fa-arrow-down" ></i></th>
//         <th onclick="sortDown('Country')">Country&nbsp; <i class="fas fa-arrow-down" ></i></th>
//         <th>Action</th>
//     </tr>
//   </table>`;
//     userList.style.display = "none";
//     homeContainer.style.display = "flex";

  const admin = JSON.parse(localStorage.getItem("admin"))[0];
  admin.status = "false";
  localStorage.setItem("admin", JSON.stringify([admin]));
  location.reload();
}



const adminForm = document.getElementById("adminForm");
const adminUpdateName = document.getElementById("adminname");
const adminUpdateEmail = document.getElementById("adminemail");
const adminUpdatePassword = document.getElementById("adminpassword");
const adminUpdatePhone = document.getElementById("adminphone");

function openUpdateAdmin() {
    modal2.style.display = "block";

    const adminData = JSON.parse(localStorage.getItem("admin"))[0];
    adminUpdateName.value = adminData.username;
    adminUpdateEmail.value = adminData.email;
    adminUpdatePassword.value = adminData.password;
    adminUpdatePassword.type = "text";
    adminUpdatePhone.value = adminData.phone;
}

adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const adminData = {
        username: adminUpdateName.value,
        email: adminUpdateEmail.value,
        password: adminUpdatePassword.value,
        phone: adminUpdatePhone.value,
        status: "true"
    }

    localStorage.setItem("admin", JSON.stringify([adminData]));
    location.reload();
})




// MODAL 1 - ADD AGENCY MODAL
var modal = document.getElementById("addAgencyModal");
var btn = document.getElementById("addAgencyBtn");
var span = document.getElementsByClassName("close")[0];
var cancelBtn = document.getElementById("cancelBtn");

cancelBtn.onclick = function() {
    modal.style.display = "none";
}

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



// MODAL 2 - USER MODAL
var modal2 = document.getElementById("addAgencyModal2");
var btn2 = document.getElementById("addAgencyBtn2");
var span2 = document.getElementsByClassName("close2")[0];
var cancelBtn2 = document.getElementById("cancelBtn2");

cancelBtn2.onclick = function() {
    modal2.style.display = "none";
}

// btn2.onclick = function() {
//   modal2.style.display = "block";
// }

span2.onclick = function() {
  modal2.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}



// MODAL 3 - UPDATE AGENCY MODAL
var modal3 = document.getElementById("updateAgencyModal");
var span3 = document.getElementsByClassName("close3")[0];
var cancelBtn3 = document.getElementById("cancelBtn3");

cancelBtn3.onclick = function() {
    modal3.style.display = "none";
}

span3.onclick = function() {
    modal3.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
}




// FETCHING AGENCY(TEST) TABLE DATA FROM AIRTABLE.
getUsers();

let numberOfPage;
let recordPerPage = 5;
let currentPage = 1;


async function getUsers() {
    await fetch("https://api.airtable.com/v0/appLOFf1WnftWo2Cl/Table%201", {
        headers: {
        'Authorization': 'Bearer keyb1DjXBL0kfgpWw',
        }
    },
    ).then(data =>data.json()).then(data => fetchingData(data));

    function fetchingData(data) {

    data.records.forEach((row) => {
        userData.push(row.fields);
        userID.push(row.id);
    });
    numberOfPage = Math.ceil(userData.length / 5);
    document.getElementById("currentPageNumber").innerText = currentPage;
    document.getElementById("totalNumberOfPage").innerText = numberOfPage;

    if(userData !== null) {
        // document.getElementById("loader").style.display = "none";
        tableData.style.display = "";
        document.getElementById("pagination").style.display = "flex";
    }


        tableData.innerHTML = 
        `<table>
            <tr>
                <th onclick="removeSortID()">#&nbsp; <i class="fas fa-arrow-down"></i></th>
                <th>Name&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('Name')"></i></th>
                <th>City&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('City')"></i></th>
                <th>Country&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('Country')"></i></th>
                <th>Action</th>
            </tr>
        </table>`
        ;

        for(let i = 0; i < 5; i++){
        tableData.innerHTML += `
            <tr>
            <td>${data.records[i].fields.no}</td>
            <td>${data.records[i].fields.Name}</td>
            <td>${data.records[i].fields.City}</td>
            <td>${data.records[i].fields.Country}</td>
            <td><button onclick="btn3(this.id)" id=${i} type="button">Edit</button></td>
            </tr>
            `;

            userKey[i] += [data.records[i].id] + ", ";
        }
    document.getElementById("previousPageButton").style.opacity = "0.7";
    document.getElementById("previousPageButton").disabled = true;
    }   
}


function nextPage() {
    if(currentPage < numberOfPage) {
        document.getElementById("nextPageButton").style.opacity = "1";
        document.getElementById("nextPageButton").disabled = false;
        document.getElementById("previousPageButton").style.opacity = "1";
        document.getElementById("previousPageButton").disabled = false;

        currentPage++;
        document.getElementById("currentPageNumber").innerText = currentPage;

        tableData.innerHTML = 
            `<table>
                <tr>
                    <th onclick="sortByID()">#&nbsp; <i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
                    <th>Name&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('Name')"></i></th>
                    <th>City&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('City')"></i></th>
                    <th>Country&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('Country')"></i></th>
                    <th>Action</th>
                </tr>
            </table>`
        ;

        for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
            if(i === userData.length) {
                break;
            } else {
                const row = `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${userData[i].Name}</td>
                        <td>${userData[i].City}</td>
                        <td>${userData[i].Country}</td>
                        <td><button onclick="btn3(this.id)" id=${i} type="button">Edit</button></td>
                    </tr>
                `;
                tableData.innerHTML += row;

                // ------------------------------------------------------------------------
                // console.log(userID);


                userKey[i] += [userID[i]] + ", ";
            }
        }

        
        if(currentPage == numberOfPage) {
            document.getElementById("nextPageButton").style.opacity = "0.7";
            document.getElementById("nextPageButton").disabled = true;
        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

function previousPage() {
    if(currentPage > 1) {
        document.getElementById("previousPageButton").style.opacity = "1";
        document.getElementById("previousPageButton").disabled = false;
        document.getElementById("nextPageButton").style.opacity = "1";
        document.getElementById("nextPageButton").disabled = false;

        currentPage--;
        document.getElementById("currentPageNumber").innerText = currentPage;
        
        tableData.innerHTML = 
            `<table>
                <tr>
                    <th onclick="sortByID()">#&nbsp; <i class="fas fa-arrow-down" onclick="sortByID()"></i></th>
                    <th>Name&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('Name')"></i></th>
                    <th>City&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('City')"></i></th>
                    <th>Country&nbsp; <i class="fas fa-arrow-down" onclick="sortUp('Country')"></i></th>
                    <th>Action</th>
                </tr>
            </table>`;

        for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
            const row = `
            <tr>
                <td>${i + 1}</td>
                <td>${userData[i].Name}</td>
                <td>${userData[i].City}</td>
                <td>${userData[i].Country}</td>
                <td><button onclick="btn3(this.id)" id=${i} type="button">Edit</button></td>
            </tr>
            `;
            tableData.innerHTML += row;

            userKey[i] += [userID] + ", ";
        }

        if(currentPage === 1) {
            document.getElementById("previousPageButton").style.opacity = "0.7";
            document.getElementById("previousPageButton").disabled = true;
        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}



// --------------------------------------------------------------------------------------
const addUserForm = document.getElementById("addUserForm");
const addName = document.getElementById("addname");
const addEmail = document.getElementById("addemail");
const addPhone = document.getElementById("addphone");
const addAddress = document.getElementById("addaddress");
const addCountry = document.getElementById("addcountry");


// ADDING AGENCY
addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Hello");
    if(addEmail.value === "" && addName.value === "" && addPhone.value === "" && addAddress.value === "" && addCountry.value === "") {
        addName.nextElementSibling.style.visibility = "visible";
        addEmail.nextElementSibling.style.visibility = "visible";
        addPhone.nextElementSibling.style.visibility = "visible";
        addAddress.nextElementSibling.style.visibility = "visible";
        addCountry.nextElementSibling.style.visibility = "visible";
    }

    if(addName.value === "") {
        addName.nextElementSibling.style.visibility = "visible";
        addName.style.borderColor = "red";
    } else {
        addName.nextElementSibling.style.visibility = "hidden";
        addName.style.borderColor = "#40189d";
    }

    if(addEmail.value === "") {
        addEmail.nextElementSibling.style.visibility = "visible";
        addEmail.style.borderColor = "red";
    } else {
        addEmail.nextElementSibling.style.visibility = "hidden";
        addEmail.style.borderColor = "#40189d";
    }

    if(addPhone.value === "") {
        addPhone.nextElementSibling.style.visibility = "visible";
        addPhone.style.borderColor = "red";
    } else {
        addPhone.nextElementSibling.style.visibility = "hidden";
        addPhone.style.borderColor = "#40189d";
    }

    if(addAddress.value === "") {
        addAddress.nextElementSibling.style.visibility = "visible";
        addAddress.style.borderColor = "red";
    } else {
        addAddress.nextElementSibling.style.visibility = "hidden";
        addAddress.style.borderColor = "#40189d";
    }

    if(addCountry.value === "") {
        addCountry.nextElementSibling.style.visibility = "visible";
        addCountry.style.borderColor = "red";
    } else {
        addCountry.nextElementSibling.style.visibility = "hidden";
        addCountry.style.borderColor = "#40189d";
    }

    if(addEmail.value !== "" && addName.value !== "" && addPhone.value !== "" && addAddress.value !== "" && addCountry.value !== "") {
        const emailList = userData.map(element => element.Email);
        if(emailList.includes(addEmail.value)) {
            message.style.display = "block";
            message.innerHTML = "User alredy exists";
            setTimeout(() => message.style.display = "none", 2000);
        } else {
            message.style.display = "none";
    
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer keyb1DjXBL0kfgpWw");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "brw=brwo3eEyQ2aAxPqHj");

            var raw = JSON.stringify({
            "fields": {
                "Name": `${addName.value}`,
                "City": `${addAddress.value}`,
                "Country": `${addCountry.value}`,
                "Email_id": `${addEmail.value}`,
                "Phone_no": `${addPhone.value}`,
            }
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://api.airtable.com/v0/appLOFf1WnftWo2Cl/Table%201", requestOptions)
            .then(response => response.text())
            .then(result => {
                addAgencyModal.style.display = "none";
                location.reload();
                // console.log(result);
            })
            .catch(error => console.log('error', error));
        }
    }
});
// --------------------------------------------------------------------------------------


//FETXHING DATA IN FORM FOR UPDATE.
const updateAgencyModal = document.getElementById("updateAgencyModal");
const updateUserForm = document.getElementById("updateUserForm");
const updateName = document.getElementById("updatename");
const updateEmail = document.getElementById("updateemail");
const updatePhone = document.getElementById("updatephone");
const updateAddress = document.getElementById("updateaddress");
const updateCountry = document.getElementById("updatecountry");

function btn3(event) {  
    
    // -----------------------------------------------------
    // console.log(userData[event]);


    fetch("https://api.airtable.com/v0/appLOFf1WnftWo2Cl/Table%201", {
        headers: {
        'Authorization': 'Bearer keyb1DjXBL0kfgpWw',
        }
    },
    ).then(data =>data.json()).then(data => {
        let values = userData[event];
        
        updateName.value = values.Name;
        updateName.value.innerHTML;
        
        updateEmail.value = values.Email_id;
        updateEmail.value.innerHTML;
        
        updatePhone.value = values.Phone_no;
        updatePhone.value.innerHTML
        
        updateAddress.value = values.City;
        updateAddress.value.innerHTML;
        
        updateCountry.value = values.Country;
        updateCountry.value.innerHTML;
        
        // check here for id and index of row
        // -------------------------------------------------------
        // console.log(event);


        urlb = userKey[event].slice(9, 26);
        
        // ----------------------------------------------------------
        // console.log(urlb);
        
        modal3.style.display = "block";
    })
        
};

// UPDATE AGENCY
updateUserForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer keyb1DjXBL0kfgpWw");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "brw=brwo3eEyQ2aAxPqHj");

    var raw = JSON.stringify({
        "fields": {
            "Name": `${updateName.value}`,
            "City": `${updateAddress.value}`,
            "Country": `${updateCountry.value}`,
            "Email_id": `${updateEmail.value}`,
            "Phone_no": `${updatePhone.value}`,
        }
    });

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    let a = `${urlb}`;
    console.log(a);
    fetch(`https://api.airtable.com/v0/appLOFf1WnftWo2Cl/Table%201/${urlb}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        updateAgencyModal.style.display = "none";
        location.reload();
        // console.log(result);
    })
    .catch(error => console.log('error', error));
});


// ---------------------------------------------------------------------
// Search in country field
const searchCountryInput = document.getElementById("searchCountry");
const searchCountry = debounce(() => search());
function debounce(f, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {f.apply(this, args);}, timeout);
    };
}

function search() {
    const rows = document.getElementsByTagName("tr");
    let i;
    for(i = 1; i < rows.length; i++) {
        // -----------------------------------------------------------------------
        // console.log(rows[i]);
        if(!rows[i].children[3].innerText.toString().toLowerCase().startsWith(searchCountryInput.value.toString().toLowerCase())) {
            rows[i].style.display = "none";  
        }
    }

    if(searchCountryInput.value === "") {
        for(i = 1; i < rows.length; i++) {
            rows[i].style.display = "";
        }
    }
}

searchCountryInput.addEventListener("input", searchCountry);





// Sort filters
function sortByID() {
    userData.sort((a, b) => {
        let x = +a["#"];
        let y = +b["#"];

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    tableData.innerHTML = 
    `<table>
        <tr>
            <th onclick="removeSortID()">#&nbsp; <i class="fas fa-arrow-down" ></i></th>
            <th onclick="sortDown('Name')">Name&nbsp; <i class="fas fa-arrow-down" ></i></th>
            <th onclick="sortDown('City')">City&nbsp; <i class="fas fa-arrow-down" ></i></th>
            <th onclick="sortDown('Country')">Country&nbsp; <i class="fas fa-arrow-down" ></i></th>
            <th>Action</th>
        </tr>
    </table>`;

    for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
        const row = `
        <tr>
            <td>${i + 1}</td>
            <td>${userData[i].Name}</td>
            <td>${userData[i].City}</td>
            <td>${userData[i].Country}</td>
            <td><button onclick="btn3(this.id)" id=${i} type="button">Edit</button></td>
        </tr>
        `;
        tableData.innerHTML += row;
    }
}

function removeSortID() {
    userData.sort((a, b) => {
        let x = +a["#"];
        let y = +b["#"];

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });

    tableData.innerHTML = 
    `<table>
        <tr>
        <th onclick="sortByID()">#&nbsp; <i class="fas fa-arrow-down" ></i></th>
        <th onclick="sortDown('Name')">Name&nbsp; <i class="fas fa-arrow-down" ></i></th>
        <th onclick="sortDown('City')">City&nbsp; <i class="fas fa-arrow-down" ></i></th>
        <th onclick="sortDown('Country')">Country&nbsp; <i class="fas fa-arrow-down" ></i></th>
        <th>Action</th>
        </tr>
    </table>`;

    for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
        const row = `
        <tr>
            <td>${i + 1}</td>
            <td>${userData[i].Name}</td>
            <td>${userData[i].City}</td>
            <td>${userData[i].Country}</td>
            <td><button onclick="btn3(this.id)" id=${i} type="button">Edit</button></td>
        </tr>
        `;
        tableData.innerHTML += row;
    }
    
}

function sortUp(field) {
    userData.sort((a, b) => {
        let x = a[field];
        let y = b[field];

        if(x < y) {return -1;}
        if(x > y) {return 1;}
        return 0;
    });

    tableData.innerHTML = 
    `<table>
        <tr>
            <th onclick="sortByID()">#&nbsp; <i class="fas fa-arrow-down"></i></th>
            <th onclick=${field == 'Name' ? "sortDown('Name')" : "sortUp('Name')"}>Name&nbsp; <i class="fas fa-arrow-down"></i></th>
            <th onclick=${field == 'City' ? "sortDown('City')" : "sortUp('City')"}>City&nbsp; <i class="fas fa-arrow-down" ></i></th>
            <th onclick=${field == 'Country' ? "sortDown('Country')" : "sortUp('Country')"}>Country&nbsp; <i class="fas fa-arrow-down" ></i></th>
            <th>Action</th>
        </tr>
    </table>`;

    for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
        const row = `
        <tr>
            <td>${i + 1}</td>
            <td>${userData[i].Name}</td>
            <td>${userData[i].City}</td>
            <td>${userData[i].Country}</td>
            <td><button onclick="btn3(this.id)" id=${i} type="button">Edit</button></td>
        </tr>
        `;
        tableData.innerHTML += row;
    }

}

function sortDown(field) {
    userData.sort((a, b) => {
        let x = a[field];
        let y = b[field];

        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
    });
    tableData.innerHTML = `<table>
    <tr>
        <th onclick="sortByID()">#&nbsp; <i class="fas fa-arrow-down"></i></th>
        <th onclick=${field == 'Name' ? "sortUp('Name')" : "sortDown('Name')"}>Name&nbsp; <i class="fas fa-arrow-down"></i></th>
        <th onclick=${field == 'City' ? "sortUp('City')" : "sortDown('City')"}>City&nbsp; <i class="fas fa-arrow-down" ></i></th>
        <th onclick=${field == 'Country' ? "sortUp('Country')" : "sortDown('Country')"}>Country&nbsp; <i class="fas fa-arrow-down" ></i></th>
        <th>Action</th>
    </tr>
  </table>`;

    for(let i = (currentPage - 1) * recordPerPage; i < (currentPage * recordPerPage); i++) {
        const row = `
        <tr>
            <td>${i + 1}</td>
            <td>${userData[i].Name}</td>
            <td>${userData[i].City}</td>
            <td>${userData[i].Country}</td>
            <td><button onclick="btn3(this.id)" id=${i} type="button">Edit</button></td>
        </tr>
        `;
        tableData.innerHTML += row;
    }
}
