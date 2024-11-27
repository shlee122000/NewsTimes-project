// const API_KEY ='a233707d11d84e4cbe6ccc12fce0c251';
let newsList = [];
const menus = document.querySelectorAll(".menus button");
// console.log("mmm", menus);
menus.forEach((menu)=>menu.addEventListener("click",(event)=>getNewsByCategory(event))
);

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=a233707d11d84e4cbe6ccc12fce0c251`)

let totalResults = 0
let page = 1
const pageSize=10
const groupSize=5

const getNews = async()=> {
    try{
        url.searchParams.set("page",page)  //  =>&page=page
        url.searchParams.set("pageSize", pageSize);
        const response = await fetch(url);    
        const data = await response.json();
        if(response.status===200){
            if(data.articles.length===0) {
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults
            render();
            paginationRender();
        }else{
            throw new Error(data.message)
        }
        

    }catch(error){
        // console.log("error", error.message);
        errorRender(error.message)
    }

};

const getLatestNews = async()=>{
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=a233707d11d84e4cbe6ccc12fce0c251`);
 
    getNews();
};


const getNewsByCategory= async (event)=>{
    // console.log("ddddd", newsList)
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=a233707d11d84e4cbe6ccc12fce0c251`);
    
    getNews();
};

const getNewsByKeyword = async()=>{
    const keyword = document.getElementById("search-input").value;
    console.log("keyword", keyword);
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=a233707d11d84e4cbe6ccc12fce0c251`);
     
    getNews();
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

const errorRender = (errorMessage)=> {
    const errorHTML =`<div class="alert alert-danger" role="alert"> 
    ${errorMessage}
    </div>`;
     
    document.getElementById("news-board").innerHTML=errorHTML
};

const paginationRender=()=>{
    // totalResult,
    // page
    // pageSize
    // groupSize
    // totalPages
    const totalPages = Math.ceil(totalResults/pageSize)
    // pageGroup
    const pageGroup = Math.ceil(page/groupSize);
    // lastPage
    let lastPage = pageGroup * groupSize;
    // 마지막 페이지 그룹이 그룹사이즈보다 작다 ?  lastpage = totalpage
    if(lastPage>totalPages){
        lastPage=totalPages
    }
    // firstPage
    const firstPage = lastPage - (groupSize-1)<=0? 1: lastPage - (groupSize - 1);
    // first~last
    // totalPages

    let paginationHTML = ``;

    for(let i=firstPage; i<=lastPage; i++){
        paginationHTML+= `<li class="page-item ${i===page? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    document.querySelector(".pagination").innerHTML=paginationHTML;

//  <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item"><a class="page-link" href="#">2</a></li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item"><a class="page-link" href="#">Next</a></li>
//   </ul>
// </nav> 
};

const moveToPage=(pageNum)=>{
    console.log("movetopage", pageNum);
    page = pageNum;
    getNews();
};
getLatestNews();


// 1. 버튼들에 클릭이벤트 주기
// 2. 카네고리별 뉴스 가져오기
// 3. 그 뉴스 보여주기




// error 발생
// let weight = 29
// try{
//     // 소스를 쓴다
//     // 이안에 에러가 발생하면
//     if(weight<30){
//         throw new Error("당신은 너무 말랐어")
//     }
    
// }catch(error){
// // catch가 error를 잡아준다
// console.log("내가 잡은 에러는",error.message)
// }