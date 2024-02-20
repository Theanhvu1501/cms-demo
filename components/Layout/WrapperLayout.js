import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu } from 'antd';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ManageQuestionIcon } from './Icon';

const { Header, Content, Sider } = Layout;

function WrapperLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState('/question/list');
  const key = router.route;

  useEffect(() => {
    setCurrentKey(key);
  }, [key]);

  const dropDownUser = [
    {
      key: 1,
      label: <a>Log out</a>,
    },
  ];
  const itemMenus = [
    {
      key: '/home',
      label: 'Trang chủ',
      icon: <ManageQuestionIcon />,
      children: [
        {
          key: '/home/setting',
          label: 'Cài đặt',
        },
      ],
    },
  ];

  const renderItems = () => {
    return map(itemMenus, (item) => {
      if (item.children) {
        return {
          ...item,
          children: map(item.children, (itemChildren) => {
            return itemChildren;
          }),
        };
      }
      return item;
    });
  };

  const getOpenKey = () => {
    const itemMenu = itemMenus?.find((menu) =>
      menu?.children?.find((item) => item?.key === router?.pathname)
    );

    return itemMenu?.key;
  };

  const handleNavigate = (path) => {
    router.push(path);
    setCurrentKey(key);
  };

  return (
    <Layout>
      <Header className="fixed bottom-0 top-0 z-10 h-[48px] w-full bg-[#334454] p-0">
        <div className="flex h-full w-full items-center justify-between ">
          <p className="pl-10 text-[21px] font-medium leading-6 text-[#fff]">
            CMS Demo System
          </p>
          <Dropdown className="" menu={{ items: dropDownUser }}>
            <div className="mx-8 cursor-pointer text-lg text-white">
              <UserOutlined />
              <span className="ml-2">Bui Van Manh</span>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Content className="mt-[48px] h-full">
        <Layout hasSider>
          <Sider
            width="250px"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          />
          <Sider
            style={{
              position: 'fixed',
              top: '68px',
              bottom: 0,
              left: 0,
              right: 0,
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width="250px"
          >
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={[currentKey]}
              selectedKeys={[currentKey]}
              defaultOpenKeys={[getOpenKey()]}
              items={renderItems()}
              onClick={({ key }) => {
                handleNavigate(key);
              }}
            />
          </Sider>
          <Content
            className="mx-4 my-6 w-full rounded bg-white p-5"
            style={{ minHeight: 'calc(100vh - 96px)' }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default WrapperLayout;
