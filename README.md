# 🌱 Personal Digital Garden

_A cloud-powered knowledge garden built with Azure_

## 📘 Project Description

The **Personal Digital Garden** is a web application where you can plant, grow, and organize ideas.  
Each entry—called a **seed**—starts small and can evolve into richer content over time.  
The app demonstrates a wide range of Azure developer skills by integrating cloud services across storage, compute, APIs, search, and security.

This project is part of my 3-month learning plan to prepare for the **Azure Developer Associate (AZ-204)** certification.

---

## 🌿 What the App Will Eventually Do

- Create, edit, and delete “seeds” (notes/ideas)
- Group seeds into “plots” (topics or categories)
- Upload images or files to seeds
- Search entries using **Azure AI Search**
- Sync updates in real time using **Azure SignalR Service**
- Display analytics such as trends, tags, and activity
- Provide a fully deployed, cloud-hosted web app with CI/CD
- Use secure authentication using **Azure AD B2C**

---

## 🧰 Tech Stack

### **Frontend**

- React (or Next.js)
- TailwindCSS (optional)
- Hosted on **Azure Static Web Apps**

### **Backend**

- **Azure Functions** (serverless APIs)
- **Azure SignalR Service** for real-time updates
- **Azure API Management** (optional milestone)

### **Data & Storage**

- **Azure Cosmos DB** (NoSQL storage for seeds + plots)
- **Azure Blob Storage** (file + image uploads)
- **Azure AI Search** (full-text search)

### **Security & Identity**

- **Azure AD B2C** for authentication
- Secrets handled via **Azure Key Vault**

### **Deployment & DevOps**

- GitHub Actions for CI/CD
- Optional: Infrastructure as Code using **Bicep** or **Terraform**

---

## 🛠 Current Status

_(Updated during development)_

- **Weeks 1-3 (Complete)**:
  - Project initialized, README created, GitHub repo set up.
  - Deployed Azure Static Web App with React frontend and Tailwind CSS.
  - Folder structure and basic wireframes implemented.
  - Proper navigation bar and footer built.
  - Azure Functions implemented for CRUD operations on seeds (`listSeeds`, `createSeed`, `updateSeed`, `deleteSeed`).
  - Cosmos DB integration for persistent storage.
  - GitHub Actions CI/CD pipeline fully operational.

- **In Progress**:
  - Resolving API connectivity issues in production (404 errors).
  - Optimizing routing configuration between SWA and Azure Functions.
  - Domain setup and custom configuration.

## ⚙️ Environment and Requirements

- **Local Node Version**: `v22.21.1` (current environment).
- **API Runtime**: Node.js `20.x` (configured in `api/package.json`).

## 🐞 API Routing and Debugging (Production)

An issue has been identified where calling the API in the Azure environment results in a **404 Not Found** error, despite working correctly in the local environment.

### Diagnosis & Fixes:
- **Routing Mismatch**: Azure Static Web Apps automatically maps the `api` folder to `/api`. Combined with the `"routePrefix": "api"` in `api/host.json`, this created a double prefix (`/api/api/listSeeds`).
- **Implemented Fix**: A rewrite rule was added to `staticwebapp.config.json` to map `/api/*` to `/api/api/*`.
- **Logging**: Enhanced console logging was added to both the React frontend and Azure Functions to trace the full absolute URL being called and received.

### Local Development:
- Vite is configured to proxy `/api` calls to `http://localhost:7071` via `vite.config.js`.

---

## 🚀 Goals

This project helps develop the core skills needed for **AZ-204**, including:

- Serverless compute
- Cloud storage
- API design
- Authentication & authorization
- Monitoring & logging
- Azure SDK usage
- CI/CD pipelines
- Cloud deployment best practices

---

## 📅 Roadmap

_(To be added as development progresses)_

---

## 📜 License

MIT License (or choose another license)

---

## 🤝 Contributing

This is a learning project, but suggestions and ideas are welcome.
