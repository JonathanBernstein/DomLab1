"use strict";

//main class 
class AddressBook {
    constructor() {
        //assigns a value of to contacts
        this.contacts = [];
    }
    
    add(info) {
        this.contacts = [...this.contacts,info];
    }
    //uses splice to remove a contact from the array
    //index placeholds a value when index is called it passes an argument into the index variable
    deleteAt(index) {
        this.contacts = [...this.contacts.slice(0, index), ...this.contacts.slice(index + 1)];
    }

    //loops through contacts and prints every index of the array when called
    display() {
      document.querySelector(".addressList").innerHTML = "";
      let count = 0;
      for(let contact of this.contacts) {
          const newEntry = document.createElement("div");
          newEntry.setAttribute("index", count);
          newEntry.classList.add("contact_box");
          newEntry.innerHTML= `
          <p>Name: ${contact.name}</p>
          <p>Email: ${contact.email}</p>
          <p>Phone: ${contact.phone}</p>
          <p>Relationship: ${contact.relation}</p>
          <i class="fas fa-trash trash" id="trash" ></i>
          `;
        document.querySelector(".addressList").append(newEntry);
        count++;
      }
    }
}


class Contact {
    constructor(name, email, phone, relation) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.relation = relation;
    }
}


const book = new AddressBook;


document.querySelector("form").addEventListener("submit", addContact);

function addContact(event) {
    event.preventDefault();
        let inputElements = document.querySelectorAll("input");
       const info = new Contact(
         inputElements[0].value,
         inputElements[1].value,
         inputElements[2].value,
         inputElements[3].value,
       );
        book.add(info);
        for(let input of inputElements){
            input.value="";
        }
        book.display();
        
}       


document.querySelector("main").addEventListener("click", deleteContact);

function deleteContact(event){
    if(event.target.classList.contains("trash")) {
        const index = event.target.parentNode.getAttribute("index");
        book.deleteAt(index);
        book.display();
    }
}



