## CRUD operation. Example

web service availabe on render: https://goit-test-books.onrender.com

### MongoDB. Model Schemas
- Book
  - title: string, required
  - author: string, required

### Routes

#### Get all books
Endpoint
```
GET /books?page:number&limit:number
```
Response
```
[{_id: ObjectId, title: string, author: string}]
```

#### Get book by id
Endpoint
```
GET /books/:id
```
Response
```
{_id: ObjectId, title: string, author: string}
```

#### Add new book
Fields title and author required should be string at least 1 symbol and no more than 100, only alphanumeric <br/>
Endpoint
```
POST /books
```
Request body
```
{title: string, author: string}
```
Response
```
{_id: ObjectId, title: string, author: string}
```

#### Update an exist book by id
Fields title and author required should be string at least 1 symbol and no more than 100, only alphanumeric. Send all fields with and without changes <br/>
Endpoint
```
PUT /books/:id
```
Request body
```
{_title: string, author: string}
```
Response
```
{_id: ObjectId, title: string, author: string}
```

#### Delete book by id
Endpoint
```
DELETE /books/:id
```
Response
```
true
```
