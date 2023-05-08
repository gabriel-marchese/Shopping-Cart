import React from 'react';

class Cart extends React.Component {
  state = {
    count: [],
  };

  handleClickIncrease = (id) => {
    this.setState((prevState) => {
      const updatedCounts = { ...prevState.count };
      updatedCounts[id] = (updatedCounts[id] || 0) + 1;
      return {
        count: updatedCounts,
      };
    });
  };

  handleClickRemove = (index) => {
    const recoveredObject = JSON.parse(localStorage.getItem('Items'));
    if (recoveredObject && recoveredObject.length > 0) {
      const updatedItems = recoveredObject.filter((product) => product.id !== index);
      localStorage.setItem('Items', JSON.stringify(updatedItems));
      this.forceUpdate();
    }
  };

  handleClickDecrease = (id) => {
    const { count } = this.state;
    if (count[id] >= 1) {
      this.setState((prevState) => {
        const updatedCounts = { ...prevState.count };
        updatedCounts[id] = (updatedCounts[id] || 0) - 1;
        return {
          count: updatedCounts,
        };
      });
    }
  };

  render() {
    const recoveredObject = JSON.parse(localStorage.getItem('Items'));
    const { count } = this.state;
    console.log(count);
    return (
      <div>
        {
          !recoveredObject ? (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>
          ) : (
            recoveredObject.map((recoveredProduct) => (
              <div key={ recoveredProduct.id }>
                <span data-testid="product">
                  <p
                    data-testid="shopping-cart-product-name"
                  >
                    { recoveredProduct.title}
                  </p>
                  <button
                    data-testid="product-increase-quantity"
                    onClick={ () => this.handleClickIncrease(recoveredProduct.id) }
                  >
                    +
                  </button>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    { count[recoveredProduct.id] + 1 || 1}
                  </p>
                  <button
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.handleClickDecrease(recoveredProduct.id) }
                  >
                    -
                  </button>
                  <p>{recoveredProduct.price}</p>
                  <img src={ recoveredProduct.thumbnail } alt="" />
                </span>
                <button
                  data-testid="remove-product"
                  onClick={ () => this.handleClickRemove(recoveredProduct.id) }
                >
                  Excluir
                </button>
              </div>
            ))
          )
        }
      </div>
    );
  }
}

export default Cart;
