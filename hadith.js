// get names of Allah
async function GetAllHadith() { 
    let result = await fetch("./Json_file/hadith.json")
    let data = await result.json()    
    let counter = 1

    for (let item in  data) {
        let key = item;
        document.querySelector(`.hadith_boxs .${item}`).innerHTML += `      
            <div class="hadith_header fs-4 fw-semibold bg-header w-98 py-2 text-white d-flex  flex-between px-4  mx-auto  rounded-2">
                       <div class="surahNumber bg-img-contain flex-center w-50p h-50p">${convertToArabicNumerals(counter++)}</div>
                       <div class="hadith_name flex-center"> ${data[item][0].category} </div>
            </div>
            <h3 class="title text-center pt-3"> ${data[item][0].category}</h3>`;
         console.log(data[item].length);
         
         data[item].forEach((element , index) => {
              document.querySelector(`.hadith_boxs .${key}`).innerHTML += `            
                <div class="hadith_content text-center p-3 w-90 mx-auto fs-5 pb-3" style="line-height: 2.2;">
                            ${element.content}
                            <div class="button-container">
                                <button class="button">المصدر</button>
                                <button class="button">الشرح</button>
                            </div>
                   </div>
                   <div class="hadith_links"></div>
                   ${index != data[item].length - 1 ? `<p class="Block mx-auto"></p>` :  ""}


                </div> `;
         })
    }    
}

function convertToArabicNumerals(number) {
    return number.toLocaleString('ar-EG'); // Use 'ar-EG' for Arabic (Egypt) locale
} 
GetAllHadith()
