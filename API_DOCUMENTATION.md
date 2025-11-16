# Fitkit AI - Backend API Documentation

This document describes all the API endpoints required by the Fitkit AI mobile app.

## Base URL
```
https://your-backend-url.com/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## Authentication Endpoints

### 1. Register User
**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 28,
  "weight": 75.5,
  "height": 175,
  "activityLevel": "moderate",
  "goal": "loss"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "60f7b3a4c4a5c20015f4e6a1",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 28,
      "weight": 75.5,
      "height": 175,
      "activityLevel": "moderate",
      "dailyCalorieTarget": 2000,
      "goal": "loss",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### 2. Login User
**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "60f7b3a4c4a5c20015f4e6a1",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 28,
      "weight": 75.5,
      "height": 175,
      "activityLevel": "moderate",
      "dailyCalorieTarget": 2000,
      "goal": "loss",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (401 Unauthorized):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Get User Profile
**Endpoint**: `GET /auth/profile`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3a4c4a5c20015f4e6a1",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 28,
    "weight": 75.5,
    "height": 175,
    "activityLevel": "moderate",
    "dailyCalorieTarget": 2000,
    "goal": "loss",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Update User Profile
**Endpoint**: `PUT /auth/profile`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "weight": 74.0,
  "goal": "maintain"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3a4c4a5c20015f4e6a1",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 28,
    "weight": 74.0,
    "height": 175,
    "activityLevel": "moderate",
    "dailyCalorieTarget": 2000,
    "goal": "maintain",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Meal Endpoints

### 5. Upload Meal Image for AI Analysis
**Endpoint**: `POST /meal/upload-image`

**Headers**: 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Form Data**:
- `image`: File (JPEG/PNG)

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "name": "Chicken Breast",
        "quantity_g": 150,
        "calories": 248,
        "protein": 46.5,
        "carbs": 0,
        "fat": 5.4
      },
      {
        "name": "Rice",
        "quantity_g": 200,
        "calories": 260,
        "protein": 5.4,
        "carbs": 57.6,
        "fat": 0.6
      }
    ],
    "imageUrl": "https://s3.amazonaws.com/bucket/meal_123.jpg",
    "confidence": 0.92
  }
}
```

**ML Service Integration**:
The backend should:
1. Receive the uploaded image
2. Upload to S3 or cloud storage
3. Send image URL to ML service
4. Get predictions from ML model
5. Map predictions to nutrition database
6. Return formatted response

---

### 6. Add Meal Entry
**Endpoint**: `POST /meal/add`

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "mealType": "lunch",
  "items": [
    {
      "food": "Chicken Breast",
      "quantity_g": 150,
      "calories": 248,
      "protein": 46.5,
      "carbs": 0,
      "fat": 5.4
    },
    {
      "food": "Rice",
      "quantity_g": 200,
      "calories": 260,
      "protein": 5.4,
      "carbs": 57.6,
      "fat": 0.6
    }
  ],
  "totalCalories": 508,
  "imageUrl": "https://s3.amazonaws.com/bucket/meal_123.jpg",
  "createdAt": "2024-01-15T12:30:00.000Z"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "60f7b3a4c4a5c20015f4e6a2",
    "userId": "60f7b3a4c4a5c20015f4e6a1",
    "mealType": "lunch",
    "items": [
      {
        "food": "Chicken Breast",
        "quantity_g": 150,
        "calories": 248,
        "protein": 46.5,
        "carbs": 0,
        "fat": 5.4
      },
      {
        "food": "Rice",
        "quantity_g": 200,
        "calories": 260,
        "protein": 5.4,
        "carbs": 57.6,
        "fat": 0.6
      }
    ],
    "totalCalories": 508,
    "imageUrl": "https://s3.amazonaws.com/bucket/meal_123.jpg",
    "createdAt": "2024-01-15T12:30:00.000Z"
  }
}
```

---

### 7. Get Meals for Specific Day
**Endpoint**: `GET /meal/day/:date`

**Headers**: `Authorization: Bearer <token>`

**URL Parameters**:
- `date`: Date in YYYY-MM-DD format (e.g., 2024-01-15)

**Example**: `GET /meal/day/2024-01-15`

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "_id": "60f7b3a4c4a5c20015f4e6a2",
      "userId": "60f7b3a4c4a5c20015f4e6a1",
      "mealType": "breakfast",
      "items": [
        {
          "food": "Oatmeal",
          "quantity_g": 100,
          "calories": 389,
          "protein": 16.9,
          "carbs": 66.3,
          "fat": 6.9
        }
      ],
      "totalCalories": 389,
      "imageUrl": "https://s3.amazonaws.com/bucket/meal_124.jpg",
      "createdAt": "2024-01-15T08:00:00.000Z"
    },
    {
      "_id": "60f7b3a4c4a5c20015f4e6a3",
      "userId": "60f7b3a4c4a5c20015f4e6a1",
      "mealType": "lunch",
      "items": [...],
      "totalCalories": 508,
      "imageUrl": "https://s3.amazonaws.com/bucket/meal_123.jpg",
      "createdAt": "2024-01-15T12:30:00.000Z"
    }
  ]
}
```

---

### 8. Get Weekly Meals
**Endpoint**: `GET /meal/week`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters** (optional):
- `startDate`: Start date (defaults to 7 days ago)
- `endDate`: End date (defaults to today)

**Example**: `GET /meal/week?startDate=2024-01-08&endDate=2024-01-15`

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "_id": "60f7b3a4c4a5c20015f4e6a2",
      "userId": "60f7b3a4c4a5c20015f4e6a1",
      "mealType": "lunch",
      "items": [...],
      "totalCalories": 508,
      "createdAt": "2024-01-15T12:30:00.000Z"
    },
    // ... more meals
  ]
}
```

---

### 9. Delete Meal
**Endpoint**: `DELETE /meal/:id`

**Headers**: `Authorization: Bearer <token>`

**URL Parameters**:
- `id`: Meal ID

**Example**: `DELETE /meal/60f7b3a4c4a5c20015f4e6a2`

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Meal deleted successfully"
}
```

---

### 10. Search Food Database
**Endpoint**: `GET /meal/search`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `q`: Search query

**Example**: `GET /meal/search?q=chicken`

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "name": "Chicken Breast",
      "calories": 165,
      "protein": 31,
      "carbs": 0,
      "fat": 3.6,
      "servingSize": 100
    },
    {
      "name": "Chicken Thigh",
      "calories": 209,
      "protein": 26,
      "carbs": 0,
      "fat": 10.9,
      "servingSize": 100
    }
  ]
}
```

---

## Analytics Endpoints

### 11. Get Weekly Analytics
**Endpoint**: `GET /analytics/weekly`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "dailyStats": [
      {
        "date": "2024-01-09",
        "totalCalories": 1850,
        "protein": 95,
        "carbs": 210,
        "fat": 58
      },
      {
        "date": "2024-01-10",
        "totalCalories": 2100,
        "protein": 110,
        "carbs": 230,
        "fat": 65
      },
      // ... 7 days
    ],
    "averageCalories": 1975,
    "totalCalories": 13825,
    "macroDistribution": {
      "protein": 102,
      "carbs": 220,
      "fat": 61
    }
  }
}
```

---

### 12. Get Macro Distribution
**Endpoint**: `GET /analytics/macros`

**Headers**: `Authorization: Bearer <token>`

**Query Parameters** (optional):
- `period`: 'week' | 'month' (defaults to 'week')

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "protein": {
      "grams": 102,
      "calories": 408,
      "percentage": 20.6
    },
    "carbs": {
      "grams": 220,
      "calories": 880,
      "percentage": 44.5
    },
    "fat": {
      "grams": 61,
      "calories": 549,
      "percentage": 27.8
    }
  }
}
```

---

### 13. Get AI Insights
**Endpoint**: `GET /analytics/insights`

**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "insights": [
      {
        "type": "warning",
        "message": "Your lunch calories are consistently high. Consider smaller portions.",
        "icon": "⚠️"
      },
      {
        "type": "success",
        "message": "Great job! You're meeting your protein goals.",
        "icon": "✅"
      },
      {
        "type": "info",
        "message": "Increase protein intake by 20g to optimize muscle growth.",
        "icon": "💡"
      }
    ],
    "trends": {
      "caloriesTrend": "increasing",
      "proteinTrend": "stable",
      "goalProgress": 75
    }
  }
}
```

---

## Error Responses

### Standard Error Format
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

### Common Error Codes

#### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 6 characters"
    }
  }
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required",
  "error": {
    "code": "UNAUTHORIZED",
    "details": "Invalid or expired token"
  }
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "error": {
    "code": "NOT_FOUND",
    "details": "Meal with given ID does not exist"
  }
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": {
    "code": "INTERNAL_ERROR",
    "details": "An unexpected error occurred"
  }
}
```

---

## Data Validation Rules

### User Registration
- `name`: Required, min 2 characters
- `email`: Required, valid email format
- `password`: Required, min 6 characters
- `age`: Required, 13-120
- `weight`: Required, 30-300 kg
- `height`: Required, 100-250 cm
- `activityLevel`: One of: sedentary, light, moderate, active, very_active
- `goal`: One of: loss, maintain, gain

### Meal Entry
- `mealType`: Required, one of: breakfast, lunch, dinner, snack
- `items`: Required, array with at least 1 item
- `items[].food`: Required, string
- `items[].quantity_g`: Required, positive number
- `items[].calories`: Required, positive number
- `items[].protein`: Optional, positive number
- `items[].carbs`: Optional, positive number
- `items[].fat`: Optional, positive number

---

## ML Service Integration

### Food Recognition ML Service
The backend should integrate with a separate ML microservice:

**ML Service Endpoint**: `POST /ml/predict`

**Request**:
```json
{
  "image_url": "https://s3.amazonaws.com/bucket/meal_123.jpg"
}
```

**Response**:
```json
{
  "items": [
    {
      "name": "Chicken Breast",
      "quantity_g": 150,
      "calories": 248,
      "protein": 46.5,
      "carbs": 0,
      "fat": 5.4,
      "confidence": 0.95
    }
  ]
}
```

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  age: Number,
  weight: Number,
  height: Number,
  activityLevel: String,
  dailyCalorieTarget: Number,
  goal: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Meals Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  mealType: String,
  items: [{
    food: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    quantity_g: Number
  }],
  totalCalories: Number,
  imageUrl: String,
  createdAt: Date
}
```

### Predictions Collection (Optional)
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  imageUrl: String,
  predictions: Array,
  rawOutput: Object,
  createdAt: Date
}
```

---

## Deployment Considerations

### Environment Variables
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=fitkit-meals
ML_SERVICE_URL=https://ml-service.com/api
```

### Rate Limiting
Recommended rate limits:
- Authentication: 5 requests/minute per IP
- Image Upload: 10 requests/minute per user
- Other endpoints: 100 requests/minute per user

### File Upload Limits
- Image size: Max 10MB
- Allowed formats: JPEG, PNG
- Image processing: Resize to max 1920x1080

---

## Testing the API

### Using cURL

**Login Example**:
```bash
curl -X POST https://api.fitkitai.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Today's Meals**:
```bash
curl -X GET https://api.fitkitai.com/api/meal/day/2024-01-15 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman
Import the Postman collection (create one with all endpoints) for easier testing.

---

## Support & Contact

For API issues or questions:
- GitHub Issues: https://github.com/AbhishekhKumar19/fitkit/issues
- Email: api-support@fitkitai.com

---

**Last Updated**: January 2024
**API Version**: 1.0.0
