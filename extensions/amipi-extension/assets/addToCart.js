  // function addToCart(id, selectedVariantId) {
    
  //     const formData = {
  //       items: [{
  //         id: selectedVariantId,
  //         quantity: 1
  //       }]
  //     };
    
  //     const apiUrl = window.Shopify.routes.root + 'cart/add.js';
    
  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     };
    
  //     fetch(apiUrl, requestOptions)
  //       .then(res => handleResponse(res, id, selectedVariantId))
  //       .catch(handleError)
  // }
  
  // function handleResponse(res, id, selectedVariantId) {
  //   return res.json().then(data => {
  //     if(data?.items) {
  //       alert('Item added to cart');
  
  //       findify.core.analytics.sendEvent('click-item',
  //         {
  //             rid: findify.grid.state.meta.rid,
  //             item_id: id,
  //             variant_item_id: selectedVariantId
  //         },
  //         false
  //       )
  //     }
  //     else {
  //       const errorDescription = data?.description || 'Unexpected Error';
  //       alert(errorDescription);
  //     }
  //   })
  // }
  
  // function handleError(error) {
  //   const errorDescription = error?.description || 'Unexpected Error';
  //   alert(errorDescription);
  // }