import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import _ from 'lodash'
import { hexToDecimal } from "../utils/index";

const { Dragger } = Upload;
const HexToDecimalConverter = (props: any) => {

  const beforeUpload = (file: any) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      // @ts-ignore
      const content = e.target.result;
      // @ts-ignore
      const lines = content.split('\n');
      // @ts-ignore
      const num10s = _.flatMap(lines.map(line => line.trim().split(/\s+/).map(hex => hexToDecimal(hex)).filter(Boolean)))
      props.successTranfer(num10s)
    };

    reader.readAsText(file);

    // 阻止`Upload`组件把文件上传到服务器
    return false;
  };
  const newProps: UploadProps = {
    beforeUpload,
    showUploadList: false,
  }

  return (
    <Dragger {...newProps}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件至此处读取</p>
  </Dragger>
  );
};

export default HexToDecimalConverter;
