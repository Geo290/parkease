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

> **<li> Base URL:** /api/v1/client
> **<li> headers:** {
>   user-access-token: JWT
> }

#### <li>SIGNUP

> **<li> Method:** POST
> **<li> Endpoint:** /signup
> **<li> Params:** {
> names: string,
> lastnames: string,
> email: string,
> phoneNumber: number,
> birthDay: string,
> password: string
> }
> **<li> Authorization:** None

#### <li>LOGIN

> **<li> Method:** POST
> **<li> Endpoint:** /login
> **<li> Params:** {
> email: string,
> password: string
> }
**<li> Authorization:** None

#### <li>LOGOUT

> **<li> Method:** POST
> **<li> Endpoint:** /login
> **<li> Params:** {
> email: string,
> password: string
> }
**<li> Authorization:** user-access-token

<!-->
#### <li>LIST ALL

> **<li> Method:** GET
> **<li> Endpoint:** /list
> **<li> Params:** {}
**<li> Authorization:** admin-access-token

#### <li>GET ONE

> **<li> Method:** GET
> **<li> Endpoint:** /get-by/email/:email?
> **<li> Params:** {
> email: string
> }
**<li> Authorization:** admin-access-token
#### <li>UPDATE

> **<li> Method:** PUT
> **<li> Endpoint:** /update/:email?
> **<li> Params:** {
> email: string
> }
> **<li> Authorization:** admin-access-token

#### <li>DELETE

> **<li> Method:** DELETE
> **<li> Endpoint:** /delete/:email?
> **<li> Params:** {
> email: string
> }
**<li> Authorization:** admin-access-token
<!-->

### 2. <u>MEMBERSHIPS</u>

> **<li> Base URL:** /api/v1/membership
> **<li> headers:** {
>   user-access-token: JWT,
>   admin-access-token: JWT
> }

#### <li>CREATE

> **<li> Method:** POST
> **<li> Endpoint:** /new
> **<li> Params:** {
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

> **<li> Method:** GET
> **<li> Endpoint:** /list
> **<li> Params:** {}
> **<li> Authorization:** admin-access-token

#### <li>GET ONE

> **<li> Method:** GET
> **<li> Endpoint:** /list-by/email/:email?
> **<li> Params:** {
> email: string
> }> **<li> Authorization:** admin-access-token

#### <li>UPDATE

> **<li> Method:** PUT
> **<li> Endpoint:** /update/:email?
> **<li> Params:** {
> email: string
> }
> **<li> Authorization:** user-access-token
> 
#### <li>DELETE

> **<li> Method:** DELETE
> **<li> Endpoint:** /delete/:email?
> **<li> Params:** {
> email: string
> }
> **<li> Authorization:** user-access-token
> 
### 3. <u>ADMINISTRATORS</u>

> **<li> Base URL:** /api/v1/admin
> **<li> headers:** {
>   admin-access-token: JWT
> }

#### <li>SIGNUP

> **<li> Method:** POST
> **<li> Endpoint:** /signup
> **<li> Params:** {
> names: string,
> lastnames: string,
> email: string,
> phoneNumber: number,
> password: string
> }
> **<li> Authorization:** admin-access-token
> 
#### <li>LOGIN

> **<li> Method:** POST
> **<li> Endpoint:** /login
> **<li> Params:** {
> names: string,
> password: string
> }
> **<li> Authorization:** None

#### <li>LOGOUT
> **<li> Method:** POST
> **<li> Endpoint:** /logout
> **<li> Params:** {}
> **<li> Authorization:** admin-access-token

#### LIST ALL

> **<li> Method:** GET
> **<li> Endpoint:** /list
> **<li> Params:** {
> }
> **<li> Authorization:** admin-access-token

#### UPDATE

> **<li> Method:** PUT
> **<li> Endpoint:** /update/:email?
> **<li> Params:** {
> email: string
> }
> **<li> Authorization:** admin-access-token

#### DELETE

> **<li> Method:** DELETE
> **<li> Endpoint:** /delete/:email?
> **<li> Params:** {
> email: string
> }
> **<li> Authorization:** admin-access-token
> 