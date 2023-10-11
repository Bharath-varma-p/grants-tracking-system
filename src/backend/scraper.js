const cheerio = require('cheerio');
const fs = require('fs');

// Load XML file 
const xml = fs.readFileSync('/Users/bharath/Documents/GrantsProject/Downloaded_data/GrantsDBExtract20231005v2.xml', 'utf8');

// Parse XML using cheerio
const $ = cheerio.load(xml, {xmlMode: true}); 

// Extract data
const opportunities = [];

$('OpportunitySynopsisDetail_1_0').each((i, elem) => {

  const id = $(elem).find('OpportunityID').text();
  const title = $(elem).find('OpportunityTitle').text();
  const number = $(elem).find('OpportunityNumber').text();
  const category = $(elem).find('OpportunityCategory').text();
  const FundingInstrumentType = $(elem).find('FundingInstrumentType').text();
  const CategoryOfFundingActivity = $(elem).find('CategoryOfFundingActivity').text();
  const CategoryExplanation = $(elem).find('CategoryExplanation').text();
  const CFDANumbers = $(elem).find('CFDANumbers').text();
  const EligibleApplicants = $(elem).find('EligibleApplicants').text();
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

  // Extract other fields...

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

console.log(opportunities);