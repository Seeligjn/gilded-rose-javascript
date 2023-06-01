import { expect, describe, it, test } from "vitest";
import { Item, BasicItem, CheeseItem, LegendaryItem, ConcertItem, ConjuredItem, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new BasicItem("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });

  it("reduces quality by 2 for items with sellIn less than 0", () => {
    const testItem = new BasicItem("basic", -2, 8);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(6);
    expect(testItem.sellIn).toBe(-3);
  });

  it("does not reduce quality to negative number", () => {
    const testItem = new BasicItem("basic", 5, 0);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(4);
  });

  it("increased quality as sellIn decreases", () => {
    const testItem = new CheeseItem("Aged Brie", 4, 8);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(9);
    expect(testItem.sellIn).toBe(3);
  });

  it("stops quality from increasing past 50", () => {
    const testItem = new CheeseItem("Aged Brie", 4, 50);
    const testItem2 = new ConcertItem("Backstage passes to a TAFKAL80ETC concert", 4, 50);
    items.push(testItem, testItem2);

    updateQuality();

    expect(testItem.quality).toBe(50);
    expect(testItem.sellIn).toBe(3);
    expect(testItem2.quality).toBe(50);
    expect(testItem2.sellIn).toBe(3);
  });

  it("keeps quality at 80", () => {
    const testItem = new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(80);
  });

  it("increases quality by 2 when sellIn is less than or equal to 10" , () => {
    const testItem = new ConcertItem("Backstage passes to a TAFKAL80ETC concert",9,5)
    items.push(testItem)

    updateQuality();

    expect(testItem.quality).toBe(7);
    expect(testItem.sellIn).toBe(8);
  });

  it("increases quality by 3 when sellIn is less than or equal to 5" , () => {
    const testItem = new ConcertItem("Backstage passes to a TAFKAL80ETC concert",4,5)
    items.push(testItem)

    updateQuality();

    expect(testItem.quality).toBe(8);
    expect(testItem.sellIn).toBe(3);
  });

  it("sets quality to 0 when sellIn reaches 0" , () => {
    const testItem = new ConcertItem("Backstage passes to a TAFKAL80ETC concert",-1,2)
    items.push(testItem)

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-2);
  });

  it("reduces quality of conjured items by 2", () => {
    const testItem = new ConjuredItem("Conjured Mana Cake",5,6)
    items.push(testItem)

    updateQuality();

    expect(testItem.quality).toBe(4)
    expect(testItem.sellIn).toBe(4)
  });
});
