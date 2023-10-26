import { scrapeAmazonProduct } from "@/lib/actions/scraper";
import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        connectToDB();

        const products = await Product.find({})

        if(!products) throw new Error("Product not found");

        // 1. Scrape latest product detaiils & update db
        const updatedProduct = await Promise.all(
            products.map(async (currentProduct) => {
                const scrapedProduct = await scrapeAmazonProduct(currentProduct.url)

                if(!scrapedProduct) throw new Error('Product not found');

                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                    { price: scrapedProduct.currentPrice }
                  ]
          
                  const product = {
                    ...scrapedProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory),
                  }
            
          
                const updatedProduct = await Product.findOneAndUpdate(
                  { url: scrapedProduct.url },
                  product,
                );

                // 2. Check each product's status and send email accordingly
                const emailNotIfType = getEmailNotifType(scrapedProduct, currentProduct)

                if(emailNotIfType && updatedProduct.users.length > 0) {
                    const productInfo = {
                        title: updatedProduct.title,
                        url: updatedProduct.url,
                    }

                    const emailContent = await generateEmailBody(productInfo, emailNotIfType)

                    const userEmails = updatedProduct.users.map((user: any) => user.email)

                    await sendEmail(emailContent, userEmails);
                }

                return updatedProduct;
            })
        )
        return NextResponse.json({
            message: 'OK', data: updatedProduct
        })
    } catch (error) {
        throw new Error(`Erro in GET: ${error}`)
    }
}