import {Store} from './store';
import {getProductLinksBuilder} from './helpers/card';

export const Awd: Store = {
	labels: {
		inStock: {
			container: '.product-main-info',
			text: ['add to basket', 'item(s)']
		},
		maxPrice: {
			container: 'span[class="ty-price-num"]',
			euroFormat: false // Note: Overclockers uses non-euroFromat as price seperator
		},
		outOfStock: {
			container: '.brand-wrapper ',
			text: ['Out-of-stock']
		}
	},
	links: [
		{
			brand: 'test:brand',
			model: 'test:model',
			series: 'test:series',
			url:
				'https://www.awd-it.co.uk/gigabyte-geforce-rtx-2060-oc-6gb-gddr6-pci-express-vr-graphics-card.html'
		}
	],
	linksBuilder: {
		builder: getProductLinksBuilder({
			productsSelector: '.ty-pagination-container .ty-grid-list__item',
			sitePrefix: 'https://www.awd-it.co.uk',
			titleSelector: '.product-title'
		}),
		urls: [
			{
				series: '3070',
				url:
					'https://www.awd-it.co.uk/components/graphics-cards/nvidia/nvidia-geforce-rtx-3070.html'
			},
			{
				series: '3080',
				url:
					'https://www.awd-it.co.uk/components/graphics-cards/nvidia/nvidia-geforce-rtx-3080.html'
			},
			{
				series: '3090',
				url:
					'https://www.awd-it.co.uk/components/graphics-cards/nvidia/nvidia-geforce-rtx-3090.html'
			}
		]
	},
	name: 'awd',
	waitUntil: 'domcontentloaded'
};
