import { DataSource } from "typeorm";

const connectionSource = new DataSource({
    type: 'sqlite',
    database: 'src/database/db.sqlite',
    synchronize: false,
    logging: false,
    entities: ["src/entity/**/*{.js,.ts}"],
    migrations: ["src/migration/**/*{.js,.ts}"],
    subscribers: ["src/subscriber/**/*{.js,.ts}"],
});

export default connectionSource;
