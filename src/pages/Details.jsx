import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class Details extends Component {
  state = {
    objById: {},
    addCart: [],
  };
  // Em Home passei o products.id para a URL que linka os produtos a pagina Details
  // Capturo o id que agora é passado via props para Details
  // Passo o id para a func

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    // implementei a func getProductById em api.js
    // Func retorna um objeto com informaçoes do produto
    const objById = await getProductById(id);
    // Salvo no state
    this.setState({
      objById,
    });
  }

  handleClick = () => {
    const { history: { push } } = this.props;
    return push('/cart');
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
    const { objById } = this.state;
    return (

      <div>
        <p data-testid="product-detail-name">
          { objById.title }
        </p>
        <img
          data-testid="product-detail-image"
          src={ objById.thumbnail }
          alt={ objById.title }
        />
        <p data-testid="product-detail-price">
          { objById.price }
        </p>
        <button
          data-testid="shopping-cart-button"
          onClick={ this.handleClick }
        >
          Carrinho

        </button>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handlerClickAddCart(objById) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
