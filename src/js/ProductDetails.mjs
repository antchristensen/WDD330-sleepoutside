import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      console.log("✅ Fetched product:", this.product);

      this.renderProductDetails();

      const addToCartBtn = document.getElementById("addToCart");
      if (addToCartBtn) {
        addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
      } else {
        console.error("❌ Add to Cart button not found in DOM.");
      }
    } catch (error) {
      console.error("❌ Failed to load product:", error);
      document.querySelector(".product-detail").innerHTML =
        "<p>Failed to load product details.</p>";
    }
  }

  renderProductDetails() {
    const product = this.product;
    const image =
      product.Images?.PrimaryLarge ||
      product.Images?.PrimaryMedium ||
      product.Images?.PrimarySmall ||
      "";
    const brand = product.Brand?.Name || "Unknown Brand";
    const name = product.NameWithoutBrand || product.Name || "Unnamed Product";
    const price = product.FinalPrice ?? "0.00";
    const color = product.Colors?.[0]?.ColorName || "N/A";
    const description =
      product.DescriptionHtmlSimple || "No description available.";

    const html = `
      <h3>${brand}</h3>
      <h2 class="divider">${name}</h2>
      <img src="${image}" alt="${name}" />
      <p class="product-card__price">$${price}</p>
      <p class="product__color">${color}</p>
      <p>${description}</p>
      <button id="addToCart">Add to Cart</button>
    `;

    document.querySelector(".product-detail").innerHTML = html;
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    console.log("🛒 Product added to cart:", this.product);

    alertMessage("🛒 Item added to cart!");

    
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
      cartIcon.classList.add("animate-cart");
      setTimeout(() => {
        cartIcon.classList.remove("animate-cart");
      }, 800); 
    }
  }
}



