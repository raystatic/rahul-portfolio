window.onload = async (event) => {
    getArtciles();
    getYoutubeVideos();
    getProjects();
}

async function getProjects() {
    fetch('./projects.json')
        .then(response => response.json())
        .then(jsonData => {
            loadArticles(jsonData, 'projects')
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
    var articlesHtml = '<div>'

    articlesHtml += '<div class="desktop-view">'
    articlesHtml += '<div class="grid-container">'

    for (let i = 0; i < articles.length; i++) {
        var value = articles[i];
        articlesHtml += `
            <article
                class="post inner">
                <header class="post-header">
                        <div class="post-meta">
                            <time class="published">${value.date}</time>
                        </div>
                    </header>

                    <div style="display: flex;width:100%">
                        <a href="${value.link}">
                            <img
                                class="post-thumbnail-image-desktop"
                                src="${value.image}"
                                alt="${value.title}" 
                                style="display:block; marging:auto;"/>
                        </a>
                
                        <div class="post-content" style="width:100%; padding-left:20px;">
                            <h4 class="post-title h6" style="padding-top: 10px;">
                                <a href="${value.link}">${value.title}</a></h4>
                            <p class="post-excerpt post-excerpt-dots" style="overflow:hidden; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2;  -webkit-box-orient: vertical;">${value.description}</p>
                        </div>
                    </div>    
            </article>
        `
    }

    articlesHtml += '</div></div>'
    articlesHtml += '<div class="mobile-view"><div class="center">'

    for (let i = 0; i < articles.length; i++) {
        var value = articles[i];
        articlesHtml += `
            <article
                class="post inner">

                <header class="post-header">
                    <div class="post-meta">
                        <time class="published">${value.date}</time>
                    </div>
                    <a href="${value.link}">
                        <img
                            class="post-thumbnail-image-mobile"
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

    articlesHtml += '</div></div></div>'

    console.log(articlesHtml);

    document.getElementById(divId).innerHTML = articlesHtml;
}