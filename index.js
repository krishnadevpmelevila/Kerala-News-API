const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const newspapers = [
    {
        name: '24News',
        address: 'https://www.twentyfournews.com/news/kerala-news'
    },
    {
        name: 'manorama',
        address: 'https://www.manoramaonline.com/news/kerala.html'
    },
    {
        name: 'mathrubhumi',
        address: 'https://english.mathrubhumi.com/news/kerala'
    },
    {
        name: 'mediaOne',
        address: 'https://www.mediaoneonline.com/kerala'
    },
    {
        name: 'asianet',
        address: 'https://www.asianetnews.com/kerala-news'
    },
    {
        name: 'news18',
        address: 'https://malayalam.news18.com/kerala/'
    }
]
const app = express();
const articles = []
newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            if (newspaper.name == 'mathrubhumi') {
                $('.listPg-a', html).each(function () {
                    if ($(this).find('.listPg-p3 h4').text() == '') {
                        null
                    }
                    else {
                        const title = $(this).find('.listPg-p3 h4').text()
                        const url = $(this).attr('href')
                        const image = $(this).find('.listPg-img3 img').attr('data-src')
                        // const image='https://www.mathrubhumi.com/polopoly_fs/1.6119848.1635214216!/httpImage/image.jpg_gen/derivatives/landscape_209_124/image.jpg'
                        articles.push({
                            title,
                            url: 'https://english.mathrubhumi.com' + url,
                            image: 'https://english.mathrubhumi.com' + image,
                            source: newspaper.name
                        })
                    }
                })
            }
            if (newspaper.name == '24News') {
                $('.mbtm20', html).each(function () {
                    const title = $(this).find('.c-pad a').text()
                    const url = $(this).find('.s-thumb-holder a').attr('href')
                    const image = $(this).find('.s-thumb-holder a img').attr('data-src')
                    // const image='https://www.mathrubhumi.com/polopoly_fs/1.6119848.1635214216!/httpImage/image.jpg_gen/derivatives/landscape_209_124/image.jpg'
                    if (title != '') {
                        articles.push({
                            title,
                            url,
                            image,
                            source: newspaper.name
                        })
                    }


                })
            }
            if (newspaper.name == 'manorama') {
                $('.story-content-blk', html).each(function () {
                    const title = $(this).find('.subhead-001-ml a').attr('title')
                    const url = $(this).find('.image-blk a').attr('href')
                    const image = $(this).find('.image-blk a img').attr('data-src-web')
                    // const image='https://www.mathrubhumi.com/polopoly_fs/1.6119848.1635214216!/httpImage/image.jpg_gen/derivatives/landscape_209_124/image.jpg'
                    if (title != '') {
                        articles.push({
                            title,
                            url,
                            image: 'https://www.manoramaonline.com/' + image,
                            source: newspaper.name
                        })
                    }


                })
            }
            if (newspaper.name == 'mediaOne') {
                $('.list-item', html).each(function () {
                    const title = $(this).find('.list-item-right a h3').text()
                    const url = $(this).find('.d-flex a').attr('href')
                    const image = $(this).find('.d-flex a .story-img img').attr('data-src')
                    // const image='https://www.mathrubhumi.com/polopoly_fs/1.6119848.1635214216!/httpImage/image.jpg_gen/derivatives/landscape_209_124/image.jpg'
                    if (title != '') {
                        articles.push({
                            title,
                            url: 'https://www.mediaoneonline.com' + url,
                            image,
                            source: newspaper.name
                        })
                    }


                })
            }
            if (newspaper.name == 'asianet') {
                $('.bdr1', html).each(function () {
                    const title = $(this).find('.mobrightcol p a').text()
                    const url = $(this).find('.mobleftcol a').attr('href')
                    const image = $(this).find('.mobleftcol a img').attr('data-src')
                    // const image='https://www.mathrubhumi.com/polopoly_fs/1.6119848.1635214216!/httpImage/image.jpg_gen/derivatives/landscape_209_124/image.jpg'
                    if (title != '') {
                        articles.push({
                            title,
                            url: 'https://www.asianetnews.com' + url,
                            image,
                            source: newspaper.name
                        })
                    }


                })
            }
            if (newspaper.name == 'news18') {
                $('.blog-list-blog', html).each(function () {
                    const title = $(this).find('p').text()
                    const url = $(this).find('a').attr('href')
                    const image = $(this).find('a img').attr('data-original')
                    // const image='https://www.mathrubhumi.com/polopoly_fs/1.6119848.1635214216!/httpImage/image.jpg_gen/derivatives/landscape_209_124/image.jpg'
                    if (title != '') {
                        articles.push({
                            title,
                            url: 'https://malayalam.news18.com/' + url,
                            image,
                            source: newspaper.name
                        })
                    }


                })
            }
        }).catch((err) => console.log(err))
})

app.get('/', (req, res) => {
    res.json('Welcome to Nodeista News API')
})
app.get('/news', (req, res) => {
    res.json(articles)
})
app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId
    const specificNewsPaper = articles.filter(article => article.source == newspaperId)
    res.json(specificNewsPaper)
})
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
})