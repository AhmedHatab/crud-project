var empNameInput = document.getElementById('empName');
var empDepartmentInput = document.getElementById('empDepartment');
var empPhoneInput = document.getElementById('empPhone');
var btnAdd = document.getElementById('btnAdd');
var tableBody = document.querySelector('tbody');
var inputs = document.querySelectorAll('input')
var employees = [];
var currentIndex;

if (localStorage.getItem('employeesList') != null) {
    employees = JSON.parse(localStorage.getItem('employeesList'));
    displayEmp();
}
// start and control

btnAdd.onclick = function () {
    if (regExpName() && regExpDepartment() && regExpPhone()) {
        if (btnAdd.innerHTML == "update") {
            update(currentIndex);
        }
        else {
            addEmp();
        }
        displayEmp();
        resetForm()
    }

}



// add data
function addEmp() {
    var employee = {
        name: empNameInput.value,
        depart: empDepartmentInput.value,
        phone: empPhoneInput.value
    }
    employees.push(employee);
    localStorage.setItem('employeesList', JSON.stringify(employees));
}
//display data
function displayEmp() {
    var container = "";
    for (let i = 0; i < employees.length; i++) {
        container += `<tr>
                        <td>${employees[i].name}</td>
                        <td>${employees[i].depart}</td>
                        <td>${employees[i].phone}</td>
                        <td><button onclick="getEmployeeInfo(${i})" class="btn btn-outline-warning">update</button></td>
                        <td><button onclick="deleteEmp(${i})" class="btn btn-outline-danger">delete</button></td>
                    </tr>`;
    }
    tableBody.innerHTML = container;
}
//clear form
function resetForm() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].classList.remove('is-valid');
    }
}
//delete data
function deleteEmp(index) {
    employees.splice(index, 1);
    displayEmp();
    localStorage.setItem('employeesList', JSON.stringify(employees));
}
//seach data
inputs[3].oninput = function seachTxt() {
    var container = "";
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].name.toLowerCase().includes(this.value.toLowerCase())) {
            container += `<tr>
            <td>${employees[i].name}</td>
            <td>${employees[i].depart}</td>
            <td>${employees[i].phone}</td>
            <td><button onclick="getEmployeeInfo(${i})" class="btn btn-outline-warning">update</button></td>
            <td><button onclick="deleteEmp(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>`;
        }
    }
    if (container == "") {
        container = `<h2 class=''>No Result </h2>`;
    }
    tableBody.innerHTML = container;
}
// updata data
function getEmployeeInfo(index) {
    currentIndex = index;
    inputs[0].value = employees[index].name
    inputs[1].value = employees[index].depart
    inputs[2].value = employees[index].phone
    btnAdd.innerHTML = "update"
}
function update(currentIndex) {
    var employee = {
        name: empNameInput.value,
        depart: empDepartmentInput.value,
        phone: empPhoneInput.value
    }
    employees[currentIndex] = employee;
    btnAdd.innerHTML = `<i class="fa-solid fa-plus"></i> Add New`
    localStorage.setItem('employeesList', JSON.stringify(employees));
}

//RegExp


//regExpName------------
empNameInput.addEventListener('input', regExpName);
function regExpName() {
    var nameRejex = /^[a-z]/i;
    if (nameRejex.test(empNameInput.value)) {
        empNameInput.classList.remove('is-invalid');
        empNameInput.classList.add('is-valid');
        document.getElementById('msgName').classList.add('d-none');
        return true;
    }

    else {
        empNameInput.classList.remove('is-valid');
        empNameInput.classList.add('is-invalid');
        document.getElementById('msgName').classList.remove('d-none')
        return false;

    }

}
//regExpDepartment--------
empDepartmentInput.addEventListener('input', regExpDepartment);
function regExpDepartment() {
    var nameRejex = /^[a-z]/i;
    if (nameRejex.test(empDepartmentInput.value)) {
        empDepartmentInput.classList.remove('is-invalid');
        empDepartmentInput.classList.add('is-valid');
        document.getElementById('msgDepartment').classList.add('d-none')
        return true;
    }
    else {
        empDepartmentInput.classList.remove('is-valid');
        empDepartmentInput.classList.add('is-invalid');
        document.getElementById('msgDepartment').classList.remove('d-none')
        return false;

    }

}
//regExpPhone----
empPhoneInput.addEventListener('input', regExpPhone);
function regExpPhone() {
    var nameRejex = /^01[0125][0-9]{8}$/g;
    if (nameRejex.test(empPhoneInput.value)) {
        empPhoneInput.classList.remove('is-invalid');
        empPhoneInput.classList.add('is-valid');
        document.getElementById('msgPhone').classList.add('d-none')
        return true;
    }
    else {
        empPhoneInput.classList.remove('is-valid');
        empPhoneInput.classList.add('is-invalid');
        document.getElementById('msgPhone').classList.remove('d-none')
        return false;

    }

}




