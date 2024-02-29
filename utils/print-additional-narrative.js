const { getPools } = require("./database");
module.exports.printAdditionalNarrative = (req, res, next, options, slug) => {
  const id = req.params.id;
  const { templateId: postId } = req.query;

  let params = [];

  let sql_query = "SELECT body from form_builder Where slug=? and deleted is null order by is_default DESC limit 1";

  params.push(slug);

  if (postId) {
    sql_query = "SELECT body from form_builder Where postid=? and deleted is null";
    params = [postId];
  }

  const { pool } = getPools(req.department.path);

  const department = req.department;

  pool.getConnection(function (err, db) {
    db.query(sql_query, params, function (err2, rows) {
      if (err2) {
        return next(err2);
      }

      res.render("department-pages/narrative_print", {
        layout: "layout_print.hbs",
        department_address1: department.address1,
        departmentName: department.department_name,
        name_preferred: department.name_preferred,
        department_address2: department.address2,
        department_phone: department.phone,
        department_logo: department.logo,
        print_name: req.session.passport.print_name,
        footer: department.footer,
        printTemplate: rows[0].body,
        narrative_id: id,
        ...options,
      });
    });
    db.release();
  });
};
