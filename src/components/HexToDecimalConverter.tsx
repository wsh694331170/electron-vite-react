import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import _ from 'lodash'

const HexToDecimalConverter = (props: any) => {

  const beforeUpload = (file: any) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      // @ts-ignore
      const content = e.target.result;
      // @ts-ignore
      const lines = content.split('\n');
      // @ts-ignore
      const num10s = _.flatMap(lines.map(line => line.trim().split(/\s+/).map(hex => parseInt(hex, 16)).filter(Boolean)))
      props.successTranfer(num10s)
    };

    reader.readAsText(file);

    // 阻止`Upload`组件把文件上传到服务器
    return false;
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>读取串口数据</Button>
    </Upload>
  );
};

export default HexToDecimalConverter;
