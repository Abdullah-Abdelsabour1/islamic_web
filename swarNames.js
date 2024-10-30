function convertToArabicNumerals(number) {
    return number.toLocaleString('ar-EG'); // Use 'ar-EG' for Arabic (Egypt) locale
}
async function fetchSwar() {
    let surahaContainer = document.getElementById("surahaContainer");
    let res = await fetch("https://api.alquran.cloud/v1/surah");
    if (!res.ok) {
        throw new Error('Network response was not ok.');
    }
    let data = await res.json();
    let All__Swar = data.data;
    All__Swar.forEach((surah) => {
        let surahID = convertToArabicNumerals(surah.number);
        surahaContainer.innerHTML += `
            <div class=" mb-3 col-md-6 col-lg-4">
                <div class="card h-100 shadow-lg justify-content-between d-flex flex-column border-0 py-2">
                        <div class="card-head d-flex align-items-center justify-content-between mx-3 ">
                            <div  class="surahName fs-4 rounded-3 my-2 SwarName">${surah.name} - ${surah.revelationType == "Meccan" ? "مَكِيَّة" : "مَدَنِيَّة"} </div>
                            <div  class="surahId bg-light px-3   fs-5 py-2 rounded-1 text-black ">${surahID}</div>
                        </div>
                        <div class="card-body flex-around mt-1">
                            <a href="javascript:void()" data-surahNumber="${surah.number}" class="link readQuraan  fs-5 bg-green d-block w-50 py-2 rounded-2 text-white">قراءة و تفسير </a>
                        </div>
                </div>        
            </div>`;
    });

    let SwarName = document.querySelectorAll(".swar .readQuraan");
      SwarName.forEach((surahName , index) => {
        surahName.addEventListener("click",  (e) => {
            let surahNumber = e.target.dataset.surahnumber;
            window.location.href = 'moshaf_and_tafsier.html?id=' +  surahNumber;
        });
    });   
}
fetchSwar();
