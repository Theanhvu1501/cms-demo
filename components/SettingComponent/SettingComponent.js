1;
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  ColorPicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const SettingComponent = () => {
  const [form] = Form.useForm();
  const [dataExcel, setDataExcel] = useState();
  const [color, setColor] = useState();
  const [logo, setLogo] = useState();

  const { Option } = Select

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://ap-southeast-bet-dm.chaien.vn/api/v1/setting"
        );
        const result = data.data;
        if (result) {
          form.setFieldValue("title", result.title);
          form.setFieldValue("lang", result.lang);
          form.setFieldValue("logo", result.logo);
          form.setFieldValue("color", result.color);
          setColor(result.color);
          setLogo({
            logo: result.logo,
            logoUrl: result.logoUrl,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const save = async () => {
    const values = form.getFieldsValue();
    console.log(values);
    const file = values.logo.file.originFileObj;
    const formData = new FormData();
    formData.append("file", file);
    const headers = { internalkey: "public" };
    const { data: dataImage } = await axios.post(
      "https://content.chaien.vn/api/storage/public/write",
      formData,
      { headers }
    );
    console.log("dataImage", dataImage);

    const body = {
      title: values.title,
      color: color,
      logo: dataImage.data,
      lang: values.lang,
      id: "1209075439708930048",
    };
    axios
      .put("https://ap-southeast-bet-dm.chaien.vn/api/v1/setting", body, {
        headers,
      })
      .then(() => message.success("Thành công"))
      .catch((e) => console.log(e));
  };

  const handleImport = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data: data } = await axios.post(
        "https://ap-southeast-bet-dm.chaien.vn/api/v1/setting/read-excel",
        formData
      );
      console.log("temp :>> ", data.data);
      setDataExcel(data.data);
      message.success("Import thành công!");
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    {
      label: "zh_CN", value: "zh_CN"
    },
    {
      label: "en_EN", value: "en_EN"
    }, {
      label: "vi_VN", value: "vi_VN"
    },
    {
      label: "pt_PT", value: "pt_PT"
    }
  ]
  return (
    <Form layout="vertical" form={form} onFinish={() => save()}>
      <Row gutter={[32]}>
        <Col span={12}>
          <Form.Item name="title" label="Title">
            <Input placeholder="Nhập title" />
          </Form.Item>
          <Form.Item name="lang" label="Language">
            <Select placeholder="Nhập language">
              {options.map(item => <Option value={item.value}>{item.label}</Option>)}
            </Select>
          </Form.Item>
          {/* <Form.Item name="languageDictionary" label="Language">
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
          </Form.Item> */}
        </Col>
        <Col span={12}>
          <Form.Item name="color" label="Color">
            <ColorPicker
              onChange={(value) => setColor(value.toHexString())}
              className="mr-[20px]"
              showText
              value={color}
              defaultValue={color}
            />
            ( <i>Chọn màu chủ đạo</i> )
          </Form.Item>
          <Form.Item name="logo" label="Logo">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <a
            hidden={form.getFieldValue("logo")?.fileList?.length > 0}
            href={logo?.logoUrl}
            target="_blank"
          >
            {logo?.logo}
          </a>
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
