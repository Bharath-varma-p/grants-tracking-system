const Service = require(`./testing.service`);

// eslint-disable-next-line require-await
exports.renderGroupDatabase = async (req, res) => {
  res.render(`${__dirname}/testing.hbs`, {
    title: `Co-Groups Database`,
    layout: `layout_main.hbs`,
    // search: req.query.search,
    // cfs_data: req.session.passport.user.cfs_data,
  });
};

exports.getDataTableData = async (req, res, next) => {
  const service = new Service(req.department, req.session.passport.user);

  const result = await service.getDataTableData(req);

  if (!result.status) {
    return next(result.error);
  }

  res.json(result.data);
};

exports.getReviewers = async (req, res, next) => {
  const service = new Service(req.department, req.session.passport.user);
  const result = await service.getReviewers(req);

  if (!result.status) {
    return next(result.error);
  }
  res.json(result.data);
};

exports.getReviewerPatients = async (req, res, next) => {
  const service = new Service(req.department, req.session.passport.user);

  const result = await service.getReviewerPatients(req);

  if (!result.status) {
    return next(result.error);
  }

  res.json(result.data);
};

exports.getCoGroupData = async (req, res, next) => {
  const service = new Service(req.department, req.session.passport.user);

  const result = await service.getPatientData(req);

  if (!result.status) {
    return next(result.error);
  }

  res.json(result.data);
};
