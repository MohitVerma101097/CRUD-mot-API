const staffContainer = document.querySelector(".staff-container");
const newStaffTxt = document.querySelector("#new-staff-txt");
const addBtn = document.getElementById("add-btn");
addBtn.style.backgroundColor = "green"

let hogwartsStaff;

const fetchUnsplash = async () => {
    try {
        const request = await fetch('https://api.unsplash.com/photos/?client_id=IrQSF0dxpIpQ9EvcpBcULAsu3vnxcw9RHnQn4te0blQ')
        const result = await request.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

fetchUnsplash()

const getImage = async () => {
    try {
        const unsplashImage = await fetchUnsplash();
        console.log(unsplashImage)
        console.log(unsplashImage.urls.regular);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

getImage();


const fetchStaff = async () =>{
    try {
        const hogwartsStaffRequest = await fetch('https://hp-api.onrender.com/api/characters/staff')
        const result = await hogwartsStaffRequest.json()
        return result 
    } catch (error) {
        console.log(error)   
    }
}

const fetchAndShowStaff = async () => {
    try {
        hogwartsStaff = await fetchStaff()
        //console.log('i fetch og show staff funksjonen', hogwartsStaff)
        showAllStaff()
    } catch (error) {
        console.log('Opsie!');
    }
}

fetchAndShowStaff()

const showAllStaff = () => {
    staffContainer.innerHTML = ''; // Clear existing content
    hogwartsStaff.forEach((staffMember, index) => {
        // Create card for each staff member
        const staffCard = document.createElement('div');
        staffCard.innerHTML = `<img src="${staffMember.image}" style="width: 300px"/> <h3>${staffMember.name}</h3>`;
        staffContainer.append(staffCard);
        
        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `Delete ${staffMember.name}`;
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.addEventListener("click", () => { deleteFunction(index); });
        staffCard.appendChild(deleteBtn); // Append delete button to staff card
        
        // Create edit button
        const editBtn = document.createElement("button");
        editBtn.style.backgroundColor = 'yellow';
        editBtn.innerHTML = "Edit Staff";
        editBtn.addEventListener("click", () => { editStaffMember(index); });
        staffCard.appendChild(editBtn); // Append edit button to staff card
    });
};

// delete staff

const deleteFunction = (index) => {
    hogwartsStaff.splice(index,1);
 
    showAllStaff()
}

//console.log(fetchStaff())

// create staff

const addStaffMember = () => {
    
if(newStaffTxt.value){
    hogwartsStaff.unshift({
        name: newStaffTxt.value,
        image: ''
    })
    showAllStaff()
    newStaffTxt.value = ''
    
} else{
    alert('skriv inn lærer')
}
}

addBtn.addEventListener("click", addStaffMember)

// Edit staff

const editStaffMember = (index) => {
    const newStaffName = document.querySelector(`#nameInput-${index}`).value
    hogwartsStaff[index].name = newStaffName;
    
    showAllStaff()
}