//const API_KEY ='a233707d11d84e4cbe6ccc12fce0c251';
let newList = [];
const getLatestNews = async()=>{
    const url = new URL('https://newsapi.org/v2/top-headlines?country=us&apiKey=a233707d11d84e4cbe6ccc12fce0c251')
    //const url = new URL('https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}');
    // console.log("uuu", url);
    const response = await fetch(url);
    console.log("rrrr", response);
    const data = await response.json();
    newList = data.articles;
    render();
    // console.log("dddd", newList);
};
const render=()=> {
    const newsHTML = newList.map((news)=>`<div class="row news">
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
    newsHTML =                      
         
    document.getElementById("news-board").innerHTML=newsHTML;
};

getLatestNews();


                