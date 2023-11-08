const cheerio = require('cheerio');
const fs = require('fs');
const { writeFile } = require('fs').promises;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Load XML file 
const xml = fs.readFileSync('/Users/admin/Desktop/GrantsDBExtract20231008v2.xml', 'utf8');

// Parse XML using cheerioo
const $ = cheerio.load(xml, {xmlMode: true}); 

// Extract data
const opportunities = [];

$('OpportunitySynopsisDetail_1_0').each((i, elem) => {
    // List of all the fields in the XML file
  const id = $(elem).find('OpportunityID').text();
  const title = $(elem).find('OpportunityTitle').text();
  const number = $(elem).find('OpportunityNumber').text();
  const category = $(elem).find('OpportunityCategory').text();
  const FundingInstrumentType = [];
  $(elem).find('FundingInstrumentType').each(function () {
    FundingInstrumentType.push($(this).text());
  });
  FundingInstrumentType.join(', ');
  const CategoryOfFundingActivity = [];
  $(elem).find('CategoryOfFundingActivity').each(function () {
    CategoryOfFundingActivity.push($(this).text());
  });
  CategoryOfFundingActivity.join(', ');
  const CategoryExplanation = $(elem).find('CategoryExplanation').text();
  const CFDANumbers = [];
   $(elem).find('CFDANumbers').each(function () {
      CFDANumbers.push($(this).text());
   });
  const EligibleApplicants = [];
  $(elem).find('EligibleApplicants').each(function () {
    EligibleApplicants.push($(this).text());
  });
  const AdditionalInformationOnEligibility = $(elem).find('AdditionalInformationOnEligibility').text();
  const AgencyCode = $(elem).find('AgencyCode').text();
  const AgencyName = $(elem).find('AgencyName').text();
  const PostDate = $(elem).find('PostDate').text();
  const CloseDate = $(elem).find('CloseDate').text();
  const LastUpdatedDate = $(elem).find('LastUpdatedDate').text();
  const AwardCeiling = $(elem).find('AwardCeiling').text();
  const AwardFloor = $(elem).find('AwardFloor').text();
  const EstimatedTotalProgramFunding = $(elem).find('EstimatedTotalProgramFunding').text();
  const ExpectedNumberOfAwards = $(elem).find('ExpectedNumberOfAwards').text();
  const Description = $(elem).find('Description').text();
  const Version = $(elem).find('Version').text();
  const CostSharingOrMatchingRequirement = $(elem).find('CostSharingOrMatchingRequirement').text();
  const ArchiveDate = $(elem).find('ArchiveDate').text();
  const GrantorContactEmail = $(elem).find('GrantorContactEmail').text();
  const GrantorContactEmailDescription = $(elem).find('GrantorContactEmailDescription').text();
  const GrantorContactText = $(elem).find('GrantorContactText').text();

  const opportunity = {
    id,
    title,
    number,
    category,
    FundingInstrumentType,
    CategoryOfFundingActivity,
    CategoryExplanation,
    CFDANumbers,
    EligibleApplicants,
    AdditionalInformationOnEligibility,
    AgencyCode,
    AgencyName,
    PostDate,
    CloseDate,
    LastUpdatedDate,
    AwardCeiling,
    AwardFloor,
    EstimatedTotalProgramFunding,
    ExpectedNumberOfAwards,
    Description,
    Version,
    CostSharingOrMatchingRequirement,
    ArchiveDate,
    GrantorContactEmail,
    GrantorContactEmailDescription,
    GrantorContactText
  };

  opportunities.push(opportunity);

});

// console.log(opportunities);

async function main() {
  const csvWriter = createCsvWriter({
    path: 'opportunities.csv',
    header: [
      { id: 'id', title: 'OpportunityID' },
      { id: 'title', title: 'OpportunityTitle' },
      { id: 'number', title: 'OpportunityNumber' },
      { id: 'category', title: 'OpportunityCategory' },
      { id: 'FundingInstrumentType', title: 'FundingInstrumentType' },
      { id: 'CategoryOfFundingActivity', title: 'CategoryOfFundingActivity' },
      { id: 'CategoryExplanation', title: 'CategoryExplanation' },
      { id: 'CFDANumbers', title: 'CFDANumbers' },
      { id: 'EligibleApplicants', title: 'EligibleApplicants' },
      { id: 'AdditionalInformationOnEligibility', title: 'AdditionalInformationOnEligibility' },
      { id: 'AgencyCode', title: 'AgencyCode' },
      { id: 'AgencyName', title: 'AgencyName' },
      { id: 'PostDate', title: 'PostDate' },
      { id: 'CloseDate', title: 'CloseDate' },
      { id: 'LastUpdatedDate', title: 'LastUpdatedDate' },
      { id: 'AwardCeiling', title: 'AwardCeiling' },
      { id: 'AwardFloor', title: 'AwardFloor' },
      { id: 'EstimatedTotalProgramFunding', title: 'EstimatedTotalProgramFunding' },
      { id: 'ExpectedNumberOfAwards', title: 'ExpectedNumberOfAwards' },
      { id: 'Description', title: 'Description' },
      { id: 'Version', title: 'Version' },
      { id: 'CostSharingOrMatchingRequirement', title: 'CostSharingOrMatchingRequirement' },
      { id: 'ArchiveDate', title: 'ArchiveDate' },
      { id: 'GrantorContactEmail', title: 'GrantorContactEmail' },
      { id: 'GrantorContactEmailDescription', title: 'GrantorContactEmailDescription' },
      { id: 'GrantorContactText', title: 'GrantorContactText' }
    ],
    
  });

  // Write the opportunities array to the CSV file
  await csvWriter.writeRecords(opportunities);

  console.log('CSV file saved successfully!');
}

main();