const express = require('express');
const jwt=require('jsonwebtoken');
const courses = require('../models/course');
const AcademicMembers = require('../models/AcademicMemberModel');
const Departments = require('../models/DepartmentModel');
const requests = require('../models/request');
const slot = require('../models/slot');
const router = express.Router();
const Joi = require("joi");
const { response } = require('../app');
const { Mongoose } = require('mongoose');
const { string } = require('joi');
const course = require('../models/course');
module.exports = router;
const auth = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ msg: "byo byo authority" });
        }

        const jwt_pass = "sign";
        const verified = jwt.verify(token, jwt_pass);
        if (!verified) {
            return res.status(401).json({ msg: "byo byo not verified" });
        }

        // console.log(verified);
        req.user = verified.id;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
//HOD functionalities
//functionality 1 add course instructor
router.route('/addInstructor/:name/:course').put(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const mydepm = await Departments.findOne({ name: user.department });
        const mycourses = mydepm.courses;
        var myinstructor, mycourse;
        mycourses.forEach(async (element, index, arr) => {
            const course = await courses.findOne({ _id: element })
            if (req.params.course == course.name) {
                mycourse = course;
            }
            if (index == arr.length - 1)

                if (!mycourse)
                    res.json("no course with this name in your department");

                else proceed();
        });

        function proceed() {
            const mymembers = mydepm.academicmem;
            mymembers.forEach(async (element, index, arr) => {
                const mymember = await AcademicMembers.findOne({ _id: element });
                if (req.params.name == mymember.name) {
                    myinstructor = mymember;
                }
                if (index == arr.length - 1)

                    if (!myinstructor)
                        res.json("no staff member with this name in your department");
                    else
                        if (!mycourse.instructors.includes(myinstructor._id)) {
                            mycourse.instructors.push(myinstructor);
                            mycourse.academicMembers.push(myinstructor);
                            myinstructor.role = "Instructor";
                            myinstructor.courses.push(mycourse);
                            await myinstructor.save();
                            await mycourse.save();
                            res.json("add successfully");
                        }
                        else
                            res.json("already there")

            });

        }
    }
    catch (error) {
        res.json({ message: error })
    }
});

router.route('/deleteInstructor/:name/:course').put(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const mydepm = await Departments.findOne({ name: user.department });
        const mycourses = mydepm.courses;
        var myinstructor, mycourse;
        mycourses.forEach(async (element, index, arr) => {
            const course = await courses.findOne({ _id: element })
            if (req.params.course == course.name) {
                mycourse = course;
            }
            if (index == arr.length - 1)

                if (!mycourse)
                    res.json("no course with this name in your department");

                else proceed();
        });

        function proceed() {
            const mymembers = mycourse.instructors;
            mymembers.forEach(async (element, index, arr) => {
                const mymember = await AcademicMembers.findOne({ _id: element });
                if (req.params.name == mymember.name) {
                    myinstructor = mymember;
                }
                if (index == arr.length - 1)
                    if (!myinstructor)
                        res.json("no instructor with this name in this course");
                    else {
                        removeA(mycourse.instructors, myinstructor._id);
                        removeA(mycourse.academicMembers, myinstructor._id);
                        myinstructor.courses.push(mycourse);
                        removeA(myinstructor.courses, mycourse._id);
                        myinstructor.role = "";
                        await myinstructor.save();
                        await mycourse.save();
                        res.json("removed successfully")
                    }

            });

        }
    }
    catch (error) {
        res.json({ message: error })
    }
});

router.route('/updateInstructor/:name1/:name2/:course').put(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const mydepm = await Departments.findOne({ name: user.department });
        const mycourses = mydepm.courses;
        var myinstructor, mycourse, newinstructor;
        mycourses.forEach(async (element, index, arr) => {
            const course = await courses.findOne({ _id: element })
            if (req.params.course == course.name) {
                mycourse = course;
            }
            if (index == arr.length - 1)

                if (!mycourse)
                    res.json("no course with this name in your department");

                else proceed();
        });

        function proceed() {
            const mymembersx = mydepm.academicmem;
            mymembersx.forEach(async (element, index, arr) => {
                const mymember = await AcademicMembers.findOne({ _id: element });
                if (req.params.name2 == mymember.name) {
                    newinstructor = mymember;
                }
                if (index == arr.length - 1)

                    if (!newinstructor)
                        res.json("no staff member with this name in your department");
                    else
                        proceed2();

            });
        }
        function proceed2() {
            const mymembers = mycourse.instructors;
            mymembers.forEach(async (element, index, arr) => {
                const mymember = await AcademicMembers.findOne({ _id: element });
                if (req.params.name1 == mymember.name) {
                    myinstructor = mymember;
                    //console.log(myinstructor)
                }
                if (index == arr.length - 1)
                    if (!myinstructor)
                        res.json("no instructor in this course matches the name you entered");
                    else {
                        removeA(mycourse.instructors, myinstructor._id);
                        removeA(mycourse.academicMembers, myinstructor._id);
                        mycourse.instructors.push(newinstructor);
                        mycourse.academicMembers.push(newinstructor);
                        newinstructor.role = "Instructor";
                        newinstructor.courses.push(mycourse);
                        removeA(myinstructor.courses, mycourse._id);
                        await newinstructor.save();
                        myinstructor.role = "";
                        await myinstructor.save();
                        mycourse.save();
                        res.json("updated successfully")
                    }

            });

        }
    }
    catch (error) {
        res.json({ message: error })
    }
});

//functionality 2 view staff in his department or per course 
router.route('/viewStaff/:name').get(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD" | user.role != "Instructor") {
            res.json("access denied")
        }
        const depname = user.department;
        const mydepm = await Departments.findOne({ name: depname });
        let staff = mydepm.academicmem;
        let found = false
        if (req.params.name != "all") {
            await mydepm.courses.forEach(async (element, index, arr) => {
                const mycourse = await courses.findOne({ _id: element });
                console.log(mycourse)
                if (req.params.name == mycourse.name) {
                    staff = mycourse.academicMembers;
                    found = true;
                    console.log(found);
                }
                if (index == arr.length - 1)
                    proceed();


            });
        }
        else
            proceed()
        function proceed() {
            var view = [];
            staff.forEach(async (member, index, arr) => {
                const x = await AcademicMembers.findOne({ _id: member });
                view.push(x);
                if (index == arr.length - 1) {
                    if (req.params.name != "all") {
                        if (!found)
                            res.json("no course with this name in your department");
                        else
                            res.json(view);

                    }
                    else
                        res.json(view);
                }
            });
        }

    }


    catch (error) {
        res.status(500).json({ error: error.message })
    }

})


//functionality 3 View the day off of all the staff/ a single staff in his/her department
router.route('/viewDaysoff/:name').get(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id }).catch();
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const depname = user.department;
        const mydepm = await Departments.findOne({ name: depname });
        let staff = mydepm.academicmem;
        var days = new Array();
        let found = false;
        staff.forEach(async (member, index, arr) => {
            const x = await AcademicMembers.findOne({ _id: member })
            const dayoff = x.dayoff;
            const name = x.name;
            if (req.params.name == "all") {
                days.push({ name, dayoff });
            }
            else {
                if (req.params.name == x.name) {
                    found = true;
                    days.push({ name, dayoff });
                    console.log(name, dayoff);
                }
            }
            if (index == arr.length - 1) {
                if (req.params.name != "all") {
                    if (!found)
                        res.send("no staff member with this name in your department");
                    else
                        res.send(days[0]);
                }
                else
                    res.send(days);
            }

        });


    }
    catch (error) {
        res.json({ message: error })
    }
});



//functionality 4  View all the requests “change day off/leave” sent by staff members in his/her department.
router.route('/viewRequests').get(auth, async (req, res) => {

    try {

        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const reqs = await requests.find({
            type: { $in: ["Compensation", "Annual", "dayOffChange", "Sick", "Maternity", "Accidental"] },
            state: { $in: ["Pending", "Accepted", "Rejected", "Cancelled"] }, senderDep: user.department
        })
        console.log(reqs);
        res.send(reqs);

    }
    catch (error) {
        res.json({ message: error })
    }
});

//functionality 5 Accept  a request

router.route('/acceptRequest/:rid').put(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const request = await requests.findOne({ rid: req.params.rid });
        if (request.state != "Pending")
            res.json("you can't reject this request")
        else {
            request.state = "Accepted";
            request.save();
            res.json("accepted successfully")
            switch (request.type) {
                case "dayOffChange":
                    const sending = await AcademicMembers.findOne({ _id: request.sender })
                    sending.dayoff = request.newDayoff;
                    await sending.save();
                    break;
                case y:
                    // code block
                    break;
                default:
                // code block
            }
        }
    }
    catch (error) {
        res.json({ message: error })
    }
});


//functionality 6 Reject  a request
router.route('/rejectRequest/:rid').put(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const request = await requests.findOne({ rid: req.params.rid });
        if (request.state != "Pending")
            res.json("you can't reject this request")
        else {
            request.state = 'rejected';
            request.recieverComment = req.body.reason;
            request.save();
            res.json("rejected successfully")
        }
    }
    catch (error) {
        res.json({ message: error })
    }
});


//functionality 7 view course coverage 
router.route('/courseCoverage/:name').get(auth, async (req, res) => {
    try {

        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id });
        if (user.role != "HOD" | user.role != "Instructor") {
            res.json("access denied")
        }
        const depname = user.department;
        const mydepm = await Departments.findOne({ name: depname });
        let result;
        const mycourses = mydepm.courses;
        mycourses.forEach(async (element, index, arr) => {
            const mycourse = await courses.findOne({ _id: element });
            if (mycourse.name == req.params.name) {
                result = mycourse.coverage;
                if (!mycourse.instructors.includes(user._id) && user.role == "Instructor")
                    res.json("your are not an instructor of this course")
                else
                    res.json(req.params.name + " : " + result);
            }
            else
                if (index == arr.length - 1)
                    res.json("please enter a valid course name");
        });
    }
    catch (error) {
        res.json({ message: error })
    }
});


//funvtionality 8 view course assignments 
router.route('/viewAssignments/:name').get(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id });
        if (user.role != "HOD" | user.role != "Instructor") {
            res.json("access denied")
        }
        else {
            const depname = user.department;
            const mydepm = await Departments.findOne({ name: depname });
            let  mycourse;
            const mycourses = mydepm.courses;
            mycourses.forEach(async (element, index, arr) => {
                const course = await courses.findOne({ _id: element });
                if (course.name == req.params.name) {
                    mycourse = course;
                    if (!mycourse.instructors.includes(user._id) && user.role == "Instructor")
                        res.json("your are not an instructor of this course")
                    else
                        res.json(mycourse.slots);
                }
                else
                    if (index == arr.length - 1)
                        res.json("please enter a valid course name");
            });
        }
    }
    catch (error) {
        res.json({ message: error })
    }
});

//-------------------------------------------------------------------------------------------------------------------------
//instructor functionalties (1, 2, 3 are repeated at HOD) 1 is 7, 2 is 8, 3 is 2 

///functionality 8 assign an academic member to be a course coordinator  
router.route('/assignCoordinator/:name:/course').put(auth, async (req, res) => {
    try {

        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ id: token_id });
        if (user.role != "Instructor") {
            res.json("access denied")
        }
        else {
            var mycourse;
            let found = false;
            user.courses.forEach(async (element, index, arr) => {
                const course = await courses.findOne({ _id: element })
                if (course.instructors.includes(user._id) && course.name == req.params.course) {
                    mycourse = course;
                    found = true;
                }
                if (index == arr.length - 1 && found == false)
                    res.json("please enter a valid course name ")
                else
                    proceed();

            });
            async function proceed() {
                const mycoordinator = await AcademicMembers.findOne({ name: req.params.name });
                if (!mycoordinator)
                    res.json("no staff member with this name")
                else {
                    if (mycourse.coordinator = mycoordinator._id)
                        res.json("already assigned");
                    else {
                        mycourse.coordinator = mycoordinator._id;
                        mycourse.academicMembers.push(mycoordinator);
                        mycoordinator.role = "coordinator";
                        mycoordinator.courses.push(mycourse);
                        mycoordinator.save();
                        mycourse.save();
                        res.json("assigned successfully");
                        console.log(mycoordinator, mycourse);
                    }
                }
            }
        }
    }
    catch (error) {
        res.json({ message: error })
    }
});






/*
 const loginSchema = Joi.object({
            email : Joi.string().email().required(),
            password : Joi.string().required()
        })
        const result = loginSchema.validate(req.body);
        if(result)
        {
            return res.json(result.error.details);
        }else{
            اكتب هنا .. كدا هو عدى تمام
        } */


//helper method
function removeA(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}