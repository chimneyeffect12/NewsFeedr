const apiKey = '04afeb0f583546fd9b0459f15fb7ce5c';      
const blogContainer = document.getElementById("blog_container");
const searchField = document.getElementById('search_input');
const searchButton = document.getElementById('search_button');
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async() => {
    const query = searchField.value.trim();
    if(query!="")
        {
            try{
               const articles = await fetchNewsQuery(query);
               displayBlogs(articles);  
            }catch(error){
               console.log("Error fetching news by query", error);
            }
        }  
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    const blogContainer = document.getElementById("blog_container");
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog_card");

        const img = document.createElement("img");
        img.src = article.urlToImage || "https://placehold.co/600x400"; // Default image if urlToImage is null
        img.alt = article.title || "No title";

        const title = document.createElement("h2");
        const truncatedTitle = article.title && article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title || "No title";
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description || "No description";
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', ()=> {
            window.open(article.url,"_blank");
    });
        blogContainer.appendChild(blogCard);
    });
}


(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
