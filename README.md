# 🌱 Excel Emissions Analyzer

This project is a full-stack web application that allows users to **upload Excel files** containing company energy and emissions data.  
It processes the data, calculates key **environmental indicators**, and displays insights through **interactive charts and tables**.

## 🚀 Features

- 📤 **Excel Upload:** Upload `.xlsx` or `.xls` files with company data (via Swagger UI or frontend form).
- ⚙️ **Automated Processing:**
  - Total CO₂ emissions per year
  - Average energy consumption per company
  - Top 5 emitters
- 📊 **Data Visualization:**
  - Bar chart for top emitters
  - Tables for total emissions and average energy
- 🐳 **Dockerized:** Both frontend and backend run in containers.

## 🧩 Project Structure

```
root/
├── backend/          # Node.js + Express backend
│   ├── Dockerfile
│   └── src/
│
├── frontend/         # Next.js + TypeScript frontend
│   ├── Dockerfile
│   └── src/
│
├── docker-compose.yml
└── package.json      # Root-level scripts to build/run both containers
```

## 🧩 API Documentation (Swagger UI)

Once the backend container is running, the Swagger documentation can be accessed at:

👉 **http://localhost:8000/api-docs**

There you can:

- Upload an Excel file
- Test the `/excel` endpoint
- View the API schema and responses

## ⚙️ Prerequisites

Make sure you have installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [pnpm](https://pnpm.io/installation)

## 🧱 Run the App (Recommended)

Use the root `package.json` to manage both containers easily.

### 1️⃣ Build both images

```bash
pnpm docker:build
```

### 2️⃣ Start the containers

```bash
pnpm docker:start
```

Frontend → [http://localhost:3000](http://localhost:3000)  
Backend → [http://localhost:8000](http://localhost:8000)  
Swagger UI → [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

### 3️⃣ Stop all containers

```bash
pnpm docker:stop
```

## 🧭 Run Each Service Individually

### 🟩 Backend

**Run locally**

```bash
cd backend
pnpm install
pnpm dev
```

**Run with Docker**

```bash
cd backend
pnpm docker:build
pnpm docker:start
```

### 🟦 Frontend

**Run locally**

```bash
cd frontend
pnpm install
pnpm dev
```

**Run with Docker**

```bash
cd frontend
pnpm docker:build
pnpm docker:start
```

**To stop the containers**

```bash
pnpm docker:stop
```

## 📈 How It Works

1. Upload an Excel file containing:
   - `Empresa`
   - `Ano`
   - `Setor`
   - `Consumo de Energia (MWh)`
   - `Emissões de CO2 (toneladas)`
2. The backend processes the file and calculates:
   - **Total CO₂ per year**
   - **Average energy per company**
   - **Top 5 emitters**
3. The frontend displays:
   - A **data table** of all rows
   - Tables for emissions and energy
   - A **bar chart** of the top emitters

## 🧪 Example API Response

```json
{
  "message": "File processed successfully",
  "data": [
    {
      "companyName": "Empresa 7",
      "year": 2023,
      "sector": "Transporte",
      "energyConsumption": 6817.73,
      "carbonEmissions": 3637.39
    },
    {
      "companyName": "Empresa 7",
      "year": 2024,
      "sector": "Indústria",
      "energyConsumption": 7625.78,
      "carbonEmissions": 5966.52
    },

    {
      "companyName": "Empresa 4",
      "year": 2023,
      "sector": "Transporte",
      "energyConsumption": 5759.69,
      "carbonEmissions": 3290.76
    },
    {
      "companyName": "Empresa 4",
      "year": 2024,
      "sector": "Construção",
      "energyConsumption": 1067.41,
      "carbonEmissions": 444.44
    },

    {
      "companyName": "Empresa 11",
      "year": 2023,
      "sector": "Indústria",
      "energyConsumption": 8505.72,
      "carbonEmissions": 3846.83
    },
    {
      "companyName": "Empresa 11",
      "year": 2024,
      "sector": "Energia",
      "energyConsumption": 8652.63,
      "carbonEmissions": 7086.29
    },

    {
      "companyName": "Empresa 16",
      "year": 2022,
      "sector": "Construção",
      "energyConsumption": 3174.24,
      "carbonEmissions": 1381.67
    },
    {
      "companyName": "Empresa 16",
      "year": 2023,
      "sector": "Indústria",
      "energyConsumption": 9036.05,
      "carbonEmissions": 4420.64
    },
    {
      "companyName": "Empresa 16",
      "year": 2024,
      "sector": "Transporte",
      "energyConsumption": 7821.53,
      "carbonEmissions": 5388.08
    },

    {
      "companyName": "Empresa 20",
      "year": 2023,
      "sector": "Transporte",
      "energyConsumption": 8568.38,
      "carbonEmissions": 4003.68
    },
    {
      "companyName": "Empresa 20",
      "year": 2024,
      "sector": "Indústria",
      "energyConsumption": 8536.49,
      "carbonEmissions": 5177.08
    },

    {
      "companyName": "Empresa 3",
      "year": 2022,
      "sector": "Transporte",
      "energyConsumption": 1376.37,
      "carbonEmissions": 288.43
    },
    {
      "companyName": "Empresa 3",
      "year": 2023,
      "sector": "Energia",
      "energyConsumption": 5225.63,
      "carbonEmissions": 3325.34
    },
    {
      "companyName": "Empresa 3",
      "year": 2024,
      "sector": "Indústria",
      "energyConsumption": 8737.61,
      "carbonEmissions": 4380.0
    }
  ],
  "indicators": {
    "totalCO2PerYear": {
      "2022": 1670.1,
      "2023": 18894.61,
      "2024": 15077.99
    },
    "averageEnergyPerCompany": {
      "Empresa 7": 7221.76,
      "Empresa 4": 3413.55,
      "Empresa 11": 8579.18,
      "Empresa 16": 6677.27,
      "Empresa 20": 8552.43,
      "Empresa 3": 5113.2
    },
    "top5Emitters": [
      { "companyName": "Empresa 16", "emissions": 11190.39 },
      { "companyName": "Empresa 11", "emissions": 10933.12 },
      { "companyName": "Empresa 7", "emissions": 9603.91 },
      { "companyName": "Empresa 20", "emissions": 9180.76 },
      { "companyName": "Empresa 3", "emissions": 7993.77 }
    ]
  }
}
```

## 🧰 Tech Stack

**Frontend**

- Next.js 14
- TypeScript
- TailwindCSS
- Recharts

**Backend**

- Node.js
- Express
- XLSX

**DevOps**

- Docker
- Docker Compose
- pnpm

## 💡 Author Notes

This project demonstrates a clean architecture separating **data processing** (backend) from **data visualization** (frontend).
