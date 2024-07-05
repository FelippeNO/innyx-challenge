import { faker } from "@faker-js/faker";

export class Proxier {
  static getWords(minAmount: number, maxAmount: number): string {
    return faker.lorem.words({ min: minAmount, max: maxAmount });
  }

  static getInteger(min: number, max: number): number {
    return faker.number.int({ min, max });
  }

  static getImageUrl(): string {
    return faker.image.url({
      width: 300,
      height: 300,
    });
  }
}
