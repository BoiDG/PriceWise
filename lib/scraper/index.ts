"use server"
import axios from "axios";
import * as cheerio from 'cheerio';

import { extractCurrency, extractDescription, extractPrice } from "../utils";



const userAgents = [
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 Edg/90.0.818.42",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.54",
	"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.57",
	"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 Edg/90.0.818.56"
]

// function getUserList() {
// 	const userAgentList = axios.get('http://headers.scrapeops.io/v1/user-agents?api_key=' + process.env.RANDOM_USER_AGENT)

// 	console.log(userAgentList + 'dwadawdawda')
// }

function getRandomUserAgent() {
	const randomIndex = Math.floor(Math.random() * userAgents.length);
	return userAgents[randomIndex];
}

export async function scrapeWebProduct(url: string) {
	if (!url) return;


	try {
		const userAgent = getRandomUserAgent();

		const axiosConfig = {
			headers: {
				'User-Agent': userAgent,
			},
		};

		const response = await axios.get(url, axiosConfig);
		// const response = await axios.get(url, options);

		const $ = cheerio.load(response.data);

		// console.log(response.data)
		const title = $('#productTitle').text().trim();
		const currentPrice = extractPrice(
			$('.priceToPay span.a-price-whole'),
			$('a.size.base.a-color-price'),
			$('.a-button-selected .a-color-base'),
			$('.a-price.a-text-price'),
		);

		const originalPrice = extractPrice(
			$('#priceblock_ourprice'),
			$('a.price.a-text-price span.a-offscreen'),
			$('#listPrice'),
			$('.a-size-base.a-color-price'),
		);

		const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable' || $('#availability span').text().trim().toLowerCase() === 'temporarily out of stock.' ;

		const images =
			$('#imgBlkFront').attr('data-a-dynamic-image') ||
			$('#landingImage').attr('data-a-dynamic-image') ||
			'{}';

		const imageUrls = Object.keys(JSON.parse(images));

		const currency = extractCurrency($('.a-price-symbol'))
		const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

		const description = extractDescription($);

		const stars =
			$('#acrPopover') ||
			$('a-size-base a-color-base');
		
		const review = $('#acrCustomerReviewText');
		
		// const category = 
		// 	$('#wayfinding-breadcrumbs_container') || 
		// 	$('')

		const data = {
			url,
			currency: currency || '$',
			image: imageUrls[0],
			title,
			currentPrice: Number(currentPrice) || Number(originalPrice),
			originalPrice: Number(originalPrice) || Number(currentPrice),
			priceHistory: [],
			discountRate: Number(discountRate),
			category: 'category',
			reviewsCount: Number(review),
			stars: Number(stars),
			isOutOfStock: outOfStock,
			description,
			lowestPrice: Number(currentPrice) || Number(originalPrice),
			highestPrice: Number(originalPrice) || Number(currentPrice),
			averagePrice: Number(currentPrice) || Number(originalPrice),
		}
		return data;

		// console.log(data);
	} catch (error: any) {
		throw new Error(`Failed to scrape web product: ${error.message}`);
	}
}



