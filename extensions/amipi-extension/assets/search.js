$(document).ready(function () {
	alert("2");
    // let userForm = document.querySelector("[type=app-form]");
    // let formData = new FormData(userForm);
    // let data = [...formData.values()];

    var value_form = $('#form').serialize();
	// var url='https://e3fab2-therealdealforyou.myshopify.com/apps/proxy?shop=e3fab2-therealdealforyou.myshopify.com'; 
	var url=`${location.origin}/apps/proxy?shop=${Shopify.shop}`; 
        $.ajax({
            url: url,
            type: "get",
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            data: value_form,
            // data: JSON.stringify(data),
            success: function (data) {
            //    alert(data);
               console.log(data);
            }
        });
    
});


