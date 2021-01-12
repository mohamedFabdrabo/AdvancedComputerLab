run index.js file
listen to port 3000
UMl link https://drive.google.com/file/d/1K6qzBL8iy6DtwEIQ5EJpwarAR_eeZFiv/view
2 GUC Staff Members Functionalities

Functionality: login a student to the system
Route: /login
Request type: POST
Request body: { "email" : "myHOD@email.com", "password": "mypass"}
////////////////////////////////////

Functionality: logout a staff to the system
Route: /logout
Request type: POST
Parameters: staffId is the ID of the staff we are getting his info from token (you have to put {auth-token : 'the token you get'})
Example of how to call the route: /logout (you have to put {auth-token : 'the token you get'}
////////////////////////////////////

Functionality: view profile a staff to the system
Route: /viewProfile
Request type: GET
Parameters: staffId is the ID of the staff we are getting his info from token (you have to put {auth-token : 'the token you get'})
Example of how to call the route: /viewProfile  (you have to put {auth-token : 'the token you get'})
////////////////////////////////////

Functionality: update a hr to the system
Route: /updateProfile
Request type: PUT
Request body: { "email" : "myHr@email.com", "gender": "Male"}
(you have to put {auth-token : 'the token you get'})

////////////////////////////////////

Functionality: update a academic member to the system
Route: /updateProfile
Request type: PUT
Request body: { "email" : "myTA@email.com", "gender": "Male","officeLocation" : "C7.201","salary" = "13" }
(you have to put {auth-token : 'the token you get'})
////////////////////////////////////

Functionality: reset a password a staff to the system
Route: /resetPassword
Request type: PUT
Request body: { "newPassword" : "mynewpass" , "passwordCheck" : "mynewpass"}
(you have to put {auth-token : 'the token you get'})
////////////////////////////////////

Functionality: sign in a staff to the system
Route: /signIn
Request type: POST
Request body: { "dateIn" : "12/15/2020" , "signIn" : true}
(you have to put {auth-token : 'the token you get'})
////////////////////////////////////

Functionality: sign out a staff to the system
Route: /signOut
Request type: POST
Request body: { "dateOut" : "12/15/2020" , "signIn" : false}
(you have to put {auth-token : 'the token you get'})
////////////////////////////////////

Functionality: get all Attendance Records
Route: /ViewAttendance/:month
Request type: GET
Response: Array of Attendance Records .
(you have to put {auth-token : 'the token you get'})
///////////////////////////////////

Functionality: get all missing days
Route: /ViewMissingDays/:month
Request type: GET
Response: Array of Attendance Records . Example of a single record: {'The number of missing Days are : 3}
(you have to put {auth-token : 'the token you get'})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  3   HR functionaloities 
 Functionality: For the HR to add new location
Route:/addLocation
Request type: POST
Request body: {"nam":"c5-113", "cap":"30", "typ":"lab","occ":25}
Example of how to call the route: in postman the route is (/addLocation)
if the types arenot correct or the user is trying to add duplicate location name messages will be printed for him

///////////////////////////////////


Functionality: For the HR to update location
Route:/updateLocation
Request type: GET
Request body: {"nam":"c5-113", "cap":"30", "typ":"lab","occ":25}
Example of how to call the route: in postman the route is (localhost:3000/updateLocation)
using the name of the location we find it and update it's attributes 
so result printed will be the same as  request body and it will get updated in the database

///////////////////////////////////


Functionality: For the HR to delete location
Route:/delLocation
Request type: DELETE
Request body: {"nam":"c5-113"}
Example of how to call the route: in postman the route is (localhost:3000/delLocation)
the location get printed for one last time and then get removed from the database

///////////////////////////////////


Functionality: For the HR to add new faculty
Route:/addFaculty
Request type: POST
Request body: {
"nam":"MET1012",
"department":[]
}
Example of how to call the route: in postman the route is (localhost:3000/addfaculty)
and this records get added in the databases in case we want to add course or departments we fill this array
///////////////////////////////////


Functionality: For the HR to update faculty
Route:/updateFaculty
Request type: GET
Request body:{
"nam":"MET1012",
"newname":"LOL1012",

}

Example of how to call the route: in postman the route is (localhost:3000/updateFaculty)
then the name of the faculty will be updated 

///////////////////////////////////


Functionality: For the HR to DELETEfaculty
Route:/delFaculty
Request type: DELETE
Request body:{"nam":"MET1005"} 
Example of how to call the route: in postman the route is (localhost:3000/delFaculty)
the facutly name is entered as input and then it get deleted from the database

///////////////////////////////////


Functionality: For the HR to addDepartment
Route:/addDepart
Request type: POST
Request body:{"facname":"CSEN",
"nam":"13"}
Example of how to call the route: in postman the route is (localhost:3000/addDepart)
the department get added to the faculty as refs to the departments

///////////////////////////////////


Functionality: For the HR to updateDepartment
Route:/updateDepart
Request type: GET
Request body:{
"oldnam":"wow",
"newnam":"wow1"
     
}
Example of how to call the route: in postman the route is (localhost:3000/updateDepart)
the department name get updated  

///////////////////////////////////


Functionality: For the HR to DELETEDepartment
Route:/delDepart
Request type: DELETE
Request body:{
"nam":"LOL"  
}
Example of how to call the route: in postman the route is (localhost:3000/delDepart)
the department with this name gets deleted

///////////////////////////////////



Functionality: For the HR to AddCourse
Route:/addCourse
Request type: POST
Request body:
{"depname":"CSEN1",
"nam":"Wasteoftime6",
"id":"CSEN-104"
}

Example of how to call the route: in postman the route is (localhost:3000/addCourse)
it searches on the department and then insert this new course into the department

///////////////////////////////////


Functionality: For the HR to updateCourse
Route:/updateCourse
Request type: GET
Request body:
{
"oldid":"CSEN-104",
"newid":"CSEN-105",
"newname":"Wasteoftim"
}
Example of how to call the route: in postman the route is (localhost:3000/updateCourse)
it searches by id and then it updates the id , and the name if needed

///////////////////////////////////



Functionality: For the HR to deleteCourse
Route:/delCourse
Request type: DELETE
Request body:
{
"id":"127" 
}
Example of how to call the route: in postman the route is (localhost:3000/delCourse)
it searches by id and then removes this course from both courses and courses in the department
 
 
 ///////////////////////////////////


 
Functionality: For the HR to add new staff member
Route:/registerMem
Request type: POST
Request body:
 { "gender":"male","name":"Yummy","email":"Yummy14@yahoo.com","salary":1,
 "officeLocation":{"name": "c5-201"},"role":"HOD","dayoff":"Saturday","department":"LOL2"}
or   in case he is HR
 { "gender":"male","name":"Yummy","email":"Yummy15@yahoo.com","salary":1,
 "officeLocation":{"name": "c5-201"},"role":"HR","dayoff":"Saturday","department":""}



Example of how to call the route: in postman the route is (localhost:3000/registerMem)
{
    "courses": [],
    "_id": "5fe5ce5e23483b2ed48bac9e",
    "gender": "male",
    "name": "Yummy",
    "email": "Yummy14@yahoo.com",
    "salary": 1,
    "password": "123456",
    "officeLocation": "5fe4fb1776aabe0aa86709f1",
    "role": "Ho",
    "dayoff": "Saturday",
    "department": "Staff mem",
    "schedule": [],
    "leaves": [],
    "count1": 8,
    "__v": 0,
    "id": "ac-8"
}
the id is auto incremented

 
///////////////////////////////////




Functionality: For the HR to update staff member
Route:/updateMem
Request type: GET
Request body:
{ "id":"hr-0","email":"plziamsuffering3@yahoo.com","officeLocation":"c5-200","role":"HR","dayoff":"Saturday"}
or   in case he is HR
Example of how to call the route: in postman the route is (localhost:3000/updateMem)
the staff member gets his data updated and if the he was hr and he tried to change his dayoff he won't be allowed to update

///////////////////////////////////


Functionality: For the HR to delete staff member
Route:/delMem
Request type: DELETE
Request body:
 { "id":"hr-10"}   in case he is HR
Example of how to call the route: in postman the route is (localhost:3000/delMem)
the staff member gets removed from the system

///////////////////////////////////


Functionality: For the HR to add mising singup 
Route:/addsignup
Request type: POST
Request body:
{
    "id":"hr-13",
    "rec":{"time" :"2018-06-29T13:34:00.000","signIn" :true}
}
Example of how to call the route: in postman the route is (localhost:3000/addsignup)
the staff member missing singup is added to his attendance records

///////////////////////////////////



Functionality: For the HR to add mising singup 
Route:/viewattandence
Request type: GET
Request body:
{
    "id":"hr-13",
}
Example of how to call the route: in postman the route is (localhost:3000/viewattandence)
the staff member attendance record is displayed
[
    {
        "_id": "5fe607c7067e2c2e586094ab",
        "time": "2018-03-29T11:34:00.000Z",
        "signIn": true
    },
    {
        "_id": "5fe608e17b63fd4ffc686bf1",
        "time": "2018-06-29T11:34:00.000Z",
        "signIn": true
    },
    {
        "_id": "5fe60911ffe32554d46f9b90",
        "time": "2020-06-29T11:34:00.000Z",
        "signIn": true
    }
]

///////////////////////////////////



Functionality: For the HR to add mising singup 
Route:/updateSalary
Request type: GET
Request body:
{
    "id":"hr-13",
	"salary1":3333
}
Example of how to call the route: in postman the route is (localhost:3000/updateSalary)
salary get updated to the new value





 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////4.1 HOD functionalities
1
Functionality:  Assign a course instructor for each course in his department
Route: /addInstructor/:id/:course
Request type: PUT
Parameters: course is the name of the course, id is the id of the instructor 
Example of how to call the route: /addInstructor/ac-1/acl
Response: (added successfully)/ (no course with this name)/(no staff with this id)

////////////////////////////////////

Functionality:  delete a course instructor for each course in his department
Route: /deleteInstructor/:id/:course
Request type: PUT
Parameters: course is the name of the course, id is the id of the instructor 
Example of how to call the route: /deleteInstructor/ac-1/acl
Response: (removed successfully)/ (no course with this name)/(no staff with this id)

////////////////////////////////////


Functionality:  delete a course instructor for each course in his department
Route: /deleteInstructor/:id1/:id2/:course
Request type: PUT
Parameters: course is the name of the course, name1 is the name of the old instructor, name2 is the name of the new instructor 
Example of how to call the route: /updateInstructor/ac-1/ac-2/acl
Response: (updated successfully)/ (no course with this name)/(no staff with this id)

2

////////////////////////////////////



Functionality:   View all the staff in his/her department or per course along with their profiles
Route: /viewStaff/:name
Request type: GET
Parameters: name is the name of the course 
Example of how to call the route: /viewStaff/ca OR /viewStaff/all
Response: Array of staff member . Example of a single member:{"courses": [], "_id": "5fdf439297ff8e7dcf8cdfdf", "name": "myTA", "id": "ac-25", "role": "", "email": "myTA@email.com", "password": "mypass", "dayoff": "Sunday", "schedule": [], "leaves": []}


////////////////////////////////////



 3
Functionality:   View the day off of all the staff/ a single staff in his/her department
Route: /viewDaysoff/:id
Request type: GET
Parameters: id is the id of the staff member
Example of how to call the route: /viewDaysoff/all OR /viewDaysoff/ac-1
Response: Array of members and days . Example of a single element: { “name” : “Ahmed”, “dayoff”: “Sunday” }



////////////////////////////////////

4
Functionality:   View all the requests “change day off/leave” sent by staff members in his/her department.
Route: /viewRequests
Request type: GET 
Response: Array of requests . Example of a single request: { id:41, sender: “Ahmed”,reciever: “omar”,state: pending ,reason: “  ”, type: “changeDayOff”}

////////////////////////////////////

5
Functionality: accept a request
Route: /acceptRequest/:rid
Request type: put
Parameters: rid is the request id  
Example of how to call the route: /acceptRequest/5
Response:(accepted successfully) / (you cannot accept this request)

////////////////////////////////////

6
Functionality:   Reject a change day off requets
Route: /rejectRequest/:rid
Request type: put
Request Body:{“reason”: “rejection reason is...”}
Parameters:rid is the request id  
Example of how to call the route: /AcceptDayoffRequest/5
Response:(rejected successfully) / (you cannot reject this request)

////////////////////////////////////

7
Functionality: view course coverage 
Route: /courseCoverage/:name
Request type: GET
Parameters: name is the name of the course
Example of how to call the route:/courseCoverage/acl
Response: acl : 75 (no course with name ) 

////////////////////////////////////

8
Functionality: View teaching assignments (which staff members teach which slots) of course offered by
his department.
Route: /viewAssignments/:name
Request type: GET
Parameters: name is the name of the course
Example of how to call the route: /courseAssignment/acl
Response: Array of assignments . Example of a single assignment: { Ali, Sunday, Second}/(please enter a valid course name)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
4.2
extra
Functionality: add members to courses
Route: /assignMember/:id/:course
Request type: PUT
Parameters: id is the staff member id, course is the course name
Example of how to call the route: /assignMember/ac-1/acl
Response:. (added successfully) /..etc

////////////////////////////////////

1
Functionality: view course coverage 
Route: /courseCoverage/:name
Request type: GET
Parameters: name is the name of the course
Example of how to call the route:/courseCoverage/acl
Response: acl : 75 / (no course with name ) /( you are not allowed to view this course)

////////////////////////////////////

2
Functionality:  View the slots’ assignment of course(s) he/she is assigned to.
Route: /viewAssignments/:name
Request type: GET
Parameters: name is the name of the course
Example of how to call the route: /courseAssignment/acl
Response: Array of assignments . Example of a single assignment: { Ali, Sunday, Second}/(please enter a valid course name) /(you are not an instructor of this course

////////////////////////////////////

3


Functionality:   View all the staff in his/her department or per course along with their profiles
Route: /viewStaff/:name
Request type: GET
Parameters: name is the name of the course 
Example of how to call the route: /viewStaff/ca OR /viewStaff/all
Response: Array of staff member . Example of a single member:{"courses": [], "_id": "5fdf439297ff8e7dcf8cdfdf", "name": "myTA", "id": "ac-25", "role": "", "email": "myTA@email.com", "password": "mypass", "dayoff": "Sunday", "schedule": [], "leaves": []}

////////////////////////////////////

4
Functionality:   Assign an academic member to an unassigned slots in course(s) he/she is assigned to.
Route: /assignSlot/:id/:course/:sid
Request type: PUT
Parameters: id is the staff member id, course is the course name, sid is slot id 
Example of how to call the route: /assignSlot/ac-1/ca/41
Response: (assigned successfully) / ..etc

////////////////////////////////////

5
Functionality:   Update assignment of academic member in course(s) he/she is assigned to.
Route: /updateSlotAssignment/:id/:course/:sid
Request type: PUT
Parameters: id is the new staff member id, course is the course name, sid is slot id 
Example of how to call the route: /updateSlotAssignment/ac-1/ca/41
Response: (updated successfully) / ..etc


////////////////////////////////////

Functionality:  delete assignment of academic member in course(s) he/she is assigned to.
Route: /deleteSlotAssignment/:course/:sid
Request type: PUT
Parameters: course is the course name, sid is slot id 
Example of how to call the route: /deleteSlotAssignment/ca/41
Response: (deleted successfully) / ..etc


////////////////////////////////////

6

Functionality:   Remove an assigned academic member in course(s) he/she is assigned to.
Route: /removefromCourse/:id/:course/
Request type: PUT
Parameters:  id is the staff member id,, course is the course name
Example of how to call the route: /removefromCourse/ac-1/ca/
Response: (removed successfully) / ..etc


////////////////////////////////////

7

Functionality:Assign an academic member in each of his/her course(s) to be a course coordinator.
Route: /assignCoordinator/:id/:course
Request type: put
Parameters: id is the staff member id, course is the course name
Example of how to call the route: /student/ac-1/acl
Response:(assigned successfully)/ (wrong name) /(already added)



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 4.3 Course Coordinator Functionalities

Functionality: View slot linking request(s) from academic members linked to his/her course.
Route: /coordinator/viewSlotLinking
Request type: GET
Parameters: None
Response: Slot_Linking_Requests.
Example :
[
    {
        "_id": "5fe5ac1bb660e7512815e45e",
        "rid": 2,
        "receiver": [
            {
                "_id": "5fe4ee30aa05a3554afa6724"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Pending",
        "type": "Slot-linking",
        "slot": "5fe59d9feb02ba26d08ca842",
        "__v": 0
    },
    {
        "_id": "5fe5ace9316d5855a80d49f9",
        "rid": 4,
        "receiver": [
            {
                "_id": "5fe4ee30aa05a3554afa6724"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Pending",
        "type": "Slot-linking",
        "slot": "5fe59d9feb02ba26d08ca842",
        "__v": 0
    }
]

////////////////////////////////////

Functionality: Accept slot linking requests from academic members linked to his/her course.
Route: /coordinator/acceptSlotLinking
Request type: PUT
Request body: {"request_id":Number}
Request Body: example {"request_id":15}
Response: Slot_Linking_Requests.
Example :{
    "_id": "5fe5ade69ff9680ba8e54371",
    "rid": 8,
    "sender": "5fe4edd6aa05a3554afa6722",
    "receiver": [
        {
            "_id": "5fe4ee30aa05a3554afa6724"
        }
    ],
    "senderComment": "5fe4edd6aa05a3554afa6722",
    "state": "Accepted",
    "type": "Slot-linking",
    "slot": "5fe59d9feb02ba26d08ca842",
    "__v": 0
}

////////////////////////////////////

Functionality: Reject slot linking requests from academic members linked to his/her course.
Route: /coordinator/rejectSlotLinking
Request type: PUT
Request body: {"request_id":Number}
example of Request Body : {"request_id":15}
Response: Slot_Linking_Requests
Example :{
    "_id": "5fe5ade69ff9680ba8e54371",
    "rid": 8,
    "sender": "5fe4edd6aa05a3554afa6722",
    "receiver": [
        {
            "_id": "5fe4ee30aa05a3554afa6724"
        }
    ],
    "senderComment": "5fe4edd6aa05a3554afa6722",
    "state": "Rejected",
    "type": "Slot-linking",
    "slot": "5fe59d9feb02ba26d08ca842",
    "__v": 0
}

////////////////////////////////////

Functionality: Add course slot(s) in his/her course.
Route: /coordinator/AddSlot
Request type: POST
Request body: { "course":String, "day":Date, "timing":String, "type':String, "location":{type:ObjectId(),Ref:location}}
example of Request Body : {"day":"2020-12-25", "timing":"First", "type":"Lab", "location":"5fe4ee30aa05a3554afa6724" }
Response: newSlot .
Example: {
    "_id": "5fe62571d5fd435130cf8e13",
    "course": "5fe4e7def680081c703dcdf8",
    "sid": 6,
    "day": "2020-12-25",
    "timing": "First",
    "type": "Lab",
    "location": "5fe4ee30aa05a3554afa6724",
    "__v": 0
}

////////////////////////////////////

Functionality: Delete course slot(s) in his/her course.
Route: /coordinator/deleteSlot
Request type: Delete
Request body: {"sid":Number}
example of Request Body : {"sid":3}
Response: deleted.
Example : {
    "_id": "5fe62571d5fd435130cf8e13",
    "course": "5fe4e7def680081c703dcdf8",
    "sid": 6,
    "day": "2020-12-25",
    "timing": "First",
    "type": "Lab",
    "location": "5fe4ee30aa05a3554afa6724",
    "__v": 0
}


////////////////////////////////////

Functionality: Update course slot(s) in his/her course.
Route: /coordinator/updateSlot
Request type: PUT
Request body: {
            "sid":Number,
            "day":Date, 
			"timing":String, 
			"type':String, 
			"location":{type:ObjectId(),Ref:location}
				}
Response: The updated Slot.
Example:
{
    "_id": "5fe5abc7dd1ef63c30bf6e10",
    "course": "5fe4e49a2ba3dc3278e2ec64",
    "sid": 5,
    "day": "2020-12-25",
    "timing": "First",
    "type": "Tutorial",
    "__v": 0,
    "location": null
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////// 4.4 Academic member Functionalities

Functionality: View Academic member schedule. Schedule should show teaching activities and replacements if present.
Route: /Academics/viewSchedule
Request type: GET
Parameters: None
Response: Array of All The slots of his/her schedule.
Example of schedule : [
    {
        "_id": "5fe59d9feb02ba26d08ca842",
        "course": "5fe5d9652d8f12e7096ffc16",
        "sid": 1,
        "day": "saturday",
        "timing": "Fourth",
        "type": "lab",
        "__v": 0,
        "location": null
    },
    {
        "_id": "5fe59d9feb02ba26d08ca842",
        "course": "5fe5d9652d8f12e7096ffc16",
        "sid": 1,
        "day": "saturday",
        "timing": "Fourth",
        "type": "lab",
        "__v": 0,
        "location": null
    },
    {
        "_id": "5fe59d9feb02ba26d08ca842",
        "course": "5fe5d9652d8f12e7096ffc16",
        "sid": 1,
        "day": "saturday",
        "timing": "Fourth",
        "type": "lab",
        "__v": 0,
        "location": null
    }
]

////////////////////////////////////

Functionality: view replacement request(s).
Route: /Academics/ViewReplacements
Request type: GET
Parameters: None
Response: All The Replacements requests sent to him/her.
Example:
[
   
    {
        "_id": "5fe5d47d0a27fa3e509d5ad5",
        "rid": 100,
        "sender": "5fe4edd6aa05a3554afa6722",
        "receiver": [
            {
                "_id": "5fe4ee55aa05a3554afa6725"
            },
            {
                "_id": "5fe4edd6aa05a3554afa6722"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Accepted",
        "type": "Replacement",
        "__v": 0
    },
    {
        "_id": "5fe5d4f8098c0e47f0af0d88",
        "rid": 12,
        "sender": "5fe4edd6aa05a3554afa6722",
        "receiver": [
            {
                "_id": "5fe4ee55aa05a3554afa6725"
            },
            {
                "_id": "5fe4edd6aa05a3554afa6722"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Pending",
        "type": "Replacement",
        "requested_day": "2002-12-09T00:00:00.000Z",
        "__v": 0
    }
]

////////////////////////////////////

Functionality: Send replacement request(s).
Route: /Academics/SendReplacementRequest
Request type: POST
Request body: {"sender":String, "receiver":Array, "senderComment":String,"requested_day":Date }
Response: The new Request
Example : {"_id":{"$oid":"5fe5d4f8098c0e47f0af0d88"},
			"rid":12,
			"sender":"5fe4edd6aa05a3554afa6722",
			"receiver":[{"_id":{"$oid":"5fe4ee55aa05a3554afa6725"}},{"_id":{"$oid":"5fe4edd6aa05a3554afa6722"}}],
			"senderComment":"5fe4edd6aa05a3554afa6722",
			"state":"Pending",
			"type":"Replacement",
			"requested_day":{"$date":"2002-12-09T00:00:00.000Z"},
			"__v":0}

////////////////////////////////////

Functionality: Send a "slot linking" request (automatically sent to course coordinator). A "slot linking" request is a request done by the academic member to indicate their desire to teach a slot.
Route: /Academics/SendSlotLinkingRequest
Request type: POST
Request body: {"sender":String, "receiver":Array, "senderComment":String,"slot_id":Number }
Response: newRequest.
Example : {
    "_id": "5fe621ba15112120bc875cc6",
    "rid": 15,
    "sender": "5fe4edd6aa05a3554afa6722",
    "receiver": [
        {
            "_id": "5fe4ee55aa05a3554afa6725"
        }
    ],
    "senderComment": "5fe4edd6aa05a3554afa6722",
    "state": "Pending",
    "type": "Slot-linking",
    "slot": "5fe59d9feb02ba26d08ca842",
    "__v": 0
}

////////////////////////////////////


Functionality: Change their day off by sending a "change day off" request (automatically sent to HOD) and optionally leave a reason.
Route: /Academics/ChangeDayoffRequest
Request type: POST
Request body: {
            "day":String,
			"senderComment":String
        }
Response: newRequest . Example of a single newRequest : {  }
Example :{"_id":{"$oid":"5fe5ea318825b414d8c3ee20"},
			"rid":13,
			"sender":"5fe4ee30aa05a3554afa6724",
			"receiver":[{"_id":{"$oid":"5fe4edd6aa05a3554afa6722"}}],
			"senderComment":"I am sicko",
			"state":"rejected",
			"type":"dayOffChange",
			"newDayOff":{"$date":"2019-10-05T03:35:32.000Z"},
			"__v":0
			}


////////////////////////////////////

Functionality: View the status of all submitted requests. They can also view only the accepted requests, only the pending requests or only the rejected requests.
Route: /Academics/ViewRequests
Request type: GET
Parameters: status is the status of the requests we are getting info about
Example of how to call the route: /ViewRequests/accepted
Response: output . 
Example of a single output : [
    {
        "_id": "5fe5ade69ff9680ba8e54371",
        "rid": 8,
        "sender": "5fe4edd6aa05a3554afa6722",
        "receiver": [
            {
                "_id": "5fe4ee30aa05a3554afa6724"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Accepted",
        "type": "Slot-linking",
        "slot": "5fe59d9feb02ba26d08ca842",
        "__v": 0
    },
    {
        "_id": "5fe5d45cd25ed31ed0831cb5",
        "rid": 9,
        "sender": "5fe4edd6aa05a3554afa6722",
        "receiver": [
            {
                "_id": "5fe4ee55aa05a3554afa6725"
            },
            {
                "_id": "5fe4edd6aa05a3554afa6722"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Pending",
        "type": "Replacement",
        "__v": 0
    },
    {
        "_id": "5fe5d47d0a27fa3e509d5ad5",
        "rid": 100,
        "sender": "5fe4edd6aa05a3554afa6722",
        "receiver": [
            {
                "_id": "5fe4ee55aa05a3554afa6725"
            },
            {
                "_id": "5fe4edd6aa05a3554afa6722"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Accepted",
        "type": "Replacement",
        "__v": 0
    },
    {
        "_id": "5fe5d4de0a27fa3e509d5ad8",
        "rid": 11,
        "sender": "5fe4edd6aa05a3554afa6722",
        "receiver": [
            {
                "_id": "5fe4ee55aa05a3554afa6725"
            },
            {
                "_id": "5fe4edd6aa05a3554afa6722"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Pending",
        "type": "Replacement",
        "__v": 0
    },
    {
        "_id": "5fe5d4f8098c0e47f0af0d88",
        "rid": 12,
        "sender": "5fe4edd6aa05a3554afa6722",
        "receiver": [
            {
                "_id": "5fe4ee55aa05a3554afa6725"
            },
            {
                "_id": "5fe4edd6aa05a3554afa6722"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Pending",
        "type": "Replacement",
        "requested_day": "2002-12-09T00:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "5fe621ba15112120bc875cc6",
        "rid": 15,
        "sender": "5fe4edd6aa05a3554afa6722",
        "receiver": [
            {
                "_id": "5fe4ee55aa05a3554afa6725"
            }
        ],
        "senderComment": "5fe4edd6aa05a3554afa6722",
        "state": "Pending",
        "type": "Slot-linking",
        "slot": "5fe59d9feb02ba26d08ca842",
        "__v": 0
    }
]


////////////////////////////////////

Functionality: Submit any type of "leave" request (automatically sent to HOD). "Compensation" leave must have a reason. For any other leave, academic members can optionally write a brief reason behind it. Accepted leaves are not calculated as missing hours or missing days.
Route: /Academics/SubmitLeaveRequest
Request type: POST
Request body: {
            "reason":String,
            "type":String,
            "requested_day":Date,
            duration:Number
        }
Example : {
  "type":"Compensation",
  "reason":"balabizo",
  "day":"2020-12-26",
  "duration":1
}
Response: newRequest . 
Example of a single newRequest : {
    "_id": "5fe6233615112120bc875cc9",
    "rid": 16,
    "sender": "5fe4edd6aa05a3554afa6722",
    "receiver": [
        {
            "_id": "5fe4edd6aa05a3554afa6722"
        }
    ],
    "senderComment": "balabizo",
    "state": "Pending",
    "type": "Compensation",
    "requested_day": "2020-12-26T00:00:00.000Z",
    "__v": 0
}

////////////////////////////////////


Functionality: Cancel a still pending request or a request whose day is yet to come.
Route: /Academics/DeleteRequest
Request type: Delete
Request body: {"request_id":Number} example : {"request_id":16}
Response: "request deleted successfully !!"
