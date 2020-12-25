const express = require('express');
const jwt = require('jsonwebtoken');
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
const { duration } = require('moment');
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
router.route('/addInstructor/:id/:course').put(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            return res.json("access denied")
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
                    return res.json("no course with this name in your department");

                else proceed();
        });

        function proceed() {
            const mymembers = mydepm.academicmem;
            mymembers.forEach(async (element, index, arr) => {
                const mymember = await AcademicMembers.findOne({ _id: element });
                if (req.params.id == mymember.member_id) {
                    myinstructor = mymember;
                }
                if (index == arr.length - 1)

                    if (!myinstructor)
                        return res.json("no staff member with this id in your department");
                    else
                        if (!mycourse.instructors.includes(myinstructor._id)) {
                            mycourse.instructors.push(myinstructor);
                            mycourse.academicMembers.push(myinstructor);
                            myinstructor.role = "Instructor";
                            myinstructor.courses.push(mycourse);
                            await myinstructor.save();
                            await mycourse.save();
                            return res.json("add successfully");
                        }
                        else
                            return res.json("already there")

            });

        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

router.route('/deleteInstructor/:id/:course').put(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            return res.json("access denied")
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
                    return res.json("no course with this name in your department");

                else proceed();
        });

        function proceed() {
            const mymembers = mycourse.instructors;
            mymembers.forEach(async (element, index, arr) => {
                const mymember = await AcademicMembers.findOne({ _id: element });
                if (req.params.id == mymember.member_id) {
                    myinstructor = mymember;
                }
                if (index == arr.length - 1)
                    if (!myinstructor)
                        return res.json("no instructor with this id in this course");
                    else {
                        removeA(mycourse.instructors, myinstructor._id);
                        removeA(mycourse.academicMembers, myinstructor._id);
                        removeA(myinstructor.courses, mycourse._id);
                        myinstructor.role = "";
                        await myinstructor.save();
                        await mycourse.save();
                        return res.json("removed successfully")
                    }

            });

        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

router.route('/updateInstructor/:id1/:id2/:course').put(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            return res.json("access denied")
        }
        const mydepm = await Departments.findOne({ name: user.department });
        const mycourses = mydepm.courses;
        var myinstructor, mycourse, newinstructor;
        mycourses.forEach(async (element, index, arr) => {
            const course = await courses.findOne({ _id: element })
            console.log(course)
            if (req.params.course == course.name) {
                mycourse = course;
            }
            if (index == arr.length - 1)

                if (!mycourse)
                    return res.json("no course with this name in your department");

                else proceed();
        });

        function proceed() {
            const mymembersx = mydepm.academicmem;
            mymembersx.forEach(async (element, index, arr) => {
                const mymember = await AcademicMembers.findOne({ _id: element });
                if (req.params.id2 == mymember.member_id) {

                    newinstructor = mymember;
                }
                if (index == arr.length - 1)

                    if (!newinstructor)
                        return res.json("no staff member with this id in your department");
                    else
                        proceed2();

            });
        }
        function proceed2() {
            const mymembers = mycourse.instructors;
            mymembers.forEach(async (element, index, arr) => {
                const mymember = await AcademicMembers.findOne({ _id: element });
                if (req.params.id1 == mymember.member_id) {
                    myinstructor = mymember;
                }
                if (index == arr.length - 1)
                    if (!myinstructor)
                        return res.json("no instructor in this course matches the name you entered");
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
                        await mycourse.save();
                        return res.json("updated successfully")
                    }

            });


        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

//functionality 2 view staff in his department or per course 
router.route('/viewStaff/:name').get(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD" && user.role != "Instructor") {
            return res.json("access denied")
        }
        const depname = user.department;
        const mydepm = await Departments.findOne({ name: depname });
        let staff = mydepm.academicmem;
        let found = false
        if (req.params.name != "all") {
            await mydepm.courses.forEach(async (element, index, arr) => {
                const mycourse = await courses.findOne({ _id: element });
                if (req.params.name == mycourse.name) {
                    staff = mycourse.academicMembers;
                    found = true;
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
                            return res.json("no course with this name in your department");
                        else
                            return res.json(view);

                    }
                    else
                        return res.json(view);
                }
            });
        }

    }


    catch (error) {
        res.status(500).json({ error: error.message })
    }

})


//functionality 3 View the day off of all the staff/ a single staff in his/her department
router.route('/viewDaysoff/:id').get(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id }).catch();
        if (user.role != "HOD") {
            return res.json("access denied")
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
                if (req.params.id == x.member_id) {
                    found = true;
                    days.push({ name, dayoff });
                }
            }
            if (index == arr.length - 1) {
                if (req.params.name != "all") {
                    if (!found)
                        return res.send("no staff member with this name in your department");
                    else
                        return res.send(days[0]);
                }
                else
                    return res.send(days);
            }

        });


    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});



//functionality 4  View all the requests “change day off/leave” sent by staff members in his/her department.
router.route('/viewRequests').get(auth, async (req, res) => {

    try {

        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const reqs = await requests.find({
            type: { $in: ["Compensation", "Annual", "dayOffChange", "Sick", "Maternity", "Accidental"] },
            state: { $in: ["Pending", "Accepted", "Rejected", "Cancelled"] }, receiver: { _id: token_id }
        })
        res.send(reqs);

    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

//functionality 5 Accept  a request

router.route('/acceptRequest/:rid').put(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            res.json("access denied")
        }
        const request = await requests.findOne({ rid: req.params.rid });
        if (!request)
            return res.json("no request with the entered id ")
        if (request.state != "Pending")
            return res.json("you can't accept this request")
        else {
            request.state = "Accepted";
            await request.save();
            const sending = await AcademicMembers.findOne({ _id: request.sender })
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var d = days.indexOf(sending.dayoff);
            switch (request.type) {
                case "dayOffChange":

                    sending.dayoff = days[new Date(request.newDayOff).getDay];
                    console.log(new Date(request.newDayOff).getDay())
                    console.log(new Date(request.newDayOff).getDay());


                    break;
                case "Sick" | "Maternity":
                    for (var i = 0; i < request.duration; i++) {
                        var day = new Date(request.requested_day);
                        day.setDate(day.getDate() + i)
                        const type = request.type;
                        if (!new Date(day).getDay() == d && new Date(day).getDay() == 5)
                            sending.leaves.push({ day, type })

                    }
                    break;
                case "Accedintal":

                    for (var i = 0; i < request.duration; i++) {
                        var day = new Date(request.requested_day);
                        day.setDate(day.getDate() + i)
                        const type = request.type;
                        if (!new Date(day).getDay() == d && new Date(day).getDay() == 5) {
                            sending.accidental--;
                            sending.leaveBalance--;
                            sending.leaves.push({ day, type })
                        }

                    }
                    break;
                case "Annual":
                    for (var i = 0; i < request.duration; i++) {
                        var day = new Date(request.requested_day);
                        day.setDate(day.getDate() + i)
                        const type = request.type;
                        if (!new Date(day).getDay() == d && new Date(day).getDay() == 5) {
                            sending.leaveBalance--;

                            sending.leaves.push({ day, type })
                        }

                    }
                    break;
                case "Compensation":
                    for (var i = 0; i < request.duration; i++) {
                        var day = new Date(request.requested_day);
                        day.setDate(day.getDate() + i)
                        const type = request.type;
                        if (!day.getDay == d && day.getDay == 5)
                            sending.leaves.push({ day, type })

                    }
                    break; default:
                // code block
            }
            await sending.save();
            return res.json("accepted successfully")

        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});


//functionality 6 Reject  a request
router.route('/rejectRequest/:rid').put(auth, async (req, res) => {

    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id }).catch(e => { console.error(e) });
        if (user.role != "HOD") {
            return res.json("access denied")
        }
        const request = await requests.findOne({ rid: req.params.rid });
        if (request.state != "Pending")
            res.json("you can't reject this request")
        else {
            request.state = 'rejected';
            request.recieverComment = req.body.reason;
            await request.save();
            return res.json("rejected successfully")
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});


//functionality 7 view course coverage 
router.route('/courseCoverage/:name').get(auth, async (req, res) => {
    try {

        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id });
        if (user.role != "HOD" && user.role != "Instructor") {
            return res.json("access denied")
        }
        const depname = user.department;
        const mydepm = await Departments.findOne({ name: depname });
        var result;
        const mycourses = mydepm.courses;
        mycourses.forEach(async (element, index, arr) => {
            const mycourse = await courses.findOne({ _id: element });
            if (mycourse.name == req.params.name) {
                console.log(mycourse.courseCoverage, mycourse)
                result = mycourse.courseCoverage;
                if (!mycourse.instructors.includes(user._id) && user.role == "Instructor")
                    return res.json("your are not an instructor of this course")
                else
                    return res.json(req.params.name + " : " + mycourse.courseCoverage);
            }
            else
                if (index == arr.length - 1)
                    return res.json("please enter a valid course name");
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});


//funvtionality 8 view course assignments 
router.route('/viewAssignments/:name').get(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id });
        if (user.role != "HOD" && user.role != "Instructor") {
            res.json("access denied")
        }
        else {
            const depname = user.department;
            const mydepm = await Departments.findOne({ name: depname });
            let mycourse;
            const mycourses = mydepm.courses;
            mycourses.forEach(async (element, index, arr) => {
                const course = await courses.findOne({ _id: element });
                if (course.name == req.params.name) {
                    mycourse = course;
                    if (!mycourse.instructors.includes(user._id) && user.role == "Instructor")
                        return res.json("your are not an instructor of this course")
                    else
                        return res.json(mycourse.slots);
                }
                else
                    if (index == arr.length - 1)
                        return res.json("please enter a valid course name");
            });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

//-------------------------------------------------------------------------------------------------------------------------
//instructor functionalties (1, 2, 3 are repeated at HOD) 1 is 7, 2 is 8, 3 is 2 

///functionality 4 assign  an academic member to an unassigned slots in course(s) he/she is assigned to.
router.route('/assignSlot/:id/:course/:sid').put(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id });
        if (user.role != "Instructor") {
            return res.json("access denied")
        }
        var mycourse;
        let found = false;
        user.courses.forEach(async (element, index, arr) => {
            const course = await courses.findOne({ _id: element })
            if (course.instructors.includes(user._id) && course.name == req.params.course) {
                mycourse = course;
                found = true;
            }
            if (index == arr.length - 1 && found == false)
                return res.json("please enter a valid course name ")

        });
        const mymember = await AcademicMembers.findOne({ member_id: req.params.id });
        if (!mymember)
            return res.json("no staff member with this id")
        if (!mycourse.academicMembers.includes(mymember._id))
            return res.json("this member does not teach this course,please add them first")
        const myslot = await slot.findOne({ sid: req.params.sid })


        if (!myslot)
            return res.json("enter a valid slot id")
        if (!mycourse.slots.includes(myslot._id))
            return res.json("this slot is not in this course")

        if (mymember.schedule.includes(myslot))
            return res.json("already assigned")
        myslot.member = mymember;
        mymember.schedule.push(myslot._id);
        await myslot.save();
        await mymember.save();
        console.log(mymember, myslot)

        return res.json("assigned succefully");


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});



///functionality 5 Update/delete assignment of academic member in course(s) he/she is assigned to.

router.route('/updateSlotAssignment/:id/:course/:sid').put(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id });
        if (user.role != "Instructor") {
            return res.json("access denied")
        }
        var mycourse;
        let found = false;
        user.courses.forEach(async (element, index, arr) => {
            const course = await courses.findOne({ _id: element })
            if (course.instructors.includes(user._id) && course.name == req.params.course) {
                mycourse = course;
                found = true;
            }
            if (index == arr.length - 1 && found == false)
                return res.json("please enter a valid course name ")

        });
        const mymember = await AcademicMembers.findOne({ member_id: req.params.id });
        if (!mymember)
            return res.json("no staff member with this id")
        if (!mycourse.academicMembers.includes(mymember._id))
            return res.json("this member does not teach this course,please add them first")
        const myslot = await slot.findOne({ sid: req.params.sid })
        if (!myslot)
            return res.json("enter a valid slot id")
        const oldmember = await AcademicMembers.findOne({ _id: myslot.member });
        if (!oldmember)
            return res.json("slot is not assigned to any staff member")
        removeA(oldmember.schedule, myslot._id);
        myslot.member = mymember;
        mymember.schedule.push(myslot);
        myslot.save();
        await mymember.save();
        await oldmember.save();
        return res.json("updated succefully");


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});
router.route('/deleteSlotAssignment/:course/:sid').put(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id });
        if (user.role != "Instructor") {
            return res.json("access denied")
        }
        var mycourse;
        let found = false;
        user.courses.forEach(async (element, index, arr) => {
            const course = await courses.findOne({ _id: element })
            if (course.instructors.includes(user._id) && course.name == req.params.course) {
                mycourse = course;
                found = true;
            }
            if (index == arr.length - 1 && found == false)
                return res.json("please enter a valid course name ")

        });

        const myslot = await slot.findOne({ sid: req.params.sid })
        if (!myslot)
            return res.json("enter a valid slot id");
        const mymember = myslot.member;
        if (!mymember)
            return res.json("slot is not assigned to any staff member")
        myslot.member = null;
        function x() { var temp = myslot._id }
        x().then(r => { removeA(mymember.schedule, temp) });

        await myslot.save();
        await mymember.save();
        return res.json("Assignment deleted succefully");


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

/// functionality 6 Remove an assigned academic member in course(s) he/she is assigned to.

router.route('/removefromCourse/:id/:course').put(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id });
        if (user.role != "Instructor") {
            return res.json("access denied")
        }
        let found = false;

        const mycourse = await courses.findOne({ name: req.params.course })

        if (!mycourse)
            return res.json("please enter a valid course name ")
        if (!user.courses.includes(mycourse._id))
            return res.json("you do not teach this course")
        const mymember = await AcademicMembers.findOne({ member_id: req.params.id })
        if (!mymember)
            return res.json("no staff member with this id")
        if (!mycourse.academicMembers.includes(mymember._id))
            return res.json("this member is not in this course ")

        mymember.schedule.forEach(async (element, index, arr) => {
            const myslot = await slot.findOne({ _id: element })
            if (myslot.course == mycourse._id) {
                myslot.member = null;
                removeA(mymember.schedule, myslot._id)
                myslot.save();
            }

        });
        removeA(mymember.courses, mycourse._id)
        removeA(mycourse.academicMembers, mymember._id)
        await mycourse.save();
        await mymember.save();


        return res.json("removed successfully");


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});
///functionality 7 assign an academic member to be a course coordinator  
router.route('/assignCoordinator/:id/:course').put(auth, async (req, res) => {
    try {

        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id });
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
                const mycoordinator = await AcademicMembers.findOne({ member_id: req.params.id });
                if (!mycoordinator)
                    res.json("no staff member with this name")
                else {
                    if (mycourse.coordinator == mycoordinator._id)
                        res.json("already assigned");
                    else {
                        mycourse.coordinator = mycoordinator._id;
                        mycourse.academicMembers.push(mycoordinator);
                        mycoordinator.role = "coordinator";
                        mycoordinator.courses.push(mycourse);
                        await mycoordinator.save();
                        await mycourse.save();
                        res.json("assigned successfully");
                    }
                }
            }
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

//extra functionality : add members to course 
router.route('/assignMember/:id/:course').put(auth, async (req, res) => {
    try {
        const token = req.header('auth-token');
        const token_id = jwt.verify(token, "sign").staffID;
        const user = await AcademicMembers.findOne({ _id: token_id });
        if (user.role != "Instructor") {
            return res.json("access denied")
        }
        var mycourse;
        let found = false;
        user.courses.forEach(async (element, index, arr) => {
            const course = await courses.findOne({ _id: element })
            if (course.instructors.includes(user._id) && course.name == req.params.course) {
                mycourse = course;
                found = true;
            }
            if (index == arr.length - 1 && found == false)
                return res.json("please enter a valid course name ")

        }); console
        const mymember = await AcademicMembers.findOne({ member_id: req.params.id });
        if (!mymember)
            return res.json("no staff member with this name")
        if (mymember.department != user.department)
            return res.json("this staff member is not in your department")
        if (mycourse.academicMembers.includes(mymember._id))
            res.json("already exist");
        else {
            mycourse.coordinator = mymecmber._id;
            mycourse.academicMembers.push(mymember);
            mymember.courses.push(mycourse);
            await mymember.save();
            await mycourse.save();
            return res.json("added successfully");
        }
    }

    catch (error) {
        return res.status(500).json({ error: error.message })
    }
});




//helper method
function removeA(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}