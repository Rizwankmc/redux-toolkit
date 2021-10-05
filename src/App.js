import { Switch, Route, Link } from "react-router-dom";

import {
  Navbar,
  Home,
  Exchanges,
  CryptoDetails,
  Cryptocurrencies,
  News,
} from "./components";
import "./App.css";
import { Layout, Space, Typography } from "antd";
const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
            </Switch>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse <br />
            All right reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/">Exchanges</Link>
            <Link to="/">Cryptocurrencies</Link>
            <Link to="/">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
