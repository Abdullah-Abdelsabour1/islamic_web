// fetch reciters  from api 
let apiUrl = "https://mp3quran.net/api/v3";
let lang = "ar";

async function getReciters() {
    let choose__reciters = document.getElementById("choose__reciters");
    let table__reciters = document.querySelector("#table__reciters tbody");
    let result = await fetch(`${apiUrl}/reciters?language=${lang}`);
    let data = await result.json();
    let reciters_object = data.reciters;
    reciters_object.forEach(reciter => {
        choose__reciters.innerHTML += `<option value="${reciter.id}"> ${reciter.name} </option>`;
    });
    choose__reciters.addEventListener('change', (e) => getMoshaf(e.target.value));
}
getReciters();

// fetch moshaf 
async function getMoshaf(id_reciters) {
    let choose__moshaf = document.getElementById("choose__moshaf");
    choose__moshaf.innerHTML = `<option value = "" selected> اختر الرواية </option>`;
    let result = await fetch(`${apiUrl}/reciters?language=${lang}&reciter=${id_reciters}`);
    let data = await result.json();
    let reciters_object = data.reciters[0];

    reciters_object.moshaf.forEach(moshaf => {
        choose__moshaf.innerHTML += `<option value="${moshaf.id}" data-server = "${moshaf.server}" data-surah_list = "${moshaf.surah_list}"> ${moshaf.name} </option>`;
    });

    choose__moshaf.addEventListener("change", (e) => {
        selectedMoshaf = choose__moshaf.options[choose__moshaf.selectedIndex];
        let suwarServer = selectedMoshaf.dataset.server;
        let suwarList = selectedMoshaf.dataset.surah_list;
        console.log(e.target);
        choose__Surah.innerHTML = "";
        getSurah(suwarServer, suwarList);
    });
}
//  fetch surah 
choose__Surah = document.getElementById("choose__Surah");
async function getSurah(moshafServer, surah_list) {
    choose__Surah.innerHTML = `<option value="" selected> اختر السورة</option> `;
    let res = await fetch("https://mp3quran.net/api/v3/suwar");
    let data = await res.json();

    if (surah_list && typeof surah_list == "string") {
        surah_list = surah_list.split(",");
    }

    surah_list.forEach((id) => {
        PadID = id.padStart(3, 0);
        data.suwar.forEach((surah) => {
            if (surah.id == id) {
                choose__Surah.innerHTML += `<option value="${moshafServer}${PadID}.mp3"> ${surah.name}</option>`;
            }
        })
    });

    choose__Surah.addEventListener("change", (e) => {
        let selectedSurah = choose__Surah.options[choose__Surah.selectedIndex];
        playSurah(selectedSurah.value);
    });

}
getSurah();
async function playSurah(SurahMP3) {
    let audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = SurahMP3;
    audioPlayer.play();
}

let reciter = [
    "ياسرالدوسرس" , "وديع اليمني" , "هزاع البلوشي" , "ناصر القطامي" , "منصور السالمي",
    "ماهر المعيقلي" , "فارس عابد" , "عبدالباسط عبد الصمد" , "عبد الله كامل" ,
    "خالد الجليل" , "المنشاوي" , "العفاسي" ,"السديسي" , "الحصري" , "البنا" , "اسلام صبحي"
]

function set_data_to_reciterContainer(reciter){
    let reciterContainer = document.querySelector(".reciters .container .row")
    reciter.forEach((reciter) => {
        let picture = reciter + '.jpg';  
        reciterContainer.innerHTML += 
            ` <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="reciter__card text-center mb-4">
                    <div class="image mx-auto"><img src="reciter_images/${picture}" class="w-100 mx-100" alt=".jpg"></div>
                    <p class="reciter__name mt-2">${reciter}</p>
                </div>
            </div> `
    })
}
set_data_to_reciterContainer(reciter)

