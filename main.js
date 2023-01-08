// Global elements
  let key = 0;
  let alet = `<p class ="p-3 mb-3 bg-danger text-white " id = "alert"><small>Please fill all the fields!</small></p>`;
  let success = `<p class ="p-3 mb-3 bg-success text-white" id = "success"><small>Book successfully added!</small></p>`;
  let del = `<p class ="p-3 mb-3 bg-success text-white" id = "delete"><small>Book deleted!</small></p>`;
  let tabody = document.querySelector('tbody');

// Warning message
let warn = () => {
  document.getElementById('msg').innerHTML += alet;
    setTimeout(() =>{
      document.getElementById('alert').remove();
    },1500);
};

// delete message
let dell = () => {
  document.getElementById('msg').innerHTML += del;
    setTimeout(() =>{
      document.getElementById('delete').remove();
    },1500);
};

// Book addition message
let added = () => {
  document.getElementById('msg').innerHTML += success;
    setTimeout(() =>{
      document.getElementById('success').remove();
    },1500);
};

//Button change according to theme on re_load of page
let btnChange = () => {
  let mode = localStorage.getItem('bs.prefers-color-scheme');
  var themeIcon = document.getElementById('darkmodetoggle');
  if(mode === "light")
  {
    themeIcon.classList.remove("fa-sun")
    themeIcon.classList.add("fa-moon");
  }
  else{
    themeIcon.classList.add("fa-sun")
    themeIcon.classList.remove("fa-moon");
  }
}

// RETRIEVAL OF LOCAL STORAGE DATA ON RE_LOAD OF PAGE
let getData = (i) =>{
    let data = JSON.parse(localStorage.getItem(i));
    let title1 = data.title;
    let author1 = data.author;
    let isbn1 = data.isbn;
    let key1 = data.key;
    let tablerow = `
    <tr>
      <td id="tiitle11" >${title1}</td>
      <td id="author11" >${author1}</td>
      <td>${isbn1}</td>
      <td id= "key" class= "d-none">${key1}</td>
      <td>
        <button id="close" onclick="deleteRow(this)" type="button" class="btn btn-danger">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 19">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
          </svg>
        </button>
      </td>
    </tr>
    `;
    tabody.innerHTML += tablerow;
}


let uniqueKey = () => {
  if(localStorage.length >= 0)
  {
    for (let i in localStorage){
     let key2 = localStorage.key(i);
      if (key === key2) {
      key++;
      }
    }
  }
  key++;
}

// Submission Form Function
let add = document.getElementById("add");
 add.addEventListener("click", sendData = (event) => {  
  // 👇️ if you are submitting a form (prevents page reload)
  event.preventDefault();

  //For Unique key generation
  uniqueKey();

  //Form values
  const isbn = document.getElementById("isbn#").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  // object of the form data
  const formData = {
    title,
    author,
    isbn,
    key
  };

  //Sending data to local storage
  if (title && author && isbn !== "") {
    added();    
    localStorage.setItem(`${key}`,JSON.stringify(formData));    
  }
  else {
    warn();
  }

  // Retrieving data from local storage
  getData(key);

  // 👇️ clear input field
  form.reset();
  
});


 
// Execution of functions on RE_LOAD OF PAGE
window.onload = () => {
  //Button change according to theme on re_load of page
  btnChange();

  // RETRIEVAL OF LOCAL STORAGE DATA ON RE_LOAD OF PAGE
  for (let i in localStorage) {
  getData(i);
  }
}

// Dynamically Deleting row from table
function deleteRow(r) {
  dell();
  var i = r.parentNode.parentNode.rowIndex;
  let key = document.getElementById("table").rows[i].cells[3].innerHTML
  localStorage.removeItem(key);
  document.getElementById("table").deleteRow(i);
}

// Dark Mode button change
let toggle = () =>{
  darkmode.toggleDarkMode();
  let mode = localStorage.getItem('bs.prefers-color-scheme');
  var themeIcon = document.getElementById('darkmodetoggle');
  if(mode === "light")
  {
    themeIcon.classList.remove("fa-sun")
    themeIcon.classList.add("fa-moon");
  }
  else{
    themeIcon.classList.add("fa-sun")
    themeIcon.classList.remove("fa-moon");
  }

}
