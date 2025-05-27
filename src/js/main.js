import ProductList from './ProductList.mjs';
import ExternalServices from './ExternalServices.mjs';
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices('tents');
const listElement = document.querySelector('.product-list');

const tentList = new ProductList('tents', dataSource, listElement);
tentList.init();
