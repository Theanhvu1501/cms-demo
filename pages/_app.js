import WrapperLayout from '@/components/Layout/WrapperLayout';
import { ConfigProvider } from 'antd';
import Head from 'next/head';
import 'styles/globals.css';

const validateMessages = {
  required: 'Vui lòng nhập thông tin',
};

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      form={{ validateMessages }}
      theme={{
        token: {
          // Alias Token
          colorTextDisabled: '#797979',
          colorBgContainerDisabled: '#fafafa',
        },
      }}
    >
      <Head>
        <title>CMS Demo System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WrapperLayout>
        <Component {...pageProps} />
      </WrapperLayout>
    </ConfigProvider>
  );
}
