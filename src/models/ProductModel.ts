import { Proxier } from "../utils/proxier";

export class ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }

  static fromProxy(): ProductModel {
    const randomId = Proxier.getInteger(0, 10000);
    const randomPrice = (Math.random() * 100).toFixed(2);

    return new ProductModel(
      randomId,
      Proxier.getWords(1, 3),
      Proxier.getWords(5, 10),
      parseFloat(randomPrice),
      Proxier.getImageUrl()
    );
  }
}
