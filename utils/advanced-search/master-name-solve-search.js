module.exports.masterNameSolveSearch = function (req) {
  const search_fields = req.query.search_fields.split("|");
  const search_values = req.query.search_values.split("|");
  const searchFieldScores = {
    firstName: { score: 1, title: "First Name" },
    middleName: { score: 1, title: "Middle Name" },
    lastName: { score: 1, title: "Last Name" },
    aliasName: { score: 1, title: "Alias Name" },
    dob: { score: 1, title: "Date of Birth" },
    FBINo: { score: 2, title: "FBI No" },
    BCINo: { score: 2, title: "BCI No" },
    SSN: { score: 2, title: "SSN" },
    driverLicense: { score: 2, title: "Driver License" },
    driverLicenseState: { score: 0, title: "Driver License State" },
    soundexSearchFlag: { score: 0, title: "Soundex Search Flag" },
  };
  let searchFieldTotalScore = 0;
  const searchRequestParams = {};

  if (req.query.apply_search === "1" && search_fields.length > 0) {
    let errorMessage = null;

    if (search_fields.length == 1 && search_fields[0] == "") {
      throw `
      <ol style="text-align:left">
      A valid search should qualify the below rules in order for the system to perform a meaningful search.
      <li style="padding:10px 0">At least 2 criteria is required from the following list if the search is based off  First Name, Middle Name, Last Name, Alias Name, or Date of Birth.</li>
      <li style="padding:10px 0">At least 1 criteria is required from the following list if search is based of SSN, FBI No, BCI No, driver License.</li>
      <li style="padding:10px 0">If search is performed using parameter Driver License State then driver License is required to perform search.</li>
      </ol>`;
    }

    //Calculate total score & prepare search params for API call
    for (let i = 0; i < search_fields.length; i++) {
      searchRequestParams[search_fields[i]] = search_values[i];
      searchFieldTotalScore += searchFieldScores[search_fields[i]].score;
    }

    //Check required but empty search fields
    if (searchFieldTotalScore < 2 && searchFieldTotalScore !== 0) {
      const scoreNeed = 2 - searchFieldTotalScore;

      Object.keys(searchFieldScores).map((value) => {
        if (!search_fields.includes(value) && searchFieldScores[value].score == scoreNeed) {
          if (!errorMessage) {
            errorMessage =
              "At least one of the following search field must be filled together in order for meaningful search: " +
              searchFieldScores[value].title;
          } else {
            errorMessage += ", " + searchFieldScores[value].title;
          }
        }
      });
      throw errorMessage;
    }
    if (searchFieldTotalScore == 0) {
      const scoreNeed = 2;
      Object.keys(searchFieldScores).map((value) => {
        if (!search_fields.includes(value) && searchFieldScores[value].score == scoreNeed) {
          if (!errorMessage) {
            errorMessage =
              "At least one of the following field must be filled in order to make a meaningful search: " +
              searchFieldScores[value].title;
          } else {
            errorMessage += ", " + searchFieldScores[value].title;
          }
        }
      });

      throw errorMessage;
    }
  }

  return searchRequestParams;
};
