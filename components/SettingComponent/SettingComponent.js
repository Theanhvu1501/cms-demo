import { ImportOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  ColorPicker,
  Form,
  Input,
  Row,
  Space,
  Upload,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';

const SettingComponent = () => {
  const [form] = Form.useForm();
  const [dataExcel, setDataExcel] = useState();
  const [color, setColor] = useState();

  const save = async () => {
    const values = form.getFieldsValue();
  };
  const handleImport = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data: data } = await axios.post(
        'https://ap-southeast-bet-dm.chaien.vn/api/v1/setting/read-excel',
        formData
      );
      console.log('temp :>> ', data.data);
      setDataExcel(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImportImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log('formData :>> ', formData);
  };
  return (
    <Form layout="vertical" form={form} onFinish={() => save()}>
      <Row gutter={[32]}>
        <Col span={12}>
          <Form.Item name="title" label="Title">
            <Input placeholder="Nhập title" />
          </Form.Item>
          <Form.Item name="lang" label="Language">
            <Input placeholder="Nhập language" />
          </Form.Item>
          <Form.Item name="languageDictionary" label="Language">
            <Upload
              accept=".xlsx, .xls"
              maxCount={1}
              beforeUpload={(file) => {
                handleImport(file);
                return false;
              }}
            >
              <Button icon={<ImportOutlined />}>Import Upload</Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="logo" label="Logo">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="color" label="Color">
            <ColorPicker
              onChange={(value) => setColor(value.toHexString())}
              className="mr-[20px]"
              showText
            />
            ( <i>Chọn màu chủ đạo</i> )
          </Form.Item>
        </Col>
      </Row>
      <div className="text-center">
        <Space>
          <Button className="btnSubmit" type="primary" htmlType="submit">
            Lưu
          </Button>
        </Space>
      </div>
    </Form>
  );
};
export default SettingComponent;
