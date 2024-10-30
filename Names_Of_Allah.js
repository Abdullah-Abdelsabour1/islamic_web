// get names of Allah
async function getNameOfAllah() { 
    let res = await fetch("../Json_file/Names_Of_Allah.json");
    let data = await res.json();
    let RowCard = document.querySelector(".Alaah_names .container .row");
    data.forEach((name)=> {
        const arabicNumber = convertToArabicNumerals(name.id);
        RowCard.innerHTML += `<div class ="col-md-6 col-xl-4"> 
                <div class="card shadow-lg d-flex align-item-center border-0  h-100 p-3 ">
                     <div class="card-head flex-between">
                         <h4 class="name">${name.name}</h4>
                         <p class="card_id flex-center fs-5  text-white bg-green w-40p h-40p">${arabicNumber}</p>
                     </div> 
                       <p>${name.text}</p> </div> 
                </div>`;
    });
}
function convertToArabicNumerals(number) {
    return number.toLocaleString('ar-EG'); // Use 'ar-EG' for Arabic (Egypt) locale
} 
getNameOfAllah() ;