// Dummy data for testing
const sampleData = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 15 },
    { category: 'D', value: 25 },
    { category: 'E', value: 30 }
];

// Service function to fetch data for analytics
exports.getData = (callback) => {
    // In a real application, you would fetch data from a database or an external API
    // For demonstration purposes, we're just returning sample data
    callback(null, sampleData);
};
