const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('input-cityName')
const cityNameArea = document.getElementById('city-name')
const temprature = document.getElementById('temp-value')
const today_date = document.getElementById('today-data')
const today_day =document.getElementById('day')
const humidity =document.getElementById('humidity')
const sealevel =document.getElementById('sealevel')
const image= document.getElementById('image-logo');
const img_cloud= document.getElementById('img-cloud');


const days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'oct', 'Nov', 'Dec']

const mydate= new Date()
// console.log(date.toLocaleString())
// console.log(date.toISOString())
// console.log(date.toLocaleDateString())
const day= mydate.getDay()
today_day.innerHTML= days[day]

const date= mydate.getDate()
// console.log(date)

const month= mydate.getMonth()
// console.log(months[month])

today_date.innerHTML= `${date}  ${months[month]}`;

const getInfo= async (event) =>{
    event.preventDefault();
    let searchValue = cityName.value;
    if(searchValue===""){
        cityNameArea.innerText=`Please write the city name before search`
        cityNameArea.style.color="red";
        temprature.innerHTML= '';
        humidity.innerHTML='';
        sealevel.innerHTML='';
    }
    else{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=e01994eecef0ff993923f5969862eab3`
            const response= await fetch(url)
            const data = await response.json()
            console.log("data.main=", data.main)
            console.log(data.main.temp)
            console.log("Weather-", data.weather[0])
            console.log("Weather-", data.weather[0].main)
            if (data.weather[0].main == 'Drizzle'){
                img_cloud.style.display= 'none'
                image.src= 'https://static.vecteezy.com/system/resources/previews/024/825/195/non_2x/3d-weather-icon-day-with-rain-free-png.png';
            }else{
                img_cloud.style.display= 'inline'
                image.src= '';
            }
            const temp = data.main.temp - 273 
            console.log(temp.toPrecision(3))
            temprature.innerHTML= temp.toPrecision(3)

            cityNameArea.innerText=searchValue + "  , In"

            humidity.innerHTML= `Humidity= ${data.main.humidity} <span>g.m<sup class="h5">-3</sup> </span>`
            sealevel.innerHTML= `Sea-level= ${data.main.sea_level} mb.`

            
        } catch (error) {
            cityNameArea.innerText=`Please write the valid city name `
            temprature.innerHTML= '';
            humidity.innerHTML='';
            sealevel.innerHTML='';

        }
    }

    // alert('hello world')
}
submitBtn.addEventListener('click', getInfo)