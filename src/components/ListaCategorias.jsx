import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import './ListaCategorias.css';

class ListaCategorias extends Component {
  state = {
    categorias: [],
    filterCategorias: [],
  };

  async componentDidMount() {
    const listCategorias = await getCategories();
    this.setState({
      categorias: listCategorias,
    });
  }

  handleClick = async ({ target }) => {
    const { id } = target;
    const results = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
    const data = await results.json();
    // console.log(data.results);
    this.setState({
      filterCategorias: data.results,
    });
  };

  render() {
    const { categorias, filterCategorias } = this.state;
    const { handlerClickAddCart } = this.props;
    return (
      <div className="btn-section">
        {categorias.map(({ id, name }) => (
          <button
            className="item"
            key={ id }
            data-testid="category"
            id={ id }
            onClick={ this.handleClick }
          >
            { name }
          </button>
        ))}

        {filterCategorias.length === 0 ? 'Nenhum produto foi encontrado' : (
          <div>

            { filterCategorias.map((products) => (
              <div key={ Math.random() }>
                <Link
                  to={ `/details/${products.id}` }
                  data-testid="product-detail-link"
                >
                  <span>
                    <p data-testid="product">
                      {products.title}
                    </p>
                    <img
                      src={ products.thumbnail }
                      alt={ products.title }
                    />
                    <p>
                      {' '}
                      { products.price }
                      {' '}
                    </p>

                  </span>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  id={ products.id }
                  onClick={ () => handlerClickAddCart(products) }
                >
                  Adicionar ao carrinho
                </button>
              </div>

            ))}
          </div>

        )}

      </div>
    );
  }
}

ListaCategorias.propTypes = {
  handlerClickAddCart: PropTypes.func.isRequired,
};

export default ListaCategorias;
