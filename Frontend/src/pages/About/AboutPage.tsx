import { Card, Col, Divider, Row, Statistic, Typography } from "antd";
import {
  CustomerServiceOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function AboutPage() {
  return (
    <div className="py-5">
      <div className="mb-8 text-center">
        <Title level={1}>О компании Nexora</Title>

        <Paragraph className="mx-auto max-w-2xl text-lg">
          Nexora — интернет-магазин компьютерной и цифровой техники. Мы
          объединяем удобный каталог товаров, современный сервис и поддержку
          покупателей в одном веб-приложении.
        </Paragraph>
      </div>

      <Card className="mb-8">
        <Title level={2}>О нас</Title>

        <Paragraph>
          ООО «Nexora» осуществляет продажу компьютерной и цифровой техники
          через интернет-магазин.
        </Paragraph>

        <Paragraph>
          Веб-приложение является одним из ключевых инструментов компании: с его
          помощью пользователи взаимодействуют с каталогом товаров, оформляют
          заказы, а сотрудники управляют товарами и данными интернет-магазина.
        </Paragraph>
      </Card>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card className="h-full text-center">
            <ShoppingOutlined className="mb-4 text-4xl" />

            <Title level={3}>Цифровая техника</Title>

            <Text type="secondary">
              Компьютерная техника и цифровые устройства в одном каталоге.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="h-full text-center">
            <CustomerServiceOutlined className="mb-4 text-4xl" />

            <Title level={3}>Поддержка</Title>

            <Text type="secondary">
              Помогаем пользователям взаимодействовать с сервисом и решать
              возникающие вопросы.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card className="h-full text-center">
            <TeamOutlined className="mb-4 text-4xl" />

            <Title level={3}>Команда</Title>

            <Text type="secondary">
              В структуре компании работают отдел продаж, склад, техническая
              поддержка и ИТ-отдел.
            </Text>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Card>
        <Title level={2}>Nexora в цифрах</Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <Statistic title="Сотрудников" value={80} />
          </Col>

          <Col xs={24} sm={12}>
            <Statistic title="Категории пользователей" value={3} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
