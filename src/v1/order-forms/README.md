### Create Order-Form
```
POST /v1/order-forms
```

This endpoint is used to create new order for booking a badminton court. The request must include user and yard information and booking time. 

#### Request body
##### Path parameters
*No path parameters required*

##### Header Parameters

`Authorization` *required* *string*: To make REST API calls, include bearer token of user.

##### Body

**sender_id** *string*
Id of user who send the order form

**court_id** *string*
Court ID which order form target. 

**note** *string*
Note of sender to approver of the order form.

**booking_date** *string*
Date of booking, format type `DD-MM-YYYY`.

**start_time** *string*
Start time of booking, It have to be suite one of `start_time` of time slots. Format type `HH:mm`

**end_time** *string*
End time of booking, It have to be suite one of `end_time` of time slots. Format type `HH:mm`

##### Example request:
```
curl -v -X PUT https://api.badminton.com/v1/order-forms/153 \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer 6V7rbVwmlM1gFZKW_8QtzWXqpcwQ6T5vhEGYNJDAAdn' \
-d '{
    "sender_id": "user123",
    "court_id": "court456",
    "note": "Please confirm the booking as soon as possible.",
    "booking_date": "01-08-2024",
    "start_time": "13:00",
    "end_time": "17:00",
}' 
```

##### Example response:
```
{
    "id": 153
    "sender_id": "user123",
    "court_id": "court456",
    "book_status": "pending",
    "created_at": "2024-07-29T12:34:56Z",
    "note": "Please confirm the booking as soon as possible.",
    "payment": {
        "id_payment": 1,
        "status": "pending",
        "payment_details": []
    "timeslot":[
        
    ]
}
```