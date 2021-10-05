import millify from "millify";
import { useState } from "react";
import { useParams } from "react-router";
import {
  FundOutlined,
  MoneyCollectOutlined,
  DollarCircleOutlined,
  NumberOutlined,
  CheckOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../Services/cryptoApi";
import { Col, Typography, Select, Row } from "antd";
import HTMLReactParser from "html-react-parser";
import { LineElement } from "chart.js";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTImePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;
  console.log("cr =>", cryptoDetails);

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price  to USD",
      value: `$ ${cryptoDetails && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: cryptoDetails && cryptoDetails.rank,
      icon: <NumberOutlined />,
    },
    {
      title: "24H Volume",
      value: `$ ${cryptoDetails && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily-avg)",
      value: `$ ${cryptoDetails && millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number of Markets",
      value: cryptoDetails && cryptoDetails.numberOfMarket,
      icon: <FundOutlined />,
    },
    {
      title: "Number for Exchanges",
      value: cryptoDetails && cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value:
        cryptoDetails && cryptoDetails.approvedSupply ? (
          <CheckOutlined />
        ) : (
          <StopOutlined />
        ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${cryptoDetails && millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      vlaue: `$ ${cryptoDetails && millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching) return "Loading....";
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails && cryptoDetails.name} (
          {cryptoDetails && cryptoDetails.slug}) Price
        </Title>
        <p>
          {cryptoDetails && cryptoDetails.name} live price in US Dollars. View
          value statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select time period"
        onChange={(value) => setTImePeriod(value)}
      >
        {time.map((item) => (
          <Option vlaue={item} key={item}>
            {item}
          </Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-detailes-heading">
              {cryptoDetails && cryptoDetails.name} value Statistics
            </Title>
            <p>
              An overview showing the stats of{" "}
              {cryptoDetails && cryptoDetails.name}.
            </p>
          </Col>
          {stats.map(({ title, icon, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-detailes-heading">
              Other Statistics
            </Title>
            <p>An overview showing all stats of cryptocurrencies</p>
          </Col>
          {genericStats.map(({ title, icon, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails && cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails && cryptoDetails.name} Links
          </Title>
          {cryptoDetails &&
            cryptoDetails.links.map((link) => (
              <Row className="coin-link" key={LineElement.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
