window.onload = async (event) => {
    getArtciles();
    getYoutubeVideos();
}

async function getYoutubeVideos() {
    fetch('./youtube.json')
        .then(response => response.json())
        .then(jsonData => {
            loadArticles(jsonData, 'yotube_videos')
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function getArtciles() {
    fetch('./articles.json')
        .then(response => response.json())
        .then(jsonData => {
            loadArticles(jsonData, 'articles')
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function loadArticles(articles, divId) {
    var articlesHtml = '<div class="grid-container">'
    
    for (let i = 0; i < articles.length; i++) {
        var value = articles[i];
        articlesHtml += `
            <article
                class="post inner grid-child">
                <header class="post-header">
                    <div class="post-meta">
                        <time class="published">${value.date}</time>
                    </div>
                <a href="${value.link}">
                        <img
                            class="post-thumbnail-image"
                            src="${value.image}"
                            alt="${value.title}" 
                            width="100vw"
                            height="100vh"/></a>
                    
                </header>
                
                <div class="post-content">
                    <h4 class="post-title h6" style="padding-top: 10px;">
                        <a href="${value.link}">${value.title}</a></h4>
                    <p class="post-excerpt post-excerpt-dots" style="overflow:hidden; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;  -webkit-box-orient: vertical;">${value.description}</p>
                </div>
            </article>
        `
    }

    articlesHtml += '</div>'

    document.getElementById(divId).innerHTML = articlesHtml;
}