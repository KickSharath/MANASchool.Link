const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

async function fetchAndParseSitemap(url) {
    try {
        const response = await axios.get(url);
        const xml = response.data;

        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xml);

        const urls = result.urlset.url.map(item => ({
            url: item.loc[0],
            lastmod: new Date(item.lastmod[0])
        }));

        urls.sort((a, b) => b.lastmod - a.lastmod);

        return urls;
    } catch (error) {
        console.error('Error fetching or parsing sitemap:', error);
        return [];
    }
}

async function fetchFeaturedImage(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const featuredImage = $('meta[property="og:image"]').attr('content');

        return featuredImage;
    } catch (error) {
        console.error('Error fetching or parsing HTML for featured image:', error);
        return null;
    }
}

async function fetchTitle(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const title = $('title').text();

        return title;
    } catch (error) {
        console.error('Error fetching or parsing HTML for title:', error);
        return null;
    }
}

app.get('/', async (req, res) => {
    try {
        const sitemapUrl = process.env.SITEMAP_URL;
        const sitemapUrls = await fetchAndParseSitemap(sitemapUrl);

        const urlsWithImagesAndTitles = [];
        for (const urlObj of sitemapUrls) {
            const { url } = urlObj;
            const featuredImage = await fetchFeaturedImage(url);
            const title = await fetchTitle(url);
            urlsWithImagesAndTitles.push({ url, title, img: featuredImage });
        }

        const templateHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

        const template = handlebars.compile(templateHtml);

        const renderedHtml = template({ data: urlsWithImagesAndTitles });

        res.send(renderedHtml);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
