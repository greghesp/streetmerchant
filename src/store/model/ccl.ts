import {Link, Store} from './store';
import {logger} from '../../logger';
import {parseCard} from './helpers/card';

const isPartialUrlRegExp = /^\/[^/]/i;

const options = {
	productsSelector: '.productListingContainerOuter .productList',
	sitePrefix: 'https://www.cclonline.com',
	titleAttribute: 'title',
	titleSelector: '.productList_Detail a[title]'
};

export const Ccl: Store = {
	labels: {
		inStock: {
			container: '#pnlAddToBasket',
			text: ['add to basket']
		},
		maxPrice: {
			container: '#pnlPriceText > p',
			euroFormat: false // Note: CCL uses non-euroFromat as price seperator
		},
		outOfStock: {
			container: '#pnlSoldOut',
			text: ['sold out', 'coming soon']
		}
	},
	links: [
		{
			brand: 'test:brand',
			model: 'test:model',
			series: 'test:series',
			url:
				'https://www.cclonline.com/product/296443/RTX-2060-SUPER-VENTUS-GP-OC/Graphics-Cards/MSI-GeForce-RTX-2060-SUPER-VENTUS-GP-OC-8GB-Overclocked-Graphics-Card/VGA5671/'
		}
	],
	linksBuilder: {
		builder: (docElement, series) => {
			const productElements = docElement.find(
				'.productListingContainerOuter .productList'
			);
			const links: Link[] = [];

			for (let i = 0; i < productElements.length; i++) {
				const productElement = productElements.eq(i);
				const titleElement = productElement
					.find('.productList_Detail a[title]')
					.first();
				let title: string;

				if (options.titleAttribute) {
					title = titleElement.attr()?.[options.titleAttribute];
				} else {
					title = titleElement.text()?.replace(/\n/g, ' ').trim();
				}

				if (!title) {
					continue;
				}

				let url = titleElement.attr()?.href;
				const parameters = url.split('/');

				if (!url) {
					continue;
				}

				if (isPartialUrlRegExp.exec(url)) {
					url = options.sitePrefix + url;
				}

				const card = parseCard(title);

				if (card) {
					links.push({
						brand: card.brand as any,
						cartUrl: `https://www.cclonline.com/json/add-to-basket.ashx?ProductID=${parameters[2]}&Quantity=1`,
						model: card.model,
						series,
						url
					});
				} else {
					logger.error(`Failed to parse card: ${title}`);
				}
			}

			return links;
		},
		urls: [
			{
				series: '3070',
				url:
					'https://www.cclonline.com/category/430/PC-Components/Graphics-Cards/GeForce-RTX-3070-Graphics-Cards/'
			},
			{
				series: '3080',
				url:
					'https://www.cclonline.com/category/430/PC-Components/Graphics-Cards/GeForce-RTX-3080-Graphics-Cards/'
			},
			{
				series: '3090',
				url:
					'https://www.cclonline.com/category/430/PC-Components/Graphics-Cards/GeForce-RTX-3090-Graphics-Cards/'
			}
		]
	},
	name: 'ccl',
	waitUntil: 'domcontentloaded'
};
