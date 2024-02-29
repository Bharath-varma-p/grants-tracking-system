const express = require(`express`);
const router = express.Router();
//const OffendController = require(`../case_selection/case_selection.controller`);

const controller = require(`./testing.controller`);

router.get(
  `/testing`,
  controller.renderGroupDatabase
);

router.get(
  `/testing_data`,
  controller.getDataTableData
);
router.get(
  `/get_reviewers`,
  controller.getReviewers
);

router.post(
  `/get_reviewer_patients`,

  controller.getReviewerPatients
);

module.exports = router;
