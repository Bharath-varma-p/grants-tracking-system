const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const csv = require('csv-parser');
const { parse, isValid, format } = require('date-fns');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Parvathi@12345',
  database: 'loginsystem',
  dialectOptions: {
    charset: 'utf8mb4',
    requestTimeout: 60000, // 60 seconds
    connectionTimeout: 60000 // Set a 30-second global timeout (adjust as needed)
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
});

const OpportunityCategoryMap = {
  'D': 'Discretionory',
  'M': 'Mandatory'
};

const FundingInstrumentTypeMap = {
  'CA': 'Cooperative Agreement',
  'G': 'Grant',
  'O':  'Other',
  'PC': 'Procurement Contract'
};

const CategoryOfFundingActivityMap = {
  'BC'    : 'Business and Commerce',
  'RA'    : 'Recovery Act',
  'ST'    : 'Science and Technology and other Research and Development',
 'ELT'  :   'Employment, Labor and Training',
 'DPR'   : 'Disaster Prevention and Relief',
 'ACA'   :  'Affordable Care Act',
  'T'    : 'Transportation',
  'O'     : 'Other (see text field entitled "Explanation of Other Category of Funding Activity" for clarification)',
 'ISS'   : 'Income Security and Social Services',
 'IS'    :  'Information and Statistics',
 'ENV'  :  'Environment',
 'HO'   : 'Housing',
 'HL'   :  'Health'
}
const Grant = sequelize.define('grants_tracking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    title: {
      type: DataTypes.STRING
    },
    number: {
      type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null values for 'category'
      },
    FundingInstrumentType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CategoryOfFundingActivity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CategoryExplanation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CFDANumbers: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EligibleApplicants: {
      type: DataTypes.STRING,
      allowNull: false
    },
    AdditionalInformationOnEligibility: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    AgencyCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    AgencyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PostDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CloseDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    LastUpdatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AwardCeiling: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    AwardFloor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    EstimatedTotalProgramFunding: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    ExpectedNumberOfAwards: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CostSharingOrMatchingRequirement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ArchiveDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    GrantorContactEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    GrantorContactEmailDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    GrantorContactText: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  async function createTable() {
    try {
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS \`grants_tracking\` (
          \`id\` int NOT NULL,
          \`title\` varchar(255) DEFAULT NULL,
          \`number\` varchar(255) NOT NULL,
          \`category\` varchar(255) DEFAULT NULL,
          \`FundingInstrumentType\` varchar(255) NOT NULL,
          \`CategoryOfFundingActivity\` varchar(255) NOT NULL,
          \`CategoryExplanation\` text,
          \`CFDANumbers\` varchar(255) NOT NULL,
          \`EligibleApplicants\` varchar(255) NOT NULL,
          \`AdditionalInformationOnEligibility\` longtext,
          \`AgencyCode\` varchar(255) NOT NULL,
          \`AgencyName\` varchar(255) NOT NULL,
          \`PostDate\` date default NULL,
          \`CloseDate\` date default NULL,
          \`LastUpdatedDate\` date default NULL,
          \`AwardCeiling\` decimal(10,2) NOT NULL,
          \`AwardFloor\` decimal(10,2) NOT NULL,
          \`EstimatedTotalProgramFunding\` decimal(10,2) NOT NULL,
          \`ExpectedNumberOfAwards\` int NOT NULL,
          \`Description\` text NOT NULL,
          \`Version\` varchar(255) NOT NULL,
          \`CostSharingOrMatchingRequirement\` varchar(255) NOT NULL,
          \`ArchiveDate\` date default NULL,
          \`GrantorContactEmail\` varchar(255) NOT NULL,
          \`GrantorContactEmailDescription\` varchar(255) NOT NULL,
          \`GrantorContactText\` text,
          PRIMARY KEY (\`id\`),
          UNIQUE KEY (\`id\`)
        );
      `);
  
      console.log('Table "grants_tracking" created or already exists.');
    } catch (error) {
      console.error('Error grants_tracking or checking the "grants_tracking" table:', error);
    }
  }

  // Call the createTable function before inserting data
 // createTable().then(() => insertData());

async function insertData() {
  try {
    await sequelize.sync({force: false}); // Create the 'grants' table if it doesn't exist

    // Read the CSV file and insert data into the 'grants' table
    fs.createReadStream('opportunities.csv')
      .pipe(csv())
      .on('data', async (row) => {

        const checkCloseDate = parse(row.CloseDate, 'MMddyyyy', new Date());

        if (!isValid(checkCloseDate) || checkCloseDate < new Date()) {
          console.log(`Skipping row with OpportunityID ${row.OpportunityID} due to an invalid or past CloseDate.`);
          return;
        }

        try {
          // const [existingRow] = await Grant.findOrCreate({
          //   where: { id: row.OpportunityID },
          //   defaults: transformRow(row),
          // });
    
          // if (!existingRow[1]) {
          //   await Grant.update(transformRow(row), {
          //     where: { id: row.OpportunityID },
          //   });
          //   console.log(`Updated row with OpportunityID ${row.OpportunityID}`);
          // } else {
          //   console.log(`Inserted row with OpportunityID ${row.OpportunityID}`);
          // }
         

          if (row.OpportunityCategory !== null) {
          await Grant.upsert(transformRow(row));
          }
        } catch (error) {
          console.error(`Error inserting/updating row with OpportunityID ${row.OpportunityID}: ${error}`);
        }
      })
      .on('end', () => {
        console.log('Data insertion completed.');
      });
  } catch (error) {
    console.error('Error reading the CSV file:', error);
  }
}

const convertDate = (dateString) => {

  if(!dateString) return null;

  // Date is in MMDDYYYY format
  const month = dateString.substring(0,2);
  const day = dateString.substring(2,4);
  const year = dateString.substring(4);

 return new Date(`${month}/${day}/${year}`);
//  return format(parse(dateString, 'MMddyyyy', new Date()),'MM/dd/yyyy');

}

function transformRow(row) {
  const abbreviatedFundingTypes = row.FundingInstrumentType.split(',');
  const fullFormFundingTypes = abbreviatedFundingTypes.map((v) => FundingInstrumentTypeMap[v.trim()] || v.trim());
  row.FundingInstrumentType = fullFormFundingTypes.join(', ');
  
  const abbreviatedCategoryFundingActivities = row.CategoryOfFundingActivity.split(', ');
  const fullFormCategoryFundingActivities = abbreviatedCategoryFundingActivities.map((v) => CategoryOfFundingActivityMap[v.trim()] || v.trim());
  row.CategoryOfFundingActivity = fullFormCategoryFundingActivities.join(', ');

  console.log("formatted date",format(convertDate(row.PostDate), 'MM/dd/yyyy'));

  return {
    id: row.OpportunityID,
    title: row.OpportunityTitle,
    number: row.OpportunityNumber, 
    category: OpportunityCategoryMap[row.OpportunityCategory],
    FundingInstrumentType: row.FundingInstrumentType,
    CategoryOfFundingActivity: row.CategoryOfFundingActivity,
    CategoryExplanation: row.CategoryExplanation,
    CFDANumbers: row.CFDANumbers,
    EligibleApplicants: row.EligibleApplicants,
    AdditionalInformationOnEligibility: row.AdditionalInformationOnEligibility,
    AgencyCode: row.AgencyCode,
    AgencyName: row.AgencyName,
    PostDate: format(convertDate(row.PostDate), 'MM/dd/yyyy'),
    CloseDate: format(parse(row.CloseDate, 'MMddyyyy', new Date()), 'MM/dd/yyyy'), // Convert CloseDate to DATE format (mm/dd/yyyy)
    LastUpdatedDate: format(parse(row.LastUpdatedDate, 'MMddyyyy', new Date()), 'MM/dd/yyyy'),
    AwardCeiling: parseFloat(row.AwardCeiling),
    AwardFloor: parseFloat(row.AwardFloor),
    EstimatedTotalProgramFunding: parseFloat(row.EstimatedTotalProgramFunding),
    ExpectedNumberOfAwards: parseInt(row.ExpectedNumberOfAwards),
    Description: row.Description,
    Version: row.Version,
    CostSharingOrMatchingRequirement: row.CostSharingOrMatchingRequirement,
    ArchiveDate: format(parse(row.ArchiveDate, 'MMddyyyy', new Date()), 'MM/dd/yyyy'),
    GrantorContactEmail: row.GrantorContactEmail,
    GrantorContactEmailDescription: row.GrantorContactEmailDescription,
    GrantorContactText: row.GrantorContactText
  };
}

insertData();