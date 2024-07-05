import { defineStore } from "pinia";
import { ProductModel } from "../models/ProductModel";

export const useProductStore = defineStore("products", {
  state: () => ({
    products: [] as ProductModel[],
    cart: [] as { product: ProductModel; quantity: number }[],
    totalProducts: 80,
    productsPerPage: 20,
  }),
  actions: {
    addProduct(product: ProductModel) {
      this.products.push(product);
    },
    editProduct(updatedProduct: ProductModel) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) this.products[index] = updatedProduct;
    },
    deleteProduct(productId: number) {
      this.products = this.products.filter((p) => p.id !== productId);
    },
    addToCart(product: ProductModel) {
      const cartItem = this.cart.find((item) => item.product.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ product, quantity: 1 });
      }
    },
    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.product.id !== productId);
    },
    clearCart() {
      this.cart = [];
    },
    addRandomProduct() {
      const randomProduct = ProductModel.fromProxy();
      this.addProduct(randomProduct);
    },
    async loadProducts() {
      this.products = [];
      for (let i = 0; i < this.totalProducts; i++) {
        await new Promise((resolve) => setTimeout(resolve, 20));
        this.addRandomProduct();
      }
    },
  },
});
