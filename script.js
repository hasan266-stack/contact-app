let body = document.getElementById("body")
let show = document.getElementById("show");
let bars = document.getElementById("bars");

function showTask() {
    if (show.style.width === "0px" || show.style.width === "") {
        show.style.width = "20%";
        bars.classList.replace("fa-bars", "fa-xmark");
    } else {
        show.style.width = "0";
        bars.classList.replace("fa-xmark", "fa-bars");
    }
}

bars.addEventListener("click", showTask);

let profileContainer = document.querySelector(".profile-container");
let userProfile = document.querySelector(".user-profile");

profileContainer.addEventListener("click", (event) => {
    event.stopPropagation(); 
    if (userProfile.style.display === "block") {
        userProfile.style.opacity = "0";
        setTimeout(() => {
            userProfile.style.display = "none";
        }, 300);
    } else {
        userProfile.style.display = "block";
        userProfile.style.opacity = "2";
    }
});

apps.addEventListener("mouseenter", () => {
    applications.style.display = "block";
    setTimeout(() => {
        applications.style.opacity = "1";
    }, 5);
});

apps.addEventListener("mouseleave", () => {
    applications.style.opacity = "0";
    setTimeout(() => {
        applications.style.display = "none";
    }, 300);
});

document.addEventListener("click", (event) => {
    if (!profileContainer.contains(event.target)) {
        userProfile.style.opacity = "0";
        setTimeout(() => {
            userProfile.style.display = "none";
        }, 300);
    }
});

let btn = document.getElementById("add-contact"); 
let updateBtn = document.getElementById("update-table");
let tableBody = document.getElementById("table-body"); 
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];  

function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
let form = document.getElementById("form")
form.style.display = "none"
btn.addEventListener("click", () => {     
    if(form.style.display == "none"){
        form.style.display = "flex"
        body.style.backgroundColor = "#00000049"
    }
    else{
        form.style.display = "none"
        body.style.backgroundColor = "#f5f5f5"
    }
});      
form.addEventListener("submit", function(e){
    e.preventDefault();
    let name = this.name.value;
    let email = this.email.value;
    let location = this.location.value;
    let phone = this.phone.value;
    
    if (!name || !email || !location || !phone) {
        alert("Please provide all details");
        return;
    }
    
    contacts.push({ name, email, location, phone });
    saveContacts();
    updateTable();
    form.reset();
    form.style.display = "none"
    body.style.backgroundColor = "#f5f5f5"
 });
function deleteContact(index) {     
    contacts.splice(index, 1);     
    saveContacts();
    updateTable();
}   

function editContact(index) {
    let contact = contacts[index];
    let name = prompt("Edit name", contact.name);
    let email = prompt("Edit email", contact.email);
    let location = prompt("Edit location", contact.location);
    let phone = prompt("Edit phone", contact.phone);
    
    if (!name || !email || !location || !phone) {
        alert("Please provide all details");
        return;
    }
    
    contacts[index] = { name, email, location, phone };
    saveContacts();
    updateTable();
}

function updateTable() {     
    tableBody.innerHTML = "";     
    contacts.forEach((contact, index) => {         
        let row = document.createElement("tr");         
        row.innerHTML = `             
            <td>${contact.name}</td>             
            <td>${contact.email}</td>             
            <td>${contact.location}</td>             
            <td>${contact.phone}</td>             
            <td>
                <button onclick="editContact(${index})">Edit</button> 
                <button onclick="deleteContact(${index})">Delete</button>
            </td>         
        `;         
        tableBody.appendChild(row);     
    }); 
}

// updateBtn.addEventListener("click", updateTable);
updateTable();
document.addEventListener("DOMContentLoaded", updateTable);
