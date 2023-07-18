# rest-api-auth
Express, MySQL, Jwt, Bcryptjs


__.env Config__
   ```dotenv
    SALT='6' //соль для хеширования праоля
    SECRET_JWT='QQWEQASDvD' //секретный jwt токен
    DATABASE_MYSQL='mysql://admin:5Gq5BDuYspP@localhost:3306/rest-api-users' // ''mysql://<login>:<password>@<localhost>:<port>/<name>''
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
   {"firstName":"name","email":"email@email.ru","password":"myPassword"}
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

   ```user/profiles```
 
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
                "firstName": "Name",
                "lastName": "NaN",
                "photo": "NaN",
                "password": "HashPassword",
                "gender": "NaN",
                "createdOn": "Register DateTime"
            },...
    ```
    *Также данный роут принимает необязательное поле* **userId**

   ```user/profiles/:id```
    
    *Возвращает профиль пользователя по* **Id**


4. __Редактирование профиля.__

   Редактирование происходит по роуту:

   ``` user/edit ```

   ```METHOD: PUT```

   ```Middleware: | AuthGuard | ValidateMiddleware: UserEditDto |```

     Роут принимает обязательные поля Headers формата:
   ```HEADERS
   Authorization: Bearer JWT_TOKEN
   ```
   *Редактирование происходит по полю email, который берется из **JWT_TOKEN***

    Роут принимает необязательные поля Json формата:

    ```JSON
    {
      "firstName":"Name",
      "lastName":"lastName",
      "gender": "GENDER"  // 'femali' или 'male'
      "email":"email"
    }
   ```
   Необязательные поле **file** с максимальным размером **10мб** формата: 

    ```Name: img. FILE_TYPE: .PNG, .JPG, .GIF, .JPEG```
 
   *Сохраняет файл в папку **/public/photo** с уникальным **uuid** который записывается в БД.
   Если у данного **user** уже присутствует фотография,то файл и данные в БД будут перезаписаны на новые.*

   **Метод возвращает Json обновленного профиля**


5. __Получение Статики.__
   
   *Статические файлы из папки **/public/photo/** можно получить по пути:*
 
   ``domainName:port/fileName``
