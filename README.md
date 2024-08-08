# PARKEASE API

- [PARKEASE API](#parkease-api)
- [ENDPOINTS](#endpoints)
    - [1. CLIENTS](#1-clients)
      - [SIGNUP](#signup)
      - [LOGIN](#login)
      - [LOGOUT](#logout)
    - [2. MEMBERSHIPS](#2-memberships)
      - [CREATE](#create)
      - [LIST ALL](#list-all)
      - [GET ONE](#get-one)
      - [UPDATE](#update)
      - [DELETE](#delete)
    - [3. ADMINISTRATORS](#3-administrators)
      - [SIGNUP](#signup-1)
      - [LOGIN](#login-1)
      - [LOGOUT](#logout-1)
      - [LIST ALL](#list-all-1)
      - [UPDATE](#update-1)
      - [DELETE](#delete-1)

# <u>ENDPOINTS</u>

### 1. CLIENTS

> **- Base URL:** /api/v1/client
> **- headers:** {
>   user-access-token: JWT
> }

#### <li>SIGNUP

> **- Method:** POST
> **- Endpoint:** /signup
> **- Params:** {
> names: string,
> lastnames: string,
> email: string,
> phoneNumber: number,
> birthDay: string,
> password: string
> }
> **- Authorization:** None

#### <li>LOGIN

> **- Method:** POST
> **- Endpoint:** /login
> **- Params:** {
> email: string,
> password: string
> }
**- Authorization:** None

#### <li>LOGOUT

> **- Method:** POST
> **- Endpoint:** /login
> **- Params:** {
> email: string,
> password: string
> }
**- Authorization:** user-access-token

<!-->
#### <li>LIST ALL

> **- Method:** GET
> **- Endpoint:** /list
> **- Params:** {}
**- Authorization:** admin-access-token

#### <li>GET ONE

> **- Method:** GET
> **- Endpoint:** /get-by/email/:email?
> **- Params:** {
> email: string
> }
**- Authorization:** admin-access-token
#### <li>UPDATE

> **- Method:** PUT
> **- Endpoint:** /update/:email?
> **- Params:** {
> email: string
> }
> **- Authorization:** admin-access-token

#### <li>DELETE

> **- Method:** DELETE
> **- Endpoint:** /delete/:email?
> **- Params:** {
> email: string
> }
**- Authorization:** admin-access-token
<!-->

### 2. <u>MEMBERSHIPS</u>

> **- Base URL:** /api/v1/membership
> **- headers:** {
>   user-access-token: JWT,
>   admin-access-token: JWT
> }

#### <li>CREATE

> **- Method:** POST
> **- Endpoint:** /new
> **- Params:** {
> client: object,
> vehicle: {
> plateNumber: string,
> model: string,
> year: number
> color: string
> },
> email: string,
> phoneNumber: number,
> birthDay: string,
> password: string
> }

#### <li>LIST ALL

> **- Method:** GET
> **- Endpoint:** /list
> **- Params:** {}
> **- Authorization:** admin-access-token

#### <li>GET ONE

> **- Method:** GET
> **- Endpoint:** /list-by/email/:email?
> **- Params:** {
> email: string
> }> **- Authorization:** admin-access-token

#### <li>UPDATE

> **- Method:** PUT
> **- Endpoint:** /update/:email?
> **- Params:** {
> email: string
> }
> **- Authorization:** user-access-token
> 
#### <li>DELETE

> **- Method:** DELETE
> **- Endpoint:** /delete/:email?
> **- Params:** {
> email: string
> }
> **- Authorization:** user-access-token
> 
### 3. <u>ADMINISTRATORS</u>

> **- Base URL:** /api/v1/admin
> **- headers:** {
>   admin-access-token: JWT
> }

#### <li>SIGNUP

> **- Method:** POST
> **- Endpoint:** /signup
> **- Params:** {
> names: string,
> lastnames: string,
> email: string,
> phoneNumber: number,
> password: string
> }
> **- Authorization:** admin-access-token
> 
#### <li>LOGIN

> **- Method:** POST
> **- Endpoint:** /login
> **- Params:** {
> names: string,
> password: string
> }
> **- Authorization:** None

#### <li>LOGOUT
> **- Method:** POST
> **- Endpoint:** /logout
> **- Params:** {}
> **- Authorization:** admin-access-token

#### LIST ALL

> **- Method:** GET
> **- Endpoint:** /list
> **- Params:** {
> }
> **- Authorization:** admin-access-token

#### UPDATE

> **- Method:** PUT
> **- Endpoint:** /update/:email?
> **- Params:** {
> email: string
> }
> **- Authorization:** admin-access-token

#### DELETE

> **- Method:** DELETE
> **- Endpoint:** /delete/:email?
> **- Params:** {
> email: string
> }
> **- Authorization:** admin-access-token
> 