export async function getCategories() {
  const APImercado = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await APImercado.json();
  const products = data.map((product) => (
    product
  ));
  return products;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const APImercado = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`);
  const data = await APImercado.json();
  return data;
}

export async function getProductById(PRODUCT_ID) {
  const APImercado = await fetch(`https://api.mercadolibre.com/items/${PRODUCT_ID}`);
  const data = await APImercado.json();
  return data;
}
