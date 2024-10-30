async function fetchAllgovernorates(){
    let result = await fetch('./Json_file/governorates.json');
    let data = await result.json();
    let governorates = await data[2].data;
    SetGovernorateToDropdown(governorates)
}
fetchAllgovernorates()

function SetGovernorateToDropdown(governorates) {
    let governorateDropdown = document.getElementById("options");
    governorates.forEach((gov) => {
        governorateDropdown.innerHTML += `<option style="color=black" data-gov = ${gov.governorate_name_ar} value = ${gov.governorate_name_en}> ${gov.governorate_name_ar}</option>`;
    });
}

function choose_governate(){
    let select_governorate = document.getElementById("select_governorate");
    let governorate = document.getElementById("governate");
    select_governorate.addEventListener("change", (e) => {
        let selectedOption = select_governorate.selectedOptions[0];
        let govName = selectedOption.dataset.gov;
        governorate.innerHTML = govName + `<i class="fa-solid fa-location-dot"></i>`;
        getprayerTiming(selectedOption.value);
    });
}
choose_governate()

let prayerNames = {Fajr: "الفجر", Sunrise : "شروق الشمس" , Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء"};

async function getprayerTiming(governorate) {
    let result = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${governorate}&country=EG`);
    let data = await result.json();
    let timings = data.data.timings;

    let prayerBox = document.querySelector(".PrayerTiming .timings .row");
    prayerBox.innerHTML = "";
    for (let englishName in prayerNames) {
        let arabicName = prayerNames[englishName];
        prayerBox.innerHTML += `<div class="col-sm-6 col-lg-4 col-xl-3">
                                        <div class="box bg-success rounded-4 p-3 mb-4">
                                            <h2 class="athan">${arabicName}</h2>
                                            <p class="time">${timings[englishName]}</p>
                                        </div>
                                    </div>`;
    }
}
getprayerTiming("Assiut");

function set_date_and_time(){
        // Create a new date
        let date = new Date();

        // Convert to Arabic format
        let birth_date_in_ar = date.toLocaleDateString("ar-EG", {
            year: "numeric",     // Numeric year
            month: "long",       // Full name of the month
            day: "numeric"       // Day of the month
        });
        
        let hijri_date_in_ar = date.toLocaleDateString("ar-EG-u-ca-islamic" , {
            year : "numeric" ,
            month : "long",
            day : "numeric" ,

        });

        let birthday = date.toLocaleDateString("ar-EG", {
            weekday: "long",   // Full name of the weekday
        })

        setInterval(() => {
            let date = new Date();
            let arabicTime = date.toLocaleTimeString("ar-EG", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true  
            });
            document.querySelector(".Day_info  .cuurentDate").innerHTML = arabicTime
        } , 1000)

        document.querySelector(".date_info .birth_date").innerHTML = birth_date_in_ar
        document.querySelector(".date_info .hijri_date").innerHTML = hijri_date_in_ar
        document.querySelector(".Day_info  .birth_day").innerHTML = birthday
  }

  set_date_and_time()
    

   











