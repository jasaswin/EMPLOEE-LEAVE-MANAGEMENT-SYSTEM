
const LeaveRequest = require("../models/leaverequest");
const LeaveBalance = require("../models/leavebalance");
const calculateDays = require("../utils/calculatedays");


exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // Calculate number of leave days
    const start = new Date(startDate);
    const end = new Date(endDate);

    const leaveDays =
      Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (leaveDays <= 0) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // Fetch leave balance
    const balance = await LeaveBalance.findOne({
      userId: req.user.id,
    });

    if (!balance) {
      return res.status(404).json({ message: "Leave balance not found" });
    }

    // Check balance based on leave type
    if (leaveType === "VACATION" && balance.vacation < leaveDays) {
      return res.status(400).json({
        message: "Insufficient vacation leave balance",
      });
    }

    if (leaveType === "SICK" && balance.sick < leaveDays) {
      return res.status(400).json({
        message: "Insufficient sick leave balance",
      });
    }

    // Create leave request
    const leave = await LeaveRequest.create({
      userId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "PENDING",
    });

    res.status(201).json({
      message: "Leave request submitted",
      leave,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// VIEW LEAVES 
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  GET LEAVE BALANCE (EMPLOYEE) 
exports.getLeaveBalance = async (req, res) => {
  try {
    const balance = await LeaveBalance.findOne({ userId: req.user.id });

    if (!balance) {
      return res.status(404).json({ message: "Leave balance not found" });
    }

    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// VIEW PENDING LEAVES (MANAGER)
exports.getPendingLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ status: "PENDING" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  APPROVE LEAVE 
exports.approveLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { managerComment } = req.body;

    const leave = await LeaveRequest.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    if (leave.status !== "PENDING") {
      return res.status(400).json({ message: "Leave already processed" });
    }

    const days = calculateDays(leave.startDate, leave.endDate);

    const balance = await LeaveBalance.findOne({ userId: leave.userId });
    if (!balance) {
      return res.status(404).json({ message: "Leave balance not found" });
    }

    const typeKey = leave.leaveType.toLowerCase();

    if (balance[typeKey] < days) {
      return res.status(400).json({ message: "Insufficient leave balance" });
    }

    // Deduct balance
    balance[typeKey] -= days;
    await balance.save();

    // Update leave status
    leave.status = "APPROVED";
    leave.managerComment = managerComment;
    await leave.save();

    res.json({ message: "Leave approved successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//REJECT LEAVE 
exports.rejectLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { managerComment } = req.body;

    const leave = await LeaveRequest.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    if (leave.status !== "PENDING") {
      return res.status(400).json({ message: "Leave already processed" });
    }

    leave.status = "REJECTED";
    leave.managerComment = managerComment;
    await leave.save();

    res.json({ message: "Leave rejected successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// LEAVE CALENDAR 
exports.getLeaveCalendar = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ status: "APPROVED" })
      .populate("userId", "name")
      .select("leaveType startDate endDate userId")
      .sort({ startDate: 1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




