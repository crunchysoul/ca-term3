import React from "react";
import {connect} from "react-redux";
import {compose} from "recompose";
import {List, Pagination, Layout, Menu, Icon, Card, Avatar} from "antd";
import withAuthorization from "./withAuthorization.js";
import {listProducts, createProduct, updateProduct} from "../api/products";
import ProductsList from "./ProductsList.js";

const {Content} = Layout;
const {Meta} = Card;

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: null,
      products: [],
    };
  }

  load() {
    const saveError = error => {
      this.setState({error});
    };

    listProducts()
      .then(products => {
        this.setState((products: {...products}));
      })
      .catch(saveError);

    const authCondition = authUser => !!authUser;
  }

  componentDidMount() {
    this.load();
  }

  render() {
    console.log({products});
    const {count, products} = this.state;
    console.log({products});

    return (
      <Content
        style={{
          background: "#fff",
          padding: "0 50px",
          marginTop: 64,
          minHeight: 280,
        }}
      >
        <h1>Products Page</h1>
        <p>Total Products: {count}</p>
        {products.map(product => (
          <List.Item>
            <Card
              style={{width: 300}}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="setting" />,
                <Icon type="edit" />,
                <Icon type="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={product.name}
                description="This is the description"
              />
            </Card>
          </List.Item>
        ))}
        {/* {products.map(product => <List.Item>{product.name}</List.Item>)} */}
      </Content>
    );
  }
}

export default ProductsPage;
