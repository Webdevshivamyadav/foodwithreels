# FoodWithReels — Detailed API & Models

Last updated: 2025-11-1

This file contains an expanded reference for the API, models, authentication behaviour, and example requests you can run locally (curl and axios examples).

## Data models (summary)

Below are the primary Mongoose models and their important fields (see `server/src/model` for full definitions):

- User (`User`)
  - name: String (required)
  - email: String (required, unique)
  - password: String (hashed)
  - profileUrl: String (Cloudinary URL)
  - follower: Number (default 0)
  - following: Number (default 0)
  - type: String (default: `user`)

- FoodPartner (`FoodPartner`)
  - name, shopName, email, password, phone
  - profileUrl: String
  - follower / following counts
  - type: `foodPartner`

- FoodItem (`foodItem`)
  - name: String
  - price: Number
  - description: String
  - videoUrl: String (Cloudinary)
  - Likecount: Number
  - commentCount: Number
  - PartnerId: ObjectId -> FoodPartner

- Like (`Like`)
  - food: ObjectId -> foodItem
  - user: ObjectId -> User

- Follower (`follower`)
  - follower: ObjectId -> User
  - followingId: ObjectId -> User or FoodPartner
  - followingType: 'user' | 'foodPartner'

- Order (`Order`)
  - userId, items[], totalAmount, currency, paymentId, orderId, status


## Authentication & authorization

- Authentication is cookie-based. After successful login or registration the server sets a `token` cookie containing a JWT.
- `authUser` and `authFoodPartner` middlewares read `req.cookies.token` and verify it using `process.env.JWT_SECRET`.
- For testing with curl, Postman or HTTP clients remember to store and send cookies (curl: `-c cookies.txt -b cookies.txt`).
- For axios calls: use `withCredentials: true`. For fetch: use `credentials: 'include'`.

Example axios snippet (client-side):

```js
axios.post('/api/users/login', { email, password }, { withCredentials: true })
```


## Endpoint examples (curl)

Replace `localhost:3000` with your server origin if different.

1) Register user (multipart)

```bash
curl -v -c cookies.txt \
  -F "name=Alice" \
  -F "email=alice@example.com" \
  -F "password=secret" \
  -F "profileImage=@/full/path/to/avatar.jpg" \
  http://localhost:3000/api/users/register
```

Response (201):

```json
{
  "message": "User registered successfully",
  "user": { "id":"...", "name":"Alice", "email":"alice@example.com", "profileUrl":"https://..." }
}
```

2) Login user (store cookie)

```bash
curl -v -c cookies.txt -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}' \
  http://localhost:3000/api/users/login
```

3) Call protected endpoint with cookie

```bash
curl -v -b cookies.txt http://localhost:3000/api/users/myorders?id=<USER_ID>
```

4) Register food partner (multipart)

```bash
curl -v -c fp_cookies.txt \
  -F "name=Bob" \
  -F "shopName=Bob's Pizza" \
  -F "email=bob@pizza.com" \
  -F "password=secret" \
  -F "phone=+911234567890" \
  -F "profileImage=@/path/to/avatar.jpg" \
  http://localhost:3000/api/foodPartners/register
```

5) Upload a food video (food partner - needs auth cookie)

```bash
curl -v -b fp_cookies.txt -F "name=Pepperoni Pizza" -F "price=249" -F "description=Delicious" -F "video=@/path/to/video.mp4" http://localhost:3000/api/foodItem
```

6) Like/unlike a food item (user)

```bash
curl -v -b cookies.txt -X POST "http://localhost:3000/api/foodItem/like?id=<FOOD_ID>"
```

7) Create payment order (server -> Razorpay)

```bash
curl -v -b cookies.txt -H "Content-Type: application/json" -d '{"amount":1000,"currency":"INR","receipt":"rcptid_11","cart":[{"_id":"...","qty":1,"price":1000,"name":"Item"}]}' http://localhost:3000/api/users/create-payment-order
```

8) Confirm payment (after successful payment capture on client)

```bash
curl -v -b cookies.txt -H "Content-Type: application/json" -d '{"razorpayPaymentId":"pay_...","razorpayOrderId":"order_...","razorpaySignature":"...","paymentStatus":"success","cart": [...], "amount":1000, "currency":"INR"}' http://localhost:3000/api/users/confirm-payment
```


## Error codes & responses

- 200 OK — Successful requests
- 201 Created — Resources created (register, add food, follow)
- 400 Bad Request — Missing/invalid inputs
- 401 Unauthorized — Missing or expired cookie
- 403 Forbidden — Invalid token
- 404 Not Found — Resource not found
- 500 Internal Server Error — Unexpected server error


## Testing tips

- Use `-v` in curl to see response headers and cookies. After login/register check `Set-Cookie` header to confirm token cookie is issued.
- Use an HTTP client (Postman) and enable cookie persistence.
- For file uploads ensure path is absolute and file exists.



