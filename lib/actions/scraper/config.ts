// platformConfig.ts
export interface PlatformConfig {
    title: string;
    currentPriceSelectors: string[];
    originalPriceSelectors: string[];
    discountSelector: string;
    outOfStockSelector: string;
    imageSelector: string;
    descriptionSelector: string;
    // Add more selectors as needed
  }
  
  export const platformConfigs: Record<string, PlatformConfig> = {
    amazon: {
      title: '#productTitle',
      currentPriceSelectors: [
            '.priceToPay span.a-price-whole',
            'a.size.vase.a-color-price',
            '.a-button-selevted .a-color-base',
        ],
      originalPriceSelectors: [
        '.a-price.a-text-price span.a-offscreen',
        '.a-size-base.a-color-price',
        '#priceblock_ourprice',
        '#priceblock_dealprice',
        '#listPrice',
        ],
      discountSelector: '.savingsPercentage',
      outOfStockSelector: '#availabilty span',
      imageSelector: '#imgBlkFront, #landingImage',
      descriptionSelector: 'body', 
    },
    // Add configurations for other platforms
  };
  