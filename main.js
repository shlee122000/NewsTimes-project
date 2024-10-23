// const API_KEY ='a233707d11d84e4cbe6ccc12fce0c251';
let newsList
 = [];
const menus = document.querySelectorAll(".menus button");
// console.log("mmm", menus);
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));

const getLatestNews = async()=>{
    const url = new URL('https://newsapi.org/v2/top-headlines?country=us&apiKey=a233707d11d84e4cbe6ccc12fce0c251');
    // const url = new URL('https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}');
    // console.log("uuu", url);
    const response = await fetch(url);
    // console.log("rrrr", response);
    const data = await response.json();
    newsList
     = data.articles;
    render();
    // console.log("dddd", newsList);
};

const getNewsByCategory= async (event)=>{
    // console.log("ddddd", newsList)
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    const url = new URL('https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=a233707d11d84e4cbe6ccc12fce0c251');
    const response = await fetch(url);
    const data = await response.json();
    // console.log("kkk", data);
    newsList = data.articles;
    render();
};

const render=()=> {
    const newsHTML = newsList.map((news)=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" 
            src=${news.urlToImage} />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>

    </div>
</div>`
    ).join("");
    // console.log("html", newsHTML);                  
         
    document.getElementById("news-board").innerHTML=newsHTML;
};

getLatestNews();


// 1. 버튼들에 클릭이벤트 주기
// 2. 카네고리별 뉴스 가져오기
// 3. 그 뉴스 보여주기