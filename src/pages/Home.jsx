import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Home.css';
import ListaCategorias from '../components/ListaCategorias';

class Home extends Component {
  state = {
    inputText: '',
    listProducts: [],
    addCart: [],
  };

  handlerChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  handlerClick = async (e) => {
    e.preventDefault();
    const { inputText } = this.state;
    const query = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${inputText}`);
    const data = await query.json();
    this.setState({
      listProducts: data.results,
    });
  };

  handlerClickAddCart = async (product) => {
    this.setState((prev) => ({
      addCart: [...prev.addCart, product],
    }), () => {
      const { addCart } = this.state;
      localStorage.setItem('Items', JSON.stringify(addCart));
    });
  };

  render() {
    const { inputText, listProducts, addCart } = this.state;
    console.log(addCart);
    return (
      <div>
        <header className="pesquisa">
          <h1>Shopping Cart</h1>
          <form>
            <label htmlFor="searchBar">
              <input
                type="text"
                data-testid="query-input"
                name="inputText"
                value={ inputText }
                onChange={ this.handlerChange }
              />
            </label>
            <button
              data-testid="query-button"
              onClick={ this.handlerClick }
              className="btn-form"
            >
              Buscar
            </button>
            <p className="initialMessage" data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </form>
          <div className="btn-cart">
            <Link data-testid="shopping-cart-button" to="/cart">Carrinho de Compras</Link>
          </div>
        </header>

        <div className="main">
          <ListaCategorias handlerClickAddCart={ this.handlerClickAddCart } />
          <div className="productList">
            {listProducts.map((product) => (
              <div key={ product.id } className="product-item">
                <Link
                  to={ `/details/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <span data-testid="product">
                    <p>{ product.title}</p>
                    <p>{product.price}</p>
                    <img src={ product.thumbnail } alt="" />
                  </span>
                  <br />
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  id={ product.id }
                  onClick={ () => this.handlerClickAddCart(product) }
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
