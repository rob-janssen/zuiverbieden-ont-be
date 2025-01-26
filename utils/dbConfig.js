import { Sequelize } from "sequelize";
import { ConfidentialClientApplication } from "@azure/msal-node";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

console.log(process.env.AZ_CLIENT_ID);
console.log(process.env.AZ_CLIENT_SECRET);
console.log(process.env.AZ_TENANT_ID);

const msalConfig = {
  auth: {
    clientId: process.env.AZ_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZ_TENANT_ID}`,
    clientSecret: process.env.AZ_CLIENT_SECRET,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getToken() {
  try {
    const tokenResponse = await cca.acquireTokenByClientCredential({
      scopes: ["https://database.windows.net/.default"],
    });
    return tokenResponse.accessToken;
  } catch (err) {
    console.error("Fout bij het ophalen van het token:", err);
    throw err;
  }
}

const sequelize = new Sequelize({
  dialect: "mssql",
  host: process.env.DB_SERVER,
  database: "VIND-ONT",
  dialectOptions: {
    authentication: {
      type: "azure-active-directory-access-token",
      options: {
        token: await getToken(),
      },
    },
    encrypt: true,
  },
});

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

authenticate();

(async () => {
  await sequelize.sync({
    // force: true,
    alter: true,
  });
  console.log("All models were synchronized successfully.");
})();

export default sequelize;
