const staffContainer = document.querySelector(".staff-container");
const newStaffTxt = document.querySelector("#new-staff-txt");
const addBtn = document.getElementById("add-btn");

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
        console.error('Opsie!');
    }
}

fetchAndShowStaff()

const showAllStaff = () => {
    hogwartsStaff.forEach((staffMemeber, index)=>{
        const staffCard = document.createElement('div');

        //Slett

        const deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = `delete ${staffMemeber.name}`
        deleteBtn.style.backgroundColor = 'red'
        staffCard.innerHTML = `<img src="${staffMemeber.image}" style="width: 300px"/> <h3>${staffMemeber.name}</h3> `; // corrected the syntax for the <img> tag
        staffContainer.appendChild(staffCard); // corrected to appendChild
        console.log(staffMemeber.name, index);
    });
}

console.log(fetchStaff())

