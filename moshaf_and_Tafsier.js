// Convert number to Arabic numerals using 'ar-EG' locale
function convertToArabicNumerals(number) {
    return number.toLocaleString('ar-EG');
}

// Hide scroll bar
document.body.style.overflow = 'hidden';

// Get params from URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

// fetch Ayat OF Surah  from API
async function fetchAyat(surahID){
  let surahName = document.querySelector(".surah-info .surahName");
  let surahNumber = document.querySelector(".surah-info .surahNumber");
  let surahContent = document.querySelector(".surahContent");
  let res = await fetch(`https://api.alquran.cloud/v1/surah/${id}`)
  let data = await res.json();
  let All_data = data.data;
  let ALL_ayat = data.data.ayahs;
  let pageNumber = ALL_ayat[0].page;
  surahName.innerHTML = `(${All_data.name}) - صفحة  (${convertToArabicNumerals(ALL_ayat[0].page)})`;
  surahNumber.innerHTML = `${convertToArabicNumerals(All_data.number)}`;
  surahContent.innerHTML = (id !== 9 || id !== 0) ? `<h2 class="basmalla"> بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h2>` : "";

      for (let i = 0 ; i < ALL_ayat.length ; i++) {
            // change page  
            if (ALL_ayat[i].page == pageNumber + 1) {
              surahContent.innerHTML += `
                    <p class="numberOfpage flex-center bg-img-contain p-2 text-center">
                        ${convertToArabicNumerals(ALL_ayat[i].page - 1)} 
                    </p>
                    <p class="hr"></p>`;
                pageNumber += 1;
            }
            if (i == 0) {
                let firstAyah = ALL_ayat[0].text.replace(/بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ/, '');
                surahContent.innerHTML += `<span class="Ayah" data-number="${ALL_ayat[i].number}">${firstAyah}</span> 
                    <div class="AyahNumber  d-inline-flex w-50p h-50p ms-2 ">${convertToArabicNumerals(ALL_ayat[i].numberInSurah)}</div>`;
             }
             else {
              surahContent.innerHTML += `
                    <span class="Ayah  " data-number="${ALL_ayat[i].number}">${ALL_ayat[i].text}</span> 
                    <div class="AyahNumber d-inline-flex   w-50p h-50p ms-2">${convertToArabicNumerals(ALL_ayat[i].numberInSurah)}</div>`;
            }
            if( ALL_ayat[i].numberInSurah == All_data.numberOfAyahs){
                surahContent.innerHTML += `
                <p class="numberOfpage flex-center bg-img-contain p-2 text-center">
                    ${convertToArabicNumerals(ALL_ayat[i].page)} 
                </p>
                <p class="Block"></p>`;
            }
      }
      // loop for Ayat 
      let Ayat = document.querySelectorAll(".Ayah");
      let currrent_aya =  document.querySelector(".currrent_aya");
      Ayat.forEach((aya) => {
        aya.addEventListener("click" , (aya) => {
          let tafserName; 
          let numberOfAya = aya.target.dataset.number;
          currrent_aya.innerHTML = aya.target.innerHTML;
          fetchTafser(numberOfAya , tafserName);
          let All_element = document.querySelectorAll('body > div :not(.tafser_Container *)');
          All_element.forEach(e => e.classList.add("blur"));
          

             // choose tafser 
              let chooseTafer = document.querySelector(".tafser_Container .form-select");
              chooseTafer.addEventListener("change", (e) => {
                   tafserName =  e.target.value;
                  fetchTafser( numberOfAya , tafserName);
              }); 

          });
     });
}
// call fetch Ayat
fetchAyat();
  

// fetch tafsier 
async function fetchTafser(numberOfAya , tafserName = "waseet"){
     let tafserContainer  = document.querySelector(".tafser_Container");
     let tafserContent = document.querySelector(".tafser_Container .content");
     let close = document.querySelector(".tafser_Container .close_tafser");
     let fileName = '../json_file/'+  tafserName +'.json'; 
     let res =  await fetch(fileName);
     let data = await res.json();
     let tasser = data[numberOfAya - 1].text.replace(/<\/?[^>]+(>|$)|\\/g, '');
     tafserContent.innerHTML = tasser;   

     tafserContainer.classList.remove("hide");
     tafserContainer.classList.add("show");

     close.addEventListener("click" , (e) => {
         tafserContainer.classList.remove("show");
         tafserContainer.classList.add("hide");
         let All_element = document.querySelectorAll('body > div :not(.tafser_Container *)');
         All_element.forEach(e => e.classList.remove("blur"));
    })
} 