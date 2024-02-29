const axios = require("axios");
const { SuccessResult, ErrorResult } = require("./result");

const API_KEY = process.env.hereapi_address_service_api_key;

const apiParams = `&apiKey=${API_KEY}&in=countryCode:USA&at=39.103119,-84.512016&limit=5&lang=en`;

module.exports.findGeocode = async function (searchAddress) {
  try {
    const response = await axios.get(
      `https://autocomplete.search.hereapi.com/v1/autosuggest?q=${searchAddress}${apiParams}`
    );

    const foundAddress = response.data.items.find((p) => p.resultType === "houseNumber");

    if (!foundAddress) {
      throw new Error("Not found");
    }

    const { id: locationId } = foundAddress;

    const geocodeResponse = await axios.get(
      `https://autocomplete.search.hereapi.com/v1/lookup?id=${locationId}&apiKey=${API_KEY}`
    );

    const { address, position } = geocodeResponse.data;

    if (!address) {
      globalThis.logger.info(geocodeResponse);
      throw new Error("Couldn't get address parts. Geocode API Error");
    }

    const result = {
      Country: address.countryName,
      State: address.stateCode,
      County: address.county,
      City: address.city,
      Street: address.street,
      HouseNumber: address.houseNumber,
      ZipCode: address.postalCode ? address.postalCode.split("-")[0] : "",
      PointX: position.lng,
      PointY: position.lat,
    };

    return new SuccessResult(result);
  } catch (err) {
    return new ErrorResult("An error occurred", err);
  }
};
