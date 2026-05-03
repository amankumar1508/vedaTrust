# VedaTrust API Documentation for Postman

This document provides details for all backend routes in the VedaTrust API.

**Base URL:** `http://localhost:5000/api`

---

## 🔐 Authentication

### 1. User Signup
*   **Method:** `POST`
*   **Endpoint:** `/auth/signup`
*   **Description:** Register a new user.
*   **Body (JSON):**
    ```json
    {
      "fullName": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```

### 2. User Login
*   **Method:** `POST`
*   **Endpoint:** `/auth/login`
*   **Description:** Authenticate user and get JWT token.
*   **Body (JSON):**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
*   **Response:** Returns a `token` which should be used for protected routes.

---

## 🛡️ Medicine Verification (Protected)
*Requires `Authorization: Bearer <token>`*

### 1. Verify Medicine
*   **Method:** `POST`
*   **Endpoint:** `/verify`
*   **Description:** Scan and verify a medicine's authenticity.
*   **Body (JSON):**
    ```json
    {
      "medicineName": "Amoxicillin 500mg",
      "batchId": "BATCH12345",
      "manufacturer": "Global Pharma Industries",
      "expiryDate": "2025-12-31"
    }
    ```
    *Note: Use "FAKE" or "X" in `batchId` to simulate a counterfeit result.*

### 2. Get Scan History
*   **Method:** `GET`
*   **Endpoint:** `/verify/history`
*   **Description:** Retrieve all past medicine scans for the logged-in user.

---

## 🏥 Pharmacy Locator

### 1. Get All Pharmacies
*   **Method:** `GET`
*   **Endpoint:** `/pharmacies`
*   **Description:** Retrieve a list of all registered pharmacies.

### 2. Get Single Pharmacy
*   **Method:** `GET`
*   **Endpoint:** `/pharmacies/:id`
*   **Description:** Retrieve details of a specific pharmacy.

### 3. Create Pharmacy (Protected/Admin)
*   **Method:** `POST`
*   **Endpoint:** `/pharmacies`
*   **Description:** Add a new pharmacy to the database.
*   **Body (JSON):**
    ```json
    {
      "name": "City Health Pharmacy",
      "licenseNo": "LIC-CH-001",
      "address": "123 Healthcare Ave, Basel, CH",
      "location": {
        "coordinates": [7.5886, 47.5596]
      }
    }
    ```

---

## 📄 Prescription Management (Protected)
*Requires `Authorization: Bearer <token>`*

### 1. Upload Prescription
*   **Method:** `POST`
*   **Endpoint:** `/prescriptions`
*   **Description:** Upload a prescription image and details.
*   **Body (form-data):**
    *   `prescription` (File): The image file.
    *   `patientName` (Text): "John Doe"
    *   `doctorName` (Text): "Dr. Smith"
    *   `notes` (Text): "Take twice a day"

### 2. Get My Prescriptions
*   **Method:** `GET`
*   **Endpoint:** `/prescriptions`
*   **Description:** Retrieve all prescriptions uploaded by the logged-in user.

---

## 💡 Postman Tips

1.  **Environment Variables:** Create a Postman environment with a variable `base_url` set to `http://localhost:5000/api`.
2.  **Auth Token:** 
    *   After logging in, copy the `token` from the response.
    *   In other requests, go to the **Auth** tab.
    *   Select **Type:** `Bearer Token`.
    *   Paste the token into the `Token` field.
3.  **File Uploads:** For the prescription upload, change the body type to `form-data` and hover over the key to change the type from `Text` to `File`.
