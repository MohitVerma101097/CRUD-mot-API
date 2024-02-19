const staffContainer = document.querySelector(".staff-container");
const newStaffTxt = document.querySelector("#new-staff-txt");
const addBtn = document.getElementById("add-btn");
addBtn.style.backgroundColor = "green"

let hogwartsStaff;

const fetchStaff = async () =>{
    try {
        const hogwartsStaffRequest = (await fetch('https://hp-api.onrender.com/api/characters/staff'))
       const result = await hogwartsStaffRequest.json()
        return result 
    } catch (error) {
        console.log(error)   
    }
}

const fetchAndShowStaff = async () => {
    try {
        hogwartsStaff = await fetchStaff()
        console.log('i fetch og show staff funksjonen', hogwartsStaff)
        showAllStaff()
    } catch (error) {
        console.log('Opsie!');
    }
}
fetchAndShowStaff()
const showAllStaff = () => {
    staffContainer.innerHTML = ''
    hogwartsStaff.forEach((staffMemeber, index) => {
        const staffCard = document.createElement('div');

        //Slette

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `Delete ${staffMemeber.name}`;
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.addEventListener("click", ()=> {
            deleteFunction(index)
        });

        //Edit
        const nameInput = document.createElement("input")
        nameInput.type = "text"
        nameInput.placeholder = "Skriv inn navn på ansatt..."
        nameInput.id = `nameInput-${index}`
        const editBtn = document.createElement("button");
        editBtn.style.backgroundColor = 'yellow'
        editBtn.innerHTML = "rediger ansatt"
        editBtn.addEventListener("click", ()=>{
            editStaffMember(index)
        })
        staffCard.innerHTML = `<img src="${staffMemeber.image}" style="width: 300px"/> <h3>${staffMemeber.name}</h3>`;
        staffCard.append(deleteBtn, nameInput, editBtn)
        staffContainer.append(staffCard)
        
        console.log(staffMemeber.name);
    });
}


const deleteFunction = (index) => {
    hogwartsStaff.splice(index,1);
 
    showAllStaff()
}
console.log(fetchStaff())

// create

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

//Edit

const editStaffMember = (index) => {
    const newStaffName = document.querySelector(`#nameInput-${index}`).value
    hogwartsStaff[index].name = newStaffName;
    
    showAllStaff()
}