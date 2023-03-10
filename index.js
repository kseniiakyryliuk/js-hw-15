//Завдання 1
const timeSleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms, ms);
  });
};

console.log('Start');
timeSleep(2000).then((ms) => {
  console.log(`resolve after  ${ms/1000} seconds`);
}, (error) => {
  console.error(error);
});


timeSleep(1000).then((ms) => {
  console.log(`resolve after  ${ms/1000} seconds`);
}, (error) => {
  console.error(error);
})
//.finally(()=> console.log('finally'))
;


Promise.all([timeSleep(2000), timeSleep(4000)]).then(()=>console.log('all promises'));
Promise.race([timeSleep(2000), timeSleep(4000)]).then(()=>console.log('race promises'))

//Завдання 2
/*Async/await - це синтаксичний конструкції мов програмування,
 який дозволяє зручно та ефективно робити асинхронні запити до сервера або виконувати інші асинхронні операції.

Асинхронність дозволяє програмі не затримуватись на виконанні деяких операцій, 
які можуть зайняти значний час, таких як мережеві запити до сервера.
 Замість того, щоб чекати на відповідь сервера, програма може продовжувати виконання інших завдань протягом цього часу.

Конструкція async/await дозволяє створити функції, які можуть працювати асинхронно. 
Основна ідея полягає в тому, що функція, яка повинна виконуватись асинхронно, повертає об’єкт Promise. Об’єкт Promise дозволяє відслідковувати стан виконання функції та отримати результат, коли він буде готовий.

Ключове слово async позначає те, що функція повертає об’єкт Promise,
 і дозволяє використовувати ключове слово await в середині функції.
  Ключове слово await призначене для очікування виконання об’єкту Promise та повертає результат, коли він буде доступний.
  
  
  У цьому прикладі функція fetchData є асинхронною завдяки ключовому слову async. 
  Після виконання запиту до сервера за допомогою методу fetch, 
  функція очікує результат виконання операції за допомогою ключового слова await. 
  Якщо результат успішний, то функція повертає його. Якщо виникає помилка, то викликається обробник помилок у блоках try/catch.
Результат запиту можна отримати, викликавши функцію і використовуючи метод then для успішного виконання або обробки помилок.
 Якщо виникає помилка, то вона буде оброблена в блоках try/catch і виведена у консоль за допомогою методу console.error.
*/

let zavd2URL = 'https://jsonplaceholder.typicode.com/todos';

//Спосіб за допомогою  async await
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
fetchData(zavd2URL).then(data => console.log(data[0]));
  



/*Запит до сервера за допомогою Promise виконується шляхом створення об'єкту Promise,
 який повертається функцією. Об'єкт Promise представляє майбутній результат операції, 
 яка виконується асинхронно. При створенні Promise, йому передається функція з двома параметрами: resolve та reject.
Функція resolve викликається, коли операція успішно виконується, і передає результат у вигляді аргументу.
 Функція reject викликається, коли операція невдала, і передає об'єкт помилки у вигляді аргументу.

 У цьому прикладі функція fetchData створює новий обєкт Promise, який виконує запит до сервера за допомогою методу fetch. 
 Після успішного виконання запиту, результат передається до функції resolve у вигляді об'єкту JSON. Якщо запит не вдається, 
 то викликається функція reject з об'єктом помилки.
  Результат запиту можна отримати, викликавши функцію і використовуючи метод then для успішного виконання або метод catch для обробки помилок.
*/
//Спосіб за допомогою promise
  function fetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok');
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
 
  fetchData('https://api.chucknorris.io/jokes/random')
    .then(data => console.log('Joke :  '+data.value))
    .catch(error => console.error(error));
  
  
  //всі імена в одному масиві
    fetchData('https://pokeapi.co/api/v2/pokemon/')
    .then(data => {
      let arrayNames=[];
   for (let index = 0; index < data.results.length; index++) {
         arrayNames.push(data.results[index].name); 
    }
      console.log(data.results);
      console.log(arrayNames);
    }
      )
    .catch(error => console.error(error));


//Завдання4 з погодою

const temp=document.getElementById('temp'); //button
temp.addEventListener('click', getWeather);
function getWeather() {
  const city=document.getElementById('city').value;
  //console.log(city);
  let url='http://api.openweathermap.org/data/2.5/weather?';
  let key='appid=060c8e4e624e9783ceb8644f6f5b51b5';
  fetch(`${url}q=${city}&${key}`)
  .then(function(resp){return resp.json()})
  .then(function(data){
    console.log(data);
    document.querySelector('.nameCity').innerHTML=data.name;
    document.querySelector('.wind').innerHTML=data.wind.speed;
    document.querySelector('.humidity').innerHTML=data.main.humidity;
    document.querySelector('.currentTemperature').innerHTML=Math.round(data.main.temp-273)+'&deg;';
  })




}


