# rest-api-auth
Express, Jwt, Bcryptjs


__.env Config__
   ```dotenv
    SALT='10' //соль для хеширования праоля
    SECRET_JWT='QQWEQASDvD' //секретный jwt токен
```



__USER_SCHEMA__
   ```JS
   model UserModel{
      id Int @id @default(autoincrement())
      email String  @unique
      firstName String
      lastName String @default("NaN")
      photo String @default("NaN")
      password String
      gender String @default("NaN")
      createdOn DateTime @default(now())
   }
```


1. __Регистрация.__ 

    Регистрация происходит по роуту:

    ``` user/register ``` 

    ```METHOD: POST```
   
   ```Middleware: | ValidateMiddleware: UserRegisterDto |```
        
   Роут принимает обязательные поля Json формата:

   ```JSON
   {"name":"name","email":"email@email.ru","password":"myPassword"}
   ```
      *При успешной авторизации роут возвращает Json имеющий следующие поля:*
   ```JSON
   {"msg": {"email": "email@email.ru","id": 1}}
   ```
2. __Авторизация.__
   
    Авторизация по роуту:
   
    ```user/login```
  
   ```METHOD: POST```

   ```Middleware: | ValidateMiddleware: UserLoginDto |```

   Роут принимает обязательные поля Json формата:   
   ```JSON
   {"email":"email@email.ru","password":"myPassword"}
   ```
    *При успешной авторизации роут возвращает Json имеющий следующие поля:*
   ```JSON
   {"msg": {"jwt": "JWT_TOKEN"}}
    ```
3. __Получение профилей.__

   Получение профилей по роуту:

   ```user/info```
 
   ```METHOD: GET```

   ```Middleware: | AuthGuard |```

   Роут принимает обязательные поля Headers формата:
   ```HEADERS
   Authorization: Bearer JWT_TOKEN
   ```
   *При успешной валидации JSON_TOKEN роут возвращает все профили в Json имеющий следующие поля:*
   ```JSON
   {
      "msg": {
          "users": [
            {
                "id": 2,
                "email": "userEmail@email.ru",
            },...
    ```
   
