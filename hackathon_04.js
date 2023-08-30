const studentsDB = JSON.parse(localStorage.getItem("student")) || [];
const formElement = document.querySelector("form");
const fullNameElement = document.querySelector("#fullname");
const emailElement = document.querySelector("#email");

const phoneElement = document.querySelector("#phone");
const addressElement = document.querySelector("#address");
const genderElement = document.getElementsByClassName("gender");
fullNameElement.value = "";
emailElement.value = "";
phoneElement.value = "";
addressElement.value = "";

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const studentsDB = JSON.parse(localStorage.getItem("student")) || [];
  const student = getStedent();
  console.log(student);
  const error = checkError(student);
  readerError(error);
  if (error.isError) {
    return;
  } else {
    studentsDB.push(student);
    localStorage.setItem("student", JSON.stringify(studentsDB));
  }
  readerStudent(studentsDB);
});

function readerStudent(data) {
  const studentsDB = JSON.parse(localStorage.getItem("student")) || [];
  let resurl = `<tr>
        <td>#</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Điện thoại</td>
        <td>Địa chỉ</td>
        <td>Gender</td>
        <td>Hành động</td>
        <td><button onclick="handleArrange()">sắp xếp (anpha b)</button></td>
      </tr>`;
  data.forEach((student, index) => {
    resurl += `<tr class="list-student">
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.address}</td>
        <td>Gender</td>
        <td><button onclick="delete_student(${index})">delete</button><button>edit</button></td>
        `;
  });
  document.querySelector(".list-student").innerHTML = resurl;
}
readerStudent(studentsDB);
function getStedent() {
  return {
    name: fullNameElement.value,
    email: emailElement.value,
    phone: phoneElement.value,
    address: addressElement.value,
    gender: genderElement.checked,
  };
}
function checkError(user) {
  const error = {
    isError: false,
    msgName: "",
    msgEmail: "",
    msgPhone: "",
    msgAddress: "",
  };
  if (!user.name) {
    error.isError = true;
    error.msgName = "*Tên người dùng không đc để trống";
  }
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!user.email.match(validRegex)) {
    error.isError = true;
    error.msgEmail = "*nhập đúng định dạng email";
  }
  if (!user.phone) {
    error.isError = true;
    error.msgPhone = "*số điện thoại ko đc để trống";
  }
  if (!user.address) {
    error.isError = true;
    error.msgAddress = "*Địa chỉ không đc để trống";
  }
  return error;
}
// hiển thị lỗi
function readerError(error) {
  const errorNamelElememt = document.querySelector("#error-fullname");
  const errorEmailElememt = document.querySelector("#error-email");
  const errorPhonelElememt = document.querySelector("#error-phone");
  const errorAddressElememt = document.querySelector("#error-address");
  errorNamelElememt.textContent = error.msgName;
  errorEmailElememt.textContent = error.msgEmail;
  errorPhonelElememt.textContent = error.msgPhone;
  errorAddressElememt.textContent = error.msgAddress;
}
// xóa
function delete_student(index) {
  const studentsDB = JSON.parse(localStorage.getItem("student")) || [];
  studentsDB.splice(index, 1);
  localStorage.setItem("student", JSON.stringify(studentsDB));
  readerStudent(studentsDB);
}
// hiển thị danh sách tìm kiếm
function handleSeach() {
  const dataSeach = document.querySelector("#seach").value;
  const studentsDB = JSON.parse(localStorage.getItem("student")) || [];
  const studentSeach = [];
  for (const student of studentsDB) {
    // trả về giá trị đúng nếu chứa thành phần trong mảng
    if (student.name.toLowerCase().includes(dataSeach.toLowerCase())) {
      studentSeach.push(student);
    }
  }
  readerStudent(studentSeach);
}
// sắp xếp theo anph b
function handleArrange() {
  const studentsDB = JSON.parse(localStorage.getItem("student")) || [];
  studentsDB.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  console.log(studentsDB);
  readerStudent(studentsDB);
}
