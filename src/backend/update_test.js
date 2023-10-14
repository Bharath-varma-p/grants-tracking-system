const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const csv = require('csv-parser');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Rafvue132',
  database: 'GDatabase',
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


const Grant = sequelize.define('grants', {
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
      type: DataTypes.STRING,
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
      allowNull: false
    },
    CloseDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    LastUpdatedDate: {
      type: DataTypes.DATE,
      allowNull: false
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
      allowNull: false
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
        CREATE TABLE IF NOT EXISTS \`grants\` (
          \`id\` int NOT NULL,
          \`title\` varchar(255) DEFAULT NULL,
          \`number\` varchar(255) NOT NULL,
          \`category\` varchar(255) DEFAULT NULL,
          \`FundingInstrumentType\` varchar(255) NOT NULL,
          \`CategoryOfFundingActivity\` varchar(255) NOT NULL,
          \`CategoryExplanation\` text,
          \`CFDANumbers\` varchar(255) NOT NULL,
          \`EligibleApplicants\` varchar(255) NOT NULL,
          \`AdditionalInformationOnEligibility\` text,
          \`AgencyCode\` varchar(255) NOT NULL,
          \`AgencyName\` varchar(255) NOT NULL,
          \`PostDate\` date NOT NULL,
          \`CloseDate\` date NOT NULL,
          \`LastUpdatedDate\` date NOT NULL,
          \`AwardCeiling\` decimal(10,2) NOT NULL,
          \`AwardFloor\` decimal(10,2) NOT NULL,
          \`EstimatedTotalProgramFunding\` decimal(10,2) NOT NULL,
          \`ExpectedNumberOfAwards\` int NOT NULL,
          \`Description\` text NOT NULL,
          \`Version\` varchar(255) NOT NULL,
          \`CostSharingOrMatchingRequirement\` varchar(255) NOT NULL,
          \`ArchiveDate\` date NOT NULL,
          \`GrantorContactEmail\` varchar(255) NOT NULL,
          \`GrantorContactEmailDescription\` varchar(255) NOT NULL,
          \`GrantorContactText\` text,
          PRIMARY KEY (\`id\`),
          UNIQUE KEY (\`id\`)
        );
      `);
  
      console.log('Table "grants" created or already exists.');
    } catch (error) {
      console.error('Error creating or checking the "grants" table:', error);
    }
  }
  
  // Call the createTable function before inserting data
  createTable().then(() => insertData());
async function insertData() {
  try {
    await sequelize.sync(); // Create the 'grants' table if it doesn't exist

     // Variable to track whether a record has been inserted

    const convertDate = (dateString) => {

        if(!dateString) return null;
      
        // Date is in MMDDYYYY format
        const month = dateString.substring(0,2);
        const day = dateString.substring(2,4);
        const year = dateString.substring(4);
      
        return new Date(`${month}/${day}/${year}`);
      
      }
      

    // Read the CSV file and insert data into the 'grants' table
    fs.createReadStream('/Users/bharath/Documents/GrantsPortal/GrantsProject/Downloaded_data/opportunities.csv')
      .pipe(csv())
      .on('data', async (row) => {
        try {
            if (row.category !== null) { // Only insert one record
                const postDate = convertDate(row.PostDate);
                const closeDate = row.CloseDate ? convertDate(row.CloseDate) : null;
                const lastUpdatedDate = convertDate(row.LastUpdatedDate);
                const archiveDate = row.ArchiveDate ? convertDate(row.ArchiveDate) : null;
                await Grant.create({
                id: row.OpportunityID,
                title: row.OpportunityTitle,
                number: row.OpportunityNumber, 
                category: row.category,
                FundingInstrumentType: row.FundingInstrumentType,
                CategoryOfFundingActivity: row.CategoryOfFundingActivity,
                CategoryExplanation: row.CategoryExplanation,
                CFDANumbers: row.CFDANumbers,
                EligibleApplicants: row.EligibleApplicants,
                AdditionalInformationOnEligibility: row.AdditionalInformationOnEligibility,
                AgencyCode: row.AgencyCode,
                AgencyName: row.AgencyName,
                PostDate: postDate,
                CloseDate: closeDate,
                LastUpdatedDate: lastUpdatedDate,
                AwardCeiling: parseFloat(row.AwardCeiling),
                AwardFloor: parseFloat(row.AwardFloor),
                EstimatedTotalProgramFunding: parseFloat(row.EstimatedTotalProgramFunding),
                ExpectedNumberOfAwards: parseInt(row.ExpectedNumberOfAwards),
                Description: row.Description,
                Version: row.Version,
                CostSharingOrMatchingRequirement: row.CostSharingOrMatchingRequirement,
                ArchiveDate: archiveDate,
                GrantorContactEmail: row.GrantorContactEmail,
                GrantorContactEmailDescription: row.GrantorContactEmailDescription,
                GrantorContactText: row.GrantorContactText
              });

             // Set to true after inserting the record
          }
        } catch (error) {
          console.error('Error inserting data:', error);
        }
      })
      .on('end', () => {
        console.log('Data insertion completed.');
      });
  } catch (error) {
    console.error('Error reading the CSV file:', error);
  }
}

insertData();