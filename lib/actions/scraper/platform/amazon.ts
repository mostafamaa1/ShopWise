import { extractCompanyName, extractDescription, extractPrice } from "@/lib/utils";
import axios from "axios";
import * as cheerio from "cheerio";
import { platformConfigs, PlatformConfig } from "../config";

 // Define configurations for each platform
//  const platformConfigs: Record<string, any> = {
//   amazon: {
//     selectors: {
//       title: '#productTitle',
//       currentPrice: [
//         '.priceToPay span.a-price-whole',
//         'a.size.vase.a-color-price',
//         '.a-button-selevted .a-color-base',
//       ],
//       originalPrice: [
//         '.a-price.a-text-price span.a-offscreen',
//         '.a-size-base.a-color-price',
//         '#priceblock_ourprice',
//         '#priceblock_dealprice',
//         '#listPrice',
//       ],
//     },
//     discountSelector: '.savingsPercentage',
//     stockSelector: '#availabilty span',
//     imageSelectors: '#imgBlkFront, #landingImage',
//     descriptionSelector: ($: any) => $,
//   },
//   // Add configurations for other platforms here
// };

export async function scrapeProduct(url: string) {
    if(!url) return;

     // Extract the platform name from the URL
  const platform = extractCompanyName(url).toLowerCase();

  const platformConfig: PlatformConfig = platformConfigs[platform];
  if (!platformConfig) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        }, 
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        // Fetch product page
        const res = await axios.get(url, options) 
        const $ = cheerio.load(res.data)
  
        // Extract the product title
        // const title = $('#productTitle').text().trim();
        // const currentPrice = extractPrice(
        //     $('.priceToPay span.a-price-whole'),
        //     $('a.size.vase.a-color-price'),
        //     $('.a-button-selevted .a-color-base'),
        // )

        // const originalPrice = extractPrice(
        //     $('.a-price.a-text-price span.a-offscreen'),
        //     $('.a-size-base.a-color-price'),
        //     $('#priceblock_ourprice'),
        //     $('#priceblock_dealprice'),
        //     $('#listPrice'),
        // )

        // // const currency = extractCurrency($('.a-price-symbol'))

        // const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');

        // const outOfStock = $('#availabilty span').text().trim().toLowerCase() === 'currently unavailable'

        // const images = $('#imgBlkFront').attr('data-a-dynamic-image') ||
        // $('#landingImage').attr('data-a-dynamic-image') || '{}'

        // const imageUrls = Object.keys(JSON.parse(images))

        // const description = extractDescription($);


         // Extract common information using the config
         const title = $(platformConfig.title!).text().trim();
         console.log('Elements:', title);
         const currentPrice = extractPrice(...platformConfig.currentPriceSelectors);
         
         const originalPrice = extractPrice(...platformConfig.originalPriceSelectors);
         
        //  const discountRate = $(platformConfig.discountSelector).text().replace(/[-%]/g, '');
         
        //  const outOfStock = $(platformConfig.outOfStockSelector).text().trim().toLowerCase() === 'currently unavailable';
         
         const images = $(platformConfig.imageSelector).attr('data-a-dynamic-image') || '{}';
         const imageUrls = Object.keys(JSON.parse(images));
       
        //  const description = extractDescription($(platformConfig.descriptionSelector));
        //  console.log('Elements:', title, currentPrice, originalPrice, images);
         
        
         

        // Contsruct data object with scraped information
        const data = {
            url,
            currency: 'E£',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            // discountRate: Number(discountRate) || 0,
            category: 'category',
            // isOutOfStock: outOfStock,
            stars: 4.5,
            reviewsCount: 100,
            source: platform,
            // description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        }

       return data;
        
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}
