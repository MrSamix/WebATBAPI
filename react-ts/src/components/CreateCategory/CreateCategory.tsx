import type { FormProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Upload, Form, Input, message, ConfigProvider, Image } from "antd";
import { API_URL, CATEGORIES_ENDPOINT } from "../../constants/Link";
import { Link } from "react-router";
import { Result } from "antd";
import { useState } from "react";

type FieldType = {
  name: string;
  image: {
    originFileObj: Blob;
    [key: string]: any;
  }[];
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const getBase64 = (file: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreateCategory: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [success, setSuccess] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);

  const ERROR_TEXT = "Не вдалось додати категорію";

  const errorMessage = (msg: string = ERROR_TEXT) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  const createCategory = (name: string, file: Blob) => {
    const reader = new FileReader();
    reader.onload = function () {
      const base64Image = reader.result as string;

      // json
      const payload = {
        name,
        image: base64Image,
      };

      fetch(API_URL + CATEGORIES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) {
            setSuccess(true);
            setFileList([]);
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.message) {
            console.error("Error:", data.message);
            errorMessage();
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          errorMessage();
        });
    };
    reader.readAsDataURL(file);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { name, image } = values;
    const file = image[0].originFileObj;
    createCategory(name, file);
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: '#ece7e7ff'
          },
          Result: {
            colorTextHeading: '#ece7e7ff',
            colorTextDescription: '#ece7e7ff'
          },
          Upload: {
            colorText: '#ece7e7ff'
          }
        }
      }}
    >
      {contextHolder}
      {!success && (
        <>
          <Form
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Назва категорії"
              name="name"
              rules={[
                { required: true, message: "Будь ласка введіть назву категорії!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Завантажити фото"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                accept="image/*"
                listType="picture-card"
                beforeUpload={() => false}
                maxCount={1}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                {fileList.length < 1 && (
                  <button
                    style={{
                      color: "inherit",
                      cursor: "inherit",
                      border: 0,
                      background: "none",
                    }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
            </Form.Item>

            <Form.Item label={null}>
              <Button className="w-full" type="primary" htmlType="submit">
                Додати
              </Button>
            </Form.Item>
          </Form>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(''),
              }}
              src={previewImage}
            />
          )}
        </>
      )}

      {success && (
        <Result
          status="success"
          title="Категорію успішно додано!"
          subTitle="Можете повернутись в головне меню, або додати ще одну категорію."
          extra={[
            <Button type="primary" key="console">
              <Link to="/">На головну</Link>
            </Button>,
            <Button key={1} onClick={() => setSuccess(false)}>Додати ще одну категорію</Button>
          ]}
        />
      )}
    </ConfigProvider>
  );
};

export default CreateCategory;
