const Member = require("../models/members");
const asyncHandler = require("../middlewares/asyncHandler");
const responseHandler = require("../utils/responseHandler");

// @desc    Create new member
// @route   POST /api/members
// @access  Private (Admin only)
exports.createMember = asyncHandler(async (req, res) => {
  const { chamber, name, state, district, party, photo, status } = req.body;

  if (chamber === "house" && !district) {
    return responseHandler(
      res,
      400,
      false,
      "District is required for House members."
    );
  }

  if (chamber === "senate" && !state) {
    return responseHandler(
      res,
      400,
      false,
      "State is required for Senate members."
    );
  }

  const newMember = await Member.create({
    chamber,
    name,
    state,
    district,
    party,
    photo,
    status,
  });
  responseHandler(res, 201, true, "Member created successfully", newMember);
});

// @desc    Get all members
// @route   GET /api/members
// @access  Public
exports.getAllMembers = asyncHandler(async (req, res) => {
  const { chamber, state, party, rating } = req.query;
  let filter = {};

  if (chamber) filter.chamber = chamber;
  if (state) filter.state = state;
  if (party) filter.party = party;
  if (rating) filter.rating = rating;

  const members = await Member.find(filter);
  responseHandler(res, 200, true, "Members fetched successfully", members);
});

// @desc    Get member by ID
// @route   GET /api/members/:id
// @access  Public
exports.getMemberById = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    return responseHandler(res, 404, false, "Member not found");
  }
  responseHandler(res, 200, true, "Member fetched successfully", member);
});

// @desc    Update member details
// @route   PUT /api/members/:id
// @access  Private (Admin only)
exports.updateMember = asyncHandler(async (req, res) => {
  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedMember) {
    return responseHandler(res, 404, false, "Member not found");
  }

  responseHandler(res, 200, true, "Member updated successfully", updatedMember);
});

// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Private (Admin only)
exports.deleteMember = asyncHandler(async (req, res) => {
  const deletedMember = await Member.findByIdAndDelete(req.params.id);
  if (!deletedMember) {
    return responseHandler(res, 404, false, "Member not found");
  }
  responseHandler(res, 200, true, "Member deleted successfully");
});

// @desc    Get all House Representatives and Senators
// @route   GET /api/members/filtered
// @access  Public
exports.getFilteredMembers = asyncHandler(async (req, res) => {
  const members = await Member.find(
    {},
    {
      name: 1,
      party: 1,
      chamber: 1,
      rating: 1,
      state: 1,
      district: 1,
    }
  );

  const formattedMembers = members.map((member) => {
    return {
      name: member.name,
      party: member.party,
      rating: member.rating || "N/A",
      chamber: member.chamber,
      ...(member.chamber === "senate"
        ? { state: member.state }
        : { district: member.district }),
    };
  });

  responseHandler(
    res,
    200,
    true,
    "Filtered members fetched successfully",
    formattedMembers
  );
});
