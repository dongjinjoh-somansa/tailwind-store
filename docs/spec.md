# The Tailwind Store

디지털 상품과 실물 상품을 모두 판매하는 전자상거래 스토어입니다. 이를 위해 다음을 추적해야 합니다:

- SKU, 이름, 가격, 설명, 유형(디지털, 하드웨어, 주방용품, 의류 등)을 포함하는 `products`
- 제품, 재고 수준, 위치를 추적하는 `inventory`. 디지털 상품의 경우 다운로드 URL을 포함해야 합니다.
- 고유한 난수 `number`, `total`(단위: 페니), `date`, `status`, 결제된 경우 `transaction_id`를 포함하는 `orders`
- 고유한 이메일, 이름, 평생 가치를 포함하는 `customers`

## Stack

다음을 사용하는 웹 애플리케이션이자 API입니다:

- 서버는 Express.js를 사용합니다.
- 뷰 엔진은 EJS를 사용합니다.
- 스타일링은 Tailwind CSS를 사용합니다.
- 로깅 및 모니터링은 모범 사례를 사용합니다.
- 결제 처리는 Stripe를 사용합니다.
- 개발 데이터베이스는 SQLite를 사용하고, 운영 데이터베이스는 PostgreSQL을 사용합니다.
- ORM에 Sequelize를 사용하세요.

## Services

모든 로직은 `/lib` 디렉터리에 있는 서비스 클래스에서 실행됩니다.
