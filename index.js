window.onload = async (event) => {
    getArtciles();
    getYoutubeVideos();
    getProjects();
    getApps();
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

async function getApps() {
    fetch('./apps.json')
        .then(response => response.json())
        .then(jsonData => {
            loadArticles(jsonData, 'apps')
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

                    <div style="display: flex;width:100%">
                        <a href="${value.link}">
                            <img
                                class="post-thumbnail-image-desktop"
                                src="${value.image}"
                                alt="${value.title}" 
                                style="display:block; marging:auto"/>
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
                    <div style="display: flex;width:100%">
                        <a href="${value.link}">
                            <img
                                class="post-thumbnail-image-desktop"
                                src="${value.image}"
                                alt="${value.title}" 
                                style="display:block; marging:auto"/>
                        </a>
                
                        <div class="post-content" style="width:100%; padding-left:20px;">
                            <h4 class="post-title h6" style="padding-top: 10px; font-size:0.9rem;">
                                <a href="${value.link}">${value.title}</a></h4>
                            <p class="post-excerpt post-excerpt-dots" style="overflow:hidden; display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3;  -webkit-box-orient: vertical; font-size:0.7rem; marging:0;">${value.description}</p>
                        </div>
                    </div>    
            </article>
        `
    }

    articlesHtml += '</div></div></div>'

    document.getElementById(divId).innerHTML = articlesHtml;
}

function changeBackgroundColorOfImages() {
    const mobileImages = document.querySelectorAll(".post-thumbnail-image-mobile");
    const desktopImages = document.querySelectorAll(".post-thumbnail-image-desktop");

    mobileImages.forEach(function (image) {
        image.addEventListener("load", function () {
            console.log("mobile images")
            changeBackgroundColor(image);
        });
    });

    desktopImages.forEach(function (image) {
        image.addEventListener("load", function () {
            changeBackgroundColor(image);
        });
    });

}

function changeBackgroundColor(image) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set the canvas dimensions to match the image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Get the pixel data of the entire image
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Analyze the pixel data to find the primary color
    const colorCounts = {};
    let maxCount = 0;
    let primaryColor = "white"; // Default color if no primary color is found

    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const rgb = `rgb(${r},${g},${b})`;

        if (colorCounts[rgb]) {
            colorCounts[rgb]++;
        } else {
            colorCounts[rgb] = 1;
        }

        if (colorCounts[rgb] > maxCount) {
            maxCount = colorCounts[rgb];
            primaryColor = rgb;
        }
    }

    // Change the background color of the parent container
    image.style.backgroundColor = primaryColor;
}
