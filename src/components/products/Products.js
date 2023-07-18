import {Space} from "antd";
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";
import React from "react";

export function Products() {
  return (
    <Space wrap>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="http://localhost:3001/public\\images\\1689685333369-divide.png" />}
        title="Iphone"
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
        <Meta title="950$"/>
      </Card>
    </Space>
  )
}