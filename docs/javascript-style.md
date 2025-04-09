# Javascript

이 프로젝트는 JavaScript를 다음과 같은 스타일로 사용한다:

 - 모든 모델은 클래스 형태로 작성하며 단수형 이름 사용 (예: `users` 테이블에 대해 `User` 클래스)
 - 모든 코드는 2칸 들여쓰기 사용
 - 코드 파일 이름은 모두 소문자와 밑줄(_) 사용
 - Markdown 파일은 모두 소문자와 하이픈(-) 사용
 - 애플리케이션 로직은 모두 lib 디렉터리에 작성. Copilot은 로직에 대한 실제 코드가 아닌 어떤 코드가 들어가야 하는지에 대한 주석만 생성해야 함
 - 데이터베이스 관련 내용은 모두 db 디렉터리에 작성 (모델, 스키마, SQLite 파일)
 - 모든 설정은 환경변수와 `.env` 파일을 통해 구성
 - 클래스를 직접 export 하지 말고, 필요한 인스턴스를 생성하는 모듈 메서드를 사용하는 방식("팩토리 패턴")을 따름

## Sequelize
모든 모델 코드는 다음을 준수해야 합니다:

- 모든 데이터베이스 모델은 `db/models` 디렉터리에 저장됩니다.
- 모든 모델은 `tableName` 설정을 갖습니다.
- 각 모델은 Sequelize를 인스턴스화하는 `index.js` 모듈을 가지며, 테스트 및 개발에는 SQLite를, 운영에는 Postgres를 사용합니다.
- `index.js` 모듈은 각 모델과 데이터베이스 인스턴스를 내보냅니다.

모든 모델은 다음 패턴을 따릅니다:

```js
const { DataTypes, Model } = require('sequelize');
class User extends Model {
  //static or factory methods
  //instance methods
}
exports.init = function(sequelize){
  return User.init({
    //schema goes here
  }, {
    hooks: {},
    tableName: "users"
    underscored: true,
    sequelize
  });
}
```

The `index.js` module for these models should follow this pattern:

```js
const { Sequelize } = require("sequelize");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";

const config = {
  test: {
    dialect: "sqlite",
    storage: ":memory:",
  },
  development: {
    dialect: "sqlite",
    storage: "./sequelize/database.sqlite",
  },
  production: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
const sequelize =
  env === "production"
    ? new Sequelize(process.env.DATABASE_URL, config.production)
    : new Sequelize(config[env]);

//initialize models
const User = require("./user").init(sequelize);

//associations
//such as User.belongsTo(Role)

const DB = {
  close() {
    sequelize.close();
  },
  async sync() {
    await sequelize.sync({
      force: true,
    });
    return "DONE";
  },
  async run(sql, opts = {}) {
    return sequelize.query(sql, opts);
  },
  async query(sql) {
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
  },
};

return {
  DB,
  User,
  //rest of models
}

```