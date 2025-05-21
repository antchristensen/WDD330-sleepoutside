import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

// Load header and footer into the page
loadHeaderFooter();

// Get the product ID from the URL parameter (?product=...)
const productId = getParam("product");

// Create the data source and product detail handler
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);

// Initialize the product detail rendering
product.init();
