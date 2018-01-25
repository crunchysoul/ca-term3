import React from "react";
import {connect} from "react-redux";
import {compose} from "recompose";
import {
  Row,
  Col,
  List,
  Pagination,
  Layout,
  Menu,
  Icon,
  Card,
  Avatar,
} from "antd";
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
    const {count, products} = this.state;

    return (
      <Content
        style={{
          background: "#fff",
          padding: "0 50px",
          marginTop: 64,
        }}
      >
        <h1>Products Page</h1>
        <p>Total Products: {count}</p>
        <Row gutter={16}>
          {products.map(product => (
            <Col span={6}>
              <List.Item>
                <Card
                  hoverable
                  style={{width: 300}}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <Icon type="minus" />,
                    <Icon type="edit" />,
                    <Icon type="plus" />,
                  ]}
                >
                  <Meta
                    title={product.name}
                    description={product.description}
                  />
                </Card>
              </List.Item>
            </Col>
          ))}
        </Row>
      </Content>
    );
  }
}

export default ProductsPage;
