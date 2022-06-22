export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export const ItemTypes = {
    "AGED_BRIE": 'Aged Brie',
    "BACKSTAGE_PASSES": 'Backstage passes to a TAFKAL80ETC concert',
    "SULFURAS": 'Sulfuras, Hand of Ragnaros'
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateBasic(item) { 
        if (item.quality > 0) {
            item.quality = item.quality - 1;
        }
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
            if (item.quality > 0) {
                item.quality = item.quality - 1;
            }
        }

        return item;
    }

    updateAgedBrie(item) { 
        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }

        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0 && item.quality < 50) {
            item.quality = item.quality + 1;
        }

        return item;
    }

    updateBackstagePasses(item) { 
        if (item.quality < 50) {
            item.quality = item.quality + 1
            if (item.sellIn < 11) {
                item.quality = item.quality + 1
            }
            if (item.sellIn < 6) {
                item.quality = item.quality + 1
            }
        }

        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
            item.quality = item.quality - item.quality;
        }

        return item;
    }

    updateSulfuras(item) { 
        return item;
    }

    updateQuality() {
        for (const item of this.items) {
            switch(item.name) {
                case ItemTypes.AGED_BRIE:
                    this.updateAgedBrie(item);
                    continue;
                case ItemTypes.SULFURAS:
                    this.updateSulfuras(item);
                    continue;
                case ItemTypes.BACKSTAGE_PASSES:
                    this.updateBackstagePasses(item);
                    continue;
                default:
                    this.updateBasic(item);
                    continue;
            }
        }
        return this.items;
    }
}
