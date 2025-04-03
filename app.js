let dataArr = []
let dataClass = ""
const base64Credentials = btoa("coalition:skills-test");
fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
    method: "GET",
    headers: {
        Authorization: ` Basic ${base64Credentials}`,
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        
        dataArr = data
        getPasient(data)
        dataClass = new Functions(data)
    }
)
const pasients = document.getElementById("pasients")
function getPasient(arg){
    let kod = ""
    arg.map(item => 
        kod += 
        `
        <div onclick="getPasientInfo('${item.name}')" class="flex items-center gap-3 hover:bg-[#01F0D0] p-2 rounded-2xl cursor-pointer">
            <div class="w-[50px] h-[50px]"><img class="w-full h-full object-cover" src="${item.profile_picture}" alt=""></div>
            <div>
                <h2>${item.name}</h2>
                <span class="text-[14px] text-[#707070]">${item.gender},${item.age}</span>
            </div>
        </div>
        `
    )
    pasients.innerHTML = kod
}
const pasientH2 = document.getElementById("pasientH2")
const input = document.getElementById("input")
const ranking = document.getElementById("ranking")
class Functions{
    constructor(arr){
        this.arr = arr
    }
    getData(arg){return this.arr.find(item => item.name == arg)}
    getInput(){
        let newArr = this.arr.filter(item => item.name.toLowerCase().includes(input.value.toLowerCase()))
        getPasient(newArr)
    }
    getFilter(){
        let newArr = ranking.value == "z-a" ? this.arr.sort((a,b) => {if(a.name > b.name){return -1}}) : this.arr.sort((a,b) => {if(a.name < b.name){return -1}})
        getPasient(newArr)
    }
}
function getSearchInput(){
    pasientH2.classList.toggle("!hidden")
    input.classList.toggle("!block")
    !input.classList.contains("!block") ? getPasient(dataArr) :
    input.oninput = () => dataClass.getInput()
}
ranking.onchange = () => dataClass.getFilter()

const pasientInfo = document.getElementById("pasientInfo")
const labResault = document.getElementById("labResault")
const systolic = document.getElementById("systolic")
const systolicStatue = document.getElementById("systolicStatue")
const diastolic = document.getElementById("diastolic")
const diastolicStatue = document.getElementById("diastolicStatue")
const diagnosticList = document.getElementById("diagnosticList")
function getPasientInfo(arg){
    let obj = dataClass.getData(arg)
    pasientInfo.innerHTML = `
        <div class="w-[200px] h-[200px]">
                <img class="w-full h-full object-cover" src="${obj.profile_picture}" alt="">
            </div>
            <h2 class="text-2xl font-bold py-2">${obj.name}</h2>
            <div class="flex w-full gap-4 flex-col items-start pl-2">
                <div class="flex items-center gap-3">
                    <div>
                        <img src="img/BirthIcon.png" alt="">
                    </div>
                    <div>
                        <h2 class="">Date of birth</h2>
                        <span class=" ">${obj.date_of_birth}</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div>
                        <img src="img/FemaleIcon.png" alt="">
                    </div>
                    <div>
                        <h2 class="">Gender</h2>
                        <span class=" ">${obj.gender}</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div>
                        <img src="img/PhoneIcon.png" alt="">
                    </div>
                    <div>
                        <h2 class="">Contact Info.</h2>
                        <span class=" ">${obj.phone_number}</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div>
                        <img src="img/PhoneIcon.png" alt="">
                    </div>
                    <div>
                        <h2 class="">Emergency contact</h2>
                        <span class=" ">${obj.emergency_contact}</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div>
                        <img src="img/InsuranceIcon.png" alt="">
                    </div>
                    <div>
                        <h2 class="">Insurance Provider</h2>
                        <span class=" ">${obj.insurance_type}</span>
                    </div>
                </div>
            </div>
            <div class="p-2 w-full">
                <button class="rounded-full py-3 bg-[#01F0D0] w-full">Show All Information</button>
            </div>
    `
    labResault.innerHTML = obj.lab_results.map(item => 
        `<li class="cursor-pointer flex items-center justify-between py-2">
            <span>${item}</span>
            <i class="fa-solid fa-download"></i>
        </li>`).join("")
    
    qraf.data.datasets[0].data = obj.diagnosis_history.map(item => item.blood_pressure.systolic.value)
    qraf.data.datasets[1].data = obj.diagnosis_history.map(item => item.blood_pressure.diastolic.value)

    systolic.innerHTML = Math.ceil(obj.diagnosis_history.map(item => item.blood_pressure.systolic.value).reduce((acc,item) => acc += item ,0) / qraf.data.datasets[0].data.length) 
    systolicStatue.innerHTML = obj.diagnosis_history[0].blood_pressure.systolic.levels
    diastolic.innerHTML = Math.ceil(obj.diagnosis_history.map(item => item.blood_pressure.diastolic.value).reduce((acc,item) => acc += item ,0) / qraf.data.datasets[1].data.length)
    diastolicStatue.innerHTML = obj.diagnosis_history[0].blood_pressure.diastolic.levels
    const resRate = document.getElementById("resRate")
    resRate.innerHTML = Math.ceil(obj.diagnosis_history.map(item => item.respiratory_rate.value).reduce((acc,item)=> acc + item,0) / obj.diagnosis_history.map(item => item.respiratory_rate.value).length)
    const resLevel = document.getElementById("resLevel")
    resLevel.innerHTML = obj.diagnosis_history[0].respiratory_rate.levels   
    const temp = document.getElementById("temp")
    temp.innerHTML = (obj.diagnosis_history.map(item => item.temperature.value).reduce((acc,item)=> acc + item,0) / obj.diagnosis_history.map(item => item.temperature.value).length).toFixed(1)
    const tempLevel = document.getElementById("tempLevel")
    tempLevel.innerHTML = obj.diagnosis_history[1].temperature.levels
    const heartRate = document.getElementById("heartRate")
    heartRate.innerHTML = Math.ceil(obj.diagnosis_history.map(item => item.heart_rate.value).reduce((acc,item)=> acc + item,0) / obj.diagnosis_history.map(item => item.heart_rate.value).length)
    let kod = ''
    console.log(obj.diagnostic_list);
    
    obj.diagnostic_list.map(item => {
        kod += 
        `
        <div class="flex justify-between text-center my-4 px-2">
            <p>${item.name}</p>
            <p>${item.description}</p>
            <p>${item.status}</p>
        </div>
        <hr> 
        `
    })
    diagnosticList.innerHTML = kod

    qraf.update()    
}

const ctx = document.getElementById('myChart');

  let qraf = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 3,
        borderColor: "#C26EB4",
        pointRadius: 8,
        pointBackgroundColor:"#E66FD2",
        pointBorderWidth:1,
        pointBorderColor:"white",
        tension:0.4
      },
      {
        label: '# of Votes',
        data: [10, 3, 31, 52, 2, 3],
        borderWidth: 3,
        borderColor: "#7665A0",
        pointRadius: 8,
        pointBackgroundColor:"#7D6BA9",
        pointBorderWidth:1,
        pointBorderColor:"white",
        tension:0.4
      }
    ]
    },
    options: {
        plugins:{
            legend:{
                display:false
            }
        },
      scales: {
        y: {
          beginAtZero: false,
          
        },
        x:{
            grid:{
                display:false
            }
        }
        
      }
    }
  });
