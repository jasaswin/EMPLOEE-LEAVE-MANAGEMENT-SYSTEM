
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/rolemiddleware");

const {
  applyLeave,
  getMyLeaves,
    getLeaveBalance,
  getPendingLeaves,
  approveLeave,
  rejectLeave
} = require("../controllers/leaveController");


const { getLeaveCalendar } = require("../controllers/leaveController");



// Employee routes
router.post("/apply", authMiddleware, applyLeave);
router.get("/my", authMiddleware, getMyLeaves);


router.get(
  "/balance",
  authMiddleware,
  getLeaveBalance
);



// Manager routes
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("MANAGER"),
  getPendingLeaves
);

router.post(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("MANAGER"),
  approveLeave
);

router.post(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("MANAGER"),
  rejectLeave
);

router.get(
  "/calendar",
  authMiddleware,
  getLeaveCalendar
);


module.exports = router;