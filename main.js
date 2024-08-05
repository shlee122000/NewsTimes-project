//const API_KEY ='a233707d11d84e4cbe6ccc12fce0c251';
let news = [];
const getLatestNews = async()=>{
    const url = new URL('https://newsapi.org/v2/top-headlines?country=us&apiKey=a233707d11d84e4cbe6ccc12fce0c251')
    //const url = new URL('https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}');

    // console.log("uuu", url);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("dddd", news);
};

getLatestNews();

