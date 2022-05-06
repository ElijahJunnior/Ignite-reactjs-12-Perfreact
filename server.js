module.exports = () => {

  const data = { 
    products: [], 
  };

  for(let ind = 0; ind < 1000; ind++) {
    data.products.push({
      id: ind + 1, 
      price: 80, 
      title: `Camiseta ${ind + 1}`
    });
  }

  return data; 

}