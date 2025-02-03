const Activity = require("../models/activityModel");
const asyncHandler = require("../middlewares/asyncHandler");
const responseHandler = require("../utils/responseHandler");

// @desc    Create a new activity
// @route   POST /api/activities
// @access  Private (Admin only)
exports.createActivity = asyncHandler(async (req, res) => {
  const { chamber, title, shortDescription, longDescription, url, doc, termID } = req.body;

  // Validate required fields for activity creation
  if (!chamber || !title) {
    return responseHandler(res, 400, false, "Chamber and title are required.");
  }

  const newActivity = await Activity.create({
    chamber,
    title,
    shortDescription,
    longDescription,
    url,
    doc,
    termID,
  });

  responseHandler(res, 201, true, "Activity created successfully", newActivity);
});

// @desc    Get all activities
// @route   GET /api/activities
// @access  Public
exports.getAllActivities = asyncHandler(async (req, res) => {
  const { chamber, termID } = req.query;
  let filter = {};

  if (chamber) filter.chamber = chamber;
  if (termID) filter.termID = termID;

  const activities = await Activity.find(filter).populate("termID");

  responseHandler(res, 200, true, "Activities fetched successfully", activities);
});

// @desc    Get activity by ID
// @route   GET /api/activities/:id
// @access  Public
exports.getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate("termID");

  if (!activity) {
    return responseHandler(res, 404, false, "Activity not found");
  }

  responseHandler(res, 200, true, "Activity fetched successfully", activity);
});

// @desc    Update activity details
// @route   PUT /api/activities/:id
// @access  Private (Admin only)
exports.updateActivity = asyncHandler(async (req, res) => {
  const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("termID");

  if (!updatedActivity) {
    return responseHandler(res, 404, false, "Activity not found");
  }

  responseHandler(res, 200, true, "Activity updated successfully", updatedActivity);
});

// @desc    Delete an activity
// @route   DELETE /api/activities/:id
// @access  Private (Admin only)
exports.deleteActivity = asyncHandler(async (req, res) => {
  const deletedActivity = await Activity.findByIdAndDelete(req.params.id);

  if (!deletedActivity) {
    return responseHandler(res, 404, false, "Activity not found");
  }

  responseHandler(res, 200, true, "Activity deleted successfully");
});

// @desc    Get activities by filter (chamber or termID)
// @route   GET /api/activities/filtered
// @access  Public
exports.getFilteredActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({}, { title: 1, chamber: 1, termID: 1, shortDescription: 1 })
    .populate("termID");

  const formattedActivities = activities.map(activity => {
    return {
      title: activity.title,
      chamber: activity.chamber,
      shortDescription: activity.shortDescription || "N/A",
      ...(activity.termID ? { term: activity.termID.startDate + " - " + activity.termID.endDate } : {}),
    };
  });

  responseHandler(res, 200, true, "Filtered activities fetched successfully", formattedActivities);
});
