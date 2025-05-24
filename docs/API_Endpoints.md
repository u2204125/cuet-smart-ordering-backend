# API Endpoints Documentation

## User Registration

### POST `/api/users/register`
Registers a new user in the system after successful Firebase authentication on the frontend.

**Request Body:**
```
{
  "uid": "string",           // Firebase UID (required)
  "email": "string",         // User email (required)
  "role": "student|vendor",  // User role (required)
  "displayName": "string"    // User's display name (optional)
}
```

**Success Response:**
- **Status:** 201 Created
- **Body:**
```
{
  "message": "User registered successfully",
  "user": { ...userObject }
}
```

**Error Responses:**
- **Status:** 400 Bad Request
  - Missing required fields
- **Status:** 409 Conflict
  - User already exists
- **Status:** 500 Internal Server Error
  - Server/database error

**Authentication:**
- No authentication required for this endpoint (assumes frontend already validated with Firebase).

## Get User by UID

### GET `/api/users/:uid`
Retrieves a user's data from MongoDB using their Firebase UID.

**Path Parameter:**
- `uid` (string, required): The Firebase UID of the user to retrieve.

**Success Response:**
- **Status:** 200 OK
- **Body:**
```
{
  "user": { ...userObject }
}
```

**Error Responses:**
- **Status:** 400 Bad Request
  - Missing UID parameter
- **Status:** 404 Not Found
  - User not found
- **Status:** 500 Internal Server Error
  - Server/database error

---

## Get User by Email

### GET `/api/users/email/:email`
Retrieves a user's data from MongoDB using their email address.

**Path Parameter:**
- `email` (string, required): The email address of the user to retrieve.

**Success Response:**
- **Status:** 200 OK
- **Body:**
```
{
  "user": { ...userObject }
}
```

**Error Responses:**
- **Status:** 400 Bad Request
  - Missing email parameter
- **Status:** 404 Not Found
  - User not found
- **Status:** 500 Internal Server Error
  - Server/database error

---

## Get All Users (Flexible Access)

### GET `/api/users`
Retrieves users based on the requester's role:
- **Admin:** Can view all users (students and vendors)
- **Student:** Can view all vendors
- **Vendor/Other:** Forbidden

**Headers (for testing):**
- `x-mock-user: {"uid":"admin-uid","role":"admin"}`
- `x-mock-user: {"uid":"student-uid","role":"student"}`
- `x-mock-user: {"uid":"vendor-uid","role":"vendor"}`

**Success Response:**
- **Status:** 200 OK
- **Body:**
```
{
  "users": [ ...userObjects ]
}
```

**Error Responses:**
- **Status:** 401 Unauthorized
  - If no user info is present
- **Status:** 403 Forbidden
  - If requester is not allowed to view users
- **Status:** 500 Internal Server Error
  - Server/database error

---

## Vendor Menu Item CRUD

### POST `/api/vendor/menu-items`
Create a new menu item (vendor only).

**Request Body:**
```
{
  "itemPicUrl": "string", // URL to the item's picture (required)
  "itemName": "string",   // Name of the menu item (required)
  "quantity": number       // Quantity available (required)
}
```

**Success Response:**
- **Status:** 201 Created
- **Body:**
```
{
  "message": "Menu item created successfully",
  "menuItem": { ...menuItemObject }
}
```

---

### GET `/api/vendor/menu-items`
Get all menu items for the logged-in vendor.

**Success Response:**
- **Status:** 200 OK
- **Body:**
```
{
  "menuItems": [ ...menuItemObjects ]
}
```

---

### PUT `/api/vendor/menu-items/:id`
Update a menu item by ID (must belong to the vendor).

**Request Body:**
```
{
  "itemPicUrl": "string",
  "itemName": "string",
  "quantity": number
}
```

**Success Response:**
- **Status:** 200 OK
- **Body:**
```
{
  "message": "Menu item updated successfully",
  "menuItem": { ...menuItemObject }
}
```

---

### DELETE `/api/vendor/menu-items/:id`
Delete a menu item by ID (must belong to the vendor).

**Success Response:**
- **Status:** 200 OK
- **Body:**
```
{
  "message": "Menu item deleted successfully"
}
```

---

## Student Menu Item Access & Review

### GET `/api/student/menu-items`
View all menu items (with optional filters: vendorId, category, minPrice, maxPrice).

**Query Parameters:**
- `vendorId` (string, optional): Filter by vendor
- `category` (string, optional): Filter by category
- `minPrice` (number, optional): Minimum price
- `maxPrice` (number, optional): Maximum price

**Success Response:**
- **Status:** 200 OK
- **Body:**
```
{
  "menuItems": [ ...menuItemObjects ]
}
```

---

### POST `/api/student/purchase`
Purchase one or multiple items (creates an order).

**Request Body:**
```
{
  // Order details (to be defined)
}
```

**Success Response:**
- **Status:** 201 Created
- **Body:**
```
{
  "message": "Order placed successfully (mock)"
}
```

---

### POST `/api/student/review`
Submit a review for a menu item.

**Request Body:**
```
{
  "menuItemId": "string", // Menu item to review (required)
  "rating": number,        // 1-5 (required)
  "comment": "string"      // Optional
}
```

**Success Response:**
- **Status:** 201 Created
- **Body:**
```
{
  "message": "Review submitted successfully",
  "review": { ...reviewObject }
}
```

---

## Student Purchase Food Items (SSLCommerz Payment)

### POST `/api/student/purchase`
Allows a student to purchase one or multiple food items and initiates payment via SSLCommerz.

**Request Body:**
```
{
  "items": [
    { "menuItemId": "string", "quantity": number },
    ...
  ],
  "vendorId": "string"
}
```

**Success Response:**
- **Status:** 201 Created
- **Body:**
```
{
  "message": "Order created, payment initiated",
  "orderId": "string",
  "paymentUrl": "string"
}
```

**Error Responses:**
- **Status:** 400 Bad Request
- **Status:** 404 Not Found (if any menu item is missing)
- **Status:** 500 Internal Server Error

---

## Payment Success Callback (SSLCommerz)

### POST `/api/payment/success`
SSLCommerz will call this endpoint after a successful payment. The order status is set to Pending, paymentStatus to Paid, and item quantities are decreased.

**Request Body:**
```
{
  "tran_id": "string" // Order ID
  // ...other SSLCommerz fields
}
```

**Success Response:**
- **Status:** 302 Redirect (to /payment-success) or 200 OK (if JSON)

---

## Payment Failure Callback (SSLCommerz)

### POST `/api/payment/fail`
SSLCommerz will call this endpoint after a failed payment. The order status is set to Failed.

**Request Body:**
```
{
  "tran_id": "string" // Order ID
  // ...other SSLCommerz fields
}
```

**Success Response:**
- **Status:** 302 Redirect (to /payment-fail) or 200 OK (if JSON)

---

*Add more endpoints as you implement them.*
