const FormatResult = (resp) => {
    const grouped = {}; // Use an object to group by listingId
  
    resp.forEach((item) => {
      const car = item.carListing;
      const image = item.carImages;
  
      if (!car) return;
  
      const listingId = car.id;
  
      if (!grouped[listingId]) {
        grouped[listingId] = {
          ...car,
          images: [],
        };
      }
  
      if (image) {
        grouped[listingId].images.push(image);
      }
    });
  
    return Object.values(grouped);
  };
  
  export default {
    FormatResult,
  };
  