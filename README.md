# MANASchool.Link

MANASchool.Link is a website similar to Linktree, built using Node.js. It provides a platform for users to compile and share multiple links in one place. This README provides an overview of the project, its features, and how to set it up.

## Features

- **Sitemap Parsing**: The website utilizes the `axios`, `cheerio`, and `xml2js` packages to parse a sitemap XML file and extract post links along with their titles and images.
- **Express Framework**: Built on top of the Express framework, enabling efficient routing and handling of HTTP requests.
- **Bootstrap Styling**: Utilizes Bootstrap for responsive and sleek UI design.
- **Handlebars Templating**: Handlebars is used for server-side templating, allowing dynamic content generation.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A modern web browser.

### Installation and Configuration

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/your-username/MANASchool.Link.git
   ```

2. Navigate to the project directory.
   ```bash
   cd MANASchool.Link
   ```

3. Install dependencies.
   ```bash
   npm install
   ```

4. Configure the sitemap URL:
   - Create a `.env` file in the root directory of the project.
   - Add the following line to the `.env` file, replacing the URL with your desired sitemap URL:
     ```
     SITEMAP_URL= your sitemap.xml url
     ```

5. Replace the hardcoded sitemap URL in your code with the environment variable:
   ```javascript
   const sitemapUrl = process.env.SITEMAP_URL;
   ```

6. Start the server.
   ```bash
   npm start
   ```

7. Open your web browser and navigate to `http://localhost:3000` to view the website.


## Acknowledgments

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Bootstrap](https://getbootstrap.com/) - The world’s most popular front-end open-source toolkit.
- [Handlebars](https://handlebarsjs.com/) - Minimal templating on steroids.
---
## KICKSharath