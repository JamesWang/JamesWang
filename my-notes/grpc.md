### Tools for grpc
* grpcurl
 * discover serivces
   * grpcurl --plaintext <host>:<port> list
   * grpcurl --plaintext <host>:<port> list <specific service>
   ```  
    $ grpcurl --plaintext <host>:<port> list Order
    Order.Get
    Order.create
   ```
 * Query
  * grpcurl -d '{"order_id" : "1"}' -plaintext <host>:<port> Order/Get
    ```
       grpcurl -d '{"order_id" : "1"}' -plaintext <host>:<port> Order/Get
      {
        "userId": "123"
      }
    ```
* Postman
* ![image](https://github.com/user-attachments/assets/5653dedf-fae7-4c55-98a5-c97e0cff825e)
    
