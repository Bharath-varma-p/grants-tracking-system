const myGrantsDataService = require("../services/myGrantsData.service");

exports.getMyDataDashboard = async (req, res) => {
  try {
    const data = await myGrantsDataService.getMyFilteredGrantsData(req);
    res.json(data);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.myDashboardData = async (req, res) => {
    res.render(`../views/myDashboard.hbs`, {
        title: `HCC Group Analysis`,
      });
};


exports.myDashboard_Data = async (req, res) => {
    try {
      const data = await myGrantsDataService.handleMyDashboard(req);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };